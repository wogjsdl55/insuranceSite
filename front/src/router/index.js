import Vue from 'vue'
import Router from 'vue-router'
import MainArea from '@/components/MainArea'
import BoardWrite from '@/components/BoardWrite'
import BoardDetail from '@/components/BoardDetail'
import VueMeta from 'vue-meta'
import axios from 'axios'

Vue.use(VueMeta)
Vue.use(Router)
Vue.prototype.$http=axios;

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainArea',
      component: MainArea,
    },
    {
        path: '/board:id?',
        name: 'BoardWrite',
        component: BoardWrite
    },
    {
      path: '/boardDetail:id?',
      name: 'BoardDetail',
      component: BoardDetail
  }
  ]
})
