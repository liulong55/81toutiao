import Vue from 'vue'
import App from './App.vue'
import router from './permission' // 用了全局前置守卫,把router导出了,所以这跟换为那个文件
import ElementUI from 'element-ui' // 引入element组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' // 引入样式
import axios from './Instrument/axios.config' // 引入自定义axios
import Component from './components/index' // 引入自定义组件
Vue.prototype.$axios = axios // 优化统一导入
Vue.use(ElementUI) // 全局用
Vue.use(Component) // 全局用
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
