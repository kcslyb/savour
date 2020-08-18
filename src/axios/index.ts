import * as axios from 'axios'
import {AxiosResponse, AxiosRequestConfig} from 'axios'

const request = axios.default.create({
  baseURL: 'api',
  timeout: 15000
})
// request拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {'Content-Type': 'application/json;charset=utf-8'}
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)
// response拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: any) => {
    let msg: string = error.message
    return Promise.reject(error)
  }
)
export default request
