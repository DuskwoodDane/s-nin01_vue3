<template>
  <span>{{  textNode }}</span>
</template>

<!-- filename: Typewriter.vue -->
<script lang='ts' setup>
import { ref, onMounted } from 'vue';

type TextType = string | number

type Props = { text: TextType }

type Emits = {
  (e: 'finish', d: TextType): void
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const textNode = ref('');

onMounted(() => {
  let len = 0;
  const timeout = setInterval(() => {
    const _text = String(props.text);
    if (len === _text.length) {
      emits('finish', props.text);
      clearInterval(timeout);
      return;
    }
    textNode.value = _text.slice(0, len + 1);
    len++;
  }, 150);
});


</script>
<style scoped lang='scss'>
</style>