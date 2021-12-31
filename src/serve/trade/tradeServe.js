import {request} from '../request'

//获取搜索内容
export const getUserAddress = () => {
  return request({
    url: '/user/userAddress/auth/findUserAddressList',
  })
}

//获取交易商品清单
export const getTradeGoods = () => {
  return request({
    url: '/order/auth/trade'
  })
}