import Vue from 'vue'
import Router from 'vue-router'
import MainArea from '@/components/MainArea'
import BoardWrite from '@/components/BoardWrite'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainArea',
      component: MainArea
    },
    {
        path: '/board',
        name: 'BoardWrite',
        component: BoardWrite
    }
  ]
})
