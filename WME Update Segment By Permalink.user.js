// ==UserScript==
// @name        WME Update Segment By Permalink
// @namespace   WazeUA
// @version     0.0.6
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
    'https://waze.com/uk/editor?env=row&lat=51.251349407&lon=31.47615234&s=3402715231638&zoomLevel=17&segments=348264915#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.338204377&lon=25.71101782&s=3402715231638&zoomLevel=17&segments=408358299#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.338774917&lon=25.71449933&s=3402715231638&zoomLevel=17&segments=408358317#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.338455117&lon=25.71263019&s=3402715231638&zoomLevel=17&segments=408358312#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.338687457&lon=25.71682818&s=3402715231638&zoomLevel=17&segments=409680510#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.267829177&lon=25.95182614&s=3402715231638&zoomLevel=17&segments=410466751#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.267449817&lon=25.95397348&s=3402715231638&zoomLevel=17&segments=410466750#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.058049127&lon=29.94538729&s=3402715231638&zoomLevel=17&segments=419140707#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.639471127&lon=36.14604879&s=3402715231638&zoomLevel=17&segments=362569733#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.642083177&lon=36.15252584&s=3402715231638&zoomLevel=17&segments=362569734#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.643071707&lon=36.18446125&s=3402715231638&zoomLevel=17&segments=360641716#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.652449647&lon=36.23883697&s=3402715231638&zoomLevel=17&segments=402051769#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.641982007&lon=36.21242913&s=3402715231638&zoomLevel=17&segments=362719103#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.643351787&lon=36.22103863&s=3402715231638&zoomLevel=17&segments=362719101#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.642050947&lon=36.21497744&s=3402715231638&zoomLevel=17&segments=371273287#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.712606627&lon=36.85394661&s=3402715231638&zoomLevel=17&segments=409801289#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.708277967&lon=36.89131003&s=3402715231638&zoomLevel=17&segments=368980066#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.703264357&lon=36.88651312&s=3402715231638&zoomLevel=17&segments=368980067#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.705493227&lon=36.87717900&s=3402715231638&zoomLevel=17&segments=409798098#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.709758677&lon=36.86852086&s=3402715231638&zoomLevel=17&segments=409801288#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.717875247&lon=36.92611733&s=3402715231638&zoomLevel=17&segments=339407472#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.721681587&lon=36.92001560&s=3402715231638&zoomLevel=17&segments=339407465#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.720287237&lon=36.92536755&s=3402715231638&zoomLevel=17&segments=339407471#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.716578157&lon=36.92071665&s=3402715231638&zoomLevel=17&segments=339406667#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.715392947&lon=36.91152415&s=3402715231638&zoomLevel=17&segments=339406669#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.714096817&lon=36.90201471&s=3402715231638&zoomLevel=17&segments=339406519#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.723371917&lon=36.91482412&s=3402715231638&zoomLevel=17&segments=339311273#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.709193237&lon=36.87085974&s=3402715231638&zoomLevel=17&segments=409798099#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.717347027&lon=36.92629658&s=3402715231638&zoomLevel=17&segments=339406304#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.193307117&lon=37.26984851&s=3402715231638&zoomLevel=17&segments=421522969#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.190899057&lon=37.27201114&s=3402715231638&zoomLevel=17&segments=421522996#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.190899057&lon=37.27201114&s=3402715231638&zoomLevel=17&segments=421522994#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.016496157&lon=29.69563955&s=3402715231638&zoomLevel=17&segments=375157877#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.014703557&lon=29.68555319&s=3402715231638&zoomLevel=17&segments=375156949#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.015957107&lon=29.69251759&s=3402715231638&zoomLevel=17&segments=375157128#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.015115907&lon=29.68877578&s=3402715231638&zoomLevel=17&segments=375157127#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.014973817&lon=29.70644584&s=3402715231638&zoomLevel=17&segments=375157878#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.019726447&lon=29.77236414&s=3402715231638&zoomLevel=17&segments=237512963#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.030229367&lon=29.86469366&s=3402715231638&zoomLevel=17&segments=423787007#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.041412447&lon=29.90610873&s=3402715231638&zoomLevel=17&segments=331872707#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.037925147&lon=29.93064290&s=3402715231638&zoomLevel=17&segments=331872718#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.035775487&lon=29.93367782&s=3402715231638&zoomLevel=17&segments=331871180#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.036579267&lon=29.93097781&s=3402715231638&zoomLevel=17&segments=331871179#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.032495977&lon=29.92036843&s=3402715231638&zoomLevel=17&segments=331871690#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.032218927&lon=29.91791850&s=3402715231638&zoomLevel=17&segments=331871689#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.034815927&lon=29.90252086&s=3402715231638&zoomLevel=17&segments=375251148#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.033279177&lon=29.92886484&s=3402715231638&zoomLevel=17&segments=331871570#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.033039327&lon=29.92598879&s=3402715231638&zoomLevel=17&segments=331871569#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.035428747&lon=29.90791762&s=3402715231638&zoomLevel=17&segments=331895582#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.059461387&lon=29.88789139&s=3402715231638&zoomLevel=17&segments=375252660#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.047701897&lon=29.89548796&s=3402715231638&zoomLevel=17&segments=331873527#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.040708197&lon=29.91380025&s=3402715231638&zoomLevel=17&segments=375252844#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.033601947&lon=29.93142151&s=3402715231638&zoomLevel=17&segments=331871474#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.041342547&lon=29.91127686&s=3402715231638&zoomLevel=17&segments=375252843#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.034065297&lon=29.89629799&s=3402715231638&zoomLevel=17&segments=423787008#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.043236717&lon=29.90297660&s=3402715231638&zoomLevel=17&segments=375196609#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.044207057&lon=29.90083944&s=3402715231638&zoomLevel=17&segments=375196608#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.045048467&lon=29.89907022&s=3402715231638&zoomLevel=17&segments=375195035#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.045215677&lon=29.89873566&s=3402715231638&zoomLevel=17&segments=375195034#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.037703307&lon=29.92624527&s=3402715231638&zoomLevel=17&segments=331872789#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.037794597&lon=29.92296129&s=3402715231638&zoomLevel=17&segments=331872788#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.039079997&lon=29.91780107&s=3402715231638&zoomLevel=17&segments=331872785#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.034638717&lon=29.90932202&s=3402715231638&zoomLevel=17&segments=237513179#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.032028987&lon=29.91640305&s=3402715231638&zoomLevel=17&segments=237513181#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.032426557&lon=29.91316831&s=3402715231638&zoomLevel=17&segments=237513182#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.081139487&lon=29.87744339&s=3402715231638&zoomLevel=17&segments=293463246#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.104960647&lon=29.87883099&s=3402715231638&zoomLevel=17&segments=293463235#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=46.073160807&lon=29.88190221&s=3402715231638&zoomLevel=17&segments=375252659#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.448044207&lon=30.52637806&s=3402715231638&zoomLevel=17&segments=366794566#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.450693117&lon=30.52378952&s=3402715231638&zoomLevel=17&segments=366794563#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.452416657&lon=30.52214250&s=3402715231638&zoomLevel=17&segments=376728534#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.433051567&lon=30.54167582&s=3402715231638&zoomLevel=17&segments=359957687#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.442193917&lon=30.53223913&s=3402715231638&zoomLevel=17&segments=359957436#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.441088527&lon=30.53340959&s=3402715231638&zoomLevel=17&segments=359957437#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.446196977&lon=30.52818313&s=3402715231638&zoomLevel=17&segments=366794498#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.444170887&lon=30.53016289&s=3402715231638&zoomLevel=17&segments=366794499#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.498596587&lon=30.46213476&s=3402715231638&zoomLevel=17&segments=237133857#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.475836567&lon=30.50207229&s=3402715231638&zoomLevel=17&segments=376720477#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.473837487&lon=30.50369119&s=3402715231638&zoomLevel=17&segments=376720928#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.470681657&lon=30.50626621&s=3402715231638&zoomLevel=17&segments=376720929#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.497884497&lon=30.46283900&s=3402715231638&zoomLevel=17&segments=376626724#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.469389957&lon=30.50732944&s=3402715231638&zoomLevel=17&segments=376720913#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.467073297&lon=30.50928638&s=3402715231638&zoomLevel=17&segments=376720914#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.477664877&lon=30.49396863&s=3402715231638&zoomLevel=17&segments=376704748#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.485035867&lon=30.47349958&s=3402715231638&zoomLevel=17&segments=376719569#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.481013337&lon=30.47767560&s=3402715231638&zoomLevel=17&segments=376719570#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.478977657&lon=30.49625781&s=3402715231638&zoomLevel=17&segments=376705209#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.479886797&lon=30.47846019&s=3402715231638&zoomLevel=17&segments=376703645#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.477001437&lon=30.50110769&s=3402715231638&zoomLevel=17&segments=376720539#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.476459917&lon=30.49138668&s=3402715231638&zoomLevel=17&segments=376718657#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.476696247&lon=30.49189325&s=3402715231638&zoomLevel=17&segments=376718658#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.476072587&lon=30.49054354&s=3402715231638&zoomLevel=17&segments=376704284#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.475333097&lon=30.48875122&s=3402715231638&zoomLevel=17&segments=376704283#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.474939707&lon=30.50280825&s=3402715231638&zoomLevel=17&segments=376720885#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.474778287&lon=30.50294468&s=3402715231638&zoomLevel=17&segments=376720886#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.496971167&lon=30.46377777&s=3402715231638&zoomLevel=17&segments=376627196#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.495538727&lon=30.46502150&s=3402715231638&zoomLevel=17&segments=376627197#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.478645027&lon=30.49974620&s=3402715231638&zoomLevel=17&segments=376720865#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.477593887&lon=30.50065719&s=3402715231638&zoomLevel=17&segments=376720866#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.456835237&lon=30.51818234&s=3402715231638&zoomLevel=17&segments=376728533#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.477167097&lon=30.48030827&s=3402715231638&zoomLevel=17&segments=416964476#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.474976637&lon=30.48536922&s=3402715231638&zoomLevel=17&segments=416964477#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.492772177&lon=30.46662494&s=3402715231638&zoomLevel=17&segments=376703925#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.463426047&lon=30.51237477&s=3402715231638&zoomLevel=17&segments=376705425#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.466006137&lon=30.51018440&s=3402715231638&zoomLevel=17&segments=376705420#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.381969207&lon=30.58287042&s=3402715231638&zoomLevel=17&segments=366793980#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.382923797&lon=30.58208200&s=3402715231638&zoomLevel=17&segments=366793981#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.395417017&lon=30.57168036&s=3402715231638&zoomLevel=17&segments=237207909#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.409925427&lon=30.55957555&s=3402715231638&zoomLevel=17&segments=237207655#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.425647987&lon=30.54908007&s=3402715231638&zoomLevel=17&segments=359957688#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.421284357&lon=30.55165514&s=3402715231638&zoomLevel=17&segments=376727016#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.423574247&lon=30.55029398&s=3402715231638&zoomLevel=17&segments=376727017#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.417673517&lon=30.55376000&s=3402715231638&zoomLevel=17&segments=376708429#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.419608757&lon=30.55268338&s=3402715231638&zoomLevel=17&segments=376708431#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.413799577&lon=30.55666784&s=3402715231638&zoomLevel=17&segments=376708427#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.034770467&lon=24.35782858&s=3402715231638&zoomLevel=17&segments=407508664#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.939562527&lon=24.71309290&s=3402715231638&zoomLevel=17&segments=340710606#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.939951647&lon=24.71351310&s=3402715231638&zoomLevel=17&segments=340710609#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.940292987&lon=24.71386170&s=3402715231638&zoomLevel=17&segments=418390546#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.940122087&lon=24.71368622&s=3402715231638&zoomLevel=17&segments=418390547#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.904669757&lon=24.82899048&s=3402715231638&zoomLevel=17&segments=412226736#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.904703887&lon=24.82866489&s=3402715231638&zoomLevel=17&segments=412226734#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=48.904574577&lon=24.82882506&s=3402715231638&zoomLevel=17&segments=412226735#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.970947117&lon=35.89796304&s=3402715231638&zoomLevel=17&segments=421652837#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.119883557&lon=26.85012876&s=3402715231638&zoomLevel=17&segments=240323609#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.119727517&lon=26.85138449&s=3402715231638&zoomLevel=17&segments=240319140#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.119612237&lon=26.85229716&s=3402715231638&zoomLevel=17&segments=240316187#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.120749967&lon=26.84315640&s=3402715231638&zoomLevel=17&segments=385256302#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.120504837&lon=26.84512904&s=3402715231638&zoomLevel=17&segments=398851683#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.120328727&lon=26.84654630&s=3402715231638&zoomLevel=17&segments=398851682#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.121443617&lon=26.83733655&s=3402715231638&zoomLevel=17&segments=240324532#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.763579087&lon=29.24253452&s=3402715231638&zoomLevel=17&segments=417991104#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.762321327&lon=29.24082673&s=3402715231638&zoomLevel=17&segments=417991103#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.761029747&lon=29.24004027&s=3402715231638&zoomLevel=17&segments=416311977#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=50.764464687&lon=29.24052286&s=3402715231638&zoomLevel=17&segments=416311980#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.480422787&lon=29.25465795&s=3402715231638&zoomLevel=17&segments=210068663#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.479333987&lon=29.25019897&s=3402715231638&zoomLevel=17&segments=210068669#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.479317927&lon=29.25159789&s=3402715231638&zoomLevel=17&segments=210068668#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.482324737&lon=29.23629833&s=3402715231638&zoomLevel=17&segments=210069209#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.481062667&lon=29.25674170&s=3402715231638&zoomLevel=17&segments=341803737#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.480422787&lon=29.25465795&s=3402715231638&zoomLevel=17&segments=341803736#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.481170537&lon=29.25705405&s=3402715231638&zoomLevel=17&segments=210068249#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.483342177&lon=29.25873149&s=3402715231638&zoomLevel=17&segments=389989624#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.482875077&lon=29.25849259&s=3402715231638&zoomLevel=17&segments=389989623#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.482451957&lon=29.25829937&s=3402715231638&zoomLevel=17&segments=389989617#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=49.484240767&lon=29.25920164&s=3402715231638&zoomLevel=17&segments=389989585#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.766834317&lon=37.59108901&s=3402715231638&zoomLevel=17&segments=335499729#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.777374827&lon=37.59271885&s=3402715231638&zoomLevel=17&segments=400419813#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.775208727&lon=37.59220841&s=3402715231638&zoomLevel=17&segments=400474133#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.770534487&lon=37.59040212&s=3402715231638&zoomLevel=17&segments=351150909#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.770633017&lon=37.59058494&s=3402715231638&zoomLevel=17&segments=351150902#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.120305327&lon=37.72830262&s=3402715231638&zoomLevel=17&segments=363416873#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.114816477&lon=37.74437683&s=3402715231638&zoomLevel=17&segments=350410832#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.107839427&lon=37.76914814&s=3402715231638&zoomLevel=17&segments=363416307#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.156318267&lon=37.75594385&s=3402715231638&zoomLevel=17&segments=363453274#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.108068747&lon=37.84507002&s=3402715231638&zoomLevel=17&segments=419227882#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.106782997&lon=37.83102992&s=3402715231638&zoomLevel=17&segments=363416046#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.101301067&lon=37.79399622&s=3402715231638&zoomLevel=17&segments=363416308#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.101532237&lon=37.80432793&s=3402715231638&zoomLevel=17&segments=363452362#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.103969817&lon=37.81271049&s=3402715231638&zoomLevel=17&segments=363452365#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.105633127&lon=37.82012167&s=3402715231638&zoomLevel=17&segments=363416140#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.174968417&lon=37.81246623&s=3402715231638&zoomLevel=17&segments=408479312#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.176775887&lon=37.81805010&s=3402715231638&zoomLevel=17&segments=408479306#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.174682467&lon=37.81157612&s=3402715231638&zoomLevel=17&segments=363453373#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.175685077&lon=37.81469706&s=3402715231638&zoomLevel=17&segments=408479311#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.174369897&lon=37.81060319&s=3402715231638&zoomLevel=17&segments=363453332#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.180768287&lon=37.83043306&s=3402715231638&zoomLevel=17&segments=335499295#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.111095797&lon=37.91582666&s=3402715231638&zoomLevel=17&segments=419227820#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.110541207&lon=37.91903739&s=3402715231638&zoomLevel=17&segments=419227821#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.110813937&lon=37.86962165&s=3402715231638&zoomLevel=17&segments=419695760#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.113458907&lon=37.89490479&s=3402715231638&zoomLevel=17&segments=419695761#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.109763347&lon=37.92359184&s=3402715231638&zoomLevel=17&segments=419226976#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.109650047&lon=37.92425078&s=3402715231638&zoomLevel=17&segments=419226977#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.109796647&lon=37.92338629&s=3402715231638&zoomLevel=17&segments=419226974#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.109576087&lon=37.92468091&s=3402715231638&zoomLevel=17&segments=419226969#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.109530617&lon=37.85840628&s=3402715231638&zoomLevel=17&segments=419695523#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.187409767&lon=37.85142095&s=3402715231638&zoomLevel=17&segments=398917899#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.189712517&lon=37.85890219&s=3402715231638&zoomLevel=17&segments=398917898#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.186137127&lon=37.84728721&s=3402715231638&zoomLevel=17&segments=335499298#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.196363217&lon=37.88165024&s=3402715231638&zoomLevel=17&segments=419692769#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.191923637&lon=37.86608118&s=3402715231638&zoomLevel=17&segments=419692770#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.200245027&lon=37.89984734&s=3402715231638&zoomLevel=17&segments=419692473#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.200871257&lon=37.90553849&s=3402715231638&zoomLevel=17&segments=419692472#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.102934867&lon=37.99187690&s=3402715231638&zoomLevel=17&segments=419226825#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.102774857&lon=37.99606552&s=3402715231638&zoomLevel=17&segments=419226826#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.107826147&lon=37.93987860&s=3402715231638&zoomLevel=17&segments=373537917#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.104547267&lon=37.97356607&s=3402715231638&zoomLevel=17&segments=373537737#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.105545757&lon=38.02121447&s=3402715231638&zoomLevel=17&segments=419696779#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.108850877&lon=37.92980282&s=3402715231638&zoomLevel=17&segments=419226967#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.108553137&lon=37.93267506&s=3402715231638&zoomLevel=17&segments=419226960#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.108255637&lon=37.93536113&s=3402715231638&zoomLevel=17&segments=419226961#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.108212327&lon=37.93581665&s=3402715231638&zoomLevel=17&segments=419226962#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.106706177&lon=37.95038499&s=3402715231638&zoomLevel=17&segments=419226956#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.108610657&lon=37.93219708&s=3402715231638&zoomLevel=17&segments=419226959#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.107465907&lon=37.94307592&s=3402715231638&zoomLevel=17&segments=419226953#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.107183887&lon=37.94592868&s=3402715231638&zoomLevel=17&segments=419226954#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.106920617&lon=37.94847404&s=3402715231638&zoomLevel=17&segments=419226955#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.102486397&lon=38.00361641&s=3402715231638&zoomLevel=17&segments=373537701#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.102618827&lon=38.00014987&s=3402715231638&zoomLevel=17&segments=373537706#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.124012487&lon=38.06779983&s=3402715231638&zoomLevel=17&segments=164853197#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.126309077&lon=38.08463245&s=3402715231638&zoomLevel=17&segments=164859161#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.126181267&lon=38.08411556&s=3402715231638&zoomLevel=17&segments=164859160#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.126607547&lon=38.08591878&s=3402715231638&zoomLevel=17&segments=164849888#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.108386937&lon=38.03276188&s=3402715231638&zoomLevel=17&segments=419696780#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.121762007&lon=38.05329300&s=3402715231638&zoomLevel=17&segments=419695832#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.123496887&lon=38.05750251&s=3402715231638&zoomLevel=17&segments=419696870#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.124220007&lon=38.06358600&s=3402715231638&zoomLevel=17&segments=419696871#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.117613707&lon=38.04837248&s=3402715231638&zoomLevel=17&segments=419696879#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.120496157&lon=38.05159858&s=3402715231638&zoomLevel=17&segments=419696880#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.123961387&lon=38.06973102&s=3402715231638&zoomLevel=17&segments=208934280#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.124566727&lon=38.07545421&s=3402715231638&zoomLevel=17&segments=208934281#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=47.125015387&lon=38.07933794&s=3402715231638&zoomLevel=17&segments=164851498#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=51.530526667&lon=31.31612032&s=3402715231638&zoomLevel=17&segments=408033734#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=51.530471997&lon=31.31587771&s=3402715231638&zoomLevel=17&segments=408033735#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=51.530289107&lon=31.31601989&s=3402715231638&zoomLevel=17&segments=408033736#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=51.530381087&lon=31.31624291&s=3402715231638&zoomLevel=17&segments=408033737#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=51.535278597&lon=31.29214849&s=3402715231638&zoomLevel=17&segments=168269381#lockRank=2',
'https://waze.com/uk/editor?env=row&lat=51.535560317&lon=31.29217538&s=3402715231638&zoomLevel=17&segments=168269377#lockRank=2',

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
    var counter_save = 50; // значение автосохранения
    if (URL_LIST.length < counter_save) counter_save = URL_LIST.length;

    for (const link of URL_LIST) {
      const url = new URL(link);

      if (url.searchParams.has('lon') && url.searchParams.has('lat')) {
        await moveMap(url.searchParams.get('lon'), url.searchParams.get('lat'));

        // Если есть хеш (#) проводим обновление
        if (url.hash) {
          await updateObjects(url);
          console.log(counter + '---->', counter_save, url);
          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          if (++counter == counter_save || URL_LIST[URL_LIST.length -1] === link) { // считаем автосохранения

     await save();
            counter = 0;
          }
        }
      }
    }
  }

  function save() {
    //W.commands.request('save:start');

    //W.editingMediator.get("saving")

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
      setTimeout(() => resolve(), 200)
    });
  }




  function waitLoadingData(id) {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Если нет ID (сегмент не читается или был удален)
    return new Promise((resolve) => {
      console.log('Ожидаем загрузку...', id);
      let counterWait = 0;
      const interval = setInterval(() => {
        const segment = W.model.segments.getObjectById(id);
        if (segment) {
          clearInterval(interval);
          resolve(segment);
        } else {
          counterWait++;
          if (counterWait > 50) {
            clearInterval(interval);
              console.log('Несуществующий сегмент:', id);
            resolve(null);
          }
        }
      },200);
    });
  }


  async function updateObjects(url) {

    const searchParams = new URLSearchParams(url.search.replace('?', '')); // Получаем данные в ссылке после "?"
    const segments = (await Promise.all(
      searchParams.getAll('segments').map((id) => waitLoadingData(id)),
    )).filter(segment => segment);
    if (segments.length) {
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
          updateProps[key] = parseInt(value);
        }
        console.log('PL hash: ' + key + ' = ' + value);
      }
      //    console.log(updateProps);

      await Promise.all(segments.map((segment) => {
        W.model.actionManager.add(new UpdateObject(segment, updateProps));
      }),);

    }
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
