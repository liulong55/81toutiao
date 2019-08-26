<template>
  <el-card v-loading='loading'>
      <bread-crumb slot="header">
         <template slot="title">账户信息</template>
      </bread-crumb>
      <el-form label-width="100px" :model="formData" ref="userForm" :rules="rules">
          <!-- 用户名 -->
          <el-form-item label="用户名" prop='name'>
              <el-input  v-model="formData.name" style="width:300px"></el-input>
          </el-form-item>
          <!-- 用户简介 -->
          <el-form-item label="用户简介">
              <el-input  v-model="formData.intro" style="width:300px"></el-input>
          </el-form-item>
          <!-- 邮箱 -->
         <el-form-item label="用户邮箱" prop='email'>
              <el-input  v-model="formData.email" style="width:300px"></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="用户手机号">
              <el-input  v-model="formData.mobile" style="width:300px" disabled></el-input>
          </el-form-item>
          <!-- 保存按钮 -->
          <el-form-item>
             <el-button type='primary' @click='saveUserInfo'>保存信息</el-button>
         </el-form-item>
      </el-form>
      <el-upload class='head-img'  action="" :show-file-list="false" :http-request="uploadImg">
        <img  :src="formData.photo? formData.photo:imgUrl" alt="">
      </el-upload>
  </el-card>
</template>

<script>
// 引入
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      loading: false,
      imgUrl: require('../../assets/img/404.png'),
      formData: {
        name: '', // 用户名
        intro: '', // 头条号简介
        photo: '', // 用户头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 2, max: 10, message: '用户名必须2到10个字符' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }
        ]
      }
    }
  },
  methods: {
    // 表单上传
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data: data //  参数
      }).then(result => {
        // 获取到新地址之后,赋值给当前页面
        this.formData.photo = result.data.photo
        this.loading = false
        eventBus.$emit('updateUserInfoSuccess')// 触发了一个事件,更新头像成功;
      })
    },
    // 渲染个人信息
    getpersonal () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    // 修改
    saveUserInfo () {
      this.$refs.userForm.validate((isok) => {
        if (isok) {
          // 保存数据
          this.$axios({
            method: 'patch',
            url: '/user/profile',
            data: this.formData
          }).then(() => {
            this.$message({ message: '保存成功', type: 'success' })
            eventBus.$emit('updateUserInfoSuccess')// 触发了一个事件,修改信息成功
          })
        }
      })
    }
  },
  created () {
    this.getpersonal()
  }
}
</script>

<style lang='less' scoped>
    .head-img {
     position: absolute;
     left: 700px;
     top:150px;
     img{
         height: 200px;
     width: 200px;
     border-radius: 50%;
     }
 }
</style>
