
import cn from '@/utils/lang/lang/zh-cn';

import type { InjectionKey } from 'vue';

import type { ForceLang, LangMapType } from '@/utils/lang/interface';

/** 语言包 */
const I18NMAP: InjectionKey<LangMapType> = Symbol.for('i18nMap');
/** 切换语种 */
const FORCELANG: InjectionKey<ForceLang> = Symbol.for('forceLang');

/** --------------------------------------- */
/** 默认值 */

const i18nMap: LangMapType = { ...cn };
const forceLang: ForceLang = () => { };

// 首页图片加载完后的渲染文字
export const BgviewRenders: Function = (): string[] => {
  // 疫情开始时间
  const start = +new Date('2019/12/08 00:00:00');

  const cur = +new Date();
  const day = 1000 * 60 * 60 * 24;

  const dur = Math.floor((cur - start) / day);
  return [
    `2019年12月08日，湖北省武汉市通报了首例不明原因肺炎患者发病，距今已过去了${dur}天`,
    '愿疫情过后，人长久',
    '海有舟可渡，山有路可行',
    '余下岁月，无灾无难'
  ];
};

const injectionKey = {
  I18NMAP,
  FORCELANG
};

const defaultValue = {
  i18nMap,
  forceLang
};

export default {
  injectionKey,
  defaultValue
};