import http from "@/utils/http";


//获取一级分类数据
export function getCategoryAPI(id) {
  return http({
    url:'/category',
    params:{
      id
    }
  })
}

//获取二级分类列表数据
export function getCategoryFilterAPI(id){
  return http({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

/** 获取导航数据
 * * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 */
//Tips:调函接收到的data格式容易错，则无法请求成功
export function getSubCategoryAPI(data){
  return http({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })

}
