import {request} from '../request'

//获取三级联动数据
export const getDetail = (id) => {
  return request({
    url: '/item/'+id,
  })
}

//加入购物车(对已有的商品数量进行改变<id，改变的数量num>)
export const updateCart = (data) => {
  return request({
    method:'post',
    url: `/cart/addToCart/${data.id}/${data.num}`,
  })
}