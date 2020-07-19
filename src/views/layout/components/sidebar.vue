<!--
 * @Descripttion: 
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-19 23:01:32
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-19 23:35:51
-->
<template>
  <div class="sidebar">
    <!--控制隐藏显示-->
    <div class="sidebar-control">
      <span
        class="el-icon-caret-right"
        @click="showBar(false)"
        v-show="isCollapse"
      ></span>
      <span
        class="el-icon-caret-left"
        @click="showBar(true)"
        v-show="!isCollapse"
      ></span>
    </div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      isCollapse: true, // 隐藏右侧栏
    };
  },
  methods: {
    /**
     * 控制右侧栏
     */
    showBar(status) {
      this.isCollapse = status;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.sidebar-control {
  height: 40px;
  background-color: #ecf5ff;
}
.sidebar-control span {
  position: relative;
  text-align: center;
  height: 100%;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  padding: 0px 20px;
  top: 8px;
  cursor: pointer;
  color: #3a8ee6;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
