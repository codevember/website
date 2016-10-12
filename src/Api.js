import firebase from 'firebase';

class Api {
  constructor() {}

  init(apiKey, authDomain, dbName) {
    this.apiKey = apiKey;
    this.authDomain = authDomain;
    this.url = 'https://' + dbName + '.firebaseio.com/';
    this.dbName = dbName;
    this.user = undefined;
    return this.initFirebase();
  }

  initFirebase() {
    return new Promise((resolve, reject) => {
      firebase.initializeApp({
        apiKey: this.apiKey,
        authDomain: this.authDomain,
        databaseURL: this.url
      });

      this.db = firebase.database();
      this.contribs = this.db.ref('contributions');

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
        } else {
          this.user = undefined;
        }

        resolve();
      });
    });
  }

  saveContribution(value) {
    let newContrib = this.contribs.push();
    newContrib.set(value);
  }

  getAllContributions() {
    return new Promise((resolve, reject) => {
      this.contribs.once('value').then((snapshot) => {
        let contribs = [];
        snapshot.forEach((data) => {
          contribs.push(data.val());
        });
        resolve(contribs);
      });
    });
  }

  getContributionsOfDay(day) {
    return new Promise((resolve, reject) => {
      this.contribs.orderByChild('date').equalTo(day).once('value').then((snapshot) => {
        let contribs = [];
        snapshot.forEach((data) => {
          contribs.push(data.val());
        });
        resolve(contribs);
      });
    });
  }

  getCurrentUser() {
    if (this.user) {
      return this.user;
    }

    return firebase.auth().currentUser;
  }

  signin(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signout() {
    return firebase.auth().signOut();
  }
}

export default new Api();
