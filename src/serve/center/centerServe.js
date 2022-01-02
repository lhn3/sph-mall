import {request} from '../request'

//获取支付信息
export const getOrderList = (page,limit) => {
  return request({
    url: `order/auth/${page}/${limit}`,
  })
}

