<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-form label-width="80px" class="publish-form" :model="formData" :rules="rules" ref="myForm">
      <el-form-item label="标题" prop="title">
        <el-input style="width:300px" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="formData.content" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
          <el-select  v-model="formData.channel_id">
             <el-option :label="item.name" :value="item.id" v-for="item in channels" :key='item.id'></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="publish(false)">发布</el-button>
          <el-button  @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 文本域
        channel_id: null,
        cover: {
          type: 0, // 类型
          images: [] // 图片数组 随着 type变化而变化 type =>  image 变化 type  == 1 images ['']  type = 3 images ['','',''] 否则images为 []
        }
      },
      rules: {
        title: [
          { required: true, message: '标题内容不能为空' },
          { min: 5, max: 30, message: '标题必须在5到30个字符之间' }
        ],
        content: [
          { required: true, message: '发布内容不能为空' }
        ],
        channels_id: [
          { required: true, message: '频道不能为空' }
        ]
      }
    }
  },
  methods: {
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 通过文章id获取文章信息
    getArticleByid () {
      let { articleId } = this.$route.params // 将传过来的id解构出来
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将文章数据和页面数据绑定起来
      })
    },
    // 发布内容
    publish (draft) {
      this.$refs.myForm.validate(isok => {
        if (isok) {
          // 发布文章
          let { articleId } = this.$route.params // 将传过来的id解构出来
          let method = articleId ? 'put' : 'post' // 根据文章id确定,是编辑还是新增
          let url = articleId ? `/articles/${articleId}` : '/articles' // 根据id确定,当前请求的地址
          this.$axios({
            method: method,
            url: url,
            params: { draft }, // 是否为草稿
            data: this.formData
          }).then(() => {
          // 如果发布成功 就会跳转到内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    let { articleId } = this.$route.params // 将传过来的id解构出来
    articleId && this.getArticleByid()
    this.getChannels() // 获取频道
  }
}
</script>

<style lang='less' scoped>
    .publish-form{
        margin-left: 50px;
    }
</style>
