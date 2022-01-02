import {request} from '../request'

//获取支付信息
export const getPayInfo = (orderId) => {
  return request({
    url: 'payment/weixin/createNative/'+orderId,
  })
}

