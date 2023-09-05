<template>
  <section class="s-n-transition-bg-tcolor s-n-header">
    <h1></h1>
  </section>
</template>

<!-- filename: Header.vue -->
<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';

/**
* 数据部分
*/
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
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
.s-n-header {
  width: 85%;
  height: 100px;
  margin: 0 auto;
  @include flex-row(center, space-between);
  color: var(--text-title-color);
}
</style>