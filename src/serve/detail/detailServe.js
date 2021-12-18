import {request} from '../request'

//获取三级联动数据
export const getDetail = (id) => {
  return request({
    url: '/item/'+id,
  })
}