import axios from 'axios' // 引入axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 优化设置baseUrl,后台接口地址优化
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
  return response.data ? response.data : {} // 只返回data,如果他有,就返回,没有就返回空对象的,要不然会报错
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default axios // 导出
