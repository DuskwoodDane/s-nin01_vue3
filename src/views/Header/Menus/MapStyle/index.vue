<template>
  <div class="map-style">
    <p class="covid19-theme-transition-text-color m-s-title">
      {{  i18nMap.header.menus.style.text1 }}
    </p>
    <ul>
      <li
       v-for="(item, index) of i18nMap.header.menus.style.scheme"
       :key="index"
       @click="switchStyle(index)">
       <span>{{ item }}</span>
       <span v-if="order === index">√</span>
      </li>
    </ul>
    <p class="covid19-theme-transition-text-color footer">
      {{ i18nMap.header.menus.style.text2 }}
      <br />
      <br />
      {{ i18nMap.header.menus.style.text3 }}
    </p>
  </div>
</template>

<!-- filename: Theme.vue -->
<script lang='ts' setup>
import { ref, inject } from 'vue';

import constant from '@/utils/constant';
import pubsub from '@/utils/pubsub';
import storage from '@/utils/storage';
import styleUtils from '@/utils/style';

const { injectionKey, defaultValue } = constant;

const i18nMap = inject(injectionKey.I18NMAP, defaultValue.i18nMap);

const _order = storage.getItem('themeId');

const order = ref(_order ? Number(_order) : 0);

/** 高德地图官方主题 */
const _mapStyle = ['normal', 'macaron', 'whitesmoke', 'dark', 'fresh', 'darkblue', 'blue', 'light', 'grey'];

const style = styleUtils.adaptation();

style?.dark.push(() => (order.value = 3));
style?.light.push(() => (order.value = 0));

const switchStyle = (key: number) => {
  order.value = key;
  storage.setItem('themeId', key);
  // 切换主题
  pubsub.publish('switchStyle', { style: _mapStyle[key], key});
};

</script>

<style scoped lang='scss'>
.map-style {
  .m-s-title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  ul {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    li {
      padding: 10px;
      border-radius: 5px;
      font-size: 12px;
      font-weight: 600;
      @include flex-row(center, space-between);
      &:hover {
        color: var(--bg-color);
        background-color: var(--text-title-color);
      }
    }
  }
}
</style>