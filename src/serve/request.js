import axios from 'axios'
//导入进度条插件
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {store} from '@/store'

//封装axios-------------------------------------------------------------------------
export function request(data) {
  const requests = axios.create({
    // baseURL: 'http://39.98.123.211/api',
    baseURL: '/api',
    timeout: 5000,
  })

  //请求拦截器
  requests.interceptors.request.use(config => {
    nprogress.start()
    //请求头携带uuid
    config.headers.userTempId=store.state.uid
    console.log('请求拦截')
    return config
  },error => {
    console.log('请求失败')
    return new Error('请求失败')
  })

  //响应拦截器
  requests.interceptors.response.use(res => {
    nprogress.done()
    console.log('响应拦截')
    return res.data
  },error => {
    console.log('响应失败')
    return new Error('响应失败')
  })

  return requests(data)
}

//mock请求封装-------------------------------------------------------------------------
export function mockRequest(data) {
  const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000,
  })

  //请求拦截器
  requests.interceptors.request.use(config => {
    nprogress.start()
    console.log('请求拦截')
    return config
  },error => {
    console.log('请求失败')
    return new Error('请求失败')
  })

  //响应拦截器
  requests.interceptors.response.use(res => {
    nprogress.done()
    console.log('响应拦截')
    return res.data
  },error => {
    console.log('响应失败')
    return new Error('响应失败')
  })

  return requests(data)
}





