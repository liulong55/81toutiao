import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入element组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' // 引入样式
import axios from 'axios' // 引入axios
import Component from './components/index' // 引入自定义组件
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 优化设置baseUrl
Vue.prototype.$axios = axios // 优化统一导入
Vue.use(ElementUI) // 全局用
Vue.use(Component) // 全局用
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
