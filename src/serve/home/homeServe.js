import {mockRequest, request} from '../request'

//获取三级联动数据
export const getTypeNav = () => {
  return request({
    url: '/product/getBaseCategoryList'
  })
}

//获取轮播图banner数据
export const getBanner = () => {
  return mockRequest({
    url: '/banner'
  })
}

//获取floor数据
export const getFloor = () => {
  return mockRequest({
    url: '/floor'
  })
}