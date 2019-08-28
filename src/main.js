import Vue from 'vue'
import App from './App.vue'
import router from './permission' // 用了全局前置守卫,把router导出了,所以这跟换为那个文件
// import ElementUI from 'element-ui' // 引入element组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' // 引入样式
import axios from './Instrument/axios.config' // 引入自定义axios
import Component from './components/index' // 优化统一导入
// Vue.use(ElementUI) // 全局用
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  DatePicker,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Icon,
  Row,
  Col,
  Upload,
  Card,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  Message,
  MessageBox,
  Image
} from 'element-ui' // 引入自定义组件
Vue.prototype.$axios = axios // 引入自定义的axios
Vue.prototype.$axios = axios
Vue.use(Image)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Image)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.use(Component) // 全局用
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
