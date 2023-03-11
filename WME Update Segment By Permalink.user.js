// ==UserScript==
// @name        WME Update Segment By Permalink
// @namespace   WazeUA
// @version     0.0.3
// @description none
// @author      ixxvivxxi
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// ==/UserScript==

// Флаги flags_unset либо flags_set =  unpaved,headlights
// https://waze.com/uk/editor?env=row&lat=46.59851&lon=33.07064&s=8379753821591&zoomLevel=18&segments=427057335#fwdMaxSpeed=50&lockRank=2&revMaxSpeed=30&flags_set=unpaved,headlights
// #lockRank=2 (левел +1)

// Переход по кординатам
// W.map.setCenter(OpenLayers.Layer.SphericalMercator.forwardMercator(parseFloat(33.07064), parseFloat(46.59851)))

(function main() {
  'use strict';
  let UpdateObject;
  let URL_LIST = [
    'https://waze.com/uk/editor?env=row&lat=46.829602947&lon=32.74704568&s=3402715231638&zoomLevel=17&segments=381032854#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.846613357&lon=32.75742926&s=3402715231638&zoomLevel=17&segments=206075007#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.844306247&lon=32.75657349&s=3402715231638&zoomLevel=17&segments=206075435#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.843228497&lon=32.75599945&s=3402715231638&zoomLevel=17&segments=206075439#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.838775797&lon=32.75296167&s=3402715231638&zoomLevel=17&segments=206075448#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.837476037&lon=32.75207497&s=3402715231638&zoomLevel=17&segments=206075449#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.841605027&lon=32.75489184&s=3402715231638&zoomLevel=17&segments=206075442#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.840167937&lon=32.75391140&s=3402715231638&zoomLevel=17&segments=206075445#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.835668327&lon=32.75084429&s=3402715231638&zoomLevel=17&segments=206075789#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.256802467&lon=32.29593133&s=3402715231638&zoomLevel=17&segments=205347452#lockRank=2',

    'https://waze.com/uk/editor?env=row&lat=46.835786137&lon=31.12684401&s=3402715231638&zoomLevel=17&segments=367243892#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=46.835737717&lon=31.12772756&s=3402715231638&zoomLevel=17&segments=398331460#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=47.009908567&lon=31.89004975&s=3402715231638&zoomLevel=17&segments=357131428#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=47.008318007&lon=31.89393100&s=3402715231638&zoomLevel=17&segments=324967903#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=47.068785387&lon=31.90580606&s=3402715231638&zoomLevel=17&segments=370490635#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.001137517&lon=24.34601155&s=3402715231638&zoomLevel=17&segments=407479911#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.505171727&lon=24.81199821&s=3402715231638&zoomLevel=17&segments=417169240#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.039225627&lon=32.95491231&s=3402715231638&zoomLevel=17&segments=379151719#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.250349597&lon=32.94135703&s=3402715231638&zoomLevel=17&segments=287988560#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.009465377&lon=33.05100512&s=3402715231638&zoomLevel=17&segments=343056690#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.009723567&lon=33.05269567&s=3402715231638&zoomLevel=17&segments=343056689#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.009698277&lon=33.05402445&s=3402715231638&zoomLevel=17&segments=343056678#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.009816847&lon=33.05324303&s=3402715231638&zoomLevel=17&segments=343056683#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.009223877&lon=33.04960595&s=3402715231638&zoomLevel=17&segments=340609567#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.250590927&lon=33.10414495&s=3402715231638&zoomLevel=17&segments=321089431#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.017023557&lon=33.36646405&s=3402715231638&zoomLevel=17&segments=363310142#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.121975047&lon=33.29198778&s=3402715231638&zoomLevel=17&segments=357764469#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.651083007&lon=33.31730246&s=3402715231638&zoomLevel=17&segments=382502708#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.140381257&lon=33.42948465&s=3402715231638&zoomLevel=17&segments=338314389#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.780104217&lon=33.41463538&s=3402715231638&zoomLevel=17&segments=340547380#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.793238327&lon=33.43158019&s=3402715231638&zoomLevel=17&segments=340547413#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.791244487&lon=33.43907356&s=3402715231638&zoomLevel=17&segments=340547414#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.787840157&lon=33.42910784&s=3402715231638&zoomLevel=17&segments=340547415#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.793072107&lon=33.43642426&s=3402715231638&zoomLevel=17&segments=340547263#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.786886237&lon=34.09879506&s=3402715231638&zoomLevel=17&segments=404036397#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.789878567&lon=34.10011470&s=3402715231638&zoomLevel=17&segments=404036393#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.586745947&lon=34.50162190&s=3402715231638&zoomLevel=17&segments=418314255#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.570974417&lon=34.46849833&s=3402715231638&zoomLevel=17&segments=386006451#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.589817997&lon=34.65681648&s=3402715231638&zoomLevel=17&segments=354905476#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.590572797&lon=34.65936053&s=3402715231638&zoomLevel=17&segments=354790029#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.588686567&lon=34.65675700&s=3402715231638&zoomLevel=17&segments=354790031#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.589969117&lon=34.65159653&s=3402715231638&zoomLevel=17&segments=354790030#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=47.928035747&lon=35.19516097&s=3402715231638&zoomLevel=17&segments=407681264#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=47.926712467&lon=35.19781116&s=3402715231638&zoomLevel=17&segments=410297769#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=47.928080007&lon=35.19387300&s=3402715231638&zoomLevel=17&segments=407681262#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.055579677&lon=26.69284403&s=3402715231638&zoomLevel=17&segments=344201465#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.054163857&lon=26.69898694&s=3402715231638&zoomLevel=17&segments=344202048#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.411272757&lon=26.73566394&s=3402715231638&zoomLevel=17&segments=376677974#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.407539257&lon=26.73998318&s=3402715231638&zoomLevel=17&segments=390426002#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.837088047&lon=26.83687741&s=3402715231638&zoomLevel=17&segments=425924976#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.385390027&lon=26.83174070&s=3402715231638&zoomLevel=17&segments=341095706#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.385213297&lon=26.83711503&s=3402715231638&zoomLevel=17&segments=341095707#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.119123527&lon=26.86853406&s=3402715231638&zoomLevel=17&segments=398851836#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.441429037&lon=26.95556044&s=3402715231638&zoomLevel=17&segments=378388478#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.462234197&lon=26.95050545&s=3402715231638&zoomLevel=17&segments=391629998#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.208662837&lon=27.09428887&s=3402715231638&zoomLevel=17&segments=391726446#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.020161227&lon=27.14271425&s=3402715231638&zoomLevel=17&segments=399680133#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.218945637&lon=27.10276499&s=3402715231638&zoomLevel=17&segments=391726466#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.589484427&lon=26.12666933&s=3402715231638&zoomLevel=17&segments=408031988#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.636098747&lon=26.29622849&s=3402715231638&zoomLevel=17&segments=420297511#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.752791017&lon=26.55688816&s=3402715231638&zoomLevel=17&segments=406261516#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.766183487&lon=26.56373677&s=3402715231638&zoomLevel=17&segments=405659621#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.766049037&lon=26.56399426&s=3402715231638&zoomLevel=17&segments=405659775#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.744574147&lon=26.56499472&s=3402715231638&zoomLevel=17&segments=406261591#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.724015357&lon=26.65333110&s=3402715231638&zoomLevel=17&segments=404963932#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.128914237&lon=28.44020230&s=3402715231638&zoomLevel=17&segments=414691693#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.217626787&lon=28.53611160&s=3402715231638&zoomLevel=17&segments=339746371#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.215242567&lon=25.81244561&s=3402715231638&zoomLevel=17&segments=358457755#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=47.966968217&lon=37.93490475&s=3402715231638&zoomLevel=17&segments=309969524#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.588572077&lon=37.96385028&s=3402715231638&zoomLevel=17&segments=358164135#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.023834357&lon=38.19629404&s=3402715231638&zoomLevel=17&segments=354702798#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.042440007&lon=30.09245541&s=3402715231638&zoomLevel=17&segments=334339470#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.745405497&lon=30.28269977&s=3402715231638&zoomLevel=17&segments=360963992#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.047936487&lon=30.35617987&s=3402715231638&zoomLevel=17&segments=334670342#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.997777847&lon=30.41436333&s=3402715231638&zoomLevel=17&segments=407357007#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.990879017&lon=30.43196075&s=3402715231638&zoomLevel=17&segments=407515170#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.997059127&lon=30.41816447&s=3402715231638&zoomLevel=17&segments=407493320#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.996949257&lon=30.41837173&s=3402715231638&zoomLevel=17&segments=407493322#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.993337047&lon=30.41841541&s=3402715231638&zoomLevel=17&segments=407274112#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.018630427&lon=30.49231627&s=3402715231638&zoomLevel=17&segments=343517304#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.015769567&lon=30.49525912&s=3402715231638&zoomLevel=17&segments=343517359#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.244716107&lon=30.49203016&s=3402715231638&zoomLevel=17&segments=342927974#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.291434127&lon=30.51698607&s=3402715231638&zoomLevel=17&segments=361738057#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.297635807&lon=30.54184114&s=3402715231638&zoomLevel=17&segments=361738056#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.999242577&lon=30.58367462&s=3402715231638&zoomLevel=17&segments=343568565#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.054049477&lon=30.58664355&s=3402715231638&zoomLevel=17&segments=343517017#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.063580087&lon=30.57314815&s=3402715231638&zoomLevel=17&segments=343512795#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.054640087&lon=30.58818314&s=3402715231638&zoomLevel=17&segments=343517018#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.025461587&lon=31.38782869&s=3402715231638&zoomLevel=17&segments=391853481#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.024905807&lon=31.38466368&s=3402715231638&zoomLevel=17&segments=391853480#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.024232677&lon=31.38538503&s=3402715231638&zoomLevel=17&segments=391853472#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.025656507&lon=31.38887618&s=3402715231638&zoomLevel=17&segments=391853479#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.957998697&lon=31.48303597&s=3402715231638&zoomLevel=17&segments=345345002#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.242274857&lon=31.52971802&s=3402715231638&zoomLevel=17&segments=208964083#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.894742147&lon=31.69900668&s=3402715231638&zoomLevel=17&segments=345819104#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.424249257&lon=32.02236528&s=3402715231638&zoomLevel=17&segments=408192173#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.424666287&lon=32.02326974&s=3402715231638&zoomLevel=17&segments=400198253#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.426494427&lon=32.02650858&s=3402715231638&zoomLevel=17&segments=400197891#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.463334797&lon=31.94271804&s=3402715231638&zoomLevel=17&segments=378504169#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.474856157&lon=31.95710443&s=3402715231638&zoomLevel=17&segments=378504039#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.466036707&lon=31.94526604&s=3402715231638&zoomLevel=17&segments=378504038#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.426827317&lon=32.03136359&s=3402715231638&zoomLevel=17&segments=339330909#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.425654327&lon=32.02830446&s=3402715231638&zoomLevel=17&segments=400198123#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=49.134981027&lon=32.72296159&s=3402715231638&zoomLevel=17&segments=353549196#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.942243497&lon=30.84323668&s=3402715231638&zoomLevel=17&segments=340789492#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.939769167&lon=30.84367657&s=3402715231638&zoomLevel=17&segments=340789519#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.070251147&lon=30.85762266&s=3402715231638&zoomLevel=17&segments=380741299#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.069199437&lon=30.85973088&s=3402715231638&zoomLevel=17&segments=380741298#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.067281357&lon=30.85892085&s=3402715231638&zoomLevel=17&segments=380741295#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.065366567&lon=30.85532937&s=3402715231638&zoomLevel=17&segments=340620952#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.065366567&lon=30.85532937&s=3402715231638&zoomLevel=17&segments=380741194#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.074595147&lon=30.86614128&s=3402715231638&zoomLevel=17&segments=380789142#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.072931697&lon=30.86182015&s=3402715231638&zoomLevel=17&segments=380789140#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.058965807&lon=30.85091036&s=3402715231638&zoomLevel=17&segments=338698648#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.837792907&lon=31.04532080&s=3402715231638&zoomLevel=17&segments=339528800#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.837792907&lon=31.04532080&s=3402715231638&zoomLevel=17&segments=341297811#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.835516297&lon=31.04195731&s=3402715231638&zoomLevel=17&segments=379859574#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.835899127&lon=31.04116606&s=3402715231638&zoomLevel=17&segments=379859575#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.837328177&lon=31.04040605&s=3402715231638&zoomLevel=17&segments=340866016#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.839232667&lon=31.04748802&s=3402715231638&zoomLevel=17&segments=339528700#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.928457267&lon=31.08771188&s=3402715231638&zoomLevel=17&segments=309357014#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.305679457&lon=31.04483193&s=3402715231638&zoomLevel=17&segments=340775371#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.391582397&lon=31.11063220&s=3402715231638&zoomLevel=17&segments=340846642#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.534625267&lon=31.09005273&s=3402715231638&zoomLevel=17&segments=338585823#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.526136177&lon=31.02852961&s=3402715231638&zoomLevel=17&segments=338585051#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.361396647&lon=31.11444599&s=3402715231638&zoomLevel=17&segments=338661021#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.363936037&lon=31.11836333&s=3402715231638&zoomLevel=17&segments=338659480#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.361396647&lon=31.11444599&s=3402715231638&zoomLevel=17&segments=338659479#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.386780037&lon=31.12192491&s=3402715231638&zoomLevel=17&segments=340775051#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.618588037&lon=31.29823643&s=3402715231638&zoomLevel=17&segments=327375928#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.697341637&lon=31.25601992&s=3402715231638&zoomLevel=17&segments=406924779#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.546969337&lon=31.21681413&s=3402715231638&zoomLevel=17&segments=333805091#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.461529827&lon=31.32087665&s=3402715231638&zoomLevel=17&segments=385582623#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.758940117&lon=31.38485676&s=3402715231638&zoomLevel=17&segments=303056202#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.854656207&lon=31.47144340&s=3402715231638&zoomLevel=17&segments=349610505#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.823665067&lon=31.70795319&s=3402715231638&zoomLevel=17&segments=405995135#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.963394267&lon=31.77238275&s=3402715231638&zoomLevel=17&segments=339657362#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=50.979592217&lon=31.86112305&s=3402715231638&zoomLevel=17&segments=339453441#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.052559917&lon=31.86524147&s=3402715231638&zoomLevel=17&segments=384364700#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.052255837&lon=31.86385908&s=3402715231638&zoomLevel=17&segments=384364701#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=52.012729757&lon=32.19296439&s=3402715231638&zoomLevel=17&segments=356667027#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=52.007148747&lon=32.19838622&s=3402715231638&zoomLevel=17&segments=356667028#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=52.018784187&lon=32.26331794&s=3402715231638&zoomLevel=17&segments=356666943#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.165608577&lon=32.93370009&s=3402715231638&zoomLevel=17&segments=362419952#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=51.636717887&lon=33.01122298&s=3402715231638&zoomLevel=17&segments=361843200#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.385519237&lon=30.41395364&s=3402715231638&zoomLevel=17&segments=263969462#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.667203737&lon=32.17712192&s=3402715231638&zoomLevel=17&segments=398617293#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.580003867&lon=32.95309130&s=3402715231638&zoomLevel=17&segments=348998161#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.654733497&lon=22.43450852&s=3402715231638&zoomLevel=17&segments=347299616#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.648379347&lon=22.44437518&s=3402715231638&zoomLevel=17&segments=325929345#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.647834907&lon=22.42400893&s=3402715231638&zoomLevel=17&segments=325929344#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.179870857&lon=22.61892197&s=3402715231638&zoomLevel=17&segments=300482487#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.164546107&lon=22.61598488&s=3402715231638&zoomLevel=17&segments=262542952#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.198644167&lon=22.60221538&s=3402715231638&zoomLevel=17&segments=335258640#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.430970117&lon=22.75691237&s=3402715231638&zoomLevel=17&segments=312130105#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.061132457&lon=23.47619474&s=3402715231638&zoomLevel=17&segments=332047375#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.060281617&lon=23.47833279&s=3402715231638&zoomLevel=17&segments=332047075#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.058590167&lon=23.48091660&s=3402715231638&zoomLevel=17&segments=332047076#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.009789507&lon=23.70518337&s=3402715231638&zoomLevel=17&segments=294322411#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.042748177&lon=23.71854159&s=3402715231638&zoomLevel=17&segments=336427582#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.011179287&lon=23.77368531&s=3402715231638&zoomLevel=17&segments=288695654#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.011064447&lon=23.77222619&s=3402715231638&zoomLevel=17&segments=288695359#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.011473567&lon=23.77372822&s=3402715231638&zoomLevel=17&segments=288695417#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.011145197&lon=23.77062759&s=3402715231638&zoomLevel=17&segments=288695364#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.012822897&lon=23.77531609&s=3402715231638&zoomLevel=17&segments=293388293#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.004676987&lon=23.77397232&s=3402715231638&zoomLevel=17&segments=288695149#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.011807307&lon=23.77517662&s=3402715231638&zoomLevel=17&segments=293388277#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.011365907&lon=23.77470455&s=3402715231638&zoomLevel=17&segments=293388279#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.011807307&lon=23.77517662&s=3402715231638&zoomLevel=17&segments=293388275#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.123811867&lon=23.90173693&s=3402715231638&zoomLevel=17&segments=342471375#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.056422387&lon=24.19587645&s=3402715231638&zoomLevel=17&segments=322471684#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.126950997&lon=24.28932736&s=3402715231638&zoomLevel=17&segments=324629531#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.126344747&lon=24.29511575&s=3402715231638&zoomLevel=17&segments=324629533#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.123430727&lon=24.29225077&s=3402715231638&zoomLevel=17&segments=324629532#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.175286727&lon=24.28205209&s=3402715231638&zoomLevel=17&segments=323703959#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.048361777&lon=24.49225145&s=3402715231638&zoomLevel=17&segments=421732620#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.060282537&lon=24.47390805&s=3402715231638&zoomLevel=17&segments=322849031#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=48.033958487&lon=24.51432847&s=3402715231638&zoomLevel=17&segments=421732621#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.550872237&lon=32.87710465&s=3402715231638&zoomLevel=17&segments=359787834#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.538876127&lon=32.88814543&s=3402715231638&zoomLevel=17&segments=315754856#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.275743897&lon=33.06622551&s=3402715231638&zoomLevel=17&segments=339794448#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.298298447&lon=33.04675245&s=3402715231638&zoomLevel=17&segments=209719303#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.297316847&lon=33.04636980&s=3402715231638&zoomLevel=17&segments=209348240#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.168218007&lon=33.23727200&s=3402715231638&zoomLevel=17&segments=339404296#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.168218007&lon=33.23727200&s=3402715231638&zoomLevel=17&segments=339404293#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.589342367&lon=33.43019410&s=3402715231638&zoomLevel=17&segments=345056817#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.589867657&lon=33.42966369&s=3402715231638&zoomLevel=17&segments=345056818#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.576694817&lon=33.45115206&s=3402715231638&zoomLevel=17&segments=318705754#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.602079937&lon=33.44046374&s=3402715231638&zoomLevel=17&segments=318644303#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.592656387&lon=33.42857471&s=3402715231638&zoomLevel=17&segments=319287423#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.586016697&lon=33.43059710&s=3402715231638&zoomLevel=17&segments=319287420#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.591172787&lon=33.42814382&s=3402715231638&zoomLevel=17&segments=319287428#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.590230577&lon=33.42801145&s=3402715231638&zoomLevel=17&segments=319287427#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.589810347&lon=33.42893413&s=3402715231638&zoomLevel=17&segments=319287439#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.589810347&lon=33.42893413&s=3402715231638&zoomLevel=17&segments=319287437#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.591172787&lon=33.42814382&s=3402715231638&zoomLevel=17&segments=319287432#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.589342367&lon=33.43019410&s=3402715231638&zoomLevel=17&segments=319287447#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.588889657&lon=33.43038789&s=3402715231638&zoomLevel=17&segments=319287446#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.587078787&lon=33.43008748&s=3402715231638&zoomLevel=17&segments=319287445#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.588423677&lon=33.42877341&s=3402715231638&zoomLevel=17&segments=319287442#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.587831417&lon=33.42932037&s=3402715231638&zoomLevel=17&segments=319287441#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.589342367&lon=33.43019410&s=3402715231638&zoomLevel=17&segments=319287440#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.586967997&lon=33.43035034&s=3402715231638&zoomLevel=17&segments=319287455#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.588371997&lon=33.43087001&s=3402715231638&zoomLevel=17&segments=319287453#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.587517317&lon=33.43034540&s=3402715231638&zoomLevel=17&segments=319287452#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.589676637&lon=33.42800072&s=3402715231638&zoomLevel=17&segments=319287461#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.590230577&lon=33.42801145&s=3402715231638&zoomLevel=17&segments=319287460#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.589676637&lon=33.42800072&s=3402715231638&zoomLevel=17&segments=319287458#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.588758327&lon=33.42846436&s=3402715231638&zoomLevel=17&segments=319287457#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.594310457&lon=33.42627338&s=3402715231638&zoomLevel=17&segments=319287471#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.591735737&lon=33.42729262&s=3402715231638&zoomLevel=17&segments=319287470#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.591265857&lon=33.42715314&s=3402715231638&zoomLevel=17&segments=319287467#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.590696387&lon=33.42717967&s=3402715231638&zoomLevel=17&segments=319287465#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.591172787&lon=33.42814382&s=3402715231638&zoomLevel=17&segments=319287464#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.598458807&lon=33.42674545&s=3402715231638&zoomLevel=17&segments=319287477#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.598623057&lon=33.42740527&s=3402715231638&zoomLevel=17&segments=319287476#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.597011127&lon=33.42405251&s=3402715231638&zoomLevel=17&segments=319287474#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.596319737&lon=33.42910043&s=3402715231638&zoomLevel=17&segments=319287487#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.596085297&lon=33.43049383&s=3402715231638&zoomLevel=17&segments=319287486#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.595749147&lon=33.43099809&s=3402715231638&zoomLevel=17&segments=319287485#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.596085297&lon=33.43049383&s=3402715231638&zoomLevel=17&segments=319287484#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.595439447&lon=33.43163907&s=3402715231638&zoomLevel=17&segments=319287482#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.595076837&lon=33.43206561&s=3402715231638&zoomLevel=17&segments=319287480#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.596409977&lon=33.43061722&s=3402715231638&zoomLevel=17&segments=319287495#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.596926657&lon=33.42873883&s=3402715231638&zoomLevel=17&segments=319287494#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.598458807&lon=33.42674545&s=3402715231638&zoomLevel=17&segments=319287493#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.596926657&lon=33.42873883&s=3402715231638&zoomLevel=17&segments=319287492#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.595536657&lon=33.43022159&s=3402715231638&zoomLevel=17&segments=319287489#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.595536657&lon=33.43022159&s=3402715231638&zoomLevel=17&segments=319287488#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.592590917&lon=33.43068025&s=3402715231638&zoomLevel=17&segments=319287500#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.592064267&lon=33.43001238&s=3402715231638&zoomLevel=17&segments=319287499#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.597146297&lon=33.42967239&s=3402715231638&zoomLevel=17&segments=319287496#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.595439447&lon=33.43163907&s=3402715231638&zoomLevel=17&segments=319163372#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.592259097&lon=33.43101552&s=3402715231638&zoomLevel=17&segments=319744090#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.592590917&lon=33.43068025&s=3402715231638&zoomLevel=17&segments=319744089#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.593419717&lon=33.44199791&s=3402715231638&zoomLevel=17&segments=318642435#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.582740227&lon=33.45445356&s=3402715231638&zoomLevel=17&segments=318635644#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.591378827&lon=33.54917302&s=3402715231638&zoomLevel=17&segments=377685169#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.591777997&lon=33.50465640&s=3402715231638&zoomLevel=17&segments=181589413#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.805923977&lon=33.55017983&s=3402715231638&zoomLevel=17&segments=383473158#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.151424727&lon=33.54139543&s=3402715231638&zoomLevel=17&segments=317821044#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.502180657&lon=33.60589974&s=3402715231638&zoomLevel=17&segments=206479183#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.726894487&lon=33.56973874&s=3402715231638&zoomLevel=17&segments=316502191#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.189312327&lon=33.66609827&s=3402715231638&zoomLevel=17&segments=414861331#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.190408707&lon=33.66225198&s=3402715231638&zoomLevel=17&segments=414861332#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.189786487&lon=33.66986386&s=3402715231638&zoomLevel=17&segments=414861327#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.188867987&lon=33.67017782&s=3402715231638&zoomLevel=17&segments=318061503#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.190344437&lon=33.66635576&s=3402715231638&zoomLevel=17&segments=318061502#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.991489757&lon=33.82052225&s=3402715231638&zoomLevel=17&segments=408129031#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=44.746986927&lon=34.39827465&s=3402715231638&zoomLevel=17&segments=316961987#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.379652927&lon=35.92709384&s=3402715231638&zoomLevel=17&segments=362181529#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.362755207&lon=35.97224245&s=3402715231638&zoomLevel=17&segments=405839867#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.349203377&lon=35.96882514&s=3402715231638&zoomLevel=17&segments=362182002#flags_unset=unpaved',
    'https://waze.com/uk/editor?env=row&lat=45.363448347&lon=35.97993407&s=3402715231638&zoomLevel=17&segments=362558504#flags_unset=unpaved',
  ];
  const FLAGS_BIT = {
    tunnel: 0b00000001,
    // a     :  0b00000010,
    // b     :  0b00000100,
    // c     :  0b00001000,
    unpaved: 0b00010000,
    headlights: 0b00100000,
    // d     :  0b01000000,
    nearbyHOV: 0b10000000,
  };

  async function goThrowTheLinks() {
    var counter = 0;
    var counter_save = 15000; // значение автосохранения
    if (URL_LIST.length < counter_save) counter_save = URL_LIST.length;

    for (const link of URL_LIST) {
      const url = new URL(link);

      if (url.searchParams.has('lon') && url.searchParams.has('lat')) {
        await moveMap(url.searchParams.get('lon'), url.searchParams.get('lat'));

        // Если есть хеш (#) проводим обновление
        if (url.hash) {
          await updateObjects(url);
          console.log(counter + '---->' + counter_save);
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!          
          if (++counter == counter_save) { // считаем автосохранения
            //            await Promise.all(W.commands.request('save:start'),);
            //            counter = 0
          }
        }
      }
    }
  }

  function moveMap(lon, lat) {
    return new Promise((resolve) => {
      W.map.setCenter(
        OpenLayers.Layer.SphericalMercator.forwardMercator(
          parseFloat(lon),
          parseFloat(lat),
        ),
      );

      document.addEventListener(
        'wme-map-data-loaded',
        () => {
          setTimeout(() => resolve(), 2000)
          //resolve()
        },
        {
          once: true,
        },
      );
    });
  }
  function waitLoadingData(id) {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Если нет ID (сегмент не читается или был удален)
    return new Promise((resolve) => {
      const segment = W.model.segments.getObjectById(id);

      if (!segment) {
        console.log('Ожидаем загрузку...');
        setTimeout(() => resolve(waitLoadingData(id)), 200);
      } else {
        resolve(segment);
      }
    });
  }


  async function updateObjects(url) {

    const searchParams = new URLSearchParams(url.search.replace('?', '')); // Получаем данные в ссылке после "?"
    const segments = await Promise.all(
      searchParams.getAll('segments').map((id) => waitLoadingData(id)),
    );
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let flags = segments[0].attributes.flags//.toString(2); // как правильно получать flags ??????????????????????
    // console.log(flags.toString(2));


    const updateProps = {}; // создаем объект
    const hashParams = new URLSearchParams(url.hash.replace('#', '')); // Создаем new экземпляр объекта
    // получаем данные для загрузки
    for (const [key, value] of hashParams.entries()) {

      // обрабатываем флаги
      // снимаем ненужные
      if (key == 'flags_unset') {
        if (value.includes('unpaved')) flags &= ~(FLAGS_BIT.unpaved);
        if (value.includes('tunnel')) flags &= ~(FLAGS_BIT.tunnel);
        if (value.includes('headlights')) flags &= ~(FLAGS_BIT.headlights);
        if (value.includes('nearbyHOV')) flags &= ~(FLAGS_BIT.nearbyHOV);
        updateProps['flags'] = flags;
      }
      // ставим нужные
      if (key == 'flags_set') {
        if (value.includes('unpaved')) flags |= (FLAGS_BIT.unpaved);
        if (value.includes('tunnel')) flags |= (FLAGS_BIT.tunnel);
        if (value.includes('headlights')) flags |= (FLAGS_BIT.headlights);
        if (value.includes('nearbyHOV')) flags |= (FLAGS_BIT.nearbyHOV);
        updateProps['flags'] = flags;
      }

      if (key != 'flags_set' && key != 'flags_unset') {
        updateProps[key] = value;
      }
      console.log('PL hash: ' + key + ' = ' + value);
    }
    //    console.log(updateProps);

    await Promise.all(segments.map((segment) => {
      W.model.actionManager.add(new UpdateObject(segment, updateProps));
    }),);


    //W.commands.request('save:start');
  }



  function bootstrap() {
    if (W && W.loginManager && W.loginManager.user && W.map && require) {
      UpdateObject = require('Waze/Action/UpdateObject');
      goThrowTheLinks();
    } else {
      setTimeout(bootstrap, 200);
    }
  }

  bootstrap();
})();
