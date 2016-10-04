const firebase = require('firebase');

class Database {
  constructor(serviceAccountPath, dbName) {
    this.serviceAccountPath = serviceAccountPath;
    this.url = 'https://' + dbName + '.firebaseio.com/';
    this.dbName = dbName;
    this.initFirebase();
    this.db = firebase.database();
    this.contribs = this.db.ref('contributions');
    this.users = this.db.ref('users');
  }

  initFirebase() {
    firebase.initializeApp({
      serviceAccount: this.serviceAccountPath,
      databaseURL: this.url
    });
    console.log('[Database] - Connected to Firebase');
  }

  saveContribution(value) {
    let newContrib = this.contribs.push();
    newContrib.set(value);
    console.log('[Database] Saved new contribution (' + newContrib.key + ')');
  }

  getAllContributions(callback) {
    this.contribs.on('value', (snapshot) => {
      let contribs = [];
      snapshot.forEach((data) => {
        contribs.push(data.val());
      });
      callback(contribs);
    });
  }

  getContributionsOfDay(day, callback) {
    this.contribs.orderByChild('date').equalTo(day).on('value', (snapshot) => {
      let contribs = [];
      snapshot.forEach((data) => {
        contribs.push(data.val());
      });
      callback(contribs);
    });
  }

  saveUser(value) {
    let newUser = this.users.push();
    newUser.set(value);
    console.log('[Database] Saved new user (' + newUser.key + ')');
  }
}

module.exports = Database;
