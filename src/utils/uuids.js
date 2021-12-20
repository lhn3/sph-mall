import {v4 as uuid} from 'uuid'
import cache from '@/utils/cache'

//生成游客uuid
export default function () {
  let uid=cache.getCache('UUID')
  if (uid){
    return uid
  }else {
    let newUid=uuid()
    //保存到本地
    cache.setCache('UUID',newUid)
    return newUid
  }
}