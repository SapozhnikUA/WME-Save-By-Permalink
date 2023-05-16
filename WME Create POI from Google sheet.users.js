// ==UserScript==
// @name        WME Create POI from Google sheet
// @namespace   WazeUA
// @version     0.0.30
// @description none
// @author      Sapozhnik
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// @require      https://greasyfork.org/scripts/452563-wme/code/WME.js
// @require      https://github.com/SapozhnikUA/WME-Save-By-Permalink/raw/main/WME%20Get%20JSON%20from%20Google%20Table.user.js
// @require      https://greasyfork.org/scripts/38421-wme-utils-navigationpoint/code/WME%20Utils%20-%20NavigationPoint.js
// @connect      google.com
// @connect      script.googleusercontent.com
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

/* global GetJSON */
/* global W */
/* global require */
/* global OpenLayers */
/* global NavigationPoint */

/**
 * @link https://github.com/openlayers/openlayers
 */

(function main() {
    'use strict';
    const HASH = "AKfycbyqCEYHT1-jhQw8MZg1HCtKshro3bVJz7eGnG9rBl2BAZ1LmOxRKj-jOJ6EXJAZSPpMaw";

    function createPoint(data, isResidential = false) {
        let venue = data.venues[0];
        console.log('Data->', venue);

        let { lat, lon } = { lat: venue.lat, lon: venue.lon }

        let WazeFeatureVectorLandmark = require('Waze/Feature/Vector/Landmark')
        let WazeActionAddLandmark = require('Waze/Action/AddLandmark')
        let WazeActionUpdateObject = require('Waze/Action/UpdateObject')
        let WazeActionUpdateFeatureAddress = require('Waze/Action/UpdateFeatureAddress')

        let NewPoint = new WazeFeatureVectorLandmark()

        let address = {};
        let lockRank = 1;
        let pointGeometry = new OpenLayers.Geometry.Point(lon, lat).transform('EPSG:4326', 'EPSG:900913') // !!!!!!!!!!!!!!!!!!!!!!!!!!1

        NewPoint.geometry = pointGeometry;
        NewPoint.attributes.categories.push(venue.categories); // 
        NewPoint.attributes.lockRank = venue.lockRank;
        NewPoint.attributes.residential = isResidential;
        NewPoint.attributes.url = venue.url;
        NewPoint.attributes.phone = venue.phone;
        NewPoint.attributes.description = venue.description;
        NewPoint.attributes.aliases = venue.aliases;
        NewPoint.attributes.services = venue.services;
        // NewPoint.attributes.openingHours = venue.openingHours;


        // Клонируем ТФ
        NewPoint.attributes.entryExitPoints.push(new NavigationPoint(pointGeometry.clone()));
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

        console.log('NewPoint', NewPoint.attributes);

        // Создаем POI
        W.selectionManager.unselectAll()
        let addedLandmark = new WazeActionAddLandmark(NewPoint)
        W.model.actionManager.add(addedLandmark)

        // Добавляем адрес
        W.model.actionManager.add(new WazeActionUpdateFeatureAddress(NewPoint, newAddressAttributes))
        W.model.actionManager.add(new WazeActionUpdateObject(NewPoint, { houseNumber: NewPoint.attributes.houseNumber }))
        W.selectionManager.setSelectedModels([addedLandmark.venue])
        console.log('The point was created.')
    }


    function bootstrap() {
        if (W && W.loginManager && W.loginManager.user && W.map && require) {
            const getJSON = new GetJSON(HASH);
            getJSON.getJsonData().then(data => {
                createPoint(data);
            });
        } else {
            setTimeout(bootstrap, 5000);
        }
    }

    bootstrap();
})();

