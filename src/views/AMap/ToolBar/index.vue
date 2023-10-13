<template>
  <!-- 地图放大缩放工具 -->
  <el-amap-control-tool-bar @show="show" :position="{ top: '20px', right: '22px' }" />
</template>

<script lang='ts' setup>
import { inject, watch } from 'vue';

import constant from '@/utils/constant';

const { injectionKey, defaultValue } = constant;

const i18nMap = inject(injectionKey.I18NMAP, defaultValue.i18nMap);

// 比例尺显示时触发
const show = () => {
  // 获取放大缩小的两个元素并设置国际化
  document.querySelector('span[class=amap-ctrl-zoomin][data-type=add]')!.setAttribute('title', i18nMap.body.amap.toolBar.add);
  document.querySelector('span[class=amap-ctrl-zoomout][data-type=sub]')!.setAttribute('title', i18nMap.body.amap.toolBar.sub);
};

// 语言切换时重新设置国际化
watch(i18nMap, () => show());
</script>
<style scoped lang='scss'>
</style>