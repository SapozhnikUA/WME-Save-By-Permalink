// ==UserScript==
// @name        WME Save By Permalink
// @namespace   WazeUA
// @version     0.0.1
// @description none
// @author      ixxvivxxi
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// ==/UserScript==

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
    const updateProps = {};
    const hashParams = new URLSearchParams(location.hash.replace('#', ''));
    for (const [key, value] of hashParams.entries()) {
      updateProps[key] = value;
    }

    const searchParams = new URLSearchParams(location.search.replace('?', ''));
    const segments = await Promise.all(
      searchParams.getAll('segments').map((id) => waitLoadingData(id)),
    );

    segments.map((segment) => {
      W.model.actionManager.add(new UpdateObject(segment, updateProps));
    });

    W.commands.request('save:start');
  }

  function bootstrap() {
    if (W && W.loginManager && W.loginManager.user && W.map && require) {
      UpdateObject = require('Waze/Action/UpdateObject');

      if (location.hash) {
        updateObjects();
      }
    } else {
      setTimeout(bootstrap, 200);
    }
  }

  bootstrap();
})();
