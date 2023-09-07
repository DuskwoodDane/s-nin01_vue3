


/** 基本数据格式 */
export interface TotalDatas {
  /** 累计确诊人数 */
  confirmed_count: number
  /** 疑似感染人数 */
  suspected_count: number
  /** 治愈人数 */
  cured_count: number
  /** 死亡人数 */
  dead_count: number
}

/** 数据格式说明 */
export interface DetailsAreaData {
  /** 名称 */
  name: string
  /** 邮政编码 */ 
  adcode: string
  /** 最后更新时间 */
  update_time: number
  /** 备注 */
  comment: string
}

export interface ProvOrCityData extends DetailsAreaData {
  data: TotalDatas
}

/** 整体疫情数据 */
export interface Country {
  comment: string
  update_time: number
  data: TotalDatas
}

/** 省级疫情数据(包含其直辖市) */
export interface ProvinceCities extends ProvOrCityData {
  cities: ProvOrCityData
}