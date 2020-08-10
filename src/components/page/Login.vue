<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">科海拓后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>

				<!--<el-form-item prop="imageText">
					<div style="display: flex;">

						<el-input v-model="ruleForm.imageText" class="imageText" placeholder="imageText">

						</el-input>
						<img :src="verificationCodeUrl" alt="" class="imageTextCode" @click="verificationCodeClick()">
					</div>


				</el-form-item>-->
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips" v-show="msg != null">{{msg}}</p>
            </el-form>
        </div>
    </div>
</template>

<script>
	import { post,get,url } from '../../api/index';
    export default {

        data: function(){
			
            return {
                ruleForm: {
                    username: '',
                    password: '',
					imageText: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
					/*imageText: [
					    { required: true, message: '请输入验证码', trigger: 'blur' }
					]*/
                },
                msg:null,
				verificationCodeUrl:"",
            }
        },
        methods: {
            submitForm() {
                let vue = this;

				if(this.ruleForm.username == "" || this.ruleForm.username == null){
					this.$message.error('用户名不能为空哦~.~');
					return
				}
				if(this.ruleForm.password == "" || this.ruleForm.password == null){
					this.$message.error('密码不能为空哦~.~');
					return
				}
                post('server-admin/user/login', {
                    username: this.ruleForm.username,
                    password: this.ruleForm.password,

                })
                .then(function (response) {
                    if (response.data.status == 200) {
                         localStorage.setItem('ms_username',vue.ruleForm.username);
                     localStorage.setItem('set_token',response.data.data.access_token);
                     //vue.$store.commit('set_token', response.data.data.token)
                     vue.$axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.data.access_token
                     vue.$router.push('/');
                     
                     if (response.data.data.pastDue) {
                     	vue.$alert(response.data.data.pastDue, '过期警告', {
                     	  confirmButtonText: '确定',
                     	  callback: action => {
                     
                     	  }
                     	});
                     }
                    } else {
						//vue.verificationCodeClick()
                        vue.msg = response.data.msg
                    }
                })
                .catch(function (error) {
					//vue.verificationCodeClick()
                    console.log(error);
                });
                console.log(this.$axios)
                console.log(this.ruleForm)

            },
			verificationCodeClick(){
				// console.log("8888888888888888888")
				this.verificationCodeUrl = url+"web/administrator/createVerifyCode?"+ new Date().getTime()
			},
        },
		created() {
			this.verificationCodeClick()
			// this.verificationCodeUrl = url+"web/administrator/createVerifyCode?"
		},
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        /* background-image: url(../../assets/img/login-bg.jpg); */
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:red;
        text-align: center;
    }
	.imageTextCode{
		width: 100px;
		height: 32px;
	}
	.imageText{
		width: 300px;
	}
	.el-input__inner{
		border-top-left-radius: 0;
		    border-bottom-left-radius: 0;
	}
</style>
