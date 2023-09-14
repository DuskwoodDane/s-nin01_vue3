export interface AdaptationData {
  theme: string,
  light: Function[],
  dark: Function[]
}

 const topicAdaptation = () => {
  const data: AdaptationData = {
    /** 当前系统主题颜色 */
    theme: '',
    /** 切换至浅色模式时调用(允许多个地方监听) */
    light: [],
    /** 切换至深色模式时调用(允许多个地方监听) */
    dark: []
  };

  const mediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if (!mediaQuery) return;
  const handle = () => {
    if (mediaQuery.matches) {
      console.log(111);
      data.theme = 'dark';
      data.dark.forEach((f) => f());
    } else {
      console.log(222);
      data.theme = '_light';
      data.light.forEach((f) => f());
    }
  };
  handle();
  mediaQuery.addEventListener('change', handle);
  console.log('data==', data);
  return data;
 };

export default topicAdaptation;