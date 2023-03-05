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
    console.log (segments[0].type);

    segments.map((segment) => {
      W.model.actionManager.add(new UpdateObject(segment, updateProps));
    });

    W.commands.request('save:start');
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
