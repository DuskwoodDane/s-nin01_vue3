<script setup lang="ts">
import { reactive, provide } from 'vue';
import { RouterView } from 'vue-router';

import constant, { saveDataSource } from '@/utils/constant';
import i18nUtils from '@/utils/lang';

import countrySource from '@/assets/json/country.json';
import provinceSource from '@/assets/json/province.json';
import citiesSource from '@/assets/json/cities.json';
import provinceCities from '@/assets/json/provinceCities.json';

import type { ForceLang, LangType } from '@/utils/lang/interface';

const i18nMap = reactive(i18nUtils.$i18nMap());
const { injectionKey } = constant;

const forceLang: ForceLang = (lang: LangType) => {

  i18nUtils.setLang(lang);
  Object.assign(i18nMap, i18nUtils.$i18nMap());
};

provide(injectionKey.I18NMAP, i18nMap);
provide(injectionKey.FORCELANG, forceLang);

// 保存数据源
saveDataSource({
  [injectionKey.COUNTRY as symbol]: countrySource,
  [injectionKey.PROVINCE as symbol]: provinceSource,
  [injectionKey.CITIES as symbol]: citiesSource,
  [injectionKey.PROVCITIES as symbol]: provinceCities,
});
</script>

<template>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
