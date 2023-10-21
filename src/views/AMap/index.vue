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
      <LayerDistrict />
    </el-amap>

    <div class="m-b-panel m-b-left">
      <PaneLeft />
    </div>

    <div class="m-b-panel m-b-right">
      <ColorClassify />
    </div>

    <div class="m-b-rest">
      <ResetMapPos @reset="reset"/>
    </div>

  </section>
</template>

<script lang='ts' setup>
import { inject } from 'vue';

import ControlScale from './ControlScale/index.vue';
import ToolBar from './ToolBar/index.vue';
import ControlBar from './ControlBar/index.vue';
import Geolocation from './Geolocation/index.vue';
import LayerDistrict from './LayerDistrict/index.vue';
import PaneLeft from './PanelLeft/index.vue';
import ColorClassify from './ColorClassify/indx.vue';
import ResetMapPos from './ResetMapPos/index.vue';

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

// 切换地图主题样式
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

const reset = () => {
  // 判断缩放等级是否一致
  const isZoom = amap.e.getZoom() === _zoom;
  // 判断center是否一致
  const { KL, KT } = amap.e.getCenter();
  const [_KL, _KT] = _center;
  const isReset = isZoom && KL === _KL && KT === _KT;
  const lang = () => i18nMap.body.amap.resetPos.globalMsg;
  console.log(isReset, amap.e.getCenter(), _center);
  if (isReset) return message({
    title: lang().warn.title,
    content: lang().warn.content,
    type: 'warn'
  });
  // 重置缩放等级与中心点位置
  amap.e.setZoom(_zoom);
  amap.e.setCenter(_center);
  message({
    title: lang().success.title,
    content: lang().success.content
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