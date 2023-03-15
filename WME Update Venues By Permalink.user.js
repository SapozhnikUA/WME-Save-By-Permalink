// ==UserScript==
// @name        WME Update Venues By Permalink
// @namespace   WazeUA
// @version     0.0.5
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
        // 'https://waze.com/uk/editor?env=row&lat=50.43883&lon=30.43959&s=8679126334679&zoomLevel=20&venues=19923448.199496628.27862276'
        // + '#name=🔌 АвтоЕнтерпрайз, електрозарядка'
        // + '&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка'
        // + '&url=https://autoenterprise.ua/'
        // + '&categories=CHARGING_STATION'
        // + '&categoryAttributes.CHARGING_STATION=AutoEnterprise'
        // + '&categoryAttributes.accessType=PUBLIC'
        // + '&phone=+380991234567'
        // + '&lockRank=3'
        // ,
        // 'https://waze.com/uk/editor/?env=row&lat=48.62503112&lon=22.27649957&zoomLevel=20&venues=14615014.146019071.27863305#DeleteObject=true',
        // 'https://waze.com/uk/editor/?env=row&lat=48.63302511&lon=22.27993601&zoomLevel=20&venues=14615014.146019071.27861897#DeleteObject=true',
        // 'https://waze.com/uk/editor/?env=row&lat=48.61107216&lon=22.29329637&zoomLevel=20&venues=14615014.146084605.27863494#DeleteObject=true',
'https://waze.com/uk/editor/?env=row&lat=50.520819762&lon=30.24933461&zoomLevel=20&venues=19792377.198251452.27862904#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=48.001171742&lon=33.481805582&zoomLevel=20&venues=21955040.219419328.27863069#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=48.34629138&lon=33.498564639&zoomLevel=20&venues=21955043.219550435.27860553#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=46.43909418&lon=30.71193701&zoomLevel=20&venues=20120016.201265700.27863079#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=46.43524133&lon=30.71990598&zoomLevel=20&venues=20120016.201331236.27863626#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=46.48255864&lon=30.73557065&zoomLevel=20&venues=20120017.201462312.27862162#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=46.48109518&lon=30.74087695&zoomLevel=20&venues=20120017.201462312.27864411#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=46.48109518&lon=30.74087695&zoomLevel=20&venues=20120017.201462312.27862899#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=46.48317426&lon=30.73568876&zoomLevel=20&venues=20120017.201462312.27861326#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=46.58587096&lon=30.7750201&zoomLevel=20&venues=20185554.201724467.27862315#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=50.5021182&lon=24.76308316&zoomLevel=20&venues=16253433.162272186.27863370#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=49.80497006&lon=24.04099007&zoomLevel=20&venues=15729138.157553524.27863210#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=49.8485126&lon=24.02187995&zoomLevel=20&venues=15729138.157422457.27860688#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=49.80029038&lon=24.90718126&zoomLevel=20&venues=16318962.163255156.27862755#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',
'https://waze.com/uk/editor/?env=row&lat=49.794295567&lon=24.893714398&zoomLevel=20&venues=16318962.163124083.27861236#name=🔌 АвтоЕнтерпрайз, електрозарядка&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка&url=https://charge.autoenterprise.com.ua/&categoryAttributes.CHARGING_STATION=AutoEnterprise&phone=+380975357777',



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
            updateProps.categoryAttributes = venues[0].attributes.categoryAttributes; // копируем объект
            //            console.log('Атрибуты', venues[0].attributes.categoryAttributes);
            //console.log ('Объект', updateProps);
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
                    updateProps.categoryAttributes.CHARGING_STATION.network = value;
                } else if (key == 'categoryAttributes.accessType') {
                    updateProps.categoryAttributes.CHARGING_STATION.accessType = value;
                } else if (!isNaN(value)) {
                    updateProps[key] = parseFloat(value); // Проверка на целое число
                } else {
                    updateProps[key] = value;
                }
                console.log('PL hash: ' + key + ' = ' + value);
            }
            console.log('Финальный объект', updateProps);

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
