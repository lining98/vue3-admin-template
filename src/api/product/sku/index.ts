// SKU模块接口管理
import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData } from './type'

enum API {
  SKU_URL = '/admin/product/list/',
  SALE_URL = '/admin/product/onSale/',
  CANCELSALE_URL = '/admin/product/cancelSale/',
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  DELETESKU_URL = '/admin/product/deleteSku/',
}

// 获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
}

//已有商品上架的接口
export const reqSaleSku = (spuId: number) => {
  return request.get<any, any>(API.SALE_URL + spuId)
}

//已有商品下架的接口
export const reqCancelSale = (spuId: number) => {
  return request.get<any, any>(API.CANCELSALE_URL + spuId)
}

//已有商品下架的接口
export const reqSkuInfo = (spuId: number) => {
  return request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)
}

//删除某一个已有的商品
export const reqRemoveSku = (skuId: number) => {
  return request.delete<any, any>(API.DELETESKU_URL + skuId)
}
