import http from '@/utils/http'

export function loginAPI ({account,password}) {
  return http({
    url: '/login',
    method:'POST',
    data: {
      account,password
    }
  })
}

export const getLikeListAPI=({limit=4})=>{
  return http({
    url:'/goods/relevant',
    params:{
      limit
    }
  })
}
