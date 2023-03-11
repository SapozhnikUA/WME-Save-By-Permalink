// ==UserScript==
// @name        WME Update Segment By Permalink
// @namespace   WazeUA
// @version     0.0.7
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
    'https://waze.com/uk/editor?env=row&lat=50.531257197&lon=30.48408573&s=3402715231638&zoomLevel=17&segments=411270531#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.529401907&lon=30.48287892&s=3402715231638&zoomLevel=17&segments=411270632#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.528635187&lon=30.48389202&s=3402715231638&zoomLevel=17&segments=411270665#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.529139357&lon=30.47974352&s=3402715231638&zoomLevel=17&segments=411270671#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.529878037&lon=30.48426297&s=3402715231638&zoomLevel=17&segments=411270677#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.529209287&lon=30.48534456&s=3402715231638&zoomLevel=17&segments=411270688#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.528066937&lon=30.48332784&s=3402715231638&zoomLevel=17&segments=411272112#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.343454447&lon=30.54806339&s=3402715231638&zoomLevel=17&segments=351799255#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.401355797&lon=30.55433334&s=3402715231638&zoomLevel=17&segments=250464864#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.451537547&lon=30.59640438&s=3402715231638&zoomLevel=17&segments=103466297#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.452128007&lon=30.59805826&s=3402715231638&zoomLevel=17&segments=103466302#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.453561897&lon=30.59701758&s=3402715231638&zoomLevel=17&segments=103466361#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.452977477&lon=30.59834583&s=3402715231638&zoomLevel=17&segments=334772187#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.452977477&lon=30.59834583&s=3402715231638&zoomLevel=17&segments=334772234#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.844799277&lon=30.15835306&s=3402715231638&zoomLevel=17&segments=349494004#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.685512607&lon=30.19381190&s=3402715231638&zoomLevel=17&segments=408766319#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.685376387&lon=30.19365888&s=3402715231638&zoomLevel=17&segments=408766318#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.685394667&lon=30.19349040&s=3402715231638&zoomLevel=17&segments=408766314#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.803270397&lon=30.19842988&s=3402715231638&zoomLevel=17&segments=409009141#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.803282157&lon=30.19820965&s=3402715231638&zoomLevel=17&segments=409009144#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.803161337&lon=30.19816568&s=3402715231638&zoomLevel=17&segments=409009145#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.696709887&lon=34.61427793&s=3402715231638&zoomLevel=17&segments=399451866#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.696884937&lon=34.61422463&s=3402715231638&zoomLevel=17&segments=399451865#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.697042767&lon=34.61430536&s=3402715231638&zoomLevel=17&segments=379088081#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.697361897&lon=34.63739848&s=3402715231638&zoomLevel=17&segments=383532453#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.422243487&lon=34.77639414&s=3402715231638&zoomLevel=17&segments=166941570#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.045966287&lon=36.15559635&s=3402715231638&zoomLevel=17&segments=335931489#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.045966287&lon=36.15559635&s=3402715231638&zoomLevel=17&segments=405660123#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.046393047&lon=36.15949103&s=3402715231638&zoomLevel=17&segments=323348615#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.047661447&lon=36.15992867&s=3402715231638&zoomLevel=17&segments=332990137#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.047220997&lon=36.15815995&s=3402715231638&zoomLevel=17&segments=373900240#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.047100907&lon=36.15779430&s=3402715231638&zoomLevel=17&segments=405660124#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.887239007&lon=36.29002493&s=3402715231638&zoomLevel=17&segments=198610497#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.971657147&lon=36.30825067&s=3402715231638&zoomLevel=17&segments=178544963#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.971408727&lon=36.30673790&s=3402715231638&zoomLevel=17&segments=143709261#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.916049837&lon=24.93512887&s=3402715231638&zoomLevel=17&segments=412226782#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.872110777&lon=23.89604135&s=3402715231638&zoomLevel=17&segments=176407520#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.581303527&lon=34.10922627&s=3402715231638&zoomLevel=17&segments=408975474#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.582025097&lon=34.10861926&s=3402715231638&zoomLevel=17&segments=408975498#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.581252177&lon=34.10771115&s=3402715231638&zoomLevel=17&segments=408975003#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.581762437&lon=34.10849413&s=3402715231638&zoomLevel=17&segments=399258757#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.143437947&lon=34.16815252&s=3402715231638&zoomLevel=17&segments=414349581#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.182880837&lon=34.37070406&s=3402715231638&zoomLevel=17&segments=420221837#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.182880837&lon=34.37070406&s=3402715231638&zoomLevel=17&segments=420221832#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=47.971917507&lon=34.97683773&s=3402715231638&zoomLevel=17&segments=365181831#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.025369827&lon=34.95031726&s=3402715231638&zoomLevel=17&segments=365204967#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.024048357&lon=34.95104224&s=3402715231638&zoomLevel=17&segments=365205068#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=47.875769877&lon=35.29772747&s=3402715231638&zoomLevel=17&segments=408934376#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=47.875819957&lon=35.29751363&s=3402715231638&zoomLevel=17&segments=408934375#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=49.953479927&lon=28.61449659&s=3402715231638&zoomLevel=17&segments=377669989#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.284171167&lon=29.52580780&s=3402715231638&zoomLevel=17&segments=199124724#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.284345197&lon=29.52750571&s=3402715231638&zoomLevel=17&segments=199124718#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.282420987&lon=29.52030820&s=3402715231638&zoomLevel=17&segments=199173572#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=50.282383287&lon=29.51927958&s=3402715231638&zoomLevel=17&segments=199173558#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.855084037&lon=29.14037114&s=3402715231638&zoomLevel=17&segments=346396732#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.865011687&lon=29.12492068&s=3402715231638&zoomLevel=17&segments=209142235#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=46.785708447&lon=32.29651387&s=3402715231638&zoomLevel=17&segments=369775816#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=46.785462297&lon=32.29664103&s=3402715231638&zoomLevel=17&segments=369775820#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=46.785487407&lon=32.29742528&s=3402715231638&zoomLevel=17&segments=369776251#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=46.785790167&lon=32.29740085&s=3402715231638&zoomLevel=17&segments=369776252#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=46.743184887&lon=32.39038117&s=3402715231638&zoomLevel=17&segments=369777707#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=46.744009337&lon=32.38956906&s=3402715231638&zoomLevel=17&segments=231641175#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=46.125079807&lon=32.88336663&s=3402715231638&zoomLevel=17&segments=188898947#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.353809097&lon=36.83989468&s=3402715231638&zoomLevel=17&segments=391495068#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.336246337&lon=36.94432412&s=3402715231638&zoomLevel=17&segments=391495134#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.172137347&lon=37.32135782&s=3402715231638&zoomLevel=17&segments=408866474#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.172429107&lon=37.32162042&s=3402715231638&zoomLevel=17&segments=261562562#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.172279887&lon=37.32166313&s=3402715231638&zoomLevel=17&segments=261562561#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=47.910574887&lon=37.67486899&s=3402715231638&zoomLevel=17&segments=401052714#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=47.911323327&lon=37.67865828&s=3402715231638&zoomLevel=17&segments=401052734#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=47.911362407&lon=37.67762292&s=3402715231638&zoomLevel=17&segments=401052732#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=47.910429757&lon=37.67872118&s=3402715231638&zoomLevel=17&segments=401052729#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.064058667&lon=37.76622776&s=3402715231638&zoomLevel=17&segments=246370215#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=47.969887057&lon=37.93933190&s=3402715231638&zoomLevel=17&segments=149076179#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=47.972930007&lon=37.94022500&s=3402715231638&zoomLevel=17&segments=149074838#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=47.972930007&lon=37.94022500&s=3402715231638&zoomLevel=17&segments=149074840#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.462875607&lon=39.28404187&s=3402715231638&zoomLevel=17&segments=408227828#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.466574937&lon=39.28120946&s=3402715231638&zoomLevel=17&segments=408227827#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.467888707&lon=39.28650913&s=3402715231638&zoomLevel=17&segments=408227601#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.464088587&lon=39.28974961&s=3402715231638&zoomLevel=17&segments=408227602#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.462743997&lon=39.28417062&s=3402715231638&zoomLevel=17&segments=408227627#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.544398197&lon=30.22944940&s=3402715231638&zoomLevel=17&segments=350004283#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=51.451487557&lon=31.30558011&s=3402715231638&zoomLevel=17&segments=345435320#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=51.456229537&lon=31.30283587&s=3402715231638&zoomLevel=17&segments=357186812#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=51.455689227&lon=31.30434102&s=3402715231638&zoomLevel=17&segments=421315549#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=51.453082067&lon=31.30522474&s=3402715231638&zoomLevel=17&segments=421315544#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=51.455224307&lon=31.30494452&s=3402715231638&zoomLevel=17&segments=421315543#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=51.458249597&lon=31.30124301&s=3402715231638&zoomLevel=17&segments=421315596#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=51.456900587&lon=31.30240912&s=3402715231638&zoomLevel=17&segments=421315593#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=51.461395057&lon=31.29886022&s=3402715231638&zoomLevel=17&segments=421315595#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=48.561241407&lon=22.95529075&s=3402715231638&zoomLevel=17&segments=149148534#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=44.545246047&lon=33.53802840&s=3402715231638&zoomLevel=17&segments=177967071#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=44.542918657&lon=33.59318709&s=3402715231638&zoomLevel=17&segments=420672824#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=44.551917547&lon=33.59855002&s=3402715231638&zoomLevel=17&segments=420912588#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=44.543038037&lon=33.59330762&s=3402715231638&zoomLevel=17&segments=422282275#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=44.545376307&lon=33.59625201&s=3402715231638&zoomLevel=17&segments=422282276#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=44.547420657&lon=33.59651717&s=3402715231638&zoomLevel=17&segments=420238866#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=45.936270637&lon=33.81263960&s=3402715231638&zoomLevel=17&segments=152850286#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=45.936490747&lon=33.81338258&s=3402715231638&zoomLevel=17&segments=152850276#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=45.016414467&lon=34.16511875&s=3402715231638&zoomLevel=17&segments=400201447#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=45.017339757&lon=34.16274570&s=3402715231638&zoomLevel=17&segments=404309498#lockRank=4',
    'https://waze.com/uk/editor?env=row&lat=45.317878797&lon=36.49005525&s=3402715231638&zoomLevel=17&segments=401019417#lockRank=4',
    
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
    var counter_save = 100; // значение автосохранения
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
