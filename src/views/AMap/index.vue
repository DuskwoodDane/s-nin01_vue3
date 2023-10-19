<template>
  <section class="map-body">
    <el-amap
     :vid="'s_nin'"
     :zoom="_zoom"
     :zooms="zooms"
     :isHotspot="false"
     :scrollWheel="false"
     :doubleClickZoom="false"
     @init="init">
      <ControlScale />
      <ToolBar />
      <ControlBar />
      <Geolocation />
    </el-amap>

    <div class="m-b-panel m-b-left">
      <Details />
    </div>
  </section>
</template>

<script lang='ts' setup>
import { inject } from 'vue';

import ControlScale from './ControlScale/index.vue';
import ToolBar from './ToolBar/index.vue';
import ControlBar from './ControlBar/index.vue';
import Geolocation from './Geolocation/index.vue';
import Details from './PanelLeft/index.vue';

import pubsub from '@/utils/pubsub';
import constant from '@/utils/constant';
import message from '@/utils/message';
import styleUtils from '@/utils/style';
import storage from '@/utils/storage';

import type { SwitchStyle } from '@/utils/interface/pubsub';


const { injectionKey, defaultValue } = constant;

const i18nMap = inject(injectionKey.I18NMAP, defaultValue.i18nMap);


const amap = {
  // 高德地图实例
  e: null as any,
  curStyle: 'normal'
};
/** 缩放层级的限制范围 */
const zooms = [3, 9];
/** 默认的缩放层级 */
const _zoom = 4.4;
/** 默认的中心点 */
const _center = [104.62313499999999, 37.358796];

const _changeAllTheme = (style: string, key: number) => {
  const mapStyle = style === '_light' ? 'normal' : style;

  // 切换高德地图主题
  amap.e.setMapStyle(`amap://styles/${mapStyle}`);

  styleUtils.changeTheme(style);

  storage.setItem('themeId', `${key}`);

  amap.curStyle = mapStyle;
};


const init = (e: any) => {
  amap.e = e;
  const style = styleUtils.adaptation();
  const key = style?.theme === '_light' ? 0 : 3;
  _changeAllTheme((style?.theme as string), key);

  style?.dark.push(() => _changeAllTheme('dark', 0));
  style?.dark.push(() => _changeAllTheme('_light', 3));

  // 地图显示要素
  amap.e.setFeatures(['bg', 'road']);
};

const switchStyle = ({ style, key }: SwitchStyle) => {
  const lang = () => i18nMap.header.menus.style;

  if (amap.curStyle === style) { 
    return message({
      title: lang().globalMsg.warn.title,
      content: lang().globalMsg.warn.content,
      type: 'warn'
    });
  }

  _changeAllTheme(style, key);
  message({
    title: lang().globalMsg.success.title,
    content: lang().globalMsg.success.content
  });

};

pubsub.subscribe('switchStyle', (_, styleData) => switchStyle(styleData));

</script>
<style scoped lang='scss'>
.map-body {
  height: calc(100% - 126px - 40px);
  position: relative;
  .m-b-panel {
    position: absolute;
    z-index: 197;
  }
  .m-b-left {
    top: 20px;
    left: 20px;
  }

  .m-b-right {
    bottom: 25%;
    right: 20px;
  }

  .m-b-rest {
    position: absolute;
    top: 100px;
    right: 20px;
    padding: 3px;
    box-sizing: border-box;
    @include set-wh(33px, 33px);
    border-radius: 17px;
    background-color: #FFF;
  }
}
</style>