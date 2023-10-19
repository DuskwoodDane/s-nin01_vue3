<template>
  <ul class="s-n-transition-bg-tcolor s-n-data-panel panel-main">
    <li>
      <p class="n-d-title">{{ area }}</p>
      <p class="n-d-comments">{{ i18nMap.body.ncov.details.text1 }}</p>
    </li>
    <li>
      <p class="n-d-title">{{ time }}</p>
      <p class="n-d-comments">{{ i18nMap.body.ncov.details.text2 }}</p>
    </li>
    <template v-if="comment">
      <li class="n-d-comments-last">
        <p>{{ comment }}</p>
      </li>
    </template>
  </ul>

  <ul class="s-n-transition-bg-tcolor s-n-data-panel panel-data">
    <li>
      <p class="s-n-theme-transition-text-color n-d-title covid19-data-confirmedCount">
        <SwitchContent :text="confirmedCount" />
      </p>
      <p class="s-n-theme-transition-text-color n-d-comments">
        {{ i18nMap.body.ncov.data.text1 }}
      </p>
    </li>

    <li>
      <p class="n-d-title s-n-data-suspectedCount">
        <SwitchContent :text="suspectedCount"/>
      </p>
      <p class="s-n-theme-transition-text-color n-d-comments">
        {{ i18nMap.body.ncov.data.text2 }}
      </p>
    </li>

    <li>
      <p class="n-d-title s-n-data-curedCount">
        <SwitchContent :text="curedCount"/>
      </p>
      <p class="s-n-theme-transition-text-color n-d-comments">
        {{ i18nMap.body.ncov.data.text3 }}
      </p>
    </li>

    <li>
      <p class="n-d-title s-n-data-deadCount">
        <SwitchContent :text="deadCount"/>
      </p>
      <p class="s-n-theme-transition-text-color n-d-comments">
        {{ i18nMap.body.ncov.data.text4 }}
      </p>
    </li>

  </ul>
</template>

<script lang='ts' setup>
import { ref, inject, watch, onMounted } from 'vue';

import SwitchContent from '@/components/SwitchContent/index.vue';

import constant from '@/utils/constant';
import pubsub from '@/utils/pubsub';
import message from '@/utils/message';
import { thousands } from '@/utils/number';
import { getDateText } from '@/utils/time';

import type { SearchAreaDataType } from '@/utils/interface/pubsub';
type PanelCounts = string | number

const { injectionKey, defaultValue } = constant;

const i18nMap = inject(injectionKey.I18NMAP, defaultValue.i18nMap);
const country = inject(injectionKey.COUNTRY, defaultValue.country);

/** 接口对应: utils/interface/datas => TotalDatas */
const confirmedCount = ref<PanelCounts>('0'); /** 累计确诊人数 */
const suspectedCount = ref<PanelCounts>('0'); /** 疑似感染人数 */
const curedCount = ref<PanelCounts>('0'); /** 治愈人数 */
const deadCount = ref<PanelCounts>('0'); /** 死亡人数 */

let curShowDataPanelArea = '';
const reflectCountry = ref(defaultValue.country);
console.log(555, country);
const area = ref('地区');
const time = ref('时间');
const comment = ref('备注');

/** 更新面板中的疫情数据 */
const updateData = (_data: SearchAreaDataType) => {
  const { name, data, update_time, isMsg } = _data;

  // 更改疫情数据
  confirmedCount.value = thousands(data.confirmed_count)!;
  suspectedCount.value = thousands(data.suspected_count)!;
  curedCount.value = thousands(data.cured_count)!;
  deadCount.value = thousands(data.dead_count)!;

  // 更新地区数据
  area.value = name;
  time.value = getDateText(update_time);
  comment.value = _data.comment;

  // 高亮选中地区
  // pubsub.publish('highArea', _data.adcode);
  console.log('data==666', data);
  // 初始化时忽略提示
  if (name === '全国') return;
  // 禁止消息
  if (!isMsg) return;
  // 消息提示
  const lang = () => i18nMap.body.amap.showPanelData.globalMsg;
  // 重复选择
  if (curShowDataPanelArea === name) {
    return message({
      title: lang().warn.title,
      content: lang().warn.content(name),
      type: 'warn'
    });
  }

  message({
    title: lang().success.title,
    content: lang().success.content(name)
  });

  curShowDataPanelArea = name;
};

onMounted(() => {
  reflectCountry.value = country;
});

// 默认展示全国
watch(reflectCountry, (v) => {
  console.log(111);
  updateData({ ...v, name: '全国', adcode: '100000' });
});

pubsub.subscribe('searchAreaData', (_, data) => updateData(data));

</script>
<style scoped lang='scss'>
.panel-main {
  padding: 5px 0 0 0 !important;
  min-height: 120px;
  li {
    padding: 5px 10px;
  }
  .n-d-title {
    font-size: 20px;
  }
  .n-d-comments-last {
    opacity: 0.75;
    font-size: 12px;
    color: var(--text-comments-color);
    border-top: 1px solid var(--border-color);
    p {
        transform: scale(0.9);
        animation: bounce-comments-last 0.35s;
    }
  }
}

.panel-data {
  height: 260px;
  align-items: flex-end;
  .n-d-title {
    height: 35px;
    font-size: 26px;
    text-align: end;
  }
  .n-d-comments {
    text-align: end;
  }
}

@keyframes bounce-comments-last {
  0% {
    margin-top: -15px;
    opacity: 0;
  }
  100% {
    margin-top: 0;
    opacity: 1;
  }
}
</style>