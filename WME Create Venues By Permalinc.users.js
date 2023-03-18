// ==UserScript==
// @name        WME Create Venues By Permalinc
// @namespace   WazeUA
// @version     0.0.1
// @description none
// @author      Sapozhnik
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// @require      https://greasyfork.org/scripts/452563-wme/code/WME.js
// @require      https://greasyfork.org/scripts/38421-wme-utils-navigationpoint/code/WME%20Utils%20-%20NavigationPoint.js
// ==/UserScript==

/* global W */
/* global OpenLayers */
/* global NavigationPoint */

//https://www.waze.com/uk/editor?env=row&lat=50.43335&lon=30.43289&s=8644984831447&zoomLevel=18&venues=19923448.199431091.27863278
  /**
   * @link https://github.com/openlayers/openlayers
   */

  (function main() {
    'use strict';

    function createPoint (isResidential = false) {
        let {lat, lon} ={ lat: 50.43335, lon: 30.43289 };

        let WazeFeatureVectorLandmark = require('Waze/Feature/Vector/Landmark')
        let WazeActionAddLandmark = require('Waze/Action/AddLandmark')
        let WazeActionUpdateObject = require('Waze/Action/UpdateObject')
        let WazeActionUpdateFeatureAddress = require('Waze/Action/UpdateFeatureAddress')

        let NewPoint = new WazeFeatureVectorLandmark()

        let address = {};
        let lockRank = 1;
        let pointGeometry = new OpenLayers.Geometry.Point(lon, lat) // !!!!!!!!!!!!!!!!!!!!!!!!!!1

        NewPoint.geometry = pointGeometry
        NewPoint.attributes.categories.push('CHARGING_STATION')
        NewPoint.attributes.lockRank = lockRank
        NewPoint.attributes.residential = isResidential

       console.log (NewPoint);

        // Создание ТФ
        // if (scriptSettings.get('addNavigationPoint')) {
        //   let entryPoint, parentEntryPoint = WME.getSelectedVenue().attributes.entryExitPoints[0]
        //   if (scriptSettings.get('inheritNavigationPoint') && parentEntryPoint !== undefined) {
        //     entryPoint = new NavigationPoint(parentEntryPoint.getPoint())
        //   } else {
        //     entryPoint = new NavigationPoint(pointGeometry.clone())
        //   }
        //   NewPoint.attributes.entryExitPoints.push(entryPoint)
        // }

          NewPoint.attributes.entryExitPoints.push(new NavigationPoint(pointGeometry.clone()));
       // Указываем адрес
          NewPoint.attributes.name = "вул. Михайла Донця"
          NewPoint.attributes.houseNumber = '5'

        let newAddressAttributes = {
          streetName: "вул. Михайла Донця",
          emptyStreet: false,
          cityName: "Київ",
          emptyCity: false,
          stateID: null,
//          countryID: '',
        }

newAddressAttributes = {};

        W.selectionManager.unselectAll()
        let addedLandmark = new WazeActionAddLandmark(NewPoint)
        W.model.actionManager.add(addedLandmark)
  //      W.model.actionManager.add(new WazeActionUpdateFeatureAddress(NewPoint, newAddressAttributes))
//        if (!!address.attributes.houseNumber) {
//          W.model.actionManager.add(new WazeActionUpdateObject(NewPoint, { houseNumber: address.attributes.houseNumber }))
        //}
        W.selectionManager.setSelectedModels([addedLandmark.venue])
        console.log('The point was created.')
      }


    function bootstrap() {
        if (W && W.loginManager && W.loginManager.user && W.map && require) {
//            UpdateObject = require('Waze/Action/UpdateObject');
//            DeleteObj = require('Waze/Action/DeleteObject');
            createPoint();
        } else {
            setTimeout(bootstrap, 200);
        }
    }

    bootstrap();
})();

