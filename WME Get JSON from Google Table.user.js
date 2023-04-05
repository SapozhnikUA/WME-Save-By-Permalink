// ==UserScript==
// @name        WME Get JSON from Google Table
// @namespace   WazeUA
// @version     0.0.45
// @description none
// @author      Sapozhnik
// @match       https://dontsa2a.kiev.ua/home/ping.txt
// @updateURL    https://github.com/SapozhnikUA/WME-Save-By-Permalink/raw/main/WME%20Get%20JSON%20from%20Google%20Table.user.js
// @downloadURL  https://github.com/SapozhnikUA/WME-Save-By-Permalink/raw/main/WME%20Get%20JSON%20from%20Google%20Table.user.js
// @connect      google.com
// @connect      script.googleusercontent.com
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==


(function () {
    'use strict'
    const rulesHash = "AKfycbwFQGbvmnCnnmkAOuNpB_0sqLZSmoZVXsMuJ7Geza1iVGhnUzXMb8LKG9HUE543irw";
    const requestsTimeout = 5000; // in ms


    async function sendHTTPRequest(url, callback) {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                url: url,
                method: 'GET',
                timeout: requestsTimeout,
                onload: function (res) {
                    callback(res);
                    resolve();
                },
                onreadystatechange: function (res) {
                    // fill if needed
                },
                ontimeout: function (res) {
                    alert("Get G_JSON: Sorry, request timeout!");
                },
                onerror: function (res) {
                    alert("Get G_JSON: Sorry, request error!");
                }
            });
        });
    }

    function validateHTTPResponse(res) {
        let result = false,
            displayError = true;
        if (res) {
            switch (res.status) {
                case 200:
                    displayError = false;
                    if (res.responseHeaders.match(/content-type: application\/json/i)) {
                        result = true;
                    } else if (res.responseHeaders.match(/content-type: text\/html/i)) {
                        displayHtmlPage(res);
                    }
                    break;
                default:
                    displayError = false;
                    alert("Get G_JSON Error: unsupported status code - " + res.status);
                    console.log("Get G_JSON: " + res.responseHeaders);
                    console.log("Get G_JSON: " + res.responseText);
                    break;
            }
        } else {
            displayError = false;
            alert("Get G_JSON error: Response is empty!");
        }

        if (displayError) {
            alert("Get G_JSON: Error processing request. Response: " + res.responseText);
        }
        return result;
    }


    async function getJsonData() {
        function requestCallback(res) {
            if (validateHTTPResponse(res)) {
                out = JSON.parse(res.responseText);
                if (out.dataStatus == "success") {
                    console.log('Данные получены', out);
                } else {
                    alert("Get G_JSON: Error getting JSON!");
                }
            }
        }

        const url = 'https://script.google.com/macros/s/' + rulesHash + '/exec?func=doGet';
        await sendHTTPRequest(url, requestCallback);
//        console.log('out', out.venues)
        return out.venues;
    }

    let out;
    (async () => {
        out = await getJsonData();
        console.log("Данные:", out);
    })();

})()