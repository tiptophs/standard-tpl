<!--
 * @Descripttion: 
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-19 22:51:45
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-20 00:10:44
-->
<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex"
      class="el-head-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <!--logo-->
      <span class="logo">
        <a href="javascript:;">
          <img src="../source/logo.png" />
        </a>
      </span>
      <el-menu-item index="1">登录</el-menu-item>
      <el-submenu index="2">
        <template slot="title">桌面管理</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3"
        ><a href="https://www.ele.me" target="_blank" disabled
          >收藏</a
        ></el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      activeIndex: "3",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-menu li {
  float: right;
}
.el-head-menu {
  padding: 0px 10px;
}

.logo {
  float: left;
  height: 61px;
}
.logo img {
  height: 61px;
}
</style>
