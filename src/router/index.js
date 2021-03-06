import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

import Admin from './modules/coframe.js'

Vue.use(Router)

import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: _import('login/index'),
    hidden: true,
  },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
]

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/index'),
        name: 'dashboard',
        meta: { title: '概要', icon: 'dashboard' ,noCache:true,},
      },
    ],
  },
  ...Admin,

  // ...ApiGateway,
  { path: '*', redirect: '/404', hidden: true },
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  // routes: constantRouterMap
  routes: constantRouterMap.concat(asyncRouterMap), //If u wan't to pass login, take effect this line
})
