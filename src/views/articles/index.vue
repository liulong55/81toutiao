<template>
  <el-card slot="header">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form>
      <el-form-item label="文章状态">
        <el-radio-group>
          <el-radio label="1">全部</el-radio>
          <el-radio label="2">草稿</el-radio>
          <el-radio label="3">待审核</el-radio>
          <el-radio label="4">审核成功</el-radio>
          <el-radio label="5">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道选择">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
       <el-date-picker
      v-model="value1"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {}
</script>

<style>
</style>
