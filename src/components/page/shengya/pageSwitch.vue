<template>
	<div>
		<div class="crumbs">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> APP页面管理</el-breadcrumb-item>
		    </el-breadcrumb>
		</div>
		
			<el-form ref="form" :model="form" label-width="100px">
				
			  <el-form-item label=" 登录页面开关 " inline="true" >
					<el-switch v-model="form.loginPage" active-text="开" inactive-text="关"></el-switch>
			  </el-form-item>
			  
			  <el-form-item label=" 新人专享弹窗关闭框开关 " inline="true" >
			  		<el-switch v-model="form.newUserExclusive" active-text="开" inactive-text="关"></el-switch>
			  </el-form-item>
			  
			  <el-form-item label="阴影页面关闭框开关" inline="true" >
					<el-switch v-model="form.shadowPage" active-text="开" inactive-text="关"></el-switch>
			  </el-form-item>
			  
			   <el-form-item label="复制链接关闭框开关" inline="true" >
			  		<el-switch v-model="form.copyLink" active-text="开" inactive-text="关"></el-switch>
			  </el-form-item>
			  
			   <el-form-item label="首购红包关闭框开关" inline="true" >
			  		<el-switch v-model="form.buyRedPacket" active-text="开" inactive-text="关"></el-switch>
			  </el-form-item>
			  
			  <el-form-item> 
				<el-button type="primary" @click="onSubmit" active-text="开" inactive-text="关">保存</el-button>
			  </el-form-item>
			</el-form>
		
	</div>
</template>

<script>
	import { post,get } from '../../../api/index';
	export default {
			data() {
			  return {
				form: {
				  loginPage: false,
				  //登录页面开关
				  newUserExclusive: false,
				  //新人专享弹窗关闭框开关
				  shadowPage: false,
				  //阴影页面关闭框开关
				  copyLink : false,
				  //复制链接关闭框开关
				  buyRedPacket: false,
				  //收购红包关闭框开关
				  tableId: null,
				}
			  }
			},
			methods: {
			  onSubmit() {
				console.log('submit!');
				// /web/syPageSetup/syPageSetupList
				let loginPage,newUserExclusive,shadowPage,copyLink,buyRedPacket;
				if (this.form.loginPage) {
					loginPage = 1;
				} else{
					loginPage = 0;
				}
				
				if (this.form.newUserExclusive) {
					newUserExclusive = 1;
				} else{
					newUserExclusive = 0;
				}
				
				if (this.form.shadowPage) {
					shadowPage = 1;
				} else{
					shadowPage = 0;
				}
				
				if (this.form.copyLink) {
					copyLink = 1;
				} else{
					copyLink = 0;
				}
				
				if (this.form.buyRedPacket) {
					buyRedPacket = 1;
				} else{
					buyRedPacket = 0;
				}
				
				post("web/syPageSetup/syPageSetupUpdate",{
				    
				        tableId:this.form.tableId,
						loginPage:loginPage,
						newUserExclusive:newUserExclusive,
						shadowPage: shadowPage,
						copyLink: copyLink,
						buyRedPacket: buyRedPacket,
				    
				})
				.then( (data) => {
					this.getData();
					this.openSuccess();
					
				})
				.catch(function (error) {
				    console.log(error);
				});
			  },
			  getData(){
				  get("web/syPageSetup/syPageSetupList",{
				      params: {
				          
				      }
				  })
				  .then((data) => {
						console.log(data.data.data[0])
						console.log(this)
						if (data.data.data[0].loginPage == 1) {
							console.log("loginPage")
							this.form.loginPage = true;
						} else{
							this.form.loginPage = false;
						}
						
						console.log(data.data.data[0].newUserExclusive)
						if (data.data.data[0].newUserExclusive == 1) {
							this.form.newUserExclusive = true;
						} else{
							console.log(data.data.data[0].newUserExclusive)
							this.form.newUserExclusive = false;
							
						}
						
						if (data.data.data[0].shadowPage == 1) {
							this.form.shadowPage = true;
						} else{
							this.form.shadowPage = false;
						}
						
						if (data.data.data[0].copyLink == 1) {
							this.form.copyLink = true;
						} else{
							this.form.copyLink = false;
						}
						
						if (data.data.data[0].buyRedPacket == 1) {
							this.form.buyRedPacket = true;
						} else{
							this.form.buyRedPacket = false;
						}
						
						this.form.tableId = data.data.data[0].tableId
						
				  })
				  .catch((error) => {
				      console.log(error);
				  });
			  },
			  openSuccess() {
				this.$message({
				  message: '保存成功',
				  type: 'success'
				});
			  },
			},
			created() {
			    this.getData();
			},
	 }
</script>

<!-- 样式 -->
<style scoped>
	form{
		width: 26%;
		margin: 10px auto;
	}
	
	.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
		display: flex;
	}
	
	.el-form-item__label{
		text-align: left;
	}
</style>

