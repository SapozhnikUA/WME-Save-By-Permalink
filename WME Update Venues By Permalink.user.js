// ==UserScript==
// @name        WME Update Venues By Permalink
// @namespace   WazeUA
// @version     0.0.6
// @description none
// @author      Sapozhnik
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// ==/UserScript==

/* global W */

// Флаги flags_unset либо flags_set =  unpaved,headlights
// https://waze.com/uk/editor?env=row&lat=46.59851&lon=33.07064&s=8379753821591&zoomLevel=18&segments=427057335#fwdMaxSpeed=50&lockRank=2&revMaxSpeed=30&flags_set=unpaved,headlights
// #lockRank=2 (левел +1)


// {
//     "id": "19792376.198185903.27862839",
//     "url": "https://www.autoenterprise.com.ua",
//     "name": "AE Електрозаправка",
//     "phone": "+38-97-5357777",
//     "approved": false,
//     "geometry": {
//         "type": "Point",
//         "coordinates": [
//             30.24089297,
//             50.39033142
//         ]
//     },
//     "lockRank": 3,
//     "streetID": 39684993,
//     "createdBy": 1778360296,
//     "createdOn": 1677056822152,
//     "categories": [
//         "CHARGING_STATION"
//     ],
//     "permissions": 0,
//     "categoryAttributes": {
//         "PARKING_LOT": null,
//         "CHARGING_STATION": {
//             "source": "ECO_MOVEMENT",
//             "network": "AE",
//             "accessType": "RESTRICTED",
//             "chargingPorts": [
//                 {
//                     "count": 1,
//                     "portId": "1",
//                     "connectorTypes": [
//                         "TYPE1"
//                     ],
//                     "maxChargeSpeedKw": 22
//                 },
//                 {
//                     "count": 1,
//                     "portId": "2",
//                     "connectorTypes": [
//                         "TYPE1"
//                     ],
//                     "maxChargeSpeedKw": 22
//                 }
//             ],
//             "paymentMethods": [
//                 "MEMBERSHIP_CARD"
//             ]
//         }
//     },
//     "venueUpdateRequests": [
//         {
//             "id": "1677056822152.19792376.198185903.27862839",
//             "type": "VENUE",
//             "createdBy": 1778360296,
//             "dateAdded": 1677056822152
//         }
//     ]
// }


(function main() {
    'use strict';
    let UpdateObject;
    let DeleteObj;
    let URL_LIST = [
        'https://waze.com/uk/editor?env=row&lat=50.43583&lon=30.43239&s=4762049183223&zoomLevel=20&venues=19923448.199431092.28027439'
        + '#name=🔌 АвтоЕнтерпрайз, електрозарядка'
        + '&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка'
        + '&url=https://autoenterprise.ua/'
        + '&categories=CHARGING_STATION'
        + '&categoryAttributes.CHARGING_STATION=AutoEnterprise'
        + '&categoryAttributes.accessType=PUBLIC'
        + '&phone=+380991234567'
        + '&lockRank=3'
        ,
    ]
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

                        // await save();
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
                        console.log('Несуществующий объект:', id);//  Если нет ID (сегмент не читается или был удален)
                        resolve(null);
                    }
                }
            }, 200);
        });
    }


    async function updateObjects(url) {

        const searchParams = new URLSearchParams(url.search.replace('?', '')); // Получаем данные в ссылке после "?"
        const venues = (await Promise.all(
            searchParams.getAll('venues').map((id) => waitLoadingData(id)),
        )).filter(venue => venue);

        if (venues.length) {
            const updateProps = {}; // создаем объект
            //            console.log ('Объект начальный', updateProps);
            //            updateProps.categoryAttributes = venues[0].attributes.categoryAttributes; // копируем объект
            const CHARGING_STATION = { ...venues[0].attributes.categoryAttributes.CHARGING_STATION };
            const paymentMethods = venues[0].attributes.categoryAttributes.CHARGING_STATION.paymentMethods ?? [];
            CHARGING_STATION["paymentMethods"] = [...paymentMethods];
            //            console.log('Атрибуты', venues[0].attributes.categoryAttributes);
            const hashParams = new URLSearchParams(url.hash.replace('#', '')); // Создаем new экземпляр объекта
            // получаем данные для загрузки
            for (const [key, value] of hashParams.entries()) {
                //            updateProps[key] = parseInt(value);

                if (key == 'DeleteObject' && value == 'true') { // Удаляем объект
                    await Promise.all(venues.map((venue) => {
                        W.model.actionManager.add(new DeleteObj(venue));
                    }),);
                    console.log('Объект удален');
                    return;

                } else if (value.includes(";")) {
                    updateProps[key] = value.split(";");
                } else if (key == 'phone') {
                    updateProps[key] = String(String('+' + value.substring(1)));
                    console.log('Телефон', String('+' + value.substring(1)))
                } else if (key == 'categories') {
                    updateProps[key] = [value];
                } else if (key == 'categoryAttributes.CHARGING_STATION') {
                    //                    updateProps.categoryAttributes.CHARGING_STATION.network = value; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!s
                    CHARGING_STATION["network"] = value;
                    //                    updateProps.categoryAttributes.CHARGING_STATION.costType = "FREE";
                } else if (key == 'categoryAttributes.accessType') {
                    //                    updateProps.categoryAttributes.CHARGING_STATION.accessType = value;
                } else if (!isNaN(value)) {
                    updateProps[key] = parseFloat(value); // Проверка на целое число
                } else {
                    updateProps[key] = value;
                }
                console.log('PL hash: ' + key + ' = ' + value);
            }
            console.log('Финальный объект', updateProps);
            if (Object.keys(CHARGING_STATION).length) {
                updateProps["categoryAttributes"] = {};
                updateProps.categoryAttributes["CHARGING_STATION"] = CHARGING_STATION;

            }
            await Promise.all(venues.map((venue) => {
                W.model.actionManager.add(new UpdateObject(venue, updateProps));
            }),);

        }
    }

    function bootstrap() {
        if (W && W.loginManager && W.loginManager.user && W.map && require) {
            UpdateObject = require('Waze/Action/UpdateObject');
            DeleteObj = require('Waze/Action/DeleteObject');
            goThrowTheLinks();
        } else {
            setTimeout(bootstrap, 200);
        }
    }

    bootstrap();
})();
