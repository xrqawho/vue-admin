<template>
    <div class="push">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 订单任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		

       <el-form ref="form" :model="form" label-width="150px">
		
		<el-form-item class="label_awarn" label="订单类型">
		    <el-select v-model="orderType" placeholder="请选择">
				<el-option key="1" label="付款订单(按付款时间)" :value="1"></el-option>
				<el-option key="2" label="退款订单(按付款时间)" :value="2"></el-option>
				<el-option key="3" label="确认收货(按付款时间)" :value="3"></el-option>
				
		    </el-select>
		</el-form-item>
		
		<el-form-item class="label_awarn" label="任务开始时间" label-width="150px">
			<el-date-picker v-model="createDate" 
			type="datetime" placeholder="选择时间" 
			@change="dataSearch" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm">
			</el-date-picker>
		</el-form-item>
		<el-form-item class="label_awarn" label="任务结束时间" label-width="150px">
			<el-date-picker v-model="endDate" 
			type="datetime" placeholder="选择时间" 
			@change="dataSearch" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm">
			</el-date-picker>
		</el-form-item>
		
        <el-form-item>
            <el-button type="primary" @click="pushAdd">立即提交</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { post,get } from '../../../api/index';
    export default {
        name: 'push',
        data() {
            return {
				createDate:'',
				endDate:'',
				orderType: 1,
            }
        },
        created() {
			
        },
        computed: {
            data() {
                
            }
        },
        methods: {
			pushAdd(){
				if(this.orderType == null || this.orderType == undefined ||  this.orderType== ''){
					console.log("禁止通过")
					this.$message.error('禁止通行，未选择订单类型');
					return
				}
				if(this.createDate == null || this.createDate == undefined || this.createDate == ''){
					console.log("禁止通过")
					this.$message.error('禁止通行，未填写开始时间');
					return
				}
				if(this.endDate == null || this.endDate == undefined || this.endDate == ''){
					console.log("禁止通过")
					this.$message.error('禁止通行，未填写结束时间');
					return
				}
				
				console.log(this.form)
				alert(this.createDate+"11111111111"+this.endDate)
				post("web/message/order/push"+"?createDate="+this.createDate+"&endDate="+this.endDate+"&orderType="+this.orderType,
				)
				.then( (data) => {
				    if (data.data.status == 200) {
				    	this.$message.success("拉取成功");
						this.reset()
				    	
				    } else{
				    	this.$message.error("拉取失败");
				    }
				    
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			reset(){
				this.createDate = null;
				this.endDate = null;
				this.orderType = 1;
				
			}
        },
		
    }

</script>

<style scoped>
    
</style>

<style>
	.label_awarn > .el-form-item__label::before {
	display: inline-block;
	margin-right: 4px;
	color: #f5222d;
	font-size: 18px;
	font-family: SimSun, sans-serif;
	line-height: 1;
	content: '*';
	}
</style>
