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
    return new Promise((resolve, reject) => {
      if (!this.user) {
        reject();
        return;
      }

      value.slug = this.generateSlug(value);
      let newContrib = this.contribs.push();
      newContrib.set(value);
      resolve();
    });
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

  generateSlug(value) {
    let slug = '';
    if (value.day < 10) {
      slug = '0';
    }
    slug += `${value.day} ${value.title} ${value.author}`;
    slug = slug.replace(/\s/g, '-').toLowerCase();

    return slug;
  }

  getContributionsOfDay(day) {
    return new Promise((resolve, reject) => {
      this.contribs.orderByChild('day').equalTo(day).once('value').then((snapshot) => {
        let contribs = [];
        snapshot.forEach((data) => {
          contribs.push(data.val());
        });
        resolve(contribs);
      });
    });
  }

  getContributionBySlug(slug) {
    return new Promise((resolve, reject) => {
      this.contribs.orderByChild('slug').equalTo(slug).once('value').then((snapshot) => {
        let obj;
        for (let id in snapshot.val()) {
          obj = snapshot.val()[id];
        }

        resolve(obj);
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
