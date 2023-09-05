<template>
  <Transition name="bg-img">
    <section class="snin-bg-img" v-if="isShowBg">
      <img :src="isMobile() ? sninSmallImg : sninLargeBgImg" @load="load"/>
      <div class="s-n-center" v-if="isLoading">
        <div class="s-n-loading"></div>
      </div>
      <div class="s-n-center s-n-content">
        <p v-for="(text, index) of textNodes" :key="index" :class="`s-n-title-${index}`">
          <Typewriter v-if="order >= index" :text="text" @finish="finish"/>
        </p>
        <p class="s-n-last" v-if="isShowLink">
          {{ countdown }}s后自动进入首页，或<span @click="closeView">点此直接进入</span>
        </p>
      </div>
    </section>
  </Transition>
</template>


<script lang='ts' setup>
import { ref, reactive, toRefs, watchEffect } from 'vue';

import isMobile from '@/utils/device/deviceIndex';
import { BgviewRenders } from '@/utils/constant';
import documentUtils from '@/utils/document';

import Typewriter from '@/components/Typewriter/index.vue';

/* image */
import sninLargeBgImg from '@/assets/images/video_large.png';
import sninSmallImg from '@/assets/images/video_small.png';

//console.log('1-开始创建组件-setup')

let timer: any = null;
/** 是否展示背景图片 */
const isShowBg = ref(true);
/** 是否展示加载动画 */
const isLoading = ref(true);
/** 是否展示跳转文字 */
const isShowLink = ref(false);
/** 当前已展示的文字段数 */
const order = ref(0);
/** 要展示的文案内容 **/
const textNodes: string[] = reactive([]);
/** 倒计时 */
const countdown = ref(3);

const data = reactive({});

const load = () => {
  isLoading.value = false;
  textNodes.push(...BgviewRenders());
  documentUtils.scrollBar.hidden();
};

/** 倒计时结束关闭该背景页 */
const closeView = () => {
  clearInterval(timer);
  isShowBg.value = false;

  // 显示滚动条
  documentUtils.scrollBar.show();
};

/** 每段文字打印完成后触发 */
const finish = () => {
  order.value++;
  if (order.value >= 4) {
    isShowLink.value = true;
    timer = setInterval(() => {
      if (countdown.value <= 1) return closeView();
      countdown.value--;
    }, 1000);
  }
};


watchEffect(()=>{
});
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
});

</script>
<style scoped lang='scss'>
.snin-bg-img {
  @include set-wh(100vw, 100vh);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 199;
  background-color: rgb(244, 244, 244);
  overflow: hidden;
  img {
    @include set-wh;
    object-fit: cover;
  }
  .s-n-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .s-n-loading {
      @include set-wh(60px, 60px);
      border: 2px solid #000;
      border-top-color: rgba(0, 0, 0, 0.2);
      border-right-color: rgba(0, 0, 0, 0.2);
      border-bottom-color: rgba(0, 0, 0, 0.2);
      border-radius: 100%;
      animation: bg-img-loading infinite 0.75s linear;
    }
  }
  .s-n-content {
      min-width: 360px;
      color: rgb(255, 255, 255);
      p {
        font-weight: 600;
      }
      .s-n-title-0 {
        margin-bottom: 50px;
      }
      .s-n-title-0 {
        font-size: 26px;
      }
      .s-n-title-1 {
        font-size: 32px;
      }
      .s-n-title-2 {
        font-size: 34px;
      }
      .s-n-title-3 {
        font-size: 40px;
      }
      .s-n-last {
        @include font(18px, 400, rgb(255, 255, 255));
        margin-top: 100px;
        text-align: end;
        opacity: 0;
        animation: content-last-bounce 0.5s linear forwards;
        span {
            font-weight: 600;
            cursor: pointer;
            text-decoration-line: underline;
        }
      }
    }
}

.bg-img-enter-from,
.bg-img-leave-to {
  height: 0;
  opacity: 0;
  transition: all 1s;
}

.bg-img-enter-from .s-n-content,
.bg-img-enter-to .s-n-content {
  opacity: 0;
  transition: all .5s;
}

@keyframes bg-img-loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes content-last-bounce {
  0% {
    transform: scale(0.85);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>