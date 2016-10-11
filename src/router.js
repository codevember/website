import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from './views/home/Home';
import About from './views/about/About';

module.exports = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/about', component: About}
  ]
});
