<template>
<el-row type="flex" class="layout-header" justify="space-between">
  <el-col :span="16" class="left">
      <i  @click='openOrClose' :class="currentClass"></i>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      user: {

      },
      currentClass: 'el-icon-s-fold', // 默认向左的图标
      defaultImg: require('../../assets/img/avatar.jpg') // require的图片就变成了base64
    }
  },
  methods: {
    // 展开或者关闭
    openOrClose () {
      eventBus.$emit('collopseOrClose') // 触发了一个事件 打开或者
      this.currentClass = this.currentClass === 'el-icon-s-fold' ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    async getUserInfo () {
      let res = await this.$axios({
        url: '/user/profile'
      })
      this.user = res.data// 获取最新信息,赋值给列表上    请求拦截到data,所以写一个data即可
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
    eventBus.$on('updateUserInfoSuccess', () => {
      // 监听到了别人更新数据的消息
      this.getUserInfo() // 获取用户信息
    })
  }

}
</script>

<style lang='less' scoped>
    .layout-header{
      line-height: 60px;
        .left{
            padding: 0px 5px;
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
