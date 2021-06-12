import Vue from 'vue'
import Router from 'vue-router'
import MainArea from '@/components/MainArea'
import BoardWrite from '@/components/BoardWrite'
import BoardDetail from '@/components/BoardDetail'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainArea',
      component: MainArea,
    },
    {
        path: '/board',
        name: 'BoardWrite',
        component: BoardWrite
    },
    {
      path: '/BoardDetail',
      name: 'BoardDetail',
      component: BoardDetail
  }
  ]
})
