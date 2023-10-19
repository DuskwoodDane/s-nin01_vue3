<template>
  <div class="switch-content">
      <div class="s-c-container" :style="{ marginTop: distance }">
          <p v-for="(item, key) of list" :key="key">{{ item }}</p>
      </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, watch } from 'vue';

type Props = { text: string | number }

const props = defineProps<Props>();

// 文案list
const list = reactive([props.text]);

// 每次移动的距离
const distance = ref('0');

watch(() => props.text, () => {
  list.push(props.text);
  distance.value = `-${35 * (list.length - 1)}px`;
});

</script>
<style scoped lang='scss'>
.switch-content {
  height: 100%;
  overflow: hidden;
  .s-c-container {
    transition: all 1s;
    p {
      height: 35px;
    }
  }
}
</style>