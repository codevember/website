import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import dayManager from '@/components/dayManager'
import about from '@/components/about'

import admin from '@/components/admin/admin'
import login from '@/components/admin/login'

import Api from 'backend-api/dist/browser.js'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      name: 'day',
      path: '/:year/day/:day',
      component: dayManager
    },
    {
      name: 'about',
      path: '/about',
      component: about
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      component: admin,
      beforeEnter (to, from, next) {
        if (!Api.getCurrentUser()) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
