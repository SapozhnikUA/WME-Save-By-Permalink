// ==UserScript==
// @name        WME move to coord
// @namespace   WazeUA
// @version     0.0.2
// @description none
// @author      ixxvivxxi
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// ==/UserScript==

// Флаги flags_unset либо flags_set =  unpaved,headlights
// https://waze.com/uk/editor?env=row&lat=46.59851&lon=33.07064&s=8379753821591&zoomLevel=18&segments=427057335#fwdMaxSpeed=50&lockRank=2&revMaxSpeed=30&flags_unset=unpaved,headlights

// Переход по кординатам
// W.map.setCenter(OpenLayers.Layer.SphericalMercator.forwardMercator(parseFloat(33.07064), parseFloat(46.59851)))

(function main() {
  'use strict';

  let URL_LIST = [
    'https://waze.com/uk/editor?env=row&lat=46.59825&lon=33.07060&s=8379753821591&zoomLevel=19&segments=427057335',
    'https://waze.com/uk/editor?env=row&lat=46.67763&lon=32.53486&s=8379753821591&zoomLevel=17&segments=379450718',
    'https://waze.com/uk/editor?env=row&lat=46.14626&lon=32.77701&s=8379753821591&zoomLevel=16&segments=427057335',
  ];

  async function goThrowTheLinks() {
    //const UpdateObject = require('Waze/Action/UpdateObject');

    for (const link of URL_LIST) {
      const url = new URL(link);

      if (url.searchParams.has('lon') && url.searchParams.has('lat')) {
        await moveMap(url.searchParams.get('lon'), url.searchParams.get('lat'));
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
          //setTimeout(() => resolve(), 2000)
          resolve()
        },
        {
          once: true,
        },
      );
    });
  }

  function bootstrap() {
    if (W && W.loginManager && W.loginManager.user && W.map && require) {
      goThrowTheLinks();
    } else {
      setTimeout(bootstrap, 200);
    }
  }

  bootstrap();
})();
