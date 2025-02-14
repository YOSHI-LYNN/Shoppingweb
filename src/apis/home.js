import http from "@/utils/http";
export function getBannerAPI(params={}) {
  const {distributionSite='1'}=params
  return http({
    url:'home/banner',
    params:{
      distributionSite
    }
  })
}

export function findNewAPI(){
  return http({
    url:'/home/new'
  })
}

export function findHotAPI(){
  return http({
    url:'/home/hot'
  })
}

export function findGoodsAPI(){
  return http({
    url:'/home/goods'
  })
}
