// 组件的全局注册
import leftaside from '../components/home/layout-aside.vue'
import layouthearder from '../components/home/layout-header.vue'
import breadCrumb from '../components/common/bread-crumb.vue'
export default {
  install (Vue) {
    Vue.component('layout-aside', leftaside) // 注册左边菜单组件
    Vue.component('layout-header', layouthearder) // 注册右边头部组件
    Vue.component('bread-crumb', breadCrumb) // 注册全局面包屑
  }
}
