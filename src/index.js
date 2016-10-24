require('es6-promise').polyfill();
import 'gsap';
import './style/index.styl';
import Vue from 'vue';
import router from './router';
import Api from 'lib/Api';
import configDB from '../config/database';
import Footer from 'layouts/footer/Footer';

function onApiInit() {
  const app = new Vue({
    router,
    components: {
      'app-footer': Footer
    }
  });
  app.$mount('#app');
}

Api.init(configDB.apiKey, configDB.authDomain, configDB.databaseName)
  .then(onApiInit);
