/* 路由 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import List from '../components/List'
import Collect from '../components/Collect'
import Add from '../components/Add'
import Detail from '../components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: './',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        KeepAlive: true // 缓存数据
      }
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/collect',
      component: Collect
    },
    {
      path: '/Add',
      component: Add
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/detail/:bid',
      component: Detail,
      name: 'detail'
    }
  ]
})
