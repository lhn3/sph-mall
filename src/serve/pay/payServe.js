import {request} from '../request'

//获取支付信息
export const getPayInfo = (orderId) => {
  return request({
    url: 'payment/weixin/createNative/'+orderId,
  })
}

//获取是否支付状态
export const getPayStatus = (orderId) => {
  return request({
    url: 'payment/weixin/queryPayStatus/'+orderId,
  })
}

