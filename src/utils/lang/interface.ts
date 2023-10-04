import cn from './lang/zh-cn';

import type { CustomKeysByObject } from '@/utils/interface';

/**
 * fr: 法语
 * jp: 日语
 * ko: 韩语
 * en: 英文
 * zh_cn: 简体中文
 * zh_hk: 繁体中文
 */
export type LangType = 'fr' | 'jp' | 'ko' | 'en' | 'zh_cn' | 'zh_hk'

/** 语言包内容(key-value) */
// typeof操作符用于获取变量的类型，因此操作符后面接的始终是一个变量。LangMaptype相当于一个cn对象的类型
export type LangMapType = typeof cn

/** 更新语种 */
export type ForceLang = (lang: LangType) => void

/** 与国际化有关的年月日 */
export type LangTime = CustomKeysByObject<'year' | 'month' | 'day'>
