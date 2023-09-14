<template>
  <Transition name="drawer">
    <section class="s-n-mask" v-if="isOpen">
      <div class="d-m-body">
        <div class="d-m-header">
          <p class="d-m-b-h-title">{{ props.title }}</p>
          <button @click="emits('close')">{{ i18nMap.header.menus.btn1 }}</button>
        </div>
        <div class="d-m-b-content">
          <slot></slot>
        </div>
      </div>
    </section>
  </Transition>
</template>

<!-- filename: HomeView.vue -->
<script lang='ts' setup>
import { ref, inject, watch } from 'vue';

import constant from '@/utils/constant';
import documentUtils from '@/utils/document';

type Props = {
  isOpen: boolean,
  title: string
}

type Emits = {
  (e: 'close'): void
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { injectionKey, defaultValue } = constant;

const i18nMap = inject(injectionKey.I18NMAP, defaultValue.i18nMap);

const isOpen = ref(props.isOpen);

watch(() => props.isOpen, (o) => {
  isOpen.value = o;
  if (o) return documentUtils.scrollBar.hidden();
  documentUtils.scrollBar.show();
});


</script>

<style scoped lang='scss'>

.s-n-mask {
  @include set-wh(100vw, 100vh);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 198;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.45);
  .d-m-body {
    @include set-wh(350px);
    position: absolute;
    top: 0;
    right: 0;
    @include flex-column;
    box-shadow: -6px 0 16px 0 rgba(0, 0, 0, 0.08), -3px 0 6px -4px rgba(0, 0, 0, 0.12),
            -9px 0 28px 8px rgba(0, 0, 0, 0.05);
    color: var(--text-title-color);
    background-color: var(--bg-color);
    .d-m-header {
      width: 100%;
      @include flex-row(center, space-between);
      padding: 0 10px;
      border-bottom: 2px solid rgb(216, 100, 34);
      .d-m-b-h-title {
        font-size: 22px;
        font-weight: 300;
      }
      button {
        padding: 5px 10px;
        border-radius: 5px;
        border: none;
        color: var(--bg-color);
        background-color: var(--text-title-color);
        cursor: pointer;
      }
    }
    .d-m-b-content {
      flex: 2;
      width: 100%;
      padding: 10px;
      position: relative;
      overflow-y: auto;
      .header {
        height: 100%;
      }
      .footer {
        font-size: 12px;
        padding: 10px;
        position: absolute;
        bottom: 25px;
        left: 0;
      }
    }
  }
}

.drawer-enter-active,
.drawer-leave-active {
    transition: opacity 0.45s;
}
.drawer-enter-from,
.drawer-leave-to {
    opacity: 0;
}

.drawer-enter-active .d-m-body,
.drawer-leave-active .d-m-body {
    transition: right 0.4s;
}
.drawer-enter-from .d-m-body,
.drawer-leave-to .d-m-body {
    right: -100%;
}
</style>