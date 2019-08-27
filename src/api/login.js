import axios from '../Instrument/axios.config'
import URL from '../constant/api'
export function LoginByMobile (data) {
  return axios({
    method: 'post',
    url: URL.APP_LOGIN, // 由于地址是常量 而且有可能变化
    data // 参数
  })
}
// 相当于返回一个promise镀锡
