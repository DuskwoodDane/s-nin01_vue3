<template>
  <article class="main">
    <Header />
    <BgView />
    <AMap />
  </article>
</template>

<!-- filename: HomeView.vue -->
<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Header from '@/views/Header/index.vue';
import BgView from '@/views/BgView/index.vue';
import AMap from '@/views/AMap/index.vue';
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({});
onBeforeMount(() => {
  //console.log('2. ----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
watchEffect(()=>{
});
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
});

</script>
<style scoped lang='scss'>
.main {
  @include set-wh;
}
</style>