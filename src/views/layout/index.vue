<!--
 * @Descripttion: 
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-19 21:58:36
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-20 00:26:43
-->
<template>
  <div class="layout">
    <el-container class="layout-container">
      <el-header>
        <!--导航栏部分-->
        <navbar />
      </el-header>
      <el-container>
        <!--侧边栏部分-->
        <sidebar />
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navbar from "./components/navbar";
import sidebar from "./components/sidebar";

export default {
  data() {
    return {};
  },
  components: {
    navbar,
    sidebar,
  },
};
</script>

<style scoped="scoped">
.layout,
.layout-container {
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  padding: 0px;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>
