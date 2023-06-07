// 品牌管理模块接口
import request from '@/utils/request'
import { TradeMarkResponseData } from './type'

// 品牌管理模块接口地址
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark',
}

// 获取已有品牌接口
export const reqHasTradeMark = (page: number, limit: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `/${page}/${limit}`,
  )
}
