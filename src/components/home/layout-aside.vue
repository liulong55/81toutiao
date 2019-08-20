<template>
  <!-- 左边栏最大的div -->
  <div class="layout-aside">
    <!-- 顶部图 -->
    <div class="aside-img">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <el-menu
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
    >
      <el-menu-item>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="1-1">发表文章</el-menu-item>
        <el-menu-item index="1-2">内容列表</el-menu-item>
        <el-menu-item index="1-3">评论列表</el-menu-item>
        <el-menu-item index="1-3">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="1-1">图文数据</el-menu-item>
        <el-menu-item index="1-2">粉丝概况</el-menu-item>
        <el-menu-item index="1-3">粉丝画像</el-menu-item>
        <el-menu-item index="1-3">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item>
        <i class="el-icon-s-tools"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.layout-aside {
  width: 200px;
  height: 100vh;
  background-color: #323745;
  .aside-img {
    text-align: center;
    background-color: #2e2f32;
    padding: 15px 0;
    img {
      width: 120px;
      height: 30px;
    }
  }
}
</style>
