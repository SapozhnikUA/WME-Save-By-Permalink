// ==UserScript==
// @name        WME Update Venues By Permalink
// @namespace   WazeUA
// @version     0.0.8
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
        // 'https://waze.com/uk/editor?env=row&lat=50.43583&lon=30.43239&s=4762049183223&zoomLevel=20&venues=19923448.199431092.28027439'
        // + '#name=🔌 АвтоЕнтерпрайз, електрозарядка'
//        + '&aliases=АвтоЕнтерпрайз, електрозарядка;AutoEnterprise, електрозарядка'
//        + '&url=https://autoenterprise.ua/'
//        + '&categories=CHARGING_STATION'
        // + '&categoryAttributes.CHARGING_STATION=AutoEnterprise'
//        + '&categoryAttributes.accessType=PUBLIC'
//        + '&phone=+380991234567'
//        + '&lockRank=3'
        // ,
'https://waze.com/uk/editor/?env=row&lat=50.154409999&lon=25.24371&zoomLevel=20&venues=16515574.165417879.27627701#name=⚡️ Ясно, електрозарядка&aliases=Ясно, електрозарядка;Yasno, електрозарядка&url=https://yasno.com.ua/charge-stations&network=Yasno&phone=0-800-212-333&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.947859999&lon=23.17396&zoomLevel=20&venues=15204851.151851907.28020525#name=⚡️ Ясно, електрозарядка&aliases=Ясно, електрозарядка;Yasno, електрозарядка&url=https://yasno.com.ua/charge-stations&network=Yasno&phone=0-800-212-333&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=50.39494503&lon=30.60259667&zoomLevel=20&venues=20054520.200545199.27862036#name=⚡️ Ясно, електрозарядка&aliases=Ясно, електрозарядка;Yasno, електрозарядка&url=https://yasno.com.ua/charge-stations&network=Yasno&phone=0-800-212-333&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=50.38657866&lon=30.43473581&zoomLevel=20&venues=19923448.199431087.27860927#name=⚡️ Ясно, електрозарядка&aliases=Ясно, електрозарядка;Yasno, електрозарядка&url=https://yasno.com.ua/charge-stations&network=Yasno&phone=0-800-212-333&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=50.434979999&lon=30.408939999&zoomLevel=20&venues=19923448.199300019.28002013#name=⚡️ Ясно, електрозарядка&aliases=Ясно, електрозарядка;Yasno, електрозарядка&url=https://yasno.com.ua/charge-stations&network=Yasno&phone=0-800-212-333&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.848929096&lon=24.023188877&zoomLevel=20&venues=15729138.157422457.28005208#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.853959999&lon=24.02615&zoomLevel=20&venues=15729139.157487993.28005579#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.812569999&lon=24.11391&zoomLevel=20&venues=15794674.158012277.28003844#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.815409999&lon=24.1136&zoomLevel=20&venues=15794674.158012278.28005549#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.816219999&lon=24.11467&zoomLevel=20&venues=15794674.158012278.28004981#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.810715646&lon=24.139139264&zoomLevel=20&venues=15794674.158208885.28005267#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.224919999&lon=23.34331&zoomLevel=20&venues=15270380.152965946.28023195#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.3572&lon=23.51254&zoomLevel=20&venues=15401454.154080072.28023488#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.792059999&lon=23.71418&zoomLevel=20&venues=15532530.155390835.28009918#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.22171&lon=23.80897&zoomLevel=20&venues=15598060.156046138.28023359#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
'https://waze.com/uk/editor/?env=row&lat=49.87979&lon=23.89147&zoomLevel=20&venues=15663603.156570492.28021194#name=⚡️ ГОУ ТУ-Ю, електрозарядка&aliases=ГОУ ТУ-Ю, електрозарядка;Go To-U, електрозарядка&url=https://go-tou.com/ua&network=OBL energo&phone=0-800-217007&lockRank=1&costType=FEE&paymentMethods=APP',
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

// Получаем данные объекта
            const CHARGING_STATION = { ...venues[0].attributes.categoryAttributes.CHARGING_STATION };
            const paymentMethods = venues[0].attributes.categoryAttributes.CHARGING_STATION.paymentMethods ?? [];
            CHARGING_STATION["paymentMethods"] = [...paymentMethods];

            // const chargingPorts = venues[0].attributes.categoryAttributes.CHARGING_STATION.chargingPorts ?? [];
            // CHARGING_STATION["chargingPorts"] = [...chargingPorts];

            // console.log ('Длинна', Object.keys(CHARGING_STATION).length);
            // console.log ('OLD CHARGING_STATION', CHARGING_STATION);

            const hashParams = new URLSearchParams(url.hash.replace('#', '')); // Создаем new экземпляр объекта
            // получаем данные для загрузки
            for (const [key, value] of hashParams.entries()) {

                if (key == 'DeleteObject' && value == 'true') { // Удаляем объект
                    await Promise.all(venues.map((venue) => {
                        W.model.actionManager.add(new DeleteObj(venue));
                    }),);
                    console.log('Объект удален');
                    return;
                }
                if (key == 'aliases') {
                    updateProps[key] = value.split(";");
                } else if (key == 'phone') {
                    updateProps[key] = ((value[0] == ' ')?(String('+' + value.substring(1))):value);
                    console.log('Телефон', String('+' + value.substring(1)))
                } else if (key == 'categories') {
                    updateProps[key] = [value];
                } else if (key == 'network') {
                    CHARGING_STATION["network"] = value;
                } else if (key == 'paymentMethods') {
                    CHARGING_STATION["paymentMethods"] = value.split(";");
                } else if (key == 'accessType') {
                    CHARGING_STATION["accessType"] = value;
                } else if (key == 'costType') {
                    CHARGING_STATION["costType"] = value;
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
