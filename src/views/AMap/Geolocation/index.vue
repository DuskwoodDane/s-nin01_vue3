<template>
  <el-amap-control-geolocation
    :complete="getLocation"
    :zoomToAccuracy="false"
    :getCityWhenFail="true"
    :GeoLocationFirst="true"
    :panToLocation="true"
    :showMarker="false"
    :showCircle="false"
  />
</template>

<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';

// 定位完成后触发
const getLocation = () => {
  console.log(222);
};

</script>
<style scoped lang='scss'>
</style>