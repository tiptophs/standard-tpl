<!--
 * @Descripttion: 
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-19 16:04:23
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-20 00:31:38
-->
<template>
  <div class="home-content">
    <card />
  </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {},
  components: {
    card,
  },
};
</script>

<style scoped="scoped">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
