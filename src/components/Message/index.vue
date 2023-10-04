<template>
  <Transition appear>
    <section
      v-if="isOpen"
     :class="`snin-message-box ${props.isBoxShadow ? 'm-box-shadow' : ''}`">
      <div class="m-title">
        <img :src="icons[props.type]"/>
        <p>{{ props.title }}</p>
      </div>
      <p class="m-content">{{ props.content }}</p>
    </section>
  </Transition>
</template>

<!-- filename: Message.vue -->
<script lang='ts' setup>
import { ref, onMounted } from 'vue';

/**
 * images
 */
import success from '@/assets/images/success.png';
import warn from '@/assets/images/warning.png';

interface Props {
  title: string,
  content: string,
  dur?: number,
  isBoxShadow: boolean,
  type?: 'success' | 'warn'
}

const icons = { success, warn };

// 设置props的默认值
const props = withDefaults(defineProps<Props>(), { type: 'success', dur: 1000 * 5 });

const isOpen = ref(true);

onMounted(() => {
  setTimeout(() => {
    isOpen.value = false;
  }, props.dur - 500);
});

</script>
<style scoped lang='scss'>
.snin-message-box {
  width: 300px;
  border-radius: 8px;
  position: fixed;
  bottom: 80px;
  left: 20px;
  padding: 25px;
  color: var(--text-title-color);
  background-color: var(--bg-color);
  @include flex-column(flex-start, center);
  transition: opacity .5s;
  .m-title {
    margin-bottom: 15px;
    @include flex-row(center);
    img {
      @include set-wh(24px, 24px);
      margin-right: 15px;
    }
    p {
      font-size: 16px;
    }
  }
  .m-content {
    padding-left: 39px;
    opacity: .8;
  }
}

.m-box-shadow {
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
.v-enter-active {
    animation: bounce-in 0.5s;
}
.v-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
    0% {
        opacity: 0;
        transform: scale(0);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>