import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入element组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' // 引入样式
import axios from 'axios' // 引入axios
Vue.prototype.$axios = axios // 优化统一导入
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 优化设置baseUrl
Vue.use(ElementUI) // 全局用
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
