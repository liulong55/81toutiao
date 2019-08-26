<template>
  <!-- 左边栏最大的div -->
  <div class="layout-aside">
    <!-- 顶部图 -->
    <div class="aside-img">
      <img :src="collapse? smallimg:bigimg" :style="{width:collapse? '30px':'120px'}" alt />
    </div>
    <!-- :router=true 开启vue-router的模式 -->
    <el-menu
    :collapse="collapse"
      :collapse-transition="false"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      :router='true'
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发表文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="fans">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/fansdata">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fansimg">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-s-tools"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false, // 默认是展开
      bigimg: require('../../assets/img/logo_admin.png'), // 大图
      smallimg: require('../../assets/img/toutiao.png') // 小图
    }
  },
  created () {
    // 展开或者折叠每次取相反
    eventBus.$on('collopseOrClose', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang='less' scoped>
.layout-aside {
  width: 200px;
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
