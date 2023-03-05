// ==UserScript==
// @name        WME Save By Permalink
// @namespace   WazeUA
// @version     0.0.1
// @description none
// @author      ixxvivxxi
// @updateURL    https://github.com/SapozhnikUA/WME-Save-By-Permalink/raw/main/WME%20Save%20By%20Permalink.user.js
// @downloadURL  https://github.com/SapozhnikUA/WME-Save-By-Permalink/raw/main/WME%20Save%20By%20Permalink.user.js
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// ==/UserScript==


// https://waze.com/uk/editor?env=row&lat=46.59851&lon=33.07064&s=8379753821591&zoomLevel=18&segments=427057335#fwdMaxSpeed=50&lockRank=2&revMaxSpeed=30

(function main() {
  'use strict';

    const FLAGS_BIT = {
    tunnel: 0b00000001,
    // ???
    // a     : 0b00000010,
    // b     : 0b00000100,
    // c     : 0b00001000,
    unpaved: 0b00010000,
    headlights: 0b00100000,
    hov:        0b10000000,
  };


  let UpdateObject;

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

  async function updateObjects() {
    const updateProps = {}; // создаем объект
    const hashParams = new URLSearchParams(location.hash.replace('#', '')); // Создаем new экземпляр объекта
    // получаем данные для загрузки
    for (const [key, value] of hashParams.entries()) {
      updateProps[key] = value;
      console.log ('PL hash: ' + key + ' = ' + value);
    }

    const searchParams = new URLSearchParams(location.search.replace('?', '')); // Получаем данные в ссылке после "?"
    const segments = await Promise.all(
      searchParams.getAll('segments').map((id) => waitLoadingData(id)),
    );

      let flags = segments[0].attributes.flags//.toString(2);
      console.log (flags.toString(2));

    segments.map((segment) => {
      W.model.actionManager.add(new UpdateObject(segment, updateProps));
    });
      flags &= ~(FLAGS_BIT.unpaved);
      console.log (FLAGS_BIT.unpaved.toString(2));
      console.log (flags.toString(2));

    // W.commands.request('save:start');
  }



  function bootstrap() {
    if (W && W.loginManager && W.loginManager.user && W.map && require) {
      UpdateObject = require('Waze/Action/UpdateObject');

      // Если есть хеш (#) проводим обновление
      if (location.hash) {
        updateObjects();
      }
    } else {
      setTimeout(bootstrap, 200);
    }
  }

  bootstrap();
})();
