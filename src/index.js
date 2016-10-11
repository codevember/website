require('es6-promise').polyfill();
import './style/index.styl';
import Vue from 'vue';
import router from './router';
import Api from './Api';
import configDB from '../config/database';

function onApiInit() {
  const app = new Vue({router});
  app.$mount('#app');
}

Api.init(configDB.apiKey, configDB.authDomain, configDB.databaseName)
  .then(onApiInit);
