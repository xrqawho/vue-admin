<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 消息模块 </el-breadcrumb-item> 
            </el-breadcrumb>
        </div>
		<el-alert
		    title="温馨提示："
		    type="info"
		    effect="dark"
		    :closable="false">
		</el-alert>
		
		<el-card class="box-card">
			
			<div class="box-msg">
				<div class="box-title">
					签到描述信息
				</div >
				
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="signNote">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：${ 天数 }
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					没有签到描述
				</div >
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="notSignNote">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					第一天金币
				</div >
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="oneDayGoldNum">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：签到第一天奖励金币个数
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					第二天金币
				</div >
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="twoDayGoldNum">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：签到第二天奖励金币个数
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					第三天金币
				</div >
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="threeDayGoldNum">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：签到第三天奖励金币个数
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					第四天金币
				</div >
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="fourDayGoldNum">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：签到第四天奖励金币个数
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					第五天金币
				</div >
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="fiveDayGoldNum">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：签到第五天奖励金币个数
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					第六天金币
				</div >
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="sixDayGoldNum">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：签到第六天奖励金币个数
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					第七天金币
				</div >
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="sevenDayGoldNum">
					</el-input>
				</div>
				<div class="box-params">
						支持参数：签到第七天奖励金币个数
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					连续签到奖励金币
				</div >
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="extraGoldNum">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：连续签到奖励金币
				</div>
			</div>
			
		</el-card>
		<div class="save">
			<el-button type="primary" @click="save">保存</el-button>
		</div>
    </div>
</template>

<script>
    import { post,get } from '../../../api/index';
    export default {
        name: 'goodsTop',
        data() {
            return {
                
				//邀请新粉丝注册回复
				signNote: "",
				notSignNote: "",
				//提现到账回复
				oneDayGoldNum: "",
				twoDayGoldNum:"",
				// 提现失败回复
				threeDayGoldNum: "",
				fourDayGoldNum: "",
				// 订单付款回复
				fiveDayGoldNum: "",
				sixDayGoldNum:"",
				// 订单结算回复
				sevenDayGoldNum: "",
				extraGoldNum: "",
				// 订单失效回复
				id: "",
            }
        },
        created() {
            this.getData();
        },
        computed: {
            
        },
        methods: {
            // 分页导航
            
            getData(pageNum) {
				
                get("server-admin/signSetup/getAppUserSignSetup",{
					params:{
						
					}
                })
                .then( (data) => {
					console.log(data.data.data[0])
					this.id = data.data.data[0].id
                    //邀请新粉丝注册回复
                    this.signNote = data.data.data[0].signNote
                    this.notSignNote = data.data.data[0].notSignNote
                    this.oneDayGoldNum = data.data.data[0].oneDayGoldNum
                    this.twoDayGoldNum = data.data.data[0].twoDayGoldNum
                    this.threeDayGoldNum = data.data.data[0].threeDayGoldNum
                    this.fourDayGoldNum = data.data.data[0].fourDayGoldNum
                    // 订单付款回复
                    this.fiveDayGoldNum = data.data.data[0].fiveDayGoldNum
                    this.sixDayGoldNum = data.data.data[0].sixDayGoldNum
                    // 订单结算回复
                    this.sevenDayGoldNum = data.data.data[0].sevenDayGoldNum
                    this.extraGoldNum = data.data.data[0].extraGoldNum
                    // 订单失效回复
                    this.autoConvert = data.data.data[0].autoConvert
                    this.enable = data.data.data[0].enable
                    // 一级下线订单付款回复
                    this.createTime = data.data.data[0].createTime
                    this.updateTime = data.data.data[0].updateTime
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			save(){
				post("server-admin/signSetup/updateAppUserSignSetup",{
					id:this.id,
					//邀请新粉丝注册回复
					signNote: this.signNote,
					notSignNote: this.notSignNote,
					oneDayGoldNum: this.oneDayGoldNum,
					twoDayGoldNum:this.twoDayGoldNum,
					threeDayGoldNum: this.threeDayGoldNum,
					fourDayGoldNum: this.fourDayGoldNum,
					fiveDayGoldNum: this.fiveDayGoldNum,
					sixDayGoldNum:this.sixDayGoldNum,
					sevenDayGoldNum: this.sevenDayGoldNum,
					extraGoldNum: this.extraGoldNum,
				})
				.then( (data) => {
					console.log(data.data)
				    //邀请新粉丝注册回复
				    if (data.data.status == 200) {
				    	console.log(data.data.data)
				    	this.$message.success("操作成功");
				    	this.getData(1)
				    	this.editVisible = false;
				    } else{
				    	this.$message.error(data.data.data);
				    }
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			
        }
    }

</script>

<style scoped>
	.box-card{
		/* display: flex; */
	}
	.box-msg{
		width: 30%;
		height: 300px;
		border: 1px #CCC solid;
		display: inline-block;
		border-radius: 5px;
		margin: 20px 9.8%;
	}
    .box-title{
		background-color: #D9D9D9;
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		padding-left: 5%;
		color: #333;
	}
	.box-input{
		height: 50px;
		width: 90%;
		margin: 10px auto;
	}
	.box-textarea{
		height: 100px;
		width: 90%;
		margin: 10px auto;
	}
	.box-params{
		width: 90%;
		margin: 10px auto;
		color: #1890ff;
		font-size: 12px;
	}
	.save{
		position: fixed;
		bottom: 0px;
		width: 10%;
		right: 0px;
	}
</style>

<style>
	.box-card .el-card__body{
		display: flex;
		flex-wrap:wrap;
		
	}
</style>

