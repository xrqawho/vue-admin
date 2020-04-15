<!-- 结构 -->
<template>
<div>
	<div class="crumbs">
	    <el-breadcrumb separator="/">
	        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 邀请用户奖励</el-breadcrumb-item>
	    </el-breadcrumb>
	</div>
	
		<el-form ref="form" :model="form" label-width="150px">
		<el-form-item label="" inline="true"  >
			<span style="padding-left: 90px;"><el-tag type="info" effect="dark" >新人红包相关</el-tag>	</span>
					
		</el-form-item>
		  <el-form-item label=" 新人随机红包" inline="true" >
			
			<el-switch v-model="form.newRedMoneyStatus"></el-switch>
			<div style="width: 75px;vertical-align: middle;display: inline-flex;padding-left: 10px;"> 奖励金额： </div>
			<el-input v-model="form.newRedMoneyFixation" style="width: 80px;"></el-input>
			<div style="width: 120px;vertical-align: middle;display: inline-flex;padding-left: 10px;">元 红包失效时间： </div>
			<el-input v-model="form.taskRedMoneyExpireTime" style="width: 80px;"></el-input>
			<div style="width: 20px;vertical-align: middle;display: inline-flex;padding-left: 10px;">天</div>
		  </el-form-item>
		  
		  <el-form-item label=" 新人首单红包" inline="true" >
		  			
		  			<el-switch v-model="form.taskRedMoneyStatus"></el-switch>
		  			<div style="width: 75px;vertical-align: middle;display: inline-flex;padding-left: 10px;"> 奖励金额： </div>
		  			<el-input v-model="form.taskRedMoneyAmount" style="width: 80px;"></el-input>
		  			<div style="width: 120px;vertical-align: middle;display: inline-flex;padding-left: 10px;">元 红包失效时间： </div>
		  			<el-input v-model="form.taskRedMoneyInvalidTime" style="width: 80px;"></el-input>
					<div style="width: 20px;vertical-align: middle;display: inline-flex;padding-left: 10px;">天</div>
		  </el-form-item>
		  
		  <el-form-item label="延迟结算" inline="true" >
					<div style="width: 135px;vertical-align: middle;display: inline-flex;"> 订单收货成功延迟 </div>
		  			<el-input v-model="form.taskRedMoneyExpireTime" style="width: 50px;"></el-input>
		  			<div style="width: 140px;vertical-align: middle;display: inline-flex;padding-left: 10px;">天 发放红包 </div>
		  </el-form-item>
		  
		<el-form-item label="" inline="true"  >
			<span style="padding-left: 90px;"><el-tag type="info" effect="dark" >邀请赚钱相关</el-tag>	</span>
					
		</el-form-item>
		 
		 <el-form-item label="红包金额" inline="true" >
		 		<el-input v-model="form.invitationRedMoneyAmount" style="width: 50px;"></el-input>
				<div style="width: 20px;vertical-align: middle;display: inline-flex;padding-left: 10px;">元</div>
				
		 </el-form-item>
		 
		 <el-form-item label="红包收货后到账日期" inline="true" >
		 		<el-input v-model="form.invitationRedMoneyExpireTime" style="width: 50px;"></el-input>
		 		<div style="width: 20px;vertical-align: middle;display: inline-flex;padding-left: 10px;">天</div>
		 </el-form-item>
		 
		 <el-form-item label="红包失效日期" inline="true" >
			 
		 		<el-input v-model="form.invitationRedMoneyInvalidTime" style="width: 50px;"></el-input>
		 				<div style="width: 20px;vertical-align: middle;display: inline-flex;padding-left: 10px;">天</div>
		 </el-form-item>
		 
		
		 
		  <el-form-item>
			<el-button type="primary" @click="onSubmit">保存</el-button>
		  </el-form-item>
		</el-form>
	
</div>
	
</template>

<!-- 逻辑 -->
<script>
	 import { post,get } from '../../api/index';
	 export default {
		data() {
		  return {
			form: {
				id: 1,
				newRedMoneyFixation: 0.36,
				newRedMoneyStatus: 1,
				taskRedMoneyAmount: 5,
				taskRedMoneyExpireTime: 15,
				taskRedMoneyInvalidTime: 7,
				taskRedMoneyStatus: 1,
				invitationRedMoneyAmount: '',
				invitationRedMoneyInvalidTime: '',
				invitationRedMoneyExpireTime: '',
			}
		  }
		},
		created() {
		    this.getData();
		},
		methods: {
			getData(){
				get("web/appUserRewardSetup/list",{
				    
				})
				.then( (data) => {
					
					let newRedMoneyStatus,taskRedMoneyStatus
					if (data.data.data[0].newRedMoneyStatus == 1) {
						newRedMoneyStatus = true
					} else{
						newRedMoneyStatus = false
					}
					
					if (data.data.data[0].taskRedMoneyStatus == 1) {
						taskRedMoneyStatus = true
					} else{
						taskRedMoneyStatus = false
					}
					this.form = {
						id: data.data.data[0].id,
						newRedMoneyFixation: data.data.data[0].newRedMoneyFixation,
						newRedMoneyStatus: newRedMoneyStatus,
						taskRedMoneyAmount: data.data.data[0].taskRedMoneyAmount,
						taskRedMoneyExpireTime: data.data.data[0].taskRedMoneyExpireTime,
						taskRedMoneyInvalidTime: data.data.data[0].taskRedMoneyInvalidTime,
						taskRedMoneyStatus: taskRedMoneyStatus,
						//邀请赚钱相关
						invitationRedMoneyAmount: data.data.data[0].invitationRedMoneyAmount,
						invitationRedMoneyInvalidTime: data.data.data[0].invitationRedMoneyInvalidTime,
						invitationRedMoneyExpireTime: data.data.data[0].invitationRedMoneyExpireTime,
					}
					
					
				})
				.catch(function (error) {
				    console.log(error);
				});
			},	
		    onSubmit() {
			  let newRedMoneyStatus,taskRedMoneyStatus
			  if (this.form.newRedMoneyStatus) {
			  	newRedMoneyStatus = 1
			  } else{
			  	newRedMoneyStatus = 2
			  }
			  
			  if (this.form.taskRedMoneyStatus) {
			  	taskRedMoneyStatus = 1
			  } else{
			  	taskRedMoneyStatus = 2
			  }
			  console.log(newRedMoneyStatus)
			  console.log(taskRedMoneyStatus)
			  post("web/appUserRewardSetup/update",{
			      id: 1,
			      newRedMoneyFixation: this.form.newRedMoneyFixation,
			      newRedMoneyStatus: newRedMoneyStatus,
			      taskRedMoneyAmount: this.form.taskRedMoneyAmount,
			      taskRedMoneyExpireTime: this.form.taskRedMoneyExpireTime,
			      taskRedMoneyInvalidTime: this.form.taskRedMoneyInvalidTime,
			      taskRedMoneyStatus: taskRedMoneyStatus,
				  //邀请赚钱相关
				  invitationRedMoneyAmount: this.form.invitationRedMoneyAmount,
				  invitationRedMoneyInvalidTime: this.form.invitationRedMoneyInvalidTime,
				  invitationRedMoneyExpireTime: this.form.invitationRedMoneyExpireTime,
			  })
			  .then( (data) => {
					console.log(data)
					if (data.data.status == 200) {
						console.log(data.data.data)
						this.$message.success(data.data.msg);
						this.getData()
						this.editVisible = false;
					} else{
						this.$message.error(data.data.msg);
					}
			  })
			  .catch(function (error) {
			      console.log(error);
			  });
		  }
		}
	  }
</script>

<!-- 样式 -->
<style scoped>
	form{
		width: 660px;
		margin: 10px auto;
	}
	
	.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
		display: flex;
	}
</style>
