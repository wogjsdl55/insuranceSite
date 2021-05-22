import Vue from 'vue'
import Router from 'vue-router'
import MainArea from '@/components/MainArea'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainArea',
      component: MainArea
    },
  ]
})
