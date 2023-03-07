// ==UserScript==
// @name        WME Update Segment By Permalink
// @namespace   WazeUA
// @version     0.0.2
// @description none
// @author      ixxvivxxi
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// ==/UserScript==

// Флаги flags_unset либо flags_set =  unpaved,headlights
// https://waze.com/uk/editor?env=row&lat=46.59851&lon=33.07064&s=8379753821591&zoomLevel=18&segments=427057335#fwdMaxSpeed=50&lockRank=2&revMaxSpeed=30&flags_set=unpaved,headlights

// Переход по кординатам
// W.map.setCenter(OpenLayers.Layer.SphericalMercator.forwardMercator(parseFloat(33.07064), parseFloat(46.59851)))

(function main() {
  'use strict';
  let UpdateObject;
  let URL_LIST = [
'https://waze.com/uk/editor?env=row&lat=46.82960294&lon=32.74704568&marker=true&zoomLevel=18&segments=381032854#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.84661335&lon=32.75742926&marker=true&zoomLevel=18&segments=206075007#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.84430624&lon=32.75657349&marker=true&zoomLevel=18&segments=206075435#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.84322849&lon=32.75599945&marker=true&zoomLevel=18&segments=206075439#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.83877579&lon=32.75296167&marker=true&zoomLevel=18&segments=206075448#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.83747603&lon=32.75207497&marker=true&zoomLevel=18&segments=206075449#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.84160502&lon=32.75489184&marker=true&zoomLevel=18&segments=206075442#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.84016793&lon=32.75391140&marker=true&zoomLevel=18&segments=206075445#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.83566832&lon=32.75084429&marker=true&zoomLevel=18&segments=206075789#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.25680246&lon=32.29593133&marker=true&zoomLevel=18&segments=205347452#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.25443447&lon=32.29494283&marker=true&zoomLevel=18&segments=205347451#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.26273824&lon=32.29844328&marker=true&zoomLevel=18&segments=205346776#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.18226511&lon=32.32278945&marker=true&zoomLevel=18&segments=205348794#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.17922468&lon=32.32260352&marker=true&zoomLevel=18&segments=262174762#lockRank=2',

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
    //const UpdateObject = require('Waze/Action/UpdateObject');

    for (const link of URL_LIST) {
      const url = new URL(link);

      if (url.searchParams.has('lon') && url.searchParams.has('lat')) {
        await moveMap(url.searchParams.get('lon'), url.searchParams.get('lat'));

        // Если есть хеш (#) проводим обновление
        if (url.hash) {
          updateObjects(url);
        }
      }
    }
  }

  function moveMap(lon, lat) {
    return new Promise((resolve) => {
      W.map.setCenter(
        OpenLayers.Layer.SphericalMercator.forwardMercator(
          parseFloat(lon),
          parseFloat(lat),
        ),
      );

      document.addEventListener(
        'wme-map-data-loaded',
        () => {
          setTimeout(() => resolve(), 1000)
          //resolve()
        },
        {
          once: true,
        },
      );
    });
  }
  function waitLoadingData(id) {
    return new Promise((resolve) => {
      const segment = W.model.segments.getObjectById(id);

      if (!segment) {
        setTimeout(() => resolve(waitLoadingData(id)), 200);
      } else {
        resolve(segment);
      }
    });
  }


  async function updateObjects(url) {

    const searchParams = new URLSearchParams(url.search.replace('?', '')); // Получаем данные в ссылке после "?"
    const segments = await Promise.all(
      searchParams.getAll('segments').map((id) => waitLoadingData(id)),
    );
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
        updateProps[key] = value;
      }
      console.log('PL hash: ' + key + ' = ' + value);
    }
    console.log(updateProps);

    segments.map((segment) => {
      W.model.actionManager.add(new UpdateObject(segment, updateProps));
    });


  W.commands.request('save:start');
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
