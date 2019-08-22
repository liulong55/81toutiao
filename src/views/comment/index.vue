<template>
  <!-- 评论列表 -->
  <!-- el-card具名插槽标题 -->
  <el-card>
      <!-- 面包屑具名插槽标题 -->
      <bread-crumb slot="header">
            <template slot="title">评论列表</template>
      </bread-crumb>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column  label="标题" width="500"></el-table-column>
    <el-table-column label="评论状态" ></el-table-column>
    <el-table-column  label="总评论数"></el-table-column>
    <el-table-column  label="粉丝评论数"></el-table-column>
     <el-table-column  label="操作">
         <el-button type="text">修改</el-button>
         <el-button type="text">关闭评论</el-button>
     </el-table-column>
  </el-table>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
