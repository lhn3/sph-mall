import {mockRequest, request} from '../request'

//获取搜索内容
export const getSearch = (data) => {
  return request({
    url: '/list',
    method:'post',
    data:data
  })
}
