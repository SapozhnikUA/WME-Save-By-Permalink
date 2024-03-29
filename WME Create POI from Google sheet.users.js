// ==UserScript==
// @name        WME Create POI from Google sheet
// @namespace   WazeUA
// @version     0.2.06
// @description none
// @author      Sapozhnik
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// @require      https://github.com/SapozhnikUA/WME-Save-By-Permalink/raw/main/WME%20Get%20JSON%20from%20Google%20Table.user.js
// @require      https://update.greasyfork.org/scripts/480123/1281900/WME-EntryPoint.js
// @connect      google.com
// @connect      script.googleusercontent.com
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

/* global GetJSON */
/* global W, W.model */
/* global WME, WMEBase, WMEUI, WMEUIHelper */
/* global require */
/* global OpenLayers */
/* global NavigationPoint */
/* global Container, Settings, SimpleCache, Tools  */



(function main() {
    'use strict';
    const NAME = "WME Create POI ";
    const HASH = "AKfycbyqCEYHT1-jhQw8MZg1HCtKshro3bVJz7eGnG9rBl2BAZ1LmOxRKj-jOJ6EXJAZSPpMaw";
    let UpdateObject;

    function createPoint(venue, isResidential = false) {
        console.group(NAME + 'Add POI:');
        //        console.log('Venue:', venue);
        //        console.log(JSON.stringify(venue));
        if (venue.categories == "RPP") {
            isResidential = true;
        }

        let { lat, lon } = { lat: Number(venue.lat), lon: Number(venue.lon) }
        if (isResidential) {
            lat += 0.00000;
            lon += 0.00002;
        } else {
            lat += 0.00001;
            lon += 0.00004;
        }

        let WazeFeatureVectorLandmark = require('Waze/Feature/Vector/Landmark')
        let WazeActionAddLandmark = require('Waze/Action/AddLandmark')
        let WazeActionUpdateObject = require('Waze/Action/UpdateObject')
        let WazeActionUpdateFeatureAddress = require('Waze/Action/UpdateFeatureAddress')
        const OpeningHour = require('Waze/Model/Objects/OpeningHour');

        let address = {};
        let lockRank = 1;
        let pointGeometry = new OpenLayers.Geometry.Point(lon, lat).transform('EPSG:4326', 'EPSG:900913') // !!!!!!!!!!!!!!!!!!!!!!!!!!1
        let NewPoint = new WazeFeatureVectorLandmark({
            geoJSONGeometry: W.userscripts.toGeoJSONGeometry(pointGeometry)
        })

        NewPoint.geometry = pointGeometry;
        NewPoint.attributes.categories.push(venue.categories); //
        NewPoint.attributes.lockRank = venue.lockRank;
        NewPoint.attributes.residential = isResidential;
        if (isResidential) {
            //                        NewPoint.attributes.url = venue.url;
            //                        NewPoint.attributes.phone = venue.phone;
            //                        NewPoint.attributes.description = venue.description;
            //                        NewPoint.attributes.aliases = venue.aliases;
            //                        NewPoint.attributes.services = venue.services;
            //                        NewPoint.attributes.openingHours = venue.openingHours.map(item => new OpeningHour(item))
        }
        // Клонируем ТФ
        NewPoint.attributes.entryExitPoints.push(new entryPoint({ primary: true, point: W.userscripts.toGeoJSONGeometry(pointGeometry.clone()) }));
        console.log('Распаковка:', venue.streetName, venue.houseNumber, venue.categories, venue.cityName);


        // Указываем адрес
        NewPoint.attributes.name = venue.name;
        NewPoint.attributes.houseNumber = venue.houseNumber;

        let newAddressAttributes = {
            "streetName": venue.streetName,
            "emptyStreet": false,
            "cityName": venue.cityName,
            "emptyCity": false,
            "stateID": 1,
            "countryID": 232,
        }

        //        console.log('NewPoint', NewPoint.attributes);

        // Создаем POI
        W.selectionManager.unselectAll()
        let addedLandmark = new WazeActionAddLandmark(NewPoint)
        W.model.actionManager.add(addedLandmark)

        // Добавляем адрес
        W.model.actionManager.add(new WazeActionUpdateFeatureAddress(NewPoint, newAddressAttributes))
        W.model.actionManager.add(new WazeActionUpdateObject(NewPoint, { houseNumber: NewPoint.attributes.houseNumber }))
        W.selectionManager.setSelectedModels([addedLandmark.venue])

        // W.model.actionManager.add(new WazeActionUpdateObject(NewPoint, { openingHours: venue.openingHours.map(item => new OpeningHour(item)) }))


        // document.querySelector('.opening-hours-add').click()
        // document.querySelector('input[name="fromTime"]').value = "15:00"
        // document.querySelector('input[name="toTime"]').value = "23:00"
        // document.querySelector('input[id="day-checkbox-1"]').click()
        // document.querySelector('input[id="day-checkbox-2"]').click()
        // document.querySelector('.add-opening-hour .waze-btn-blue').click()
        console.log('The point was created.')
        console.groupEnd();
    }


    async function bootstrap() {
        const getJSON = new GetJSON(HASH);
        if (W && W.loginManager && W.loginManager.user && W.map && require) {
            UpdateObject = require('Waze/Action/UpdateObject');
            getJSON.getJsonData().then(async data => {
                if (data.dataStatus == 'success') {
                    //                    console.log('Status', data.dataStatus)
                    let counterVenues = data.venues.length;
                    console.log(NAME + "Всього отримано для обробки:", counterVenues);
                    for (let venue of data.venues) {
                        console.log(NAME + "Залишилось обробити", counterVenues--);
                        await moveMap(venue.lon, venue.lat);
                        if (venue.categories === "ALL") {
                            venue.categories = "RPP";
                            if (await checkAddress(venue.streetName, venue.houseNumber, venue.name, venue.cityName, venue.categories) === true) {
                                await createPoint(venue);
                            }
                            venue.categories = "OTHER";
                            if (await checkAddress(venue.streetName, venue.houseNumber, venue.name, venue.cityName, venue.categories) === true) {
                                venue.name = venue.houseNumber;
                                await createPoint(venue);
                            }
                        }
                        else {
                            if (await checkAddress(venue.streetName, venue.houseNumber, venue.name, venue.cityName, venue.categories) === true) {
                                await createPoint(venue);
                            }
                        }
                    }
                    console.log(NAME + "Усі адреси додано");
                }
            });
        } else {
            setTimeout(bootstrap, 3000);
        }
    }

    function moveMap(lon, lat) {
        //console.log('Сдвигаем...', lon, lat);
        return new Promise((resolve) => {
            W.map.setCenter(
                OpenLayers.Layer.SphericalMercator.forwardMercator(
                    parseFloat(lon),
                    parseFloat(lat),
                ),
            );
            setTimeout(() => resolve(), 1000) // Задержка перемещений
        });
    }

    async function checkAddress(streetName = "вул. Миру", houseNumber = "16А", name = "test", cityName = "Сотниківка", categories = "RPP") {
        houseNumber = houseNumber.toString();

        console.group(NAME + 'Адреси:');
        let residential;
        if (categories == "RPP") {
            residential = true;
        } else {
            residential = false;
        }

        let cities = W.model.cities.getObjectArray();
        let address = W.model.streets.getObjectArray();
        let hNumbers = W.model.venues.getObjectArray();

        //        await waitLoadingData();

        // Шукаємо місто
        let cityId, streetId, houseId;
        for (cityId of cities) {
            if (cityId.attributes.name === cityName) {
                break;
            }
        }
        //                console.log ("cityId", cityId.attributes.id, cityId.attributes.name);

        for (streetId of address) {
            if (streetId.attributes.name === streetName && cityId.attributes.id === streetId.attributes.cityID) {
                //            console.log ("Перевірка вулиці", streetId.attributes.name, streetName, cityId.attributes.id, streetId.attributes.cityID);
                for (houseId of hNumbers) {
                    //             console.log ("Перевірка номеру будинка:", JSON.stringify(houseId.attributes.id), JSON.stringify(houseId.attributes.houseNumber),houseNumber.toString(),houseId.attributes.streetID,streetId.attributes.id,houseId.attributes.residential,residential);
                    if (houseId.attributes.houseNumber === houseNumber && houseId.attributes.streetID === streetId.attributes.id && houseId.attributes.residential === residential) {
                        console.log("Спіймали дубль:", streetName, houseNumber, cityName, categories);
                        console.groupEnd();
                        return false;
                    }
                }
            }
        }
        console.log("Не знайдено  базі:", streetName, houseNumber, cityName, categories);
        console.groupEnd();

        return true;
    }

    function waitLoadingData() {
        return new Promise((resolve) => {
            const cities = W.model.cities.getObjectArray();
            const address = W.model.streets.getObjectArray();
            const hNumbers = W.model.venues.getObjectArray();

            if (cities.length == 0 || address.length == 0 || hNumbers.length == 0) {
                console.log("считываем данные", cities, address, hNumbers);
                setTimeout(() => resolve(waitLoadingData()), 2000);
            } else {

                resolve(cities, address, hNumbers);
            }
        });
    }

    console.clear();
    bootstrap();

})();

