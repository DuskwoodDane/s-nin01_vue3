import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initAMapApiLoader } from '@vuemap/vue-amap';

import sCode from '@/utils/constant/s_nin';

import App from './App.vue';
import router from './router';

import '@/styles/theme.scss';
import '@/styles/reset.scss';
import '@/styles/common.scss';
import '@vuemap/vue-amap/dist/style.css';


initAMapApiLoader({
  key: sCode.amap.key,
  securityJsCode: sCode.amap.code
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
