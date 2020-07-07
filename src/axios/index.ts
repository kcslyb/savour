import * as axios from 'axios'
import {AxiosResponse, AxiosRequestConfig} from 'axios'
import {Loading, Message} from 'element-ui'
import {ElLoadingComponent} from 'element-ui/types/loading'


const request = axios.default.create({
  baseURL: 'api',
  timeout: 15000
})
// request拦截器
let loading: ElLoadingComponent
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    loading = Loading.service({fullscreen: true})
    config.headers = {'Content-Type': 'application/json;charset=utf-8'}
    return config
  },
  (error: any) => {
    Message.error({
      message: '加载超时',
    })
    loading.close()
    return Promise.reject(error)
  }
)
// response拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    loading.close()
    return response
  },
  (error: any) => {
    loading.close()
    let msg: string = error.message
    Message.error({
      type: 'error',
      message: msg
    })
    return Promise.reject(error)
  }
)
export default request
