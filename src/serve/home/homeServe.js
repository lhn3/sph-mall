import {request} from '../request'

//获取三级联动数据
export const getTypeNav = () => {
  return request({
    url: '/product/getBaseCategoryList'
  })
}