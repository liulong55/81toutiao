<template>
<!-- 这是个面包屑，需要注册全局组件 -->
<el-breadcrumb separator='>'>
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>
      <!-- 定义具名插槽 -->
      <slot name="title"></slot>
  </el-breadcrumb-item>
</el-breadcrumb>
</template>
<script>
export default {

}
</script>
<style>
</style>
