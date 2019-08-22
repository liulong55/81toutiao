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
  <!-- 分页功能 -->
  <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
  background
  layout="prev, pager, next"
  :current-page="page.currentpage"
  :page-size="page.pagesize"
  @current-change='changepage'
  :total="page.total"
 >
</el-pagination>
  </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        pagesize: 10, // 每页多少条
        total: 0, // 总共多少条
        currentpage: 1 // 当前页面
      }
    }
  },
  methods: {
    // 页码改变时触发    newPage最新页码值
    changepage (newPage) {
      this.page.currentpage = newPage // 将最新页码赋值给data中的变量
      this.getcomments()
    },
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
    //   let pageParams = { page: this.page.currentpage, per_page: this.page.pagesize }
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment', // 查询评论相关的数据
          //   ...pageParams
          page: this.page.currentpage, // 当前页参数
          per_page: this.page.pagesize // 页码参数
        }
      }).then(result => {
        this.list = result.data.results // 取到列表数据 给 当前的数据对象
        this.page.total = result.data.total_count // 评论文章总数赋值给当前分页的总数
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
