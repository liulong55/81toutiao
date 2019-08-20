import leftaside from '../components/home/layout-aside.vue'
import layouthearder from '../components/home/layout-header.vue'

export default {
  install (Vue) {
    Vue.component('layout-aside', leftaside) // 注册左边菜单组件
    Vue.component('layout-header', layouthearder) // 注册右边头部组件
  }
}
