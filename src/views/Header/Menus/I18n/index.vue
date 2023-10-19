<template>
  <section class="i18n">
    <p class="i19n-title">{{ i18nMap.header.menus.i18n.text1 }}</p>
    <ul class="i18n-list">
      <li
       v-for="(item, index) of options"
       :key="index"
       @click="switchLang(item.lang)"
       :title="item.title">{{ item.text }}</li>
    </ul>
    <p class="footer">
      {{ i18nMap.header.menus.i18n.text3 }}
      <br />
      <br />
      {{ i18nMap.header.menus.i18n.text2 }}
    </p>
  </section>
</template>

<!-- filename: I18n.vue -->
<script lang='ts' setup>
import { inject, nextTick } from 'vue';

import constant from '@/utils/constant';
import i18nUtils from '@/utils/lang';
import message from '@/utils/message';
import type { ForceLang } from '@/utils/lang/interface';

type Emits = {(t: 'close'): void, (a: 'left'): void}

const { injectionKey, defaultValue } = constant;

const emits = defineEmits<Emits>();
const i18nMap = inject(injectionKey.I18NMAP, defaultValue.i18nMap);
const forceLang = inject(injectionKey.FORCELANG, defaultValue.forceLang);

const options = [
    /** 法语 */
    { title: 'Basculer en français', lang: 'fr', text: 'français' },
    /** 韩语 */
    { title: '한국어로 전환', lang: 'ko', text: '한어' },
    /** 日语 */
    { title: '日本語に切り替え', lang: 'jp', text: '日本語' },
    /** 英语 */
    { title: 'switch to english', lang: 'en', text: 'English' },
    /** 简体中文 */
    { title: '切换为简体中文', lang: 'zh_cn', text: '简体中文' },
    /** 繁体中文 */
    { title: '切換爲繁體中文', lang: 'zh_hk', text: '繁體中文' }
] as const;

const switchLang: ForceLang = (lang) => {
  const _lang = () => i18nMap.header.menus.i18n.globalMsg;
  // 如果是重复的，则取消切换
  if (i18nUtils.lang() === lang) {
    return message({
      title: _lang().warn.title,
      content: _lang().warn.content,
      type: 'warn'
    });
  }

  // 更新本地Local
  i18nUtils.setLang(lang);
  emits('close');
  // 更新pubsub中存储的lang
  forceLang(lang);
  nextTick(() => {
    message({
      title: _lang().success.title,
      content: _lang().success.content
    });
  });
};

</script>
<style scoped lang='scss'>
.i18n {
  height: 100%;
  .i18n-title {
    font-size: 16px;
    margin-bottom: 15px;
    color: var(--text-title-color);
  }
  .i18n-list {
    padding-left: 20px;
    margin-bottom: 15px;
    list-style-type: square;
    li {
      padding: 7px;
      border-radius: 5px;
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      color: var(--text-title-color);
      &:hover {
          color: var(--bg-color);
          background-color: var(--text-title-color);
      }
    }
  }
}
</style>