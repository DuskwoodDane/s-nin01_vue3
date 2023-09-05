import isMobile from '@/utils/device/deviceIndex';

/** 判断body是否有滚动条(y) */
const isScrollbar = (): boolean => {
  const r1 = document.body.scrollHeight > document.body.clientHeight;
  const r2 = document.body.scrollHeight > document.body.clientHeight;
  return r1 || r2;
};

const show = (): void => {
  if (!isScrollbar()) return;
  // 移动端操作时，不进行任何操作
  if (isMobile()) return;

  document.body.style.overflowY = 'auto';
  document.body.style.width = '100%';
};


const hidden = (): void => {
  if (!isScrollbar()) return;
  // 移动端操作时，不进行任何操作
  if (isMobile()) return;

  document.body.style.overflowY = 'hidden';
  document.body.style.width = 'calc(100% - 17px)';
};

const scrollBar = { show, hidden };

export default scrollBar;
