// ==UserScript==
// @name        WME Update Segment By Permalink
// @namespace   WazeUA
// @version     0.0.5
// @description none
// @author      ixxvivxxi
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
    'https://waze.com/uk/editor?env=row&lat=49.678319537&lon=36.32208277&s=3402715231638&zoomLevel=17&segments=358587213#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.679594397&lon=36.33081831&s=3402715231638&zoomLevel=17&segments=397153156#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.679311207&lon=36.32916775&s=3402715231638&zoomLevel=17&segments=397153155#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.664140727&lon=36.25844699&s=3402715231638&zoomLevel=17&segments=362717661#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.678789027&lon=36.32612422&s=3402715231638&zoomLevel=17&segments=358587404#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.678495997&lon=36.32425217&s=3402715231638&zoomLevel=17&segments=358587402#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.678444967&lon=36.31439591&s=3402715231638&zoomLevel=17&segments=358587392#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.678338877&lon=36.32008226&s=3402715231638&zoomLevel=17&segments=358587386#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.673753007&lon=36.27754191&s=3402715231638&zoomLevel=17&segments=392558039#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.678663437&lon=36.30191284&s=3402715231638&zoomLevel=17&segments=392558040#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.678342007&lon=36.32275700&s=3402715231638&zoomLevel=17&segments=358587054#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.955398037&lon=36.30261719&s=3402715231638&zoomLevel=17&segments=408409537#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.954422697&lon=36.30237121&s=3402715231638&zoomLevel=17&segments=408409536#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.680006777&lon=36.33322192&s=3402715231638&zoomLevel=17&segments=358587395#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.679768597&lon=36.33183367&s=3402715231638&zoomLevel=17&segments=390793424#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.192825447&lon=37.26200640&s=3402715231638&zoomLevel=17&segments=412344987#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.193195297&lon=37.26559294&s=3402715231638&zoomLevel=17&segments=412344988#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.192476307&lon=37.26042266&s=3402715231638&zoomLevel=17&segments=366611302#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.193307117&lon=37.26984851&s=3402715231638&zoomLevel=17&segments=421522971#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=49.191752797&lon=37.25964307&s=3402715231638&zoomLevel=17&segments=366611184#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.823609507&lon=31.66791015&s=3402715231638&zoomLevel=17&segments=410901500#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.822872457&lon=31.67069768&s=3402715231638&zoomLevel=17&segments=366072877#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=48.939562527&lon=24.71309290&s=3402715231638&zoomLevel=17&segments=340709668#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=50.764864417&lon=29.24032909&s=3402715231638&zoomLevel=17&segments=416311955#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=50.760680417&lon=29.23911098&s=3402715231638&zoomLevel=17&segments=416311959#lockRank=2',
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
    var counter_save = 50; // значение автосохранения
    if (URL_LIST.length < counter_save) counter_save = URL_LIST.length;

    for (const link of URL_LIST) {
      const url = new URL(link);

      if (url.searchParams.has('lon') && url.searchParams.has('lat')) {
        await moveMap(url.searchParams.get('lon'), url.searchParams.get('lat'));

        // Если есть хеш (#) проводим обновление
        if (url.hash) {
          await updateObjects(url);
          console.log(counter + '---->', counter_save, url);
          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          if (++counter == counter_save || URL_LIST[URL_LIST.length -1] === link) { // считаем автосохранения

     await save();
            counter = 0;
          }
        }
      }
    }
  }

  function save() {
    //W.commands.request('save:start');

    //W.editingMediator.get("saving")

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
      setTimeout(() => resolve(), 200)
    });
  }




  function waitLoadingData(id) {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Если нет ID (сегмент не читается или был удален)
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
              console.log('Несуществующий сегмент:', id);
            resolve(null);
          }
        }
      },200);
    });
  }


  async function updateObjects(url) {

    const searchParams = new URLSearchParams(url.search.replace('?', '')); // Получаем данные в ссылке после "?"
    const segments = (await Promise.all(
      searchParams.getAll('segments').map((id) => waitLoadingData(id)),
    )).filter(segment => segment);
    if (segments.length) {
      let flags = segments[0].attributes.flags//.toString(2); // как правильно получать flags ??????????????????????
      // console.log(flags.toString(2));


      const updateProps = {}; // создаем объект
      const hashParams = new URLSearchParams(url.hash.replace('#', '')); // Создаем new экземпляр объекта
      // получаем данные для загрузки
      for (const [key, value] of hashParams.entries()) {

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

        if (key != 'flags_set' && key != 'flags_unset') {
          updateProps[key] = parseInt(value);
        }
        console.log('PL hash: ' + key + ' = ' + value);
      }
      //    console.log(updateProps);

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
