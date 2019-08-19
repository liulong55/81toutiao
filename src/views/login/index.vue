<template>
    <div class="login">
    <el-card class="login-card">
        <div class="tupian">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <el-form :model="formData" :rules="rules" ref="form">
            <!-- 第一个手机输入框 -->
            <el-form-item prop="mobile">
                <el-input placeholder="请输入手机号" v-model="formData.mobile"></el-input>
            </el-form-item>
            <!-- 第二个输入框 -->
            <el-form-item prop="code">
                <el-input style="width:230px" placeholder="请输入验证码" v-model="formData.code"></el-input>
                <el-button style="float:right">发送验证码</el-button>
            </el-form-item>
            <!-- 第三个 -->
            <el-form-item prop="check">
                <el-checkbox v-model="formData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <!-- 提交按钮 -->
            <el-form-item>
                <el-button type="primary" @click='login' style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    </div>
</template>

<script>
export default {
  data () {
    // 自定义效验函数
    var func = function (rules, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('请您仔细阅读用户协议和隐私条款,登录需勾选'))
      }
    }
    return {
      formData: {
        // 手机号
        mobile: '',
        // 验证码
        code: '',
        check: false

      },
      rules: {
        mobile: [
          { required: true, message: '登录号码不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ],
        check: [
          { // 自定义效验函数
            validator: func
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 手动效验表单数据
      this.$refs.form.validate(isok => {
        if (isok) {
          console.log('前端效验成功')
          this.$axios.post('/authorizations', this.formData).then(result => {
            // console.log(result)
            // console.log(result.data.data)
            // 储存在本地里
            window.localStorage.setItem('user-onfo', JSON.stringify(result.data.data))
            // 登录成功,跳转到home页
            this.$router.push('/home')
            // 登录失败提醒
          }).catch(res => {
            this.openVn()
            this.formData.mobile = ''
            this.formData.code = ''
            this.formData.check = false
          })
        }
      })
    },
    openVn () {
      const h = this.$createElement
      this.$message({
        message: h('p', null, [
          h('span', null, '登录信息有误'),
          h('i', { style: 'color: teal' })
        ])
      })
    }
  }
}
</script>

<style lang='less' scoped>
    .login{
        width: 100%;
        height: 100vh;
        background:url('../../assets/img/login_bg.jpg');
        background-size:cover;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-card {
            width: 400px;
            height: 320px;
           .tupian{
                 text-align: center;
                 margin-bottom: 30px;
                img{
                     width: 135px;
                     height: 30px;
                }
           }
        }
    }
</style>
