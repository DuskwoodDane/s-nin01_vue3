<template>
  <ul class="s-n-transition-bg-tcolor s-n-data-panel" id="ncov-color-classify">
    <li v-for="(item, index) of colorClassify" :key="index">
      <div
        :class="`n-c-c-section ${item.className ? item.className : ''}`"
        :style="{ backgroundColor: item.color }"></div>
      <p>{{ item.comment }}</p>
    </li>
  </ul>
</template>

<script lang='ts' setup>
/** 颜色等级分类(panel) */
const colorClassify = [
  {
    color: 'rgb(29,46,140)',
    comment: '10,001+',
    className: 'n-c-c-section-start'
  },
  {
    color: 'rgb(44,90,157)',
    comment: '6,001 - 10,000'
  },
  {
    color: 'rgb(47,135,183)',
    comment: '3,001 - 6,000'
  },
  {
    color: 'rgb(69,177,205)',
    comment: '1,001 - 3,000'
  },
  {
    color: 'rgb(131,202,210)',
    comment: '1 - 1000'
  },
  {
    color: 'rgb(197,227,203)',
    comment: '0',
    className: 'n-c-c-section-end'
  }
];

</script>
<style scoped lang='scss'>
#ncov-color-classify {
    width: 180px;
    margin-bottom: 0;
    li {
      @include flex-row(center);
      margin-bottom: 1px;
    }
    .n-c-c-section {
      @include set-wh(15px, 45px);
      margin-right: 10px;
    }
    .n-c-c-section-start {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .n-c-c-section-end {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
}
</style>