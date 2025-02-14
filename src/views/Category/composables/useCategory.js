import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory(){

  const categoryData=ref({})
  const route=useRoute()
  const getCategoryData=async (id)=>{
  const res=await getCategoryAPI(id)
  console.log(res)
  categoryData.value=res.result

}

onMounted(()=>{
  getCategoryData(route.params.id)
})

onBeforeRouteUpdate((to)=>{
  //console.log("路由变化了");
  //console.log(to)
  getCategoryData(to.params.id)
})

  return {categoryData}
}

