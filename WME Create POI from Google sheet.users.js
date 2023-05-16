// ==UserScript==
// @name        WME Create POI from Google sheet
// @namespace   WazeUA
// @version     0.0.8
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

//https://www.waze.com/uk/editor?env=row&lat=50.43335&lon=30.43289&s=8644984831447&zoomLevel=18&venues=19923448.199431091.27863278
/**
 * @link https://github.com/openlayers/openlayers
 */

(function main() {
    'use strict';
    const HASH = "AKfycbyqCEYHT1-jhQw8MZg1HCtKshro3bVJz7eGnG9rBl2BAZ1LmOxRKj-jOJ6EXJAZSPpMaw";

    function createPoint(data, isResidential = false) {
        let venue = new data.venues[0];
        console.log('Data->', venue.lat);

        let { lat, lon } = { lat: 50.43590, lon: 30.43231 }

        let WazeFeatureVectorLandmark = require('Waze/Feature/Vector/Landmark')
        let WazeActionAddLandmark = require('Waze/Action/AddLandmark')
        let WazeActionUpdateObject = require('Waze/Action/UpdateObject')
        let WazeActionUpdateFeatureAddress = require('Waze/Action/UpdateFeatureAddress')

        let NewPoint = new WazeFeatureVectorLandmark()

        let address = {};
        let lockRank = 1;
        let pointGeometry = new OpenLayers.Geometry.Point(lon, lat).transform('EPSG:4326', 'EPSG:900913') // !!!!!!!!!!!!!!!!!!!!!!!!!!1

        NewPoint.geometry = pointGeometry
        //        NewPoint.attributes.categories.push('OTHER') // CHARGING_STATION
        NewPoint.attributes.categories.push('CHARGING_STATION') // CHARGING_STATION
        NewPoint.attributes.lockRank = lockRank
        NewPoint.attributes.residential = isResidential

        NewPoint.attributes.phone = '+380503832131';

        // Атрибуты charger station
        const CHARGING_STATION = {};
        const paymentMethods = ["APP"] ?? [];
        CHARGING_STATION["paymentMethods"] = ["APP", "MEMBERSHIP_CARD"] ?? [];
        CHARGING_STATION["network"] = "GO-TO U";
        CHARGING_STATION["costType"] = "FEE";
        CHARGING_STATION["chargingPorts"] = [
            {
                "count": 1,
                "portId": "1",
                "connectorTypes": [
                    "TYPE1"
                ],
                "maxChargeSpeedKw": 22
            },
            {
                "count": 1,
                "portId": "2",
                "connectorTypes": [
                    "TYPE1"
                ],
                "maxChargeSpeedKw": 22
            }
        ];


        if (Object.keys(CHARGING_STATION).length) {
            NewPoint.attributes["categoryAttributes"] = {};
            NewPoint.attributes.categoryAttributes["CHARGING_STATION"] = CHARGING_STATION;
        }

        // Клонируем ТФ
        NewPoint.attributes.entryExitPoints.push(new NavigationPoint(pointGeometry.clone()));
        // Указываем адрес
        NewPoint.attributes.name = "Название POI"
        NewPoint.attributes.houseNumber = 555;

        let newAddressAttributes = {
            "streetName": "вул. Михайла Донця",
            "emptyStreet": false,
            "cityName": "Київ",
            "emptyCity": false,
            "stateID": 1,
            "countryID": 232,
        }

        //newAddressAttributes = {};
        console.log('NewPoint', NewPoint);

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

