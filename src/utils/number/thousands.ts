/**
 * 将数字格式化为千分位的数字字符串
 * toLocaleString()实例的方法返回Date一个字符串，其中包含该日期的语言敏感表示形式。
 */
const thousands = (num?: number) => num?.toLocaleString();

export default thousands;