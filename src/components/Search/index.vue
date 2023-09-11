<template>
  <section class="s-n-search-input">
    <input
     type="text"
     v-model="search.content"
     @input="onChange"
     @blur="onBlur"/>

    <template v-if="search.result.length">
      <ul class="s-n-tip">
        <li v-for="item of search.result" :key="item.adcode" @click="toDataPanel(item)">{{ item.name }}</li>
      </ul>
    </template>

    <template v-if="search.empty">
      <div class="s-n-tip s-n-tip-empty"><span>{{ i18nMap.header.search.emptyTip }}</span></div>
    </template>
  </section>
</template>

<!-- filename: Search.vue -->
<script lang='ts' setup>
import { reactive, toRefs, inject } from 'vue';

import constant from '@/utils/constant';

import type { ProvOrCityData } from '@/utils/interface/datas';

const { injectionKey, defaultValue } = constant;

const i18nMap = inject(injectionKey.I18NMAP, defaultValue.i18nMap);
const provCities = inject(injectionKey.PROVCITIES, defaultValue.provCities);

const search = reactive({
  /** 搜索内容 */
  content: '',
  /** 搜索结果 */
  result: [] as ProvOrCityData[],
  /** */
  empty: false
});

const toDataPanel = (area: ProvOrCityData) => { 
  console.log('area', area);
};

const onBlur = (e?: any) => {
  if (e && !e?.relatedTarget) return;
  search.content = '';
  search.empty = false;
  search.result = [];
};

const onChange = () => {
  if (!search.content) return onBlur();

  const areaArr = [] as ProvOrCityData[];
  provCities.forEach((item, index) => {
    console.log(index);
    /** 精准匹配 */
    const exact = new RegExp(search.content).test(item.name);
    /** 模糊匹配 */
    const _reg = search.content.replace(/.{1}/g,
    // 存在的每个字符都进行模糊匹配, 如果搜索内容长度大于1则用|隔开
      (c) => c === search.content[search.content.length - 1] ? c : `${c}|`);
    const valid = new RegExp(_reg).test(item.name);
    // 精确匹配的关键词，将始终排在第一位
    if (exact) return areaArr.push(item);
    // 模糊匹配
    if (valid) areaArr.push(item);
  });
  search.result = areaArr;
  search.empty = !areaArr.length;
};

// 使用toRefs解构
// let { } = { ...toRefs(data) }

defineExpose({
  ...toRefs(search)
});

</script>
<style scoped lang='scss'>
.s-n-search-input {
  @include set-wh;
  position: relative;
  z-index: 197;
  input {
    @include set-wh;
    padding: 0 0 0 15px;
    box-sizing: border-box;
    border: none;
    border-radius: 6px;
    @include font(16px, 400, var(--text-search-color));
    background-color: var(--search-bg-color);
    transition: outline .5s;
    &:focus {
      outline: 1px solid var(--border-search-color);
    }
  }
  .s-n-tip {
    width: 100%;
    max-height: 300px;
    border: 1px solid red;
    border-radius: 5px;
    padding: 3px 0;
    position: absolute;
    top: 115%;
    left: 0;
    overflow-y: auto;
    @include font(14px, 400, var(--text-title-color));
    background-color: var(--bg-color);
    cursor: default;
    li {
      padding: 10px 15px;
      &:hover {
        color: var(--bg-color);
        background-color: var(--text-title-color);
      }
    }
  }

  .s-n-tip-empty {
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    @include font(16px, 400, var(--text-search-color));
    text-align: center;
    span {
      opacity: .6;
    }
  }
}
</style>