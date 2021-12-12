import axios from 'axios'

//封装axios
export function request(data) {
  const requests = axios.create({
    // baseURL: 'http://39.98.123.211/api',
    baseURL: '/api',
    timeout: 5000,
  })

  //请求拦截器
  requests.interceptors.request.use(config => {
    console.log('请求拦截')
    return config
  },error => {
    console.log('请求失败')
    return new Error('请求失败')
  })

  //响应拦截器
  requests.interceptors.response.use(res => {
    console.log('响应拦截')
    return res.data
  },error => {
    console.log('响应失败')
    return new Error('响应失败')
  })

  return requests(data)
}





