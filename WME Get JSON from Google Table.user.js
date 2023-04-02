// ==UserScript==
// @name        WME Get JSON from Google Table
// @namespace   WazeUA
// @version     0.0.6
// @description none
// @author      Sapozhnik
// @match       https://dontsa2a.kiev.ua/home/ping_data_1.txt
// @match       https://dontsa2a.kiev.ua/home/ping_data_1.txt
// @updateURL    https://github.com/SapozhnikUA/WME-Save-By-Permalink/raw/main/WME%20Get%20JSON%20from%20Google%20Table.user.js
// @downloadURL  https://github.com/SapozhnikUA/WME-Save-By-Permalink/raw/main/WME%20Get%20JSON%20from%20Google%20Table.user.js
// @connect      google.com
// @connect      script.googleusercontent.com
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==


(function () {
    'use strict'
    const rulesHash = "p4dEw0RCUl_9x8Pcm5pOytnkn78exjlvg8bKf0ckmSD41nybCmwUhU_oF5VFqfaC1lLw_VpFxlVYjdUje-QNDj3yNL6WTWmum5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDNORikYzTOncDSwsB5Qu43ypHyo693UgcPSbNu1NMDCu_73ssZICzFPAspno8H8k4m_AiawERTV232bxloZqwqlfq1fcoUN_A&lib=MTLNopqrFE4CF4f71xdpTPGEPB9YMDy0k";
    const requestsTimeout = 20000; // in ms


function sendHTTPRequest(url, callback) {
        GM_xmlhttpRequest({
            url: url,
            method: 'GET',
            timeout: requestsTimeout,
            onload: function (res) {
                callback(res);
            },
            onreadystatechange: function (res) {
                // fill if needed
            },
            ontimeout: function (res) {
                alert("LevelReset: Sorry, request timeout!");
            },
            onerror: function (res) {
                alert("LevelReset: Sorry, request error!");
            }
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
                    alert("LevelReset Error: unsupported status code - " + res.status);
                    console.log("LevelReset: " + res.responseHeaders);
                    console.log("LevelReset: " + res.responseText);
                    break;
            }
        } else {
            displayError = false;
            alert("LevelReset error: Response is empty!");
        }

        if (displayError) {
            alert("LevelReset: Error processing request. Response: " + res.responseText);
        }
        return result;
    }

    function getAllLockRules() {
        function requestCallback(res) {
            if (validateHTTPResponse(res)) {
                let out = JSON.parse(res.responseText);
                return out;
            }
            return null;
        }

        const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=' + rulesHash;
        sendHTTPRequest(url, requestCallback);
    }

    const data = getAllLockRules();

    console.log(data);

})()