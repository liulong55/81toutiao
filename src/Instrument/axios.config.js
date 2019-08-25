import axios from 'axios' // 引入axios
import { Message } from 'element-ui' // 单独引入message模块
import JSONBig from 'json-bigint' // 引入大数字处理模块
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 优化设置baseUrl,后台接口地址优化
// axios.defaults 默认选项
// 处理大数字
axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data)
}]
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
//   console.log(config.headers)   //因为前面加过,这已经有了,所以在这加
// 进行配置注入  token令牌
  let userInfo = window.localStorage.getItem('user-onfo') // 获取用户储存信息,里面有token
  let token = userInfo ? JSON.parse(userInfo).token : null // 获取token
  config.headers.Authorization = `Bearer ${token}` // 直接将token令牌注入到请求参数中
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response) // 内容是请求回来的数据,data等等
  return response.data ? response.data : {} // 只返回data, 如果他有,就返回,没有就返回空对象的,要不然会报错
}, function (error) {
  // 对响应错误做点什么
//   console.log(arguments)  // 里面有response.status状态码
  let code = error.response ? error.response.status : '' // 获取错误的状态码
  let message = '' // 先设置给空,要不报错
  switch (code) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号码不正确'
      break
    case 409:
      message = '用户名已存在'
      break
    case 401:
      // 针对toekn过去或失效,特殊处理
      message = 'toekn过去或未传'
      window.localStorage.clear() // 只清除本项目的缓存
      window.location.hash = '#/login' // 用hash值,跳转到登录页
      break
    default:
      message = '未知错误'
      break
  }
  Message({ message, type: 'warning' })
  return new Promise(function () {}) // 如果不归就会抛出异常控制台会看到错误
  // 返回一个新的promise对象就意味着一个新的没有错误的承诺返回了之前的错误被终止了
})
export default axios // 导出
