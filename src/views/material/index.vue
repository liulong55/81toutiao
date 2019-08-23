<template>
   <el-card>
         <bread-crumb slot="header">
            <template slot="title">素材管理</template>
      </bread-crumb>
                      <!-- 上传按钮                                            可以自定义上传的实现 -->
      <el-upload class="upload-material" action='' :show-file-list='false' :http-request='uploadImg'>
        <el-button type="primary">上传图片</el-button>
      </el-upload>
      <!-- 选项卡切换                      tab 被选中时触发的事件 -->
       <el-tabs v-model="activeName"  @tab-click="changeTab">
    <el-tab-pane label="全部" name="all">
        <div class="img-list">
            <el-card class="img-card" v-for="(item,index) in list" :key='index'>
                <img :src="item.url" alt="">
                <el-row class="operate" type="flex" justify="space-around">
                                                     <!-- 收藏功能 -->
                    <i class="el-icon-star-on" @click='collectOrCancel(item)' :style="{color:item.is_collected? 'red':''}"></i>
                                                        <!-- 删除功能,但是接口有问题,所以不能成功 -->
                     <i class="el-icon-delete-solid" @click='delMateial(item)'></i>
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
    <el-tab-pane label="收藏" name="collect">
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
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      }
    }
  },
  methods: {
    // 上传功能
    uploadImg (params) {
      // console.log(params)  里面有个file属性里是我们需要的
      let formDate = new FormData()
      formDate.append('image', params.file) // 参数是image
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: formDate
      }).then(() => {
        // 重新获取数据
        this.getMaterial()
      })
    },
    // 收藏功能
    collectOrCancel (item) {
      let mess = this.is_collected ? '取消收藏' : '收藏'
      this.$confirm(`您确定要${mess}吗?`, '提醒').then(() => {
        this.$axios({
          method: 'put',
          url: `/user/images/${item.id}`,
          data: { collect: !item.is_collected } // 取相反的状态
        }).then(() => {
          // 重新拉取下数据
          this.getMaterial()
        })
      })
    },
    // 删除素材方法
    delMateial (item) {
      this.$confirm('您确定要删除此图片吗?', '标题').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${item.id}`
        }).then(result => {
          this.getMaterial()
        })
      })
    },
    changeTab () {
      this.page.currentPage = 1 // 因为每次切换标签 都从第一页开始
      this.getMaterial()
    },
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
        params: { collect: this.activeName === 'collect', ...pageParams }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        console.log(result)
      })
    } // tab 被选中时触发的事件  targetName里边有个label
    // tabClick (targetName) {
    //   targetName.label === '全部' ? this.activeNameStatus = false : this.activeNameStatus = true
    //   console.log(targetName)
    //   this.getMaterial()
    // }
  },
  created () {
    this.getMaterial() // 第一次进入 activeName === "all"  加载第一页的全部数据
  }
}
</script>

<style lang='less' scoped>
    .upload-material{
      position: absolute;
      right: 20px;
      margin: -10px 15px;
      z-index: 1;
    }
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
