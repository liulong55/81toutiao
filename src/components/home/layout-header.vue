<template>
<el-row type="flex" class="layout-header" justify="space-between">
  <el-col :span="6" class="left">
      <i class="el-icon-s-unfold" ></i>
      <span>江苏传智播客教育科技股份有限公司</span>
  </el-col>
  <el-col :span="3" class="you">
      <img src="../../assets/img/avatar.jpg" alt="">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
       563  <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >个人信息</el-dropdown-item>
        <el-dropdown-item >git地址</el-dropdown-item>
        <el-dropdown-item >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
</template>

<script>
export default {

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
