<template>
  <section>
    <Marker :mark="mark"/>
    <template v-for="(item, key) of zoningPlan" :key="key">
      <el-amap-layer-district
        type="Country"
        :adcode="item.adcode"
        :styles="{ fill: item.fill }"
        @click="handleClick" />
    </template>
  </section>
</template>

<script lang='ts' setup>
interface LayerDistrict {
  adcode: string,
  fill: string
}
interface LayerDistrictClickEvent {
  props?: {
    NAME_CHN: string,
    adcode: number,
    x: number,
    y: number
  }
}
import { ref, inject, reactive, watch, onMounted } from 'vue';

import Marker from '@/components/Marker/index.vue';

import constant from '@/utils/constant';
import amapUtils from '@/utils/amap';
import getColorGradeData from './grade.ts';
import pubsub from '@/utils/pubsub';

const { injectionKey, defaultValue } = constant;

const province = inject(injectionKey.PROVINCE, defaultValue.province);

let preAdcode = -1;
const defaultMark = () => ({
  name: '',
  counts: 0,
  position: [0, 0]
});

/** 省级行政区域划分相关数据 */
const zoningPlan = ref<LayerDistrict[]>([]);
/** 点标记数据 */
const mark = reactive(defaultMark());

const handleClick = (e: LayerDistrictClickEvent) => {
  // 过滤掉非国内地区的点击事件
  if (!e?.props?.adcode) return;
  const { adcode } = e.props;
  // 禁止同一个地区点击
  if (preAdcode === adcode) return;
  // 获取当前点击的区域
  const curArea = province.find((item) => item.adcode === `${adcode}`);
  if (!curArea) return;
  preAdcode = adcode;
  pubsub.publish('searchAreaData', curArea);
};

const highArea = (adcode?: string) => {
  const _mark = defaultMark();

  zoningPlan.value = province.map((d, order) => {
    if (d.adcode === adcode) {
      _mark.name = d.name;
      _mark.counts = d.data.confirmed_count;
      _mark.position = amapUtils.pos[order];
    }
    return {
      name: d.name,
      counts: d.data.confirmed_count,
      position: amapUtils.pos[order],
      adcode: d.adcode,
      // 是否高亮当前地区
      fill: String(adcode) !== d.adcode ? getColorGradeData(d.data.confirmed_count) : '#ffb600',
      _data: d
    };
  });

  Object.assign(mark, _mark);
};

// 高亮中国区域地图
onMounted(() => {
  highArea();
});

pubsub.subscribe('highArea', (_, adcode) => highArea(adcode));

</script>
<style scoped lang='scss'>
</style>