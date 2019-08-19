<template>
    <div class="login">
    <el-card class="login-card">
        <div class="tupian">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <el-form>
            <!-- 第一个手机输入框 -->
            <el-form-item>
                <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>
            <!-- 第二个输入框 -->
            <el-form-item>
                <el-input style="width:230px" placeholder="请输入验证码"></el-input>
                <el-button style="float:right">发送验证码</el-button>
            </el-form-item>
            <!-- 第三个 -->
            <el-form-item>
                <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <!-- 提交按钮 -->
            <el-form-item>
                <el-button type="primary" style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    </div>
</template>

<script>
export default {

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
