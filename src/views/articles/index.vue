<template>
  <el-card slot="header">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 工具栏-表单 -->
    <el-form style="margin-left:40px">
      <el-form-item label="文章状态">
        <el-radio-group v-model="formData.status" @change="refreshList">
          <!-- label必须有值 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核成功</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道选择">
        <el-select v-model="formData.channelid" placeholder="请选择" @change="refreshList">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <!-- value-format 是指定绑定值的格式 -->
        <el-date-picker
          @change="refreshList"
          v-model="formData.dateRange"
          value-format="yyyy-MM-dd"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!--↓↓↓-->
    <div class="total_title">共找到{{page.total}}条文章</div>
    <!-- 内容项 -->
    <div class="content-list">
      <!-- 循环项 -->
      <div class="content-item" v-for="(item,index) in list" :key="index">
        <!-- 左侧内容 -->
        <div class="left">
          <img :src="item.cover.images[0]" alt />
          <!-- 内容信息 -->
          <div class="info">
            <!-- 文章标题 -->
            <span>{{item.title}}</span>
            <!--   过滤类型                  过滤文本           -->
            <el-tag
              style="width:60px"
              :type="item.status | statusType "
            >{{item.status | statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span style="cursor:pointer">
            <i class="el-icon-edit"></i>
            修改
          </span>
                        <!-- 删除 -->
          <span @click='cancel(item)' style="cursor:pointer">
            <i class="el-icon-delete"></i>
            删除
          </span>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-pagination @current-change='changepage' :current-page="page.currentpage" :page-size="page.pagesize" background layout="prev, pager, next" :total="page.total"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 搜索工具栏的数据
      formData: {
        status: 5, // 默认是全部
        channelid: null, // 定义频道id 当前的选择的频道
        dateRange: null // 时间范围 是个数组
      },
      channels: [], // 频道数据
      list: [], // 内容列表
      page: {
        total: 0, // 总条数
        pagesize: 10, // 每页数量
        currentpage: 1 // 第一页
      }
    }
  },
  methods: {
    // 删除功能
    cancel (item) {
      this.$confirm('您确定要删除本条文章吗', '标题').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${item.id.toString()}`
        }).then(() => {
          // 重新加载  由于页码未变,条件未变,直接请求方法即可
          this.getArticles(this.getConditions())
        })
      })
    },
    // 页码改变事件
    changepage (newPage) {
      this.page.currentpage = newPage // 获取当前的最新页码
      // 点击了第二页,但是有条件,所以要把所有条件加在一起
      // let conditions = this.getConditions() // 获取其他条件
      // conditions.page = this.page.currentpage // 合并参数 最新页数
      // conditions.per_page = this.page.pagesize // 合并参数 最新每页数量
      // this.getArticles(conditions) // 调接口,把值传进去
      this.getArticles(this.getConditions()) // 查询数据
    },
    // 获取条件
    getConditions () {
      let { status, channelid, dateRange } = this.formData // 把所有的解构出来
      let params = {
        // 三元表达式
        status: status === 5 ? null : status, // 由于默认给了5,是5的话不能传,所以特殊处理
        channel_id: channelid,
        begin_pubdate: dateRange && dateRange.length ? dateRange[0] : null,
        end_pubdate: dateRange && dateRange.length > 1 ? dateRange[1] : null
      }
      params.page = this.page.currentpage
      params.per_page = this.page.pagesize
      return params
    },
    // 刷新列表数据  状态改变/频道切换/日期改变 都会触发同一个事件
    refreshList () {
      // console.log(this.formData.status) // 看一下是不是最新的状态
      // 当筛选条件改变时,应该将页码回到第一页
      this.page.currentpage = 1
      let params = this.getConditions()
      this.getArticles(params) // 在这调用下面的接口,把值传进去
    },
    // 获取文章
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: { ...params } // 把他解构进来
      }).then(result => {
        this.list = result.data.results // 将当前的数据赋值给data中的对象
        this.page.total = result.data.total_count // 当前总条数
      })
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  // 过滤器,做状态显示的标签
  filters: {
    // value是传过来的值
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    // 过滤tag标签的类型
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  created () {
    this.getArticles({ page: 1, per_page: 10 }) // 获取文章 // 查询第一页数据
    this.getChannels() // 获取频道
  }
}
</script>

<style lang='less' scoped>
.total_title {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px dashed #ccc;
}
.content-list {
  .content-item {
    padding: 10px;
    border-bottom: 1px solid #f2f3f5;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 150px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        margin-left: 10px;
        display: flex;
        height: 100px;
        padding: 5px 0;
        flex-direction: column;
        justify-content: space-between;
        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right {
      span,
      span i {
        font-size: 12px;
        color: #333;
      }
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>
