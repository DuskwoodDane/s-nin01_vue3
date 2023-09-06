/**
 * lang: 语言包
 * 
 * themeId: 当前主题ID
 */
type LocalStorageType = 'lang' | 'themeId'

const setItem = (key: LocalStorageType, value: any): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getItem = <T extends string>(key: LocalStorageType): T => {
  const value = window.localStorage.getItem(key) || '';
  console.log('value==', value);
  return value ? JSON.parse(value) : '';
};

const removeItem = (key: LocalStorageType) => window.localStorage.removeItem(key);

export default {
  setItem,
  getItem,
  removeItem
};