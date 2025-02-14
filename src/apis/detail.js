import http from "@/utils/http";

//获取商品信息
export function getDetail(id) {
  return http({
    url:'/goods',
    params:{
      id
    }
  })
}

export function getHotGoodsAPI({id,type,limit=3}) {
  return http({
    url:'/goods/hot',
    params:{
      id,
      type,
      limit
    }
  })
}

