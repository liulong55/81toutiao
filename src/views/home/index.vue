<template>
<!-- <div>主页</div> -->
<!-- 最外层容器 -->
<el-container>
    <!-- 左侧 -->
  <layout-aside></layout-aside>
  <el-container>
      <!-- 右边头 -->
    <el-header style="padding:0">
      <layout-header></layout-header>
    </el-header>
    <el-main>
        <!-- 二级路由的容器 -->
        <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {

}
</script>

<style>

</style>
