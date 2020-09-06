import * as axios from 'axios'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import EncryptHelper from 'kcs-common/utils/encryption-util'
import { Loading, Message } from 'element-ui'
import { ElLoadingComponent } from 'element-ui/types/loading'
import { removeToken } from './auth'

const http = axios.default.create({
  baseURL: '/api',
  timeout: 15000
})
// request拦截器
let loading: ElLoadingComponent
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    loading = Loading.service({ fullscreen: true })
    // 对请求方式为post，put的请求进行加密
    if (config.method === 'post' || config.method === 'put') {
      config.data = EncryptHelper.aesEncrypt(JSON.stringify(config.data))
    }
    config.headers = { 'Content-Type': 'application/json;charset=utf-8' }
    return config
  },
  (error: any) => {
    Message.error({
      offset: 60,
      message: '加载超时'
    })
    loading.close()
    return Promise.reject(error)
  }
)
// response拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    loading.close()
    // 对进行加密过的string进行解密
    if (response.data && typeof (response.data) === 'string') {
      response.data = EncryptHelper.aesDecrypt(response.data)
    }
    return response
  },
  (error: any) => {
    loading.close()
    let isDecrypt: boolean = error.response && error.response.data && typeof (error.response.data) === 'string'
    let msg: string = error.message
    if (isDecrypt) {
      try {
        msg = EncryptHelper.aesDecrypt(error.response.data)
      } catch (e) {
        msg = error.response.data
      }
    }
    Message.error({
      offset: 60,
      type: 'error',
      message: msg
    })
    const flag = error.response.config.url !== '/api/login'
    if (error.response.status === 401 && flag) {
      removeToken()
      location.reload()
    }
    return Promise.reject(error)
  }
)
export default http
