import './style/index.styl';
import Vue from 'vue';
import router from './router';
import Api from './Api';
import configDB from '../config/database';

Api.init(configDB.apiKey, configDB.authDomain, configDB.databaseName);

new Vue({router}).$mount('#app');
