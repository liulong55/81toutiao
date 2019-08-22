<template>
   <el-card>
         <bread-crumb slot="header">
            <template slot="title">素材管理</template>
      </bread-crumb>
      <!-- 选项卡切换                      tab 被选中时触发的事件 -->
       <el-tabs v-model="activeName"  @tab-click="tabClick">
    <el-tab-pane label="全部" name="first">
        <div class="img-list">
            <el-card class="img-card" v-for="(item,index) in list" :key='index'>
                <img :src="item.url" alt="">
                <el-row class="operate" type="flex" justify="space-around">
                    <i class="el-icon-star-on"></i>
                     <i class="el-icon-delete-solid"></i>
                </el-row>
            </el-card>
        </div>
         <el-row type='flex' justify="center">
            <el-pagination
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              :total="page.total"
              @current-change="changePage"
              background
              layout="prev, pager, next"
            ></el-pagination>
          </el-row>
    </el-tab-pane>
    <el-tab-pane label="收藏" name="second">
        <div class="img-list">
            <el-card class="img-card" v-for='(item,index) in list' :key='index'>
                <img :src="item.url" alt="">
            </el-card>
        </div>
        <el-row type='flex' justify="center">
            <el-pagination
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              :total="page.total"
              @current-change="changePage"
              background
              layout="prev, pager, next"
            ></el-pagination>
          </el-row>
    </el-tab-pane>
  </el-tabs>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 默认那个选项
      activeName: 'first',
      activeNameStatus: true, // 设置个变量来控制接口
      list: [],
      page: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      }
    }
  },
  methods: {
    // 切换页签   另一种写法绑定上面那个tab栏切换事件   这是老师写的,下面那个分页功能是助教教的
    // changeTab () {
    //   this.page.currentPage = 1 // 因为每次切换标签 都从第一页开始
    //   this.getMaterial()
    // },
    // 切换页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 加载图片数据
    getMaterial () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios.get('/user/images', {
        params: { collect: this.activeNameStatus, ...pageParams }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        console.log(result)
      })
    }, // tab 被选中时触发的事件  targetName里边有个label
    tabClick (targetName) {
      targetName.label === '全部' ? this.activeNameStatus = false : this.activeNameStatus = true
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
  .img-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 200px;
    margin: 20px 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      width: 100%;
      background-color: #f4f5f6;
      i {
        font-size: 22px;
      }
    }
  }
}
</style>
