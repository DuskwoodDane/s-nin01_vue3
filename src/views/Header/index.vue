<template>
  <section class="s-n-transition-bg-tcolor s-n-header">
    <h1>{{ i18nMap.title }}</h1>
    <div class="s-n-theme-transition-bg h-search">
      <Search />
    </div>
    <ul class="h-list">
      <li class="h-l-title">
        {{ i18nMap.header.menus.title }}
        <ul class="h-l-t-extends">
          <li
            v-for="(text, index) of options"
            class="h-l-t-u-item"
            :key="index"
            @click="() => open(text(), index)"
            >{{ text() }}</li>
        </ul>
      </li>
      <li class="h-l-title h-l-line">|</li>
      <li class="h-l-title h-l-github">
        <a class="s-n-theme-transition-text-color" href="https://github.com/DuskwoodDane/s-nin01_vue3" target="_blank">GiuHub</a>
      </li>
    </ul>
  </section>
</template>

<!-- filename: Header.vue -->
<script lang='ts' setup>
import { ref, reactive, inject } from 'vue';

import Search from '@/components/Search/index.vue';

import constant from '@/utils/constant';

const { injectionKey, defaultValue } = constant;

const i18nMap = inject(injectionKey.I18NMAP, defaultValue.i18nMap);

const drawerTitle = ref('');

/** 抽屉开关 */
const isOpen = ref(false);
/** 渲染的菜单选项 */
const options = reactive([
  () => i18nMap.header.menus.signature.title,
  () => i18nMap.header.menus.style.title,
  () => i18nMap.header.menus.i18n.title
] as const);

const open = (title: string, key: number) => {
  isOpen.value = true;
  drawerTitle.value = title;
 };

const close = () => (isOpen.value = false);

</script>
<style scoped lang='scss'>
.s-n-header {
  width: 85%;
  height: 100px;
  margin: 0 auto;
  @include flex-row(center, space-between);
  color: var(--text-title-color);
  background-color: var(--bg-color);
  h1 {
    font-size: 38px;
  }
  .h-search {
    flex: 2;
    height: 55px;
    padding: 0 70px;
    // background-color: red
  }
  .h-list {
    @include flex-row;
    .h-l-title {
      @include font(20px, 700, var(--text-title-color));
      position: relative;
      cursor: pointer;
      a {
        color: var(--text-title-color);
      }
      &:hover {
        .h-l-t-extends {
          height: 140px;
          padding: 5px;
        }
      }
      .h-l-t-extends {
        position: absolute;
        top: 100%;
        left: -5%;
        z-index: 197;
        overflow: hidden;
        box-sizing: border-box;
        @include set-wh(110%, 0);
        @include flex-column(center, space-around);
        opacity: .9;
        transition: height 0.3s;
        li {
          @include set-wh(100%, auto);
          padding: 8px 0;
          @include font(12px, bold, var(--text-title-color));
          &:hover {
            color: var(--bg-color);
            background-color:  var(--text-title-color);
          }
        }
      }
    }
    .h-l-line {
      margin: 0 15px;
      color: rgb(216, 100, 34);
      @include set-wh(3px,80%);
    }
  }
}
</style>