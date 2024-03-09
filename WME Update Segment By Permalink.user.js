// ==UserScript==
// @name        WME Update Segment By Permalink
// @namespace   WazeUA
// @version     0.1.01
// @description none
// @author      Sapozhnik
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// ==/UserScript==

// Флаги flags_unset либо flags_set =  unpaved,headlights
// https://waze.com/uk/editor?env=row&lat=46.59851&lon=33.07064&s=8379753821591&zoomLevel=18&segments=427057335#fwdMaxSpeed=50&lockRank=2&revMaxSpeed=30&flags_set=unpaved,headlights
// #lockRank=2 (левел +1)

// Переход по кординатам
// W.map.setCenter(OpenLayers.Layer.SphericalMercator.forwardMercator(parseFloat(33.07064), parseFloat(46.59851)))

(function main() {
  'use strict';
  let UpdateObject;
  let URL_LIST = [
    "https://waze.com/uk/editor?env=row&lat=47.82211671&lon=31.17530734&zoomLevel=18&segments=370369928#alt_add=б-р Шевченка",
    "https://waze.com/uk/editor?env=row&lat=50.39642115&lon=30.31761155&zoomLevel=18&segments=400132913#alt_add=б-р Шевченка",
    "https://waze.com/uk/editor?env=row&lat=49.59246298&lon=33.18533790&zoomLevel=18&segments=332678945#alt_add=тупик Шевченка",
    // 'https://waze.com/uk/editor?env=row&lat=50.404891747&lon=30.61416692&s=3402715231638&zoomLevel=17&segments=103991770#lockRank=2',
    // 'https://waze.com/uk/editor?env=row&lat=50.397933277&lon=30.63273371&s=3402715231638&zoomLevel=17&segments=201667765#lockRank=2',
    // 'https://waze.com/uk/editor?env=row&lat=50.397933277&lon=30.63273371&s=3402715231638&zoomLevel=17&segments=160555041#lockRank=2',
    // 'https://waze.com/uk/editor?env=row&lat=50.398391917&lon=30.63577127&s=3402715231638&zoomLevel=17&segments=331072837#lockRank=2',
    // 'https://waze.com/uk/editor?env=row&lat=50.398249447&lon=30.63610700&s=3402715231638&zoomLevel=17&segments=331072838#lockRank=2',
    // 'https://waze.com/uk/editor?env=row&lat=50.398145977&lon=30.63619964&s=3402715231638&zoomLevel=17&segments=331072835#lockRank=2',
  ];
  const FLAGS_BIT = {
    tunnel: 0b00000001,
    // a     :  0b00000010,
    // b     :  0b00000100,
    // c     :  0b00001000,
    unpaved: 0b00010000,
    headlights: 0b00100000,
    // d     :  0b01000000,
    nearbyHOV: 0b10000000,
  };

  async function goThrowTheLinks() {
    var counter = 0;
    var counter_save = 150; // значение автосохранения
    if (URL_LIST.length < counter_save) counter_save = URL_LIST.length;

    for (const link of URL_LIST) {
      const url = new URL(link);

      if (url.searchParams.has('lon') && url.searchParams.has('lat')) {
        await moveMap(url.searchParams.get('lon'), url.searchParams.get('lat'));

        // Если есть хеш (#) проводим обновление
        if (url.hash) {
          await updateObjects(url);
          console.log(counter + '---->', counter_save, link);
          if (++counter == counter_save || URL_LIST[URL_LIST.length - 1] === link) { // считаем автосохранения

            await save();
            counter = 0;
          }
        }
      }
    }
  }

  function save() {
    return new Promise((resolve) => {
      W.commands.request('save:start');
      const interval = setInterval(() => {

        if (!W.editingMediator.get("saving")) {
          clearInterval(interval)
          resolve()
        }

      }, 200)

    });
  }


  function moveMap(lon, lat) {
    console.log('Сдвигаем...', lon, lat);
    return new Promise((resolve) => {
      W.map.setCenter(
        OpenLayers.Layer.SphericalMercator.forwardMercator(
          parseFloat(lon),
          parseFloat(lat),
        ),
      );
      setTimeout(() => resolve(), 1000) // Задержка перемещений
    });
  }




  function waitLoadingData(id) {

    return new Promise((resolve) => {
      console.log('Ожидаем загрузку...', id);
      let counterWait = 0;
      const interval = setInterval(() => {
        const segment = W.model.segments.getObjectById(id);
        if (segment) {
          clearInterval(interval);
          resolve(segment);
        } else {
          counterWait++;
          if (counterWait > 50) {
            clearInterval(interval);
            console.log('Несуществующий сегмент:', id);//  Если нет ID (сегмент не читается или был удален)
            resolve(null);
          }
        }
      }, 200);
    });
  }


  async function updateObjects(url) {
    var WazeActionAddAlternateStreet = require("Waze/Action/AddAlternateStreet");


    const searchParams = new URLSearchParams(url.search.replace('?', '')); // Получаем данные в ссылке после "?"
    const segments = (await Promise.all(
      searchParams.getAll('segments').map((id) => waitLoadingData(id)),
    )).filter(segment => segment);

    if (segments.length) {
      let flags = segments[0].attributes.flags
      // console.log(flags.toString(2));


      const updateProps = {}; // создаем объект
      const hashParams = new URLSearchParams(url.hash.replace('#', '')); // Создаем new экземпляр объекта

      // получаем данные для загрузки из хеша
      for (const [key, value] of hashParams.entries()) {

        if (key == 'alt_add') {
          // отримуємо наявні альтернативи

          // додаємо альтернативу з хеша
          //                    console.log ("!!!!!! ------>", segments[0].attributes.primaryStreetID, segments[0].attributes.streetIDs)
          var addr = segments[0].getAddress().attributes;

          var altAttr = {
            countryID: addr.country.attributes.id,
            stateID: addr.state.attributes.id,
            cityName: addr.city.attributes.name,
            emptyCity: addr.city.attributes.name === null || addr.city.attributes.name === '',
            streetName: value,
            emptyStreet: false //problem.isEmpty
          };

          // удаляем ключ
          delete

            W.model.actionManager.add(new WazeActionAddAlternateStreet(segments[0], altAttr, {
              streetIDField: 'UpdateAltName'
            }));

        }

        // обрабатываем флаги
        // снимаем ненужные
        if (key == 'flags_unset') {
          if (value.includes('unpaved')) flags &= ~(FLAGS_BIT.unpaved);
          if (value.includes('tunnel')) flags &= ~(FLAGS_BIT.tunnel);
          if (value.includes('headlights')) flags &= ~(FLAGS_BIT.headlights);
          if (value.includes('nearbyHOV')) flags &= ~(FLAGS_BIT.nearbyHOV);
          updateProps['flags'] = flags;
        }
        // ставим нужные
        if (key == 'flags_set') {
          if (value.includes('unpaved')) flags |= (FLAGS_BIT.unpaved);
          if (value.includes('tunnel')) flags |= (FLAGS_BIT.tunnel);
          if (value.includes('headlights')) flags |= (FLAGS_BIT.headlights);
          if (value.includes('nearbyHOV')) flags |= (FLAGS_BIT.nearbyHOV);
          updateProps['flags'] = flags;
        }

        if (key != 'flags_set' && key != 'flags_unset' && key != 'alt_add') {
          updateProps[key] = parseInt(value);
        }
        console.log('PL hash: ' + key + ' = ' + value);
      }
      //                console.log("updateProps", updateProps);

      await Promise.all(segments.map((segment) => {
        W.model.actionManager.add(new UpdateObject(segment, updateProps));
      }),);

    }
  }



  function bootstrap() {
    if (W && W.loginManager && W.loginManager.user && W.map && require) {
      UpdateObject = require('Waze/Action/UpdateObject');
      goThrowTheLinks();
    } else {
      setTimeout(bootstrap, 200);
    }
  }

  bootstrap();
})();
