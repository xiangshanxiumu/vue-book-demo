// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // 后面index.js可省略
import 'swiper/dist/css/swiper.css' // 导入swiper样式
import VueAwesomeSwiper from 'vue-awesome-swiper' // 全局导入轮播图插件
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper /* { default global options } */)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
