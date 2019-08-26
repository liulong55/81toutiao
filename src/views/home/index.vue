<template>
<!-- <div>主页</div> -->
<!-- 最外层容器 -->
<el-container>
    <!-- 左侧 -->
  <layout-aside :style='{width}' style="min-height:100vh;"></layout-aside>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      width: '200px'
    }
  },
  created () {
    eventBus.$on('collopseOrClose', () => {
      this.width = this.width === '200px' ? '63px' : '200px'
    })
  }
}
</script>

<style>

</style>
