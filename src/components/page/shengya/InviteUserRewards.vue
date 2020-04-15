<!-- 结构 -->
<template>
<div>
	<div class="crumbs">
	    <el-breadcrumb separator="/">
	        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 邀请用户奖励</el-breadcrumb-item>
	    </el-breadcrumb>
	</div>
	
		<el-form ref="form" :model="form" label-width="100px">
			
		  <el-form-item label=" 奖 励 金 额 " inline="true" >
			<el-input v-model="form.name" style="width: 50px;"></el-input>
			<div style="width: 40px;vertical-align: middle;display: inline-flex;padding-left: 10px;"> 元 </div>
			<el-switch v-model="form.delivery"></el-switch>
		  </el-form-item>
		  
		  <el-form-item label=" 下 级 提 成 " inline="true" >
		  			<el-input v-model="form.name" style="width: 50px;"></el-input>
		  			<div style="width: 40px;vertical-align: middle;display: inline-flex;padding-left: 10px;"> % </div>
		  			<el-switch v-model="form.delivery"></el-switch>
		  </el-form-item>
		  
		  <el-form-item label="订单延迟结算" inline="true" >
					<div style="width: 100px;vertical-align: middle;display: inline-flex;padding-left: 10px;"> 订单佣金大于 </div>
		  			<el-input v-model="form.name" style="width: 50px;"></el-input>
		  			<div style="width: 40px;vertical-align: middle;display: inline-flex;padding-left: 10px;"> 元 </div>
					<div style="width: 40px;vertical-align: middle;display: inline-flex;padding-left: 10px;"> 延迟 </div>
		  			<el-input v-model="form.name" style="width: 50px;"></el-input>
					<div style="width: 40px;vertical-align: middle;display: inline-flex;padding-left: 10px;"> 结算 </div>
		  </el-form-item>
		 
		  <el-form-item>
			<el-button type="primary" @click="onSubmit">保存</el-button>
		  </el-form-item>
		</el-form>
	
</div>
	
</template>

<!-- 逻辑 -->
<script>
	import { post,get } from '../../../api/index';
	 export default {
		data() {
		  return {
			form: {
			  name: '',
			  region: '',
			  date1: '',
			  date2: '',
			  delivery: false,
			  type: [],
			  resource: '',
			  desc: ''
			}
		  }
		},
		methods: {
		  onSubmit() {
			console.log('submit!');
		  }
		}
	  }
</script>

<!-- 样式 -->
<style scoped>
	form{
		width: 40%;
		margin: 10px 20px;
	}
	
	.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
		display: flex;
	}
</style>
