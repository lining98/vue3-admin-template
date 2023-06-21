export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 定义SKU对象的ts类型
export interface Attr {
  id?: number
  attrId: number | string
  valueId: number | string
}
export interface saleArr {
  id?: number
  saleAttrId: number | string
  saleAttrValueId: number | string
}

export interface SkuData {
  category3Id?: number | string
  spuId?: number | string
  tmId?: number | string
  skuName?: string
  price?: number | string
  weight?: number | string
  skuDesc?: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg?: string
  isSale?: number
  id?: number
}

// 获取SKU接口返回的数据ts类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

// 获取SKU商品详情接口的ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData
}
