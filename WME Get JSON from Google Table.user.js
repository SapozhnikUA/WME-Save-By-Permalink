// ==UserScript==
// @name        WME Get JSON from Google Table
// @namespace   WazeUA
// @version     0.1.6
// @description none
// @author      Sapozhnik
// @updateURL    https://github.com/SapozhnikUA/WME-Save-By-Permalink/raw/main/WME%20Get%20JSON%20from%20Google%20Table.user.js
// @downloadURL  https://github.com/SapozhnikUA/WME-Save-By-Permalink/raw/main/WME%20Get%20JSON%20from%20Google%20Table.user.js
// @connect      google.com
// @connect      script.googleusercontent.com
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

class GetJSON {
    // const rulesHash = "AKfycbwFQGbvmnCnnmkAOuNpB_0sqLZSmoZVXsMuJ7Geza1iVGhnUzXMb8LKG9HUE543irw"; // EV
    rulesHash = "AKfycbyqCEYHT1-jhQw8MZg1HCtKshro3bVJz7eGnG9rBl2BAZ1LmOxRKj-jOJ6EXJAZSPpMaw"; // POI
    requestsTimeout = 5000; // in ms


    sendHTTPRequest(url, callback) {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                url: url,
                method: 'GET',
                timeout: this.requestsTimeout,
                onload: function (res) {
//                    callback(res);
                    resolve(res);
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

    validateHTTPResponse(res) {
        let result = false,
            displayError = true;
        if (res) {
            switch (res.status) {
                case 200:
                    displayError = false;
                    if (res.responseHeaders.match(/content-type: application\/json/i)) {
                        result = true;
                    } else if (res.responseHeaders.match(/content-type: text\/html/i)) {
                        console.log(res);
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


    async getJsonData() {
        const requestCallback = (res) => {
            if (this.validateHTTPResponse(res)) {
                const out = JSON.parse(res.responseText);
                if (out.dataStatus == "success") {
                    console.log('Данные получены', out);
                    return out;
                } else {
                    alert("Get G_JSON: Error getting JSON!");
                }
            }
            return null;
        }

        const url = 'https://script.google.com/macros/s/' + this.rulesHash + '/exec?func=doGet';
        const res = await this.sendHTTPRequest(url);
        return requestCallback(res);
        //        console.log('out', out.venues)
        return out.venues;
    }

    // let out = {};
    // (async () => {
    //     out = await getJsonData();
    //     console.log("Данные:", out);
    // })();


}