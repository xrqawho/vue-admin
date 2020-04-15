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
					邀请新粉丝注册回复
				</div >
				<div class="box-input">
					<el-input v-model="newsFsTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsFs">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：{ 下级微信名称 }
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					提现到账回复
				</div >
				<div class="box-input">
					<el-input v-model="newsCashSuccTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsCashSucc">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：{转账成功金额}
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					提现失败回复
				</div >
				<div class="box-input">
					<el-input v-model="newsCashFailTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsCashFail">
					</el-input>
				</div>
				<div class="box-params">
					
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					订单付款回复
				</div >
				<div class="box-input">
					<el-input v-model="newsOrderPayTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsOrderPay">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：{ 优惠券金额+返利金额 }
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					收货成功，补贴到账回复

				</div >
				<div class="box-input">
					<el-input v-model="newsOrderSettleTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsOrderSettle">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：{商品短标题} {返利金额}
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					订单失效回复
				</div >
				<div class="box-input">
					<el-input v-model="newsOrderFailTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsOrderFail">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：{商品短标题} {返利金额}
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					一级下线订单付款回复
				</div >
				<div class="box-input">
					<el-input v-model="newsOrderSuperPayTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsOrderSuperPay">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：{下级提成金额}
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					一级下线订单结算回复
				</div >
				<div class="box-input">
					<el-input v-model="newsOrderSuperSettleTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsOrderSuperSettle">
					</el-input>
				</div>
				<div class="box-params">
					支持参数： {下级提成金额}
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					一级下线订单失效回复
				</div >
				<div class="box-input">
					<el-input v-model="newsOrderSuperFailTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsOrderSuperFail">
					</el-input>
				</div>
				<div class="box-params">
					支持参数：{下级提成金额}
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					新人红包回复
				</div >
				<div class="box-input">
					<el-input v-model="newsHbTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsHb">
					</el-input>
				</div>
				<div class="box-params">
					
				</div>
			</div>
			
			
			<div class="box-msg">
				<div class="box-title">
					新人首购红包回复
				</div >
				<div class="box-input">
					<el-input v-model="newsOrderTaskTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="newsOrderTask">
					</el-input>
				</div>
				<div class="box-params">
					
				</div>
			</div>
			
			
			
			
			
			<div class="box-msg">
				<div class="box-title">
					收货成功，补贴冻结回复
				</div >
				<div class="box-input">
					<el-input v-model="newsOrderSettleFreezeTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  v-model="newsOrderSettleFreeze"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					>
					</el-input>
				</div>
				<div class="box-params">
					支持参数：{商品短标题} {返利金额}
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">	
					奖励解冻到账回复
				</div >
				<div class="box-input">
					<el-input v-model="newsOrderRewardAccountTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  v-model="newsOrderRewardAccount"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					>
					</el-input>
				</div>
				<div class="box-params">
					支持参数：{商品短标题} {返利金额}
				</div>
			</div>
			
			<div class="box-msg">
				<div class="box-title">
					免单收货成功，补贴冻结回复
				</div >
				<div class="box-input">
					<el-input v-model="newsOrderFreeFreezeTitle" placeholder="请输入内容"></el-input>
				</div>
				<div class="box-textarea">
					<el-input
					  type="textarea"
					  v-model="newsOrderFreeFreeze"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="请输入内容"
					>
					</el-input>
				</div>
				<div class="box-params">
					支持参数：{商品短标题} {返利金额}
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
				newsFsTitle: "",
				newsFs: "",
				//提现到账回复
				newsCashSuccTitle: "",
				newsCashSucc:"",
				// 提现失败回复
				newsCashFailTitle: "",
				newsCashFail: "",
				// 订单付款回复
				newsOrderPayTitle: "",
				newsOrderPay:"",
				// 订单结算回复
				newsOrderSettleTitle: "",
				newsOrderSettle: "",
				// 订单失效回复
				newsOrderFailTitle: "",
				newsOrderFail: "",
				// 一级下线订单付款回复
				newsOrderSuperPayTitle: "",
				newsOrderSuperPay: "",
				// 一级下线订单结算回复
				newsOrderSuperSettleTitle: "",
				newsOrderSuperSettle: "",
				// 一级下线订单失效回复
				newsOrderSuperFailTitle: "",
				newsOrderSuperFail: "",
				// 新人红包回复
				newsHbTitle: "",
				newsHb:	"",
				// 新人首购红包回复
				newsOrderTaskTitle: "",
				newsOrderTask: "",
				//收货成功，补贴冻结回复
				newsOrderSettleFreezeTitle:"",
				newsOrderSettleFreeze:"",
				// 奖励解冻到账回复
				newsOrderRewardAccount:"",
				newsOrderRewardAccountTitle:"",   //奖励解冻到账
				// 免单收货成功，补贴冻结回复
				newsOrderFreeFreeze:"",
				newsOrderFreeFreezeTitle:"", 
				
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
				
                get("msg/template/find/msg/template/all",{
					params:{
						
					}
                })
                .then( (data) => {
					console.log(data.data.data[0])
                    //邀请新粉丝注册回复
                    this.newsFsTitle = data.data.data[0].newsFsTitle
                    this.newsFs = data.data.data[0].newsFs
                    //提现到账回复
                    this.newsCashSuccTitle = data.data.data[0].newsCashSuccTitle
                    this.newsCashSucc = data.data.data[0].newsCashSucc
                    // 提现失败回复
                    this.newsCashFailTitle = data.data.data[0].newsCashFailTitle
                    this.newsCashFail = data.data.data[0].newsCashFail
                    // 订单付款回复
                    this.newsOrderPayTitle = data.data.data[0].newsOrderPayTitle
                    this.newsOrderPay = data.data.data[0].newsOrderPay
                    // 订单结算回复
                    this.newsOrderSettleTitle = data.data.data[0].newsOrderSettleTitle
                    this.newsOrderSettle = data.data.data[0].newsOrderSettle
                    // 订单失效回复
                    this.newsOrderFailTitle = data.data.data[0].newsOrderFailTitle
                    this.newsOrderFail = data.data.data[0].newsOrderFail
                    // 一级下线订单付款回复
                    this.newsOrderSuperPayTitle = data.data.data[0].newsOrderSuperPayTitle
                    this.newsOrderSuperPay = data.data.data[0].newsOrderSuperPay
                    // 一级下线订单结算回复
                    this.newsOrderSuperSettleTitle = data.data.data[0].newsOrderSuperSettleTitle
                    this.newsOrderSuperSettle = data.data.data[0].newsOrderSuperSettle
                    // 一级下线订单失效回复
                    this.newsOrderSuperFailTitle = data.data.data[0].newsOrderSuperFailTitle
                    this.newsOrderSuperFail = data.data.data[0].newsOrderSuperFail
                    // 新人红包回复
                    this.newsHbTitle = data.data.data[0].newsHbTitle
                    this.newsHb = data.data.data[0].newsHb
                    // 新人首购红包回复
                    this.newsOrderTaskTitle = data.data.data[0].newsOrderTaskTitle
                    this.newsOrderTask = data.data.data[0].newsOrderTask
					//收货成功，补贴冻结回复
					this.newsOrderSettleFreezeTitle = data.data.data[0].newsOrderSettleFreezeTitle
					this.newsOrderSettleFreeze = data.data.data[0].newsOrderSettleFreeze
					
					// 奖励解冻到账回复
					this.newsOrderRewardAccountTitle = data.data.data[0].newsOrderRewardAccountTitle
					this.newsOrderRewardAccount = data.data.data[0].newsOrderRewardAccount
					
					// 免单收货成功，补贴冻结回复
					this.newsOrderFreeFreezeTitle = data.data.data[0].newsOrderFreeFreezeTitle
					this.newsOrderFreeFreeze = data.data.data[0].newsOrderFreeFreeze
					
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			save(){
				post("msg/template/save",{
					id:1,
					//邀请新粉丝注册回复
					newsFsTitle: this.newsFsTitle,
					newsFs: this.newsFs,
					//提现到账回复
					newsCashSuccTitle: this.newsCashSuccTitle,
					newsCashSucc:this.newsCashSucc,
					// 提现失败回复
					newsCashFailTitle: this.newsCashFailTitle,
					newsCashFail: this.newsCashFail,
					// 订单付款回复
					newsOrderPayTitle: this.newsOrderPayTitle,
					newsOrderPay:this.newsOrderPay,
					// 订单结算回复
					newsOrderSettleTitle: this.newsOrderSettleTitle,
					newsOrderSettle: this.newsOrderSettle,
					// 订单失效回复
					newsOrderFailTitle: this.newsOrderFailTitle,
					newsOrderFail: this.newsOrderFail,
					// 一级下线订单付款回复
					newsOrderSuperPayTitle: this.newsOrderSuperPayTitle,
					newsOrderSuperPay: this.newsOrderSuperPay,
					// 一级下线订单结算回复
					newsOrderSuperSettleTitle: this.newsOrderSuperSettleTitle,
					newsOrderSuperSettle: this.newsOrderSuperSettle,
					// 一级下线订单失效回复
					newsOrderSuperFailTitle: this.newsOrderSuperFailTitle,
					newsOrderSuperFail: this.newsOrderSuperFail,
					// 新人红包回复
					newsHbTitle: this.newsHbTitle,
					newsHb:	this.newsHb,
					// 新人首购红包回复
					newsOrderTaskTitle: this.newsOrderTaskTitle,
					newsOrderTask: this.newsOrderTask,
					//收货成功，补贴冻结回复
					newsOrderSettleFreezeTitle: this.newsOrderSettleFreezeTitle,
					newsOrderSettleFreeze: this.newsOrderSettleFreeze,

					// 奖励解冻到账回复
					newsOrderRewardAccountTitle: this.newsOrderRewardAccountTitle,
					newsOrderRewardAccount: this.newsOrderRewardAccount,

					// 免单收货成功，补贴冻结回复
					newsOrderFreeFreezeTitle: this.newsOrderFreeFreezeTitle,
					newsOrderFreeFreeze: this.newsOrderFreeFreeze,

				})
				.then( (data) => {
					console.log(data.data)
				    //邀请新粉丝注册回复
				    if (data.data.status == 200) {
				    	console.log(data.data.data)
				    	this.$message.success(data.data.data);
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

