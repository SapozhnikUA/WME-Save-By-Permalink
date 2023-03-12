// ==UserScript==
// @name        WME Update Venues By Permalink
// @namespace   WazeUA
// @version     0.0.2
// @description none
// @author      Sapozhnik
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// ==/UserScript==

// Флаги flags_unset либо flags_set =  unpaved,headlights
// https://waze.com/uk/editor?env=row&lat=46.59851&lon=33.07064&s=8379753821591&zoomLevel=18&segments=427057335#fwdMaxSpeed=50&lockRank=2&revMaxSpeed=30&flags_set=unpaved,headlights
// #lockRank=2 (левел +1)


(function main() {
    'use strict';
    let UpdateObject;
    let URL_LIST = [
      'https://waze.com/uk/editor?env=row&lat=50.43548&lon=30.43249&s=8644984831383&zoomLevel=18&venues=19923448.199431092.15056596#name=123',
    ];
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
            if (++counter == counter_save || URL_LIST[URL_LIST.length -1] === link) { // считаем автосохранения
  
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
        setTimeout(() => resolve(), 100) // Задержка перемещений
      });
    }
  
    
  
    function waitLoadingData(id) {
      
      return new Promise((resolve) => {
        console.log('Ожидаем загрузку...', id);
        let counterWait = 0;
        const interval = setInterval(() => {
          const venue = W.model.venues.getObjectById(id);
          if (venue) {
            clearInterval(interval);
            resolve(venue);
          } else {
            counterWait++;
            if (counterWait > 50) {
              clearInterval(interval);
                console.log('Несуществующий сегмент:', id);//  Если нет ID (сегмент не читается или был удален)
              resolve(null);
            }
          }
        },200);
      });
    }
  
  
    async function updateObjects(url) {
  
      const searchParams = new URLSearchParams(url.search.replace('?', '')); // Получаем данные в ссылке после "?"
      const venues = (await Promise.all(
        searchParams.getAll('venues').map((id) => waitLoadingData(id)),
      )).filter(venue => venue);
      if (venues.length) {
        const updateProps = {}; // создаем объект
        const hashParams = new URLSearchParams(url.hash.replace('#', '')); // Создаем new экземпляр объекта
        // получаем данные для загрузки
        for (const [key, value] of hashParams.entries()) {
            updateProps[key] = parseInt(value);
          console.log('PL hash: ' + key + ' = ' + value);
        }
        //    console.log(updateProps);
  
        await Promise.all(venues.map((venue) => {
          W.model.actionManager.add(new UpdateObject(venue, updateProps));
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
  