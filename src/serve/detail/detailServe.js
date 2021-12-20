import {request} from '../request'

//获取三级联动数据
export const getDetail = (id) => {
  return request({
    url: '/item/'+id,
  })
}

//加入购物车
export const updateCart = (data) => {
  return request({
    method:'post',
    url: `/cart/addToCart/${data.id}/${data.num}`,
  })
}