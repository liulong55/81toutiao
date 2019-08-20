<template>
<!-- <div>主页</div> -->
<!-- 最外层容器 -->
<el-container>
    <!-- 左侧 -->
  <leftaside/>
  <el-container>
      <!-- 右边头 -->
    <el-header style="padding:0">
        <layouthearder />
    </el-header>
    <el-main>
        <!-- 右边容器 -->
        <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import leftaside from '../../components/home/layout-aside'
import layouthearder from '../../components/home/layout-header'
export default {
  components: {
    // 左边栏    因为是对象,可用es6简写
    leftaside,
    // 右边头
    layouthearder
  }
}
</script>

<style>

</style>
