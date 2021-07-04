// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue2Editor from "vue2-editor";
import VueKakaoSdk from 'vue-kakao-sdk'
import VueCarousel from 'vue-carousel';

Vue.config.productionTip = false

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(Vue2Editor);
Vue.use(require('vue-moment'))
Vue.use(VueCarousel);

const apiKey = '75a2640b614195bf64ab80623e1f38ff'
Vue.use(VueKakaoSdk, { apiKey }) // apiKey 를 반드시 입력해줘야한다.

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

 