import {request} from '@/serve/request'

//获取手机验证码
export const getCode=(phone)=>{
  return request({
    url:'user/passport/sendCode/'+phone
  })
}

//完成注册
export const finishRegister=(data)=>{
  return request({
    method:'post',
    url:'user/passport/register/',
    data:data
  })
}