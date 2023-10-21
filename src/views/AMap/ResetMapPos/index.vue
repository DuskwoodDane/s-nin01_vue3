<template>
  <img :src="icon" class="reset" @click="reset" :title="i18nMap.body.amap.resetPos.tip"/>
</template>

<script lang='ts' setup>
import { inject } from 'vue';

import icon from '@/assets/images/amap_reset.png';

import constant from '@/utils/constant';

type Emits = {
  (e: 'reset'): void
}

const { injectionKey, defaultValue } = constant;

const i18nMap = inject(injectionKey.I18NMAP, defaultValue.i18nMap);
const emits = defineEmits<Emits>();
const reset = () => emits('reset');
</script>
<style scoped lang='scss'>
.reset {
  cursor: pointer;
}
</style>