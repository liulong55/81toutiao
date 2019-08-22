<template>
  <!-- 评论列表 -->
  <!-- el-card具名插槽标题 -->
  <el-card>
      <!-- 面包屑具名插槽标题 -->
      <bread-crumb slot="header">
            <template slot="title">评论列表</template>
      </bread-crumb>
    <el-table
    :data="list"
    stripe
    style="width: 100%">
    <!-- prop是绑定的字段名称 -->
    <el-table-column  label="标题" width="500" prop="title"></el-table-column>
    <el-table-column label="评论状态" :formatter='formatter' prop="comment_status"></el-table-column>
    <el-table-column  label="总评论数" prop="total_comment_count"></el-table-column>
    <el-table-column  label="粉丝评论数" prop="fans_comment_count"></el-table-column>
     <el-table-column  label="操作">
         <template slot-scope="obj">
             <el-button type="text">修改</el-button>
                                                <!--obj是个集合 -->
         <el-button type="text" @click='closeOrOpen(obj.row)' :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'}">{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
         </template>
     </el-table-column>
  </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 评论开关
    closeOrOpen (row) {
    //   console.log(row)
      let mess = row.comment_status ? '关闭' : '打开'
      // 弹出框组件
      this.$confirm(`您确定要${mess}评论吗?`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status } // 状态是反着的
        }).then(() => {
          // 进入这个函数一定成功
          this.getcomments()
        })
      })
    },
    // 渲染页面
    getcomments () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        this.list = res.data.results
      })
    },
    // 用来格式化内容    Cellvalue当前单元格值
    formatter (row, column, cellvalue, index) {
      return cellvalue ? '正常' : '关闭'
    }
  },
  created () {
    this.getcomments()
  }
}
</script>

<style>

</style>
