// ==UserScript==
// @name        WME Update Segment By Permalink
// @namespace   WazeUA
// @version     0.0.2
// @description none
// @author      ixxvivxxi
// @match       https://*.waze.com/editor*
// @match       https://*.waze.com/*/editor*
// ==/UserScript==

// Флаги flags_unset либо flags_set =  unpaved,headlights
// https://waze.com/uk/editor?env=row&lat=46.59851&lon=33.07064&s=8379753821591&zoomLevel=18&segments=427057335#fwdMaxSpeed=50&lockRank=2&revMaxSpeed=30&flags_set=unpaved,headlights

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
    'https://waze.com/uk/editor?env=row&lat=46.254434477&lon=32.29494283&s=3402715231638&zoomLevel=17&segments=205347451#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.262738247&lon=32.29844328&s=3402715231638&zoomLevel=17&segments=205346776#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.182265117&lon=32.32278945&s=3402715231638&zoomLevel=17&segments=205348794#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.179224687&lon=32.32260352&s=3402715231638&zoomLevel=17&segments=262174762#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.171663117&lon=32.32216913&s=3402715231638&zoomLevel=17&segments=262174763#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.164737347&lon=32.32180530&s=3402715231638&zoomLevel=17&segments=262174771#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.160352087&lon=32.31610830&s=3402715231638&zoomLevel=17&segments=262174772#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.152089617&lon=32.31322895&s=3402715231638&zoomLevel=17&segments=262174605#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.136987687&lon=32.30964778&s=3402715231638&zoomLevel=17&segments=262174606#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.167716197&lon=32.32194227&s=3402715231638&zoomLevel=17&segments=205348177#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.240743637&lon=32.31681225&s=3402715231638&zoomLevel=17&segments=366214650#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.209353047&lon=32.31973051&s=3402715231638&zoomLevel=17&segments=205347977#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.280369707&lon=32.30605803&s=3402715231638&zoomLevel=17&segments=205346663#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.241652827&lon=32.31731098&s=3402715231638&zoomLevel=17&segments=366214649#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.244004807&lon=32.31797993&s=3402715231638&zoomLevel=17&segments=366214527#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.249121917&lon=32.31331344&s=3402715231638&zoomLevel=17&segments=366214526#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.253781757&lon=32.29841884&s=3402715231638&zoomLevel=17&segments=253520878#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.252182267&lon=32.30408933&s=3402715231638&zoomLevel=17&segments=253520879#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.250987827&lon=32.30800266&s=3402715231638&zoomLevel=17&segments=253521120#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.251102817&lon=32.30904336&s=3402715231638&zoomLevel=17&segments=253521121#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.329528227&lon=32.33211035&s=3402715231638&zoomLevel=17&segments=205346403#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.317173667&lon=32.32185386&s=3402715231638&zoomLevel=17&segments=253474874#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.321624827&lon=32.32554446&s=3402715231638&zoomLevel=17&segments=253474873#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.335619367&lon=32.33720634&s=3402715231638&zoomLevel=17&segments=205346261#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.306568447&lon=32.31727235&s=3402715231638&zoomLevel=17&segments=205346512#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.348753167&lon=32.35750496&s=3402715231638&zoomLevel=17&segments=366224609#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.348271387&lon=32.35328490&s=3402715231638&zoomLevel=17&segments=366224610#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.348142977&lon=32.35216016&s=3402715231638&zoomLevel=17&segments=253475171#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.341617267&lon=32.34273975&s=3402715231638&zoomLevel=17&segments=205346179#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.346479907&lon=32.34841294&s=3402715231638&zoomLevel=17&segments=253475172#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.349388427&lon=32.36255344&s=3402715231638&zoomLevel=17&segments=253474871#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.354519157&lon=32.39061471&s=3402715231638&zoomLevel=17&segments=205344933#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.636596347&lon=32.38123566&s=3402715231638&zoomLevel=17&segments=205871001#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.657785577&lon=32.37577433&s=3402715231638&zoomLevel=17&segments=356693790#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.679962117&lon=32.36996670&s=3402715231638&zoomLevel=17&segments=356693789#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.702331187&lon=32.36164225&s=3402715231638&zoomLevel=17&segments=328010172#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.706238097&lon=32.36068664&s=3402715231638&zoomLevel=17&segments=328010177#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.726261897&lon=32.35552798&s=3402715231638&zoomLevel=17&segments=178444527#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.711997947&lon=32.35920261&s=3402715231638&zoomLevel=17&segments=328010176#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.692496937&lon=32.36658849&s=3402715231638&zoomLevel=17&segments=328010267#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.699461847&lon=32.36476597&s=3402715231638&zoomLevel=17&segments=396164649#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.699671917&lon=32.36380537&s=3402715231638&zoomLevel=17&segments=396164650#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.741588297&lon=32.36067965&s=3402715231638&zoomLevel=17&segments=369906614#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.743909127&lon=32.37858277&s=3402715231638&zoomLevel=17&segments=369906615#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.185727727&lon=32.47563222&s=3402715231638&zoomLevel=17&segments=253195482#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.318296987&lon=32.42825251&s=3402715231638&zoomLevel=17&segments=253198794#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.338812397&lon=32.42407896&s=3402715231638&zoomLevel=17&segments=253198793#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.352646627&lon=32.42099577&s=3402715231638&zoomLevel=17&segments=205345234#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.394255797&lon=32.42833194&s=3402715231638&zoomLevel=17&segments=205344510#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.360920427&lon=32.45930533&s=3402715231638&zoomLevel=17&segments=253198868#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.360727077&lon=32.43139552&s=3402715231638&zoomLevel=17&segments=205345233#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.371762817&lon=32.42056756&s=3402715231638&zoomLevel=17&segments=253475594#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.387393187&lon=32.42533922&s=3402715231638&zoomLevel=17&segments=253475593#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.400872277&lon=32.43128293&s=3402715231638&zoomLevel=17&segments=189227284#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.359720047&lon=32.41935831&s=3402715231638&zoomLevel=17&segments=205344932#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.360547597&lon=32.41917858&s=3402715231638&zoomLevel=17&segments=205344931#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.436538467&lon=32.44671078&s=3402715231638&zoomLevel=17&segments=420207386#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.437046777&lon=32.44696988&s=3402715231638&zoomLevel=17&segments=420207385#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.442880167&lon=32.45011612&s=3402715231638&zoomLevel=17&segments=263154361#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.459724247&lon=32.45975310&s=3402715231638&zoomLevel=17&segments=263154068#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.462228407&lon=32.46137897&s=3402715231638&zoomLevel=17&segments=263154067#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.418125527&lon=32.43889825&s=3402715231638&zoomLevel=17&segments=189227277#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.410506717&lon=32.43555343&s=3402715231638&zoomLevel=17&segments=189227283#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.455318217&lon=32.45704762&s=3402715231638&zoomLevel=17&segments=263154387#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.426992987&lon=32.44274716&s=3402715231638&zoomLevel=17&segments=189226959#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.440226017&lon=32.44863554&s=3402715231638&zoomLevel=17&segments=189226956#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.452665827&lon=32.45542404&s=3402715231638&zoomLevel=17&segments=406579595#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.432896717&lon=32.44520624&s=3402715231638&zoomLevel=17&segments=263154970#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.435600467&lon=32.44625552&s=3402715231638&zoomLevel=17&segments=263154969#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.446812447&lon=32.45223854&s=3402715231638&zoomLevel=17&segments=406579596#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.458323797&lon=32.45885207&s=3402715231638&zoomLevel=17&segments=189226647#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.465027077&lon=32.46342916&s=3402715231638&zoomLevel=17&segments=189226645#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.467466957&lon=32.46522011&s=3402715231638&zoomLevel=17&segments=189226644#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.426408247&lon=32.56170536&s=3402715231638&zoomLevel=17&segments=188634653#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.360027007&lon=32.49883011&s=3402715231638&zoomLevel=17&segments=260170845#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.362025927&lon=32.53304167&s=3402715231638&zoomLevel=17&segments=260171069#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.363949927&lon=32.54360107&s=3402715231638&zoomLevel=17&segments=260171070#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.464692917&lon=32.52670159&s=3402715231638&zoomLevel=17&segments=142973002#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503363317&lon=32.50294731&s=3402715231638&zoomLevel=17&segments=336053855#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503392347&lon=32.50388250&s=3402715231638&zoomLevel=17&segments=336054361#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503268067&lon=32.50292993&s=3402715231638&zoomLevel=17&segments=336053857#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.512066007&lon=32.52818370&s=3402715231638&zoomLevel=17&segments=337886301#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.505269767&lon=32.50914653&s=3402715231638&zoomLevel=17&segments=189218773#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.507461897&lon=32.51700132&s=3402715231638&zoomLevel=17&segments=395460356#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.507179227&lon=32.51624193&s=3402715231638&zoomLevel=17&segments=395460357#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503714337&lon=32.50385811&s=3402715231638&zoomLevel=17&segments=336054427#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503643557&lon=32.50394987&s=3402715231638&zoomLevel=17&segments=336054426#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503706767&lon=32.50394867&s=3402715231638&zoomLevel=17&segments=336054437#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503816227&lon=32.50477998&s=3402715231638&zoomLevel=17&segments=336054436#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.475225637&lon=32.52033501&s=3402715231638&zoomLevel=17&segments=337884297#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.512450747&lon=32.52911375&s=3402715231638&zoomLevel=17&segments=337886359#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.512866997&lon=32.53015896&s=3402715231638&zoomLevel=17&segments=337886358#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.509902097&lon=32.52295290&s=3402715231638&zoomLevel=17&segments=337886360#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.500237287&lon=32.49993725&s=3402715231638&zoomLevel=17&segments=189225865#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503392347&lon=32.50388250&s=3402715231638&zoomLevel=17&segments=189219729#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.497840727&lon=32.49738915&s=3402715231638&zoomLevel=17&segments=189225882#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.502587577&lon=32.50248266&s=3402715231638&zoomLevel=17&segments=189220259#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503268067&lon=32.50292993&s=3402715231638&zoomLevel=17&segments=189220256#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.507875487&lon=32.51805420&s=3402715231638&zoomLevel=17&segments=337886428#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.477462737&lon=32.47511014&s=3402715231638&zoomLevel=17&segments=189226057#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.487963607&lon=32.51853792&s=3402715231638&zoomLevel=17&segments=404586809#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.498977107&lon=32.51786127&s=3402715231638&zoomLevel=17&segments=404586810#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.506447587&lon=32.51402816&s=3402715231638&zoomLevel=17&segments=404586797#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503192927&lon=32.51751359&s=3402715231638&zoomLevel=17&segments=404586798#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.508178517&lon=32.51878667&s=3402715231638&zoomLevel=17&segments=404586795#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.508707827&lon=32.52006609&s=3402715231638&zoomLevel=17&segments=404586794#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503705367&lon=32.50342125&s=3402715231638&zoomLevel=17&segments=336054129#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503728697&lon=32.50349958&s=3402715231638&zoomLevel=17&segments=336054128#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.486915757&lon=32.48551151&s=3402715231638&zoomLevel=17&segments=407255358#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.494332167&lon=32.49368128&s=3402715231638&zoomLevel=17&segments=407255357#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.472310147&lon=32.46956105&s=3402715231638&zoomLevel=17&segments=189226203#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.505269767&lon=32.50914653&s=3402715231638&zoomLevel=17&segments=188633229#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.502587577&lon=32.50248266&s=3402715231638&zoomLevel=17&segments=396624510#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.501961047&lon=32.50180411&s=3402715231638&zoomLevel=17&segments=396624511#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.501568837&lon=32.50137934&s=3402715231638&zoomLevel=17&segments=396624506#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503079957&lon=32.50336396&s=3402715231638&zoomLevel=17&segments=336053745#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.305415307&lon=32.62991656&s=3402715231638&zoomLevel=17&segments=188635614#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.329697317&lon=32.61037536&s=3402715231638&zoomLevel=17&segments=253525526#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.324354727&lon=32.61244064&s=3402715231638&zoomLevel=17&segments=253525527#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.342482537&lon=32.60635588&s=3402715231638&zoomLevel=17&segments=253525523#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.368183277&lon=32.55489570&s=3402715231638&zoomLevel=17&segments=253206294#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.404189257&lon=32.61820083&s=3402715231638&zoomLevel=17&segments=337880875#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.402869617&lon=32.61502992&s=3402715231638&zoomLevel=17&segments=337880874#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.366530947&lon=32.55222001&s=3402715231638&zoomLevel=17&segments=253206024#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.394366317&lon=32.59145735&s=3402715231638&zoomLevel=17&segments=281990380#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.392690707&lon=32.59228624&s=3402715231638&zoomLevel=17&segments=281990388#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.393201667&lon=32.59204093&s=3402715231638&zoomLevel=17&segments=281990387#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.391336757&lon=32.59293628&s=3402715231638&zoomLevel=17&segments=281990384#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.375799187&lon=32.56673378&s=3402715231638&zoomLevel=17&segments=260171502#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.399639827&lon=32.60681147&s=3402715231638&zoomLevel=17&segments=337880995#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.401024497&lon=32.61020902&s=3402715231638&zoomLevel=17&segments=337880996#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.395430737&lon=32.59845427&s=3402715231638&zoomLevel=17&segments=337881001#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.393623577&lon=32.59601849&s=3402715231638&zoomLevel=17&segments=337881000#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.391336757&lon=32.59293628&s=3402715231638&zoomLevel=17&segments=253205891#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.372157837&lon=32.59822098&s=3402715231638&zoomLevel=17&segments=260171308#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.378392917&lon=32.57143233&s=3402715231638&zoomLevel=17&segments=260171823#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.382772087&lon=32.57928745&s=3402715231638&zoomLevel=17&segments=260171824#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.372913447&lon=32.56198803&s=3402715231638&zoomLevel=17&segments=260171073#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.374290557&lon=32.56424759&s=3402715231638&zoomLevel=17&segments=260171075#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.370119207&lon=32.55740888&s=3402715231638&zoomLevel=17&segments=337880559#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.372326097&lon=32.56103755&s=3402715231638&zoomLevel=17&segments=337880560#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.387975037&lon=32.58773275&s=3402715231638&zoomLevel=17&segments=260171388#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.405429187&lon=32.62112715&s=3402715231638&zoomLevel=17&segments=253556376#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.407823367&lon=32.62663800&s=3402715231638&zoomLevel=17&segments=418283688#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.404904247&lon=32.61991890&s=3402715231638&zoomLevel=17&segments=253556375#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.520953777&lon=32.54993570&s=3402715231638&zoomLevel=17&segments=404586520#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.521491087&lon=32.55124612&s=3402715231638&zoomLevel=17&segments=404586519#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.521572397&lon=32.55144440&s=3402715231638&zoomLevel=17&segments=404586515#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.522664977&lon=32.55381796&s=3402715231638&zoomLevel=17&segments=404586500#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.524124727&lon=32.55568859&s=3402715231638&zoomLevel=17&segments=404586499#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.531199397&lon=32.61373927&s=3402715231638&zoomLevel=17&segments=142972988#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.535447567&lon=32.62575867&s=3402715231638&zoomLevel=17&segments=404513442#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.537620677&lon=32.62898688&s=3402715231638&zoomLevel=17&segments=404513443#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.525640887&lon=32.55739549&s=3402715231638&zoomLevel=17&segments=404550612#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.531326287&lon=32.61874562&s=3402715231638&zoomLevel=17&segments=407256304#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.532219967&lon=32.62081015&s=3402715231638&zoomLevel=17&segments=407256305#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.532786517&lon=32.62180579&s=3402715231638&zoomLevel=17&segments=404516128#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.534864097&lon=32.62489193&s=3402715231638&zoomLevel=17&segments=404516129#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.532841647&lon=32.59191140&s=3402715231638&zoomLevel=17&segments=281990571#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.532225727&lon=32.60222551&s=3402715231638&zoomLevel=17&segments=281990562#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.532528597&lon=32.60001080&s=3402715231638&zoomLevel=17&segments=404516281#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.532729717&lon=32.59668191&s=3402715231638&zoomLevel=17&segments=404516282#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.531261497&lon=32.60873232&s=3402715231638&zoomLevel=17&segments=404516258#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.532104427&lon=32.60305753&s=3402715231638&zoomLevel=17&segments=404516259#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.532919867&lon=32.58845785&s=3402715231638&zoomLevel=17&segments=404516376#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.533124827&lon=32.58459584&s=3402715231638&zoomLevel=17&segments=404516377#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.522201697&lon=32.55297919&s=3402715231638&zoomLevel=17&segments=359298046#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.533320267&lon=32.58111347&s=3402715231638&zoomLevel=17&segments=394551452#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.533280977&lon=32.57248859&s=3402715231638&zoomLevel=17&segments=394551453#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.604437227&lon=32.57579401&s=3402715231638&zoomLevel=17&segments=398244599#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.605226227&lon=32.57674347&s=3402715231638&zoomLevel=17&segments=395529925#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.604530497&lon=32.57599012&s=3402715231638&zoomLevel=17&segments=354629482#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.604094617&lon=32.57589832&s=3402715231638&zoomLevel=17&segments=354629485#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.604253317&lon=32.57641971&s=3402715231638&zoomLevel=17&segments=354629496#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.604061017&lon=32.57611013&s=3402715231638&zoomLevel=17&segments=354629563#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.604363357&lon=32.57641434&s=3402715231638&zoomLevel=17&segments=354629562#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.604322317&lon=32.57642557&s=3402715231638&zoomLevel=17&segments=354629295#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.604363357&lon=32.57641434&s=3402715231638&zoomLevel=17&segments=354629293#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.604783417&lon=32.57641384&s=3402715231638&zoomLevel=17&segments=354629301#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.278618167&lon=32.65386204&s=3402715231638&zoomLevel=17&segments=253556748#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.279886187&lon=32.65366603&s=3402715231638&zoomLevel=17&segments=253556747#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.245175877&lon=32.70842208&s=3402715231638&zoomLevel=17&segments=253196606#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.263103707&lon=32.67611660&s=3402715231638&zoomLevel=17&segments=253196605#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.286227837&lon=32.64898829&s=3402715231638&zoomLevel=17&segments=253556589#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.284929667&lon=32.64922228&s=3402715231638&zoomLevel=17&segments=253556590#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.283619127&lon=32.64945850&s=3402715231638&zoomLevel=17&segments=253556583#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.289829757&lon=32.64609864&s=3402715231638&zoomLevel=17&segments=188636067#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.274996447&lon=32.65719622&s=3402715231638&zoomLevel=17&segments=188636064#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.282536007&lon=32.65320650&s=3402715231638&zoomLevel=17&segments=253556732#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.281170897&lon=32.65344324&s=3402715231638&zoomLevel=17&segments=253556733#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.282319127&lon=32.64969280&s=3402715231638&zoomLevel=17&segments=142973026#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.419483497&lon=32.66010354&s=3402715231638&zoomLevel=17&segments=418283726#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.417359367&lon=32.65472097&s=3402715231638&zoomLevel=17&segments=418283722#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.415555097&lon=32.64888936&s=3402715231638&zoomLevel=17&segments=418283717#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.413848767&lon=32.64308217&s=3402715231638&zoomLevel=17&segments=418283714#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.429908487&lon=32.69686024&s=3402715231638&zoomLevel=17&segments=418283743#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.424779537&lon=32.67847237&s=3402715231638&zoomLevel=17&segments=418283734#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.423793657&lon=32.67515837&s=3402715231638&zoomLevel=17&segments=418283733#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.421788497&lon=32.66810429&s=3402715231638&zoomLevel=17&segments=418283731#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.409642607&lon=32.63109232&s=3402715231638&zoomLevel=17&segments=418283690#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.409380497&lon=32.63045056&s=3402715231638&zoomLevel=17&segments=418283689#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.412825237&lon=32.63983231&s=3402715231638&zoomLevel=17&segments=418283709#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.431655657&lon=32.70370723&s=3402715231638&zoomLevel=17&segments=260460527#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.432643697&lon=32.70683741&s=3402715231638&zoomLevel=17&segments=260460520#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.427773527&lon=32.68879182&s=3402715231638&zoomLevel=17&segments=260174386#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.430757527&lon=32.70018546&s=3402715231638&zoomLevel=17&segments=418283782#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.430886817&lon=32.70122691&s=3402715231638&zoomLevel=17&segments=418283783#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.556304647&lon=32.66769252&s=3402715231638&zoomLevel=17&segments=365236374#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.542874117&lon=32.64031863&s=3402715231638&zoomLevel=17&segments=404514947#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.569467947&lon=32.69405109&s=3402715231638&zoomLevel=17&segments=407256826#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.543495757&lon=32.64190232&s=3402715231638&zoomLevel=17&segments=404515029#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.544983087&lon=32.64559990&s=3402715231638&zoomLevel=17&segments=404515030#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.539931197&lon=32.63328097&s=3402715231638&zoomLevel=17&segments=404514769#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.538168527&lon=32.62980074&s=3402715231638&zoomLevel=17&segments=404514754#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.542640767&lon=32.63971847&s=3402715231638&zoomLevel=17&segments=404514812#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.541024297&lon=32.63573459&s=3402715231638&zoomLevel=17&segments=404514811#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.232420377&lon=32.73172386&s=3402715231638&zoomLevel=17&segments=337879605#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.233597297&lon=32.73082416&s=3402715231638&zoomLevel=17&segments=337879604#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.236967827&lon=32.72499756&s=3402715231638&zoomLevel=17&segments=253526788#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.226480737&lon=32.73615511&s=3402715231638&zoomLevel=17&segments=253526589#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.225313147&lon=32.73706381&s=3402715231638&zoomLevel=17&segments=253526590#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.236533137&lon=32.72671261&s=3402715231638&zoomLevel=17&segments=253526839#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.227704427&lon=32.73527666&s=3402715231638&zoomLevel=17&segments=337879821#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.228825217&lon=32.73447207&s=3402715231638&zoomLevel=17&segments=337879820#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.224150527&lon=32.73791449&s=3402715231638&zoomLevel=17&segments=253526604#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.222854927&lon=32.73886246&s=3402715231638&zoomLevel=17&segments=253526605#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.231276487&lon=32.73259830&s=3402715231638&zoomLevel=17&segments=253526672#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.235839057&lon=32.72904716&s=3402715231638&zoomLevel=17&segments=253557123#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.220523217&lon=32.74053413&s=3402715231638&zoomLevel=17&segments=188638109#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.221699647&lon=32.73970774&s=3402715231638&zoomLevel=17&segments=188638597#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.214129797&lon=32.75022072&s=3402715231638&zoomLevel=17&segments=253526985#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.465417937&lon=32.81407159&s=3402715231638&zoomLevel=17&segments=260175297#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.440643577&lon=32.75875004&s=3402715231638&zoomLevel=17&segments=418283832#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.439126177&lon=32.74831888&s=3402715231638&zoomLevel=17&segments=418283831#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.440735047&lon=32.75923323&s=3402715231638&zoomLevel=17&segments=418283829#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.433746087&lon=32.71246649&s=3402715231638&zoomLevel=17&segments=260460504#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.434778687&lon=32.71958149&s=3402715231638&zoomLevel=17&segments=418283791#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.434567417&lon=32.71865344&s=3402715231638&zoomLevel=17&segments=418283789#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.437509117&lon=32.73716403&s=3402715231638&zoomLevel=17&segments=418283806#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.436857337&lon=32.73238927&s=3402715231638&zoomLevel=17&segments=418283805#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.436255157&lon=32.72659171&s=3402715231638&zoomLevel=17&segments=418283802#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.436266627&lon=32.72761875&s=3402715231638&zoomLevel=17&segments=418283803#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.436195557&lon=32.72586433&s=3402715231638&zoomLevel=17&segments=418283801#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.435043867&lon=32.72074634&s=3402715231638&zoomLevel=17&segments=418283799#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.612870147&lon=32.78365109&s=3402715231638&zoomLevel=17&segments=347335731#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.599268377&lon=32.73189981&s=3402715231638&zoomLevel=17&segments=340036852#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.599528027&lon=32.72328388&s=3402715231638&zoomLevel=17&segments=406516998#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.599342807&lon=32.71530917&s=3402715231638&zoomLevel=17&segments=406516997#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.598844297&lon=32.72838762&s=3402715231638&zoomLevel=17&segments=306408227#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.599342807&lon=32.71530917&s=3402715231638&zoomLevel=17&segments=181232404#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.823963437&lon=32.74346231&s=3402715231638&zoomLevel=17&segments=381032855#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.802375637&lon=32.72962265&s=3402715231638&zoomLevel=17&segments=206076584#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.814639847&lon=32.73751908&s=3402715231638&zoomLevel=17&segments=206076091#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.505456977&lon=32.85481762&s=3402715231638&zoomLevel=17&segments=418283978#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.511238737&lon=32.86126506&s=3402715231638&zoomLevel=17&segments=418283979#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.527524847&lon=32.88416757&s=3402715231638&zoomLevel=17&segments=260175304#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503645117&lon=32.85228073&s=3402715231638&zoomLevel=17&segments=418283967#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.503098647&lon=32.85066514&s=3402715231638&zoomLevel=17&segments=418283952#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.498353007&lon=32.84467205&s=3402715231638&zoomLevel=17&segments=418283922#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.502193887&lon=32.84798038&s=3402715231638&zoomLevel=17&segments=418283923#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.158482027&lon=32.89971395&s=3402715231638&zoomLevel=17&segments=253557231#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.541255687&lon=32.90395594&s=3402715231638&zoomLevel=17&segments=255629354#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.543317147&lon=32.90881183&s=3402715231638&zoomLevel=17&segments=255629355#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.545270497&lon=32.91237896&s=3402715231638&zoomLevel=17&segments=255629351#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.540916627&lon=32.90344851&s=3402715231638&zoomLevel=17&segments=255629331#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.568782327&lon=32.92473692&s=3402715231638&zoomLevel=17&segments=255629832#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.544763237&lon=32.91218395&s=3402715231638&zoomLevel=17&segments=255629323#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.546275197&lon=32.91702358&s=3402715231638&zoomLevel=17&segments=255629389#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.546515597&lon=32.92274740&s=3402715231638&zoomLevel=17&segments=255629390#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.546627887&lon=32.92685239&s=3402715231638&zoomLevel=17&segments=255629383#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.583122237&lon=32.93053031&s=3402715231638&zoomLevel=17&segments=255629629#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.619138587&lon=32.94338448&s=3402715231638&zoomLevel=17&segments=260178087#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.621981547&lon=32.94409823&s=3402715231638&zoomLevel=17&segments=260178092#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.625961107&lon=32.94444723&s=3402715231638&zoomLevel=17&segments=260178097#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.573661477&lon=32.93309765&s=3402715231638&zoomLevel=17&segments=255629831#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=47.277517207&lon=33.25909802&s=3402715231638&zoomLevel=17&segments=342744106#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=47.281057337&lon=33.26347028&s=3402715231638&zoomLevel=17&segments=340780975#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=47.281704147&lon=33.26402241&s=3402715231638&zoomLevel=17&segments=340780979#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=47.516335357&lon=33.27772682&s=3402715231638&zoomLevel=17&segments=259477985#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.854164597&lon=33.38057919&s=3402715231638&zoomLevel=17&segments=205209474#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.730347827&lon=33.40563777&s=3402715231638&zoomLevel=17&segments=248919865#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.848185617&lon=33.39554674&s=3402715231638&zoomLevel=17&segments=148763298#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.431989397&lon=33.51177846&s=3402715231638&zoomLevel=17&segments=319596480#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.381575747&lon=33.53300412&s=3402715231638&zoomLevel=17&segments=177780490#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.392713667&lon=33.52720767&s=3402715231638&zoomLevel=17&segments=408720868#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.383551087&lon=33.53193685&s=3402715231638&zoomLevel=17&segments=408720869#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.380563307&lon=33.53791640&s=3402715231638&zoomLevel=17&segments=213802322#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.380827577&lon=33.53383400&s=3402715231638&zoomLevel=17&segments=213802308#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.472860267&lon=33.50057760&s=3402715231638&zoomLevel=17&segments=318706403#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.512764337&lon=33.49483365&s=3402715231638&zoomLevel=17&segments=338468985#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.489742387&lon=33.49931276&s=3402715231638&zoomLevel=17&segments=338468800#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.572954637&lon=33.49115548&s=3402715231638&zoomLevel=17&segments=338469241#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.557447547&lon=33.48862299&s=3402715231638&zoomLevel=17&segments=338469238#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.538150567&lon=33.48929550&s=3402715231638&zoomLevel=17&segments=338469235#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.648071927&lon=33.47624594&s=3402715231638&zoomLevel=17&segments=338470258#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.591786777&lon=33.49002965&s=3402715231638&zoomLevel=17&segments=338470259#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.690598137&lon=33.46551277&s=3402715231638&zoomLevel=17&segments=248767452#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.799958877&lon=33.55177756&s=3402715231638&zoomLevel=17&segments=188840107#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813171597&lon=33.52083403&s=3402715231638&zoomLevel=17&segments=332573664#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812943977&lon=33.51762342&s=3402715231638&zoomLevel=17&segments=314637043#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812654667&lon=33.51347153&s=3402715231638&zoomLevel=17&segments=403833090#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812707557&lon=33.51473633&s=3402715231638&zoomLevel=17&segments=403833089#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812643657&lon=33.51253836&s=3402715231638&zoomLevel=17&segments=403833126#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812678857&lon=33.51201168&s=3402715231638&zoomLevel=17&segments=403833127#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.810166297&lon=33.53568313&s=3402715231638&zoomLevel=17&segments=188840275#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.801148287&lon=33.47601186&s=3402715231638&zoomLevel=17&segments=384410823#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813556457&lon=33.49803585&s=3402715231638&zoomLevel=17&segments=314654971#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813090137&lon=33.50743859&s=3402715231638&zoomLevel=17&segments=359725022#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812737447&lon=33.51115029&s=3402715231638&zoomLevel=17&segments=359725023#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813467337&lon=33.53076586&s=3402715231638&zoomLevel=17&segments=403833626#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813420337&lon=33.53114168&s=3402715231638&zoomLevel=17&segments=403833625#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813578977&lon=33.52619060&s=3402715231638&zoomLevel=17&segments=403833651#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813647287&lon=33.52709214&s=3402715231638&zoomLevel=17&segments=403833652#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813171597&lon=33.52083403&s=3402715231638&zoomLevel=17&segments=403833685#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.797186317&lon=33.47359976&s=3402715231638&zoomLevel=17&segments=188844260#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813098897&lon=33.50443808&s=3402715231638&zoomLevel=17&segments=161570248#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813444007&lon=33.50426642&s=3402715231638&zoomLevel=17&segments=161570269#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813444007&lon=33.50426642&s=3402715231638&zoomLevel=17&segments=188882912#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813377237&lon=33.49621172&s=3402715231638&zoomLevel=17&segments=314637935#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813291677&lon=33.50559736&s=3402715231638&zoomLevel=17&segments=314637830#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812522147&lon=33.48786964&s=3402715231638&zoomLevel=17&segments=384039426#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812754397&lon=33.49004134&s=3402715231638&zoomLevel=17&segments=384039425#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813564467&lon=33.50353418&s=3402715231638&zoomLevel=17&segments=314656705#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813792247&lon=33.50169873&s=3402715231638&zoomLevel=17&segments=314656706#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812986617&lon=33.49228242&s=3402715231638&zoomLevel=17&segments=188884483#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813157337&lon=33.49404362&s=3402715231638&zoomLevel=17&segments=188884515#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813102577&lon=33.53131918&s=3402715231638&zoomLevel=17&segments=188841297#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813216247&lon=33.53104678&s=3402715231638&zoomLevel=17&segments=188841296#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813086417&lon=33.53187530&s=3402715231638&zoomLevel=17&segments=188841347#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812660177&lon=33.53208629&s=3402715231638&zoomLevel=17&segments=188841346#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812871277&lon=33.49113433&s=3402715231638&zoomLevel=17&segments=384039417#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.811542437&lon=33.50643752&s=3402715231638&zoomLevel=17&segments=188890205#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813387097&lon=33.50473313&s=3402715231638&zoomLevel=17&segments=314637699#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812345977&lon=33.48622230&s=3402715231638&zoomLevel=17&segments=188890320#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813699327&lon=33.49945873&s=3402715231638&zoomLevel=17&segments=383195510#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813734177&lon=33.49980581&s=3402715231638&zoomLevel=17&segments=383195509#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813341867&lon=33.53171116&s=3402715231638&zoomLevel=17&segments=188841089#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813074017&lon=33.51945765&s=3402715231638&zoomLevel=17&segments=407562114#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813133967&lon=33.52030325&s=3402715231638&zoomLevel=17&segments=407562113#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813528437&lon=33.53014974&s=3402715231638&zoomLevel=17&segments=188841102#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812392117&lon=33.50534603&s=3402715231638&zoomLevel=17&segments=188890264#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.812983097&lon=33.50458685&s=3402715231638&zoomLevel=17&segments=188890265#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.228662337&lon=33.62282356&s=3402715231638&zoomLevel=17&segments=370060962#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.253503397&lon=33.60984689&s=3402715231638&zoomLevel=17&segments=370060963#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.299449917&lon=33.58312619&s=3402715231638&zoomLevel=17&segments=333094781#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.335411547&lon=33.56017836&s=3402715231638&zoomLevel=17&segments=207157770#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.347625847&lon=33.55259605&s=3402715231638&zoomLevel=17&segments=177781086#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.348766407&lon=33.55239686&s=3402715231638&zoomLevel=17&segments=207153503#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.380735847&lon=33.53997000&s=3402715231638&zoomLevel=17&segments=406970196#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.378364847&lon=33.62672535&s=3402715231638&zoomLevel=17&segments=338468154#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.380413567&lon=33.54175206&s=3402715231638&zoomLevel=17&segments=406970231#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.380610987&lon=33.54090726&s=3402715231638&zoomLevel=17&segments=406970230#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.369425737&lon=33.58180953&s=3402715231638&zoomLevel=17&segments=338468001#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.356698587&lon=33.55993494&s=3402715231638&zoomLevel=17&segments=207155704#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.351393207&lon=33.55352222&s=3402715231638&zoomLevel=17&segments=207154925#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.354486207&lon=33.55733397&s=3402715231638&zoomLevel=17&segments=207154926#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.380168857&lon=33.54236879&s=3402715231638&zoomLevel=17&segments=360860473#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.378325357&lon=33.54573524&s=3402715231638&zoomLevel=17&segments=403878355#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.371513297&lon=33.55205819&s=3402715231638&zoomLevel=17&segments=403878356#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.364197367&lon=33.55745648&s=3402715231638&zoomLevel=17&segments=207188647#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.361871267&lon=33.55894884&s=3402715231638&zoomLevel=17&segments=207188646#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.394080447&lon=33.67724187&s=3402715231638&zoomLevel=17&segments=338468153#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.406115917&lon=33.71260329&s=3402715231638&zoomLevel=17&segments=338467501#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.408024347&lon=33.71991067&s=3402715231638&zoomLevel=17&segments=338467514#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.407832147&lon=33.71860087&s=3402715231638&zoomLevel=17&segments=338467515#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.405589917&lon=33.71118290&s=3402715231638&zoomLevel=17&segments=338467778#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.405007987&lon=33.70963998&s=3402715231638&zoomLevel=17&segments=338467779#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.406943067&lon=33.71481742&s=3402715231638&zoomLevel=17&segments=347076118#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.428300587&lon=33.78224826&s=3402715231638&zoomLevel=17&segments=359645077#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.407397437&lon=33.71641242&s=3402715231638&zoomLevel=17&segments=347076116#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.429266347&lon=33.79120083&s=3402715231638&zoomLevel=17&segments=359645076#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.417263447&lon=33.74846018&s=3402715231638&zoomLevel=17&segments=359645074#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.437842207&lon=33.87305260&s=3402715231638&zoomLevel=17&segments=337719379#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.430865567&lon=33.80627591&s=3402715231638&zoomLevel=17&segments=359644112#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.435919777&lon=33.85457281&s=3402715231638&zoomLevel=17&segments=359644066#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.433022677&lon=33.82678951&s=3402715231638&zoomLevel=17&segments=359644093#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.968127547&lon=33.83871465&s=3402715231638&zoomLevel=17&segments=260626175#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.453114907&lon=33.88016588&s=3402715231638&zoomLevel=17&segments=337716795#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.461102407&lon=33.88393691&s=3402715231638&zoomLevel=17&segments=337716794#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.450786237&lon=33.87718100&s=3402715231638&zoomLevel=17&segments=407715428#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.450237777&lon=33.87648229&s=3402715231638&zoomLevel=17&segments=407715430#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.445104707&lon=33.87363811&s=3402715231638&zoomLevel=17&segments=337715776#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.437842207&lon=33.87305260&s=3402715231638&zoomLevel=17&segments=337719363#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.442508427&lon=33.87341907&s=3402715231638&zoomLevel=17&segments=402267550#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.439193307&lon=33.87312083&s=3402715231638&zoomLevel=17&segments=337719364#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.441698047&lon=33.87335070&s=3402715231638&zoomLevel=17&segments=402267549#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.451259197&lon=33.87778352&s=3402715231638&zoomLevel=17&segments=402267411#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.451826427&lon=33.87850615&s=3402715231638&zoomLevel=17&segments=402267408#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.446716957&lon=33.87377413&s=3402715231638&zoomLevel=17&segments=337715512#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.445701747&lon=33.87368848&s=3402715231638&zoomLevel=17&segments=402267294#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.446193007&lon=33.87372993&s=3402715231638&zoomLevel=17&segments=337715524#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.446015257&lon=33.87371493&s=3402715231638&zoomLevel=17&segments=402267295#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.447251587&lon=33.87381924&s=3402715231638&zoomLevel=17&segments=337715033#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.469089947&lon=33.88417282&s=3402715231638&zoomLevel=17&segments=337721292#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.918764677&lon=33.94482334&s=3402715231638&zoomLevel=17&segments=260627560#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.939915797&lon=33.90683522&s=3402715231638&zoomLevel=17&segments=260626864#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.935341157&lon=33.91512592&s=3402715231638&zoomLevel=17&segments=260627036#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.946343527&lon=33.89524539&s=3402715231638&zoomLevel=17&segments=260626554#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.801825897&lon=34.01370801&s=3402715231638&zoomLevel=17&segments=260677455#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.808850897&lon=34.01504167&s=3402715231638&zoomLevel=17&segments=260677454#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.815122787&lon=34.01585469&s=3402715231638&zoomLevel=17&segments=260677437#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.905998217&lon=34.03321273&s=3402715231638&zoomLevel=17&segments=260631577#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.902963667&lon=33.99857481&s=3402715231638&zoomLevel=17&segments=260628062#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.908084757&lon=34.08673956&s=3402715231638&zoomLevel=17&segments=260631962#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.901578977&lon=34.10305075&s=3402715231638&zoomLevel=17&segments=260670097#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.886769327&lon=34.04832620&s=3402715231638&zoomLevel=17&segments=260676645#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.900418787&lon=34.11568920&s=3402715231638&zoomLevel=17&segments=260670183#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.907552347&lon=34.04885553&s=3402715231638&zoomLevel=17&segments=260631867#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.909247377&lon=34.06525192&s=3402715231638&zoomLevel=17&segments=260631909#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.813827477&lon=34.18198681&s=3402715231638&zoomLevel=17&segments=260673210#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.848602737&lon=34.16824786&s=3402715231638&zoomLevel=17&segments=260673115#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.849542577&lon=34.16352727&s=3402715231638&zoomLevel=17&segments=260673114#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.843793717&lon=34.17420413&s=3402715231638&zoomLevel=17&segments=260673107#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.841703417&lon=34.17570461&s=3402715231638&zoomLevel=17&segments=260673108#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.884048747&lon=34.14204711&s=3402715231638&zoomLevel=17&segments=347277095#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.892800897&lon=34.13204143&s=3402715231638&zoomLevel=17&segments=260670748#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.865238007&lon=34.15209152&s=3402715231638&zoomLevel=17&segments=347277096#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.890131037&lon=34.13367877&s=3402715231638&zoomLevel=17&segments=260670752#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.901825827&lon=34.12915508&s=3402715231638&zoomLevel=17&segments=260670681#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.901602687&lon=34.12687669&s=3402715231638&zoomLevel=17&segments=260670678#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.897064497&lon=34.13183020&s=3402715231638&zoomLevel=17&segments=260670697#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.895923637&lon=34.13195763&s=3402715231638&zoomLevel=17&segments=260670698#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.899540667&lon=34.13146952&s=3402715231638&zoomLevel=17&segments=260670692#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.890477477&lon=34.13778255&s=3402715231638&zoomLevel=17&segments=260670968#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=47.292790547&lon=34.24129710&s=3402715231638&zoomLevel=17&segments=205304921#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=47.281381117&lon=34.26881116&s=3402715231638&zoomLevel=17&segments=205305111#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=47.285498727&lon=34.25644624&s=3402715231638&zoomLevel=17&segments=205304973#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=47.280682457&lon=34.27454040&s=3402715231638&zoomLevel=17&segments=205305256#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=47.126548287&lon=34.41467915&s=3402715231638&zoomLevel=17&segments=205307891#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=47.133646317&lon=34.40791455&s=3402715231638&zoomLevel=17&segments=205307885#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.128618807&lon=34.60056769&s=3402715231638&zoomLevel=17&segments=294670350#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.338439667&lon=34.73999688&s=3402715231638&zoomLevel=17&segments=259633007#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.057661437&lon=34.83306783&s=3402715231638&zoomLevel=17&segments=405479515#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.056318297&lon=34.83316656&s=3402715231638&zoomLevel=17&segments=405479514#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.060059917&lon=34.83281642&s=3402715231638&zoomLevel=17&segments=405479512#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.058693007&lon=34.83299200&s=3402715231638&zoomLevel=17&segments=405479511#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.016668767&lon=34.83851003&s=3402715231638&zoomLevel=17&segments=212689185#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.016273877&lon=34.83864414&s=3402715231638&zoomLevel=17&segments=212689180#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.134464237&lon=34.81596197&s=3402715231638&zoomLevel=17&segments=310198386#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.134464237&lon=34.81596197&s=3402715231638&zoomLevel=17&segments=313657584#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.130771347&lon=34.81762627&s=3402715231638&zoomLevel=17&segments=313657585#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=46.137534077&lon=34.81379411&s=3402715231638&zoomLevel=17&segments=310469667#lockRank=2',
    'https://waze.com/uk/editor?env=row&lat=45.937976147&lon=34.86846140&s=3402715231638&zoomLevel=17&segments=197881111#lockRank=2',

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
          if (++counter == counter_save){ // считаем автосохранения
            await Promise.all(W.commands.request('save:start'),);
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
          setTimeout(() => resolve(), 500)
          //resolve()
        },
        {
          once: true,
        },
      );
    });
  }
  function waitLoadingData(id) {
    return new Promise((resolve) => {
      const segment = W.model.segments.getObjectById(id);

      if (!segment) {
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
