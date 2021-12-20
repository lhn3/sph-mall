import {request} from '../request'

//获取购物车列表
export const getCartList = () => {
  return request({
    url: '/cart/cartList',
  })
}
