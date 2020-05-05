<template>
    <!-- <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div> -->


    <div id="container">
        <div id="container-child">
            <div><img src="../../assets/img/login.png"></div>
            <div id="login-div">
                <div>
                    <p class="p-title">三方共制的非处方药监管平台登录</p>
                    <el-form id="login-form" :model="param"  :rules="rules" ref="login">
                        <div class="input-d">
                            <input v-model="param.username" class="input-text" type="text" name="username" id="username" placeholder="请输入您的账号">
                            </input>
                        </div>
                        <div class="input-d">
                            <input v-model="param.password" class="input-text" type="password" name="password" id="password" placeholder="请输入您的密码">
                            </input>
                        </div>
                        
                        <div class="div-input">
                            <div>
                                <input type="checkbox"  name="remember" id="remember">
                                <label>记住密码</label>
                                <a href="#">忘记密码</a>
                            </div>
                        </div> 
                        <button type="button" onclick="goindex()" class="login-button" @click="submitForm()">登&emsp;录</button>
                        <div class="footer"><a href="#">切换账号</a></div>
                       
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: 'admin',
                password: '000000',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.postKeyValueRequest('/login',this.param).then(resp => {
                        if(resp.code == 200){
                            this.$message.success('登录成功');
                            window.sessionStorage.setItem('ms_username', this.param.username);
                            this.$router.push('/');
                        }else if(resp.code == 500){
                            this.$message.success(resp.message);
                        }
                    })
                   
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}


body{
    background-color: rgba(237, 238, 238, 0.719);
}
a{
    text-decoration: none;
    font-size: 14px;
    color: #186498;
}
#container{
    width: 750px;
    height: 380px;
    margin: auto;
    margin-top: 15%;
}
#container-child>div{
    float: left;
}
#container-child #login-div{
    width: 450px;
    height: 380px;
    background-color: rgb(255, 255, 255);
}
#login-div>div{
    width: 80%;
    margin: auto;
}
.p-title{
    color: #186498;
    font-size: 24px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 30px;
}
.input-text{
    display: inline-block;
    width: 96.5%;
    height: 40px;
    padding-left: 10px;
    /* margin-bottom: 24px; */
    font-size: 16px;
    border: 0;
}
.input-d{
    padding: 0;
    width: 100%;
    border: 1px solid #666666;
    margin-top: 30px;
}
.div-input{
    padding: 0;
    width: 100%;
    font-size: 14px;
    margin-top: 16px;
}
.div-input label{
    color:#666666;
}
.div-input a{
    /* float: right; */
    margin-left: 168px; 
}
.div-input input{
    width: 20px;
    height: 20px;
    margin-left: 0px;
    vertical-align: middle;
    border: 0;
}
.login-button{
    width: 100%;
    height: 46px;
    background-color: #186498;
    text-align: center;
    border: 0px;
    margin-top: 26px;
    color: white;
    font-size: 16px;
    cursor: pointer;
}
.footer{
    float: right;
    margin-top: 20px;
}

</style>