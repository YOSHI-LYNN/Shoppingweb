
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { insertCartAPI,findNewCartListAPI,delCartAPI } from "@/apis/cart";
import { useUserStore } from "./userStore";
export const useCartStore=defineStore('cart',()=>{
  //1.定义state - cartList
  const cartList=ref([])
  const userStore=useUserStore()
  //获取token来判断是否登录
  const isLogin=computed(()=>userStore.userInfo.token)

  const updateNewList=async ()=>{
    //2.获取最新的购物车数据
    const res=await findNewCartListAPI()
    //3.用最新的购物车数据更新pinia中的数据
    cartList.value=res.result

  }
  //加入购物车
  const addCart=async (goods)=>{
    if(isLogin.value){//已经登录，走接口
      const {skuId,count}=goods
      //1.先加入购物车
      await insertCartAPI({skuId,count})
      updateNewList()
    }else{
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    const item=cartList.value.find((item)=> goods.skuId===item.skuId)
    if(item){
      //找到了
      item.count++
    }else{
      //没找到
      cartList.value.push(goods)
    }
  }
}

  // 删除购物车
  const delCart =async (skuId)=>{
    if(isLogin.value){ //走接口
      //1.删除
      await delCartAPI([skuId])
      updateNewList()
    }else{
    // 1. 找到要删除项的下标值 - splice
     // 2. 使用数组的过滤方法 - filter
    const idx=cartList.value.findIndex((item)=>item.skuId===skuId)
    cartList.value.splice(idx,1)
  }
}

  // 1. 总的数量 所有项的count之和
  const allCount=computed(()=> cartList.value.reduce((a,c)=>a+c.count,0))
  // 2. 总价 所有项的count*price之和
  const allPrice=computed(()=> cartList.value.reduce((a,c)=>a+c.count*c.price,0))

  //单选功能
  const singleCheck=(skuId,selected)=>{
    // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
    const item=cartList.value.find((item)=>skuId===item.skuId)
    item.selected=selected
  }
  // 全选功能action
  const allCheck=(selected)=>{
     // 把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item => item.selected=selected)
  }
  // 是否全选计算属性
  const isAll=computed(()=>cartList.value.every((item)=>item.selected))
  // 3. 已选择数量
  const selectedCount=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
  // 4. 已选择商品价钱合计
  const selectedPrice=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))

  //清除购物车
  const clearCart=()=>{
    cartList.value=[]
  }
  return{
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    allCheck,
    isAll,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
},
//持久化
{
  persist:true
})
