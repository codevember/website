require('es6-promise').polyfill();
import './style/index.styl';
import Vue from 'vue';
import router from './router';
import Api from './Api';
import configDB from '../config/database';
import Header from 'layouts/header/Header.js';

function onApiInit() {
  const app = new Vue({
    router,
    components: {
      'app-header': Header
    }
  });
  app.$mount('#app');
}

Api.init(configDB.apiKey, configDB.authDomain, configDB.databaseName)
  .then(onApiInit);
