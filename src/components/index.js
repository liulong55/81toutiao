// 组件的全局注册
import leftaside from '../components/home/layout-aside.vue'
import layouthearder from '../components/home/layout-header.vue'
import breadCrumb from '../components/common/bread-crumb.vue'
// 富文本编辑器引入的
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor' // 富文本编辑器
import coverImg from './publish/cover-image.vue' // 发表文章,封面功能组件
import selectImg from './publish/select-images.vue' // 图片库
export default {
  install (Vue) {
    Vue.component('layout-aside', leftaside) // 注册左边菜单组件
    Vue.component('layout-header', layouthearder) // 注册右边头部组件
    Vue.component('bread-crumb', breadCrumb) // 注册全局面包屑
    Vue.component('quill-editor', quillEditor) // 注册全局富文本编辑器
    Vue.component('cover-image', coverImg) // 发表文章,封面功能组件
    Vue.component('select-images', selectImg) // 素材库
  }
}
