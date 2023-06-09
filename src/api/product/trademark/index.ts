// 品牌管理模块接口
import request from '@/utils/request'
import { TradeMarkResponseData, TradeMark } from './type'

// 品牌管理模块接口地址
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

// 获取已有品牌接口
export const reqHasTradeMark = (page: number, limit: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `/${page}/${limit}`,
  )
}

// 添加域修改已有品牌接口方法
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  if (data.id) {
    // 修改
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    //新增
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

// 获取已有品牌接口
export const reqDeleteTradeMark = (id: number) => {
  return request.delete<any, any>(API.DELETETRADEMARK_URL + id)
}
