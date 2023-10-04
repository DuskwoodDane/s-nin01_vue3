import { createVNode, render } from 'vue';

import Message from '@/components/Message/index.vue';

interface Message {
  title: string,
  content: string,
  dur?: number,
  type?: 'success' | 'warn'
}

let counts = 0;

const message = (info: Message) => {
  const el = document.createElement('div');
  counts++;

  // 最大显示区域
  const y = counts * 35 <= 180 ? counts * 35 : 180;
  el.style.transform = `translateY(-${y}px)`;
  // 挂载至已准备好的全局dom中
  document.querySelector('.s-nin-global-message')!.appendChild(el);
  const dur = info.dur ? info.dur : 1000 * 5;
  const vnode = createVNode(Message, { ...info, dur, isBoxShadow: !(counts > 5) });

  render(vnode, el);

  setTimeout(() => {
    setTimeout(() => {
      render(null, el);
      el.remove();
      counts--;
    }, 100 * 5);
  }, dur);
};

export default message;