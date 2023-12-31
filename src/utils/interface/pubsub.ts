import type { ProvOrCityData } from './datas';

/** searchAreaData事件的数据 */
export interface SearchAreaDataType extends ProvOrCityData { 
  isMsg?: boolean
}

/**
 * 全局发布订阅事件名
 *
 * switchStyle切换主题
 *
 * searchAreaData搜索地区数据
 *
 * highArea高亮某个地区
 */
export type EventsName = 'switchStyle' | 'searchAreaData' | 'highArea'

export type subscribeCallback<T = any> = (name: EventsName, fn: T) => void

export interface SwitchStyle {
  /** 当前地图的样式名称 */
  style: string,
  /** 当前地图样式的下标 */
  key: number
}