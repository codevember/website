import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Api from 'Api';

import Home from './views/home/Home';
import Project from './components/project/Project';
import About from './views/about/About';
import Login from './views/login/Login';
import Admin from './views/admin/Admin';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/day/' + new Date().getDate(),
      component: Home,
      children:[
        { path: '/day/:id',
        name: 'day',
          components: {
              projView: Project
          }
        },
      ]
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/login',
      component: Login
    },

    {
      path: '/admin',
      component: Admin,
      beforeEnter(to, from, next) {
        if (!Api.getCurrentUser()) {
          next('/login');
        } else {
          next();
        }
      }
    }
  ]
});

module.exports = router;
