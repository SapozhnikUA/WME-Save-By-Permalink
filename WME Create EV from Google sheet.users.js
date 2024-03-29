// ==UserScript==
// @name        WME Create EV from Google sheet
// @namespace   WazeUA
// @version     0.0.9
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


/**
 * @link https://github.com/openlayers/openlayers
 */

(function main() {
    'use strict';
    const HASH = "AKfycbyM6KBAaOr_Hq1NNwAfXUcBWSKVVxioGzrfvIPyBnFc6yVPX-LkIKv6GgXVVetCOsz9";

    function createPoint(venue, isResidential = false) {
        console.log('Data->', venue);

        let { lat, lon } = { lat: venue.lat, lon: venue.lon }

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
        NewPoint.attributes.url = venue.url;
        NewPoint.attributes.phone = venue.phone;
        NewPoint.attributes.description = venue.description;
        NewPoint.attributes.aliases = venue.aliases;
        NewPoint.attributes.services = venue.services;
        NewPoint.attributes.openingHours = venue.openingHours.map(item => new OpeningHour(item))


        // Клонируем ТФ
        NewPoint.attributes.entryExitPoints.push(new entryPoint({ primary: true, point: W.userscripts.toGeoJSONGeometry(pointGeometry.clone()) }));


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


        // Атрибуты charger station
        const CHARGING_STATION = {};
        const paymentMethods = ["APP"] ?? [];
        CHARGING_STATION["paymentMethods"] = venue.categoryAttributes.CHARGING_STATION.paymentMethods ?? []; 
        CHARGING_STATION["network"] = venue.categoryAttributes.CHARGING_STATION.network ?? "";
        CHARGING_STATION["costType"] = venue.categoryAttributes.CHARGING_STATION.costType ?? "FEE";
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
                "count": 3,
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
                //                Перебираєм все записи;
                for (let venue of data.venues) {
                    createPoint(venue);
                }
            });
        } else {
            setTimeout(bootstrap, 2500);
        }
    }

    bootstrap();
})();

