import firestore from '@react-native-firebase/firestore';

export async function loadDBData() {
  var ordklasser = {};
  var satsdelar = {};

  function getCollection(collection) {
    var sentences = [];
    firestore()
      .collection(collection)
      .get()
      .then((querySnapshot) => {
        sentences = querySnapshot.docs.map((doc) => doc.data());
        if (collection == 'ordklasser') ordklassDict(sentences);
        if (collection == 'satsdelar') satsdelarDict(sentences);
        return;
      });
  }

  function ordklassDict(sentences) {
    sentences.forEach((element) => {
      ordklasser[element.tag] = {desc: element.desc, name: element.name};
    });
    global.ordklasser = ordklasser;
  }

  function satsdelarDict(sentences) {
    sentences.forEach((element) => {
      satsdelar[element.name] = element.desc;
    });
    global.satsdelar = satsdelar;
  }

  getCollection('satsdelar');
  getCollection('ordklasser');
}
