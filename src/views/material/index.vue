<template>
   <el-card>
         <bread-crumb slot="header">
            <template slot="title">素材管理</template>
      </bread-crumb>
      <!--选项卡切换 -->
       <el-tabs v-model="activeName" >
    <el-tab-pane label="全部" name="first">

    </el-tab-pane>
    <el-tab-pane label="收藏" name="second">

    </el-tab-pane>
  </el-tabs>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style>

</style>
