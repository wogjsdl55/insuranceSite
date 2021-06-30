import Vue from 'vue'
import Router from 'vue-router'
import MainArea from '@/components/MainArea'
import BoardWrite from '@/components/BoardWrite'
import BoardDetail from '@/components/BoardDetail'
import IntroPage from '@/components/IntroPage'
import TipPage from '@/components/TipPage'
import SearchPage from '@/components/SearchPage'
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
      path: '/board/Detail:id?',
      name: 'BoardDetail',
      component: BoardDetail
    },
    {
      path: '/intro',
      name: 'IntroPage',
      component: IntroPage,
    },
    {
      path: '/tip',
      name: 'TipPage',
      component: TipPage,
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage,
    },
  ]
})
