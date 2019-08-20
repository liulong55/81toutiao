<template>
<el-row type="flex" class="layout-header" justify="space-between">
  <el-col :span="6" class="left">
      <i class="el-icon-s-unfold" ></i>
      <span>江苏传智播客教育科技股份有限公司</span>
  </el-col>
  <el-col :span="3" class="you">
        <!-- 如果有就拿网络的,如果没有就拿本地的,已被转成base64位的 -->
      <img :src="user.photo? user.photo:defaultImg" alt="">
    <el-dropdown trigger="click" @command='xiala'>
      <span class="el-dropdown-link">
       {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='account'>个人信息</el-dropdown-item>
        <el-dropdown-item command='git'>git地址</el-dropdown-item>
        <el-dropdown-item command='tui'>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      user: {

      },
      defaultImg: require('../../assets/img/avatar.jpg') // require的图片就变成了base64
    }
  },
  methods: {
    getUserInfo () {
      let userInfo = window.localStorage.getItem('user-onfo') // 获取用户储存信息,里面有token
      let token = userInfo ? JSON.parse(userInfo).token : null // 获取token
      token && this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` } // 将headers中赋值,后端需要token身份信息, 携带信息
      }).then(res => {
        this.user = res.data.data // 获取最新信息,赋值给列表上
      })
    },
    xiala (command) {
      if (command === 'account') {
      // 个人信息
      } else if (command === 'git') {
      // 跳转给git
        window.location.href = 'https://github.com/liulong55/81toutiao'
      } else {
        // 退出
        window.localStorage.clear() // 清除本项目在本地的所有缓存
        // 跳转给login
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo() // 获取用户信息
  }

}
</script>

<style lang='less' scoped>
    .layout-header{
        background-color: aliceblue;
        .left{
            padding: 10px 5px;
            display: flex;
            align-items: center;
            i{
                font-size: 20px;
                margin-right: 5px;
            }
        }
        .you{
            display: flex;
            align-items: center;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
    }
</style>
