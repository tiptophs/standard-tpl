/*
 * @Descripttion:
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-19 15:29:14
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-20 00:23:35
 */

import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/layout";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "",
      component: Layout,
      redirect: "home",
      children: [
        {
          path: "home",
          component: () => import("@/views/home"),
          name: "home",
        },
      ],
    },
  ],
});
