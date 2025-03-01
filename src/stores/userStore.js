import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";
export const useUserStore=defineStore('user',()=>{
  const cartStore=useCartStore()
  // 1. 定义管理用户数据的state
  const userInfo=ref({})
  // 2. 定义获取接口数据的action函数
  const getUserInfo=async ({account,password})=>{
    const res=await loginAPI({account,password})
    userInfo.value=res.result
    //合并购物车的操作 return
    //Tips:别忘记加await否则请求会延迟显示看不到合并商品
    await mergeCartAPI(cartStore.cartList.map(item=>{
      return {
        skuId:item.skuId,
        selected:item.selected,
        count:item.count
      }
    }))
    //获取最新的购物车列表
    cartStore.updateNewList()
  }

  // 退出时清除用户信息
  const clearUserInfo=()=>{
    userInfo.value={}

    cartStore.clearCart()

  }


  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }

},
  {
    persist:true
  }
)
