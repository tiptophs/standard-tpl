/*
 * @Descripttion:
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-13 00:14:27
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-18 22:12:10
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
