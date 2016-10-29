import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Api from 'lib/Api';

import Home from './views/home/Home';
import About from './views/about/About';
import Contrib from './views/contrib/Contrib';
import Login from './views/login/Login';
import Admin from './views/admin/Admin';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: (to) => {
        let today = new Date();

        // COMMENT THIS FOR DEV
        // if (today.getMonth() !== 10) {
        //   return '/day/30';
        // }

        return '/day/' + today.getDate();
      }
    },
    {
      name: 'home',
      path: '/day/:day',
      component: Home
    },
    {
      name: 'about',
      path: '/about',
      component: About
    },
    {
      name: 'contrib',
      path: '/contrib/:slug',
      component: Contrib
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
