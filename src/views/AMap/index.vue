<template>
  <section class="map-body">
    <el-amap
     :vid="'s_nin'"
     :zoom="_zoom"
     :zooms="zooms"
     :isHotspot="false"
     :scrollWheel="false"
     :doubleClickZoom="false"
     @init="init">
      <ControlScale />
      <ToolBar />
      <ControlBar />
      <Geolocation />
    </el-amap>
  </section>
</template>

<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';

import ControlScale from './ControlScale/index.vue';
import ToolBar from './ToolBar/index.vue';
import ControlBar from './ControlBar/index.vue';
import Geolocation from './Geolocation/index.vue';

/** 缩放层级的限制范围 */
const zooms = [3, 9];
/** 默认的缩放层级 */
const _zoom = 4.4;
/** 默认的中心点 */
const _center = [104.62313499999999, 37.358796];


const init = () => {
  console.log('init==');
};


</script>
<style scoped lang='scss'>
.map-body {
  height: calc(100% - 126px - 40px);
  position: relative;
}
</style>