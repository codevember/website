import firebase from 'firebase';

class Api {
  constructor() {}

  init(apiKey, authDomain, dbName) {
    this.apiKey = apiKey;
    this.authDomain = authDomain;
    this.url = 'https://' + dbName + '.firebaseio.com/';
    this.dbName = dbName;
    this.initFirebase();
    this.db = firebase.database();
    this.contribs = this.db.ref('contributions');
  }

  initFirebase() {
    firebase.initializeApp({
      apiKey: this.apiKey,
      authDomain: this.authDomain,
      databaseURL: this.url
    });
  }

  saveContribution(value) {
    let newContrib = this.contribs.push();
    newContrib.set(value);
  }

  getAllContributions(callback) {
    this.contribs.once('value').then((snapshot) => {
      let contribs = [];
      snapshot.forEach((data) => {
        contribs.push(data.val());
      });
      callback(contribs);
    });
  }

  getContributionsOfDay(day, callback) {
    this.contribs.orderByChild('date').equalTo(day).once('value').then((snapshot) => {
      let contribs = [];
      snapshot.forEach((data) => {
        contribs.push(data.val());
      });
      callback(contribs);
    });
  }
}

export default new Api();
