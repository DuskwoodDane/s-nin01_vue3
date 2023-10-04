/// <reference types="vite/client" />

import Vue from 'vue'; // !!! 就是这一句
import VueRouter from 'vue-router';
import { Route } from 'vue-router';
declare module 'vue/types/vue' {
  interface Vue {
      $router: VueRouter;
      $route: Route;
      $store: Store<any>;
      $api: any;
  }
}