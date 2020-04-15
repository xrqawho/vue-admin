<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户详情</el-breadcrumb-item> 
            </el-breadcrumb>
        </div>
        <div class="container">
			<h3>用户详情信息 </h3>
			<div id="user">
				<div>昵称：{{user.userName}}</div>
				<div>昵称：{{user.userRealName}}</div>
				<div>头像：<img  :src="user.userImgUrl" alt=""></div>
				<div>可提现金额： {{user.balance}}</div>
				<div>手机号：{{user.phoneNumber}}</div>
				<div>微信昵称： {{user.wechatNickname}}</div>
				<div>来源设备：<span v-if="user.platform == 1">安卓</span>
							  <span v-if="user.platform == 2">ios</span>
							  <span v-if="user.platform != 2 && user.platform != 1">其他</span></div>
				<div>一级粉丝数： {{onesFen.list.length}}</div>
				<div>我的邀请码： {{user.meInviteCode}}</div>
				<div>上次登录时间： {{timeTransition(user.userLastLoginTime)}}</div>
				<div>注册时间： {{timeTransition(user.userCreateTime)}}</div>
			</div>
        </div>
		<div class="container">
			<h3>上级信息</h3>
			<div id="user">
				<div>推荐人微信昵称：</div>
				<div>上级邀请码：{{user.superInviteCode}}</div>
			</div>
		</div>
		<div class="container">
		    <h3>订单详情</h3>
			<el-alert
			    :title="'有效总条数'+data.totalEffectiveItemCount+'条,退款总条数'+data.totalRefundItemCount+'条,商品总佣金￥'+data.totalItemCommission+'元,用户总佣金￥'+data.totalUserCommssion+'元'"
			    type="info"
			    
			    :closable="false">
			</el-alert>

			<el-table
				v-loading="loading"
			    :data="orderDetail"
			    stripe
			    style="width: 100%">
			    <el-table-column prop="itemTitle" label="商品标题" width="300">
			    </el-table-column>
			    
			    <el-table-column prop="tkStatus" label="状态" width="100" >
			    	<template slot-scope="scope">
			    		<span v-if="scope.row.tkStatus == 13">订单失效</span>
			    		<span v-if="scope.row.tkStatus == 3">订单结算</span>
			    		<span v-if="scope.row.tkStatus == 12">订单成功</span>
			    		<span v-if="scope.row.tkStatus == 0">订单完成</span>
			    	</template>
			    </el-table-column>
			    
			    <el-table-column prop="createTime" label="下单时间" >
			    	
			    	<template slot-scope="scope">
			    	    <span>{{timeTransition(scope.row.createTime)}}</span>
			    	</template>
			    </el-table-column>
			    
			    <el-table-column prop="userName" label="微信名字" >
			    </el-table-column>
			    
			    <el-table-column prop="itemId" label="商品ID" >
			    </el-table-column>
			    
			    <el-table-column prop="tradeId" label="订单编号" >
			    </el-table-column>
			    
			    <el-table-column prop="alipayTotalPrice" label="付费金额" >
			    </el-table-column>
			    
			    <el-table-column prop="totalCommissionRate" label="联盟比例" >
			    </el-table-column>
			    
			    <el-table-column prop="pubSharePreFee" label="联盟佣金" >
			    </el-table-column>
			    
			    <el-table-column prop="meCommission" label="客户佣金" >
			    	<template slot-scope="scope">
			    		<div v-if="scope.row.orderGrade == '1' ">{{scope.row.meCommission}}</div>
			    	</template>
			    </el-table-column>
			    
			    <el-table-column prop="meCommission" label="上级直接粉丝佣金" >
			    	<template slot-scope="scope">
			    		<div v-if="scope.row.orderGrade == '2' ">{{scope.row.meCommission}}</div>
			    	</template>
			    </el-table-column>
			    
			    <el-table-column prop="revenue" label="预估收入" >
			    </el-table-column>
			    
			    <el-table-column prop="tkEarningTime" label="新增收货时间" >
			    </el-table-column>
			    
			    <el-table-column prop="goodFrees" label="是否免单" >
			    	<template slot-scope="scope">
			    		<div v-if="scope.row.goodFrees == 1">
			    			{{scope.row.largeAmounTime}}
			    		</div>
			    	</template>
			    </el-table-column>
			    
			    <el-table-column prop="revenue" label="是否绑定红包" >
			    	<template slot-scope="scope">
			    		<div v-if="scope.row.tkStatus == 3 || 13 || 14">
			    			{{scope.row.expireTime}}
			    		</div>
			    	</template>
			    </el-table-column>
				
			    <el-table-column prop="orderSettleStatus" width="120" label="订单是否违规" >
			    	<template slot-scope="scope">
			    		<div v-if="scope.row.orderSettleStatus == '3'">订单已违规</div>
			    		<el-button type="text" v-if="scope.row.orderSettleStatus != '3' && scope.row.tkStatus == 3"  @click="Violations(scope.row.tradeId)">未违规</el-button>
			    	</template>
			    </el-table-column>
				
			  </el-table>
			  
			  <div class="pagination">
			      <el-pagination background @current-change="orderCurrentChange" layout="prev, pager, next, jumper" :total="orderPage.total" :page-size = "orderPage.pageSize" :current-page="orderPage.pageNum">
			      </el-pagination>
			  </div>
			  
		</div>
		
		<div class="container">
			<h3>提现详情</h3>
			<el-alert
			    :title="'总提现条数'+data.totalWithdrawalCount+'条,总提现金额￥'+data.totalWithdrawalAmount+'元'"
			    type="info"
			    :closable="false">
			</el-alert>
		    <el-table
				v-loading="loading"
		        :data="withdrawalDetail"
		        stripe
		        style="width: 100%">
		        <el-table-column
		          prop="amount"
		          label="申请提现金额"
		          >
		        </el-table-column>
		    	
		        <el-table-column
		          prop="applicantStatus"
		          label="状态"
		          width="180">
						<template slot-scope="scope">
						    <span v-if="scope.row.applicantStatus == 1">未处理</span>
						    <span v-if="scope.row.applicantStatus == 2">已处理</span>
						    <span v-if="scope.row.applicantStatus == 3">已拒绝</span>
						</template>
		        </el-table-column>
		    	
		        <el-table-column
		          prop="applicantTime"
		          label="申请时间">
				  <template slot-scope="scope">
				     <span>{{timeTransition(scope.row.applicantTime)}}</span>
				  </template>
		        </el-table-column>
		    	
		    	<el-table-column
		    	  prop="processingTime"
		    	  label="处理时间">
				  <template slot-scope="scope">
				     <span>{{timeTransition(scope.row.processingTime)}}</span>
				  </template>
		    	</el-table-column>
						
		    	<el-table-column
		    	  prop="remark"
		    	  label="备注">
		    	  
		    	</el-table-column>
		    	
		    	
		    	
		      </el-table>
			  <div class="pagination">
			      <el-pagination background @current-change="MoneyDetailsChange" layout="prev, pager, next, jumper" :total="MoneyDetailsPage.total" :page-size = "MoneyDetailsPage.pageSize" :current-page="MoneyDetailsPage.pageNum">
			      </el-pagination>
			  </div>
		</div>
		<div class="container">
		    <h3>一级粉丝</h3>
		    <el-alert
		        title="用户一级粉丝"
		        type="info"
		        :closable="false">
		    </el-alert>
			
		    <el-table
		    	v-loading="loading"
		        :data="onesFenData"
		        stripe
		        style="width: 100%">
		        <el-table-column
		          prop="userName"
		          label="用户名"
		          >
		        </el-table-column>
		    	
		        <el-table-column
		          prop="userRealName"
		          label="姓名"
		          width="100">
				  
		        </el-table-column>
		    	
		        <el-table-column
		          prop=""
		          label="推荐人">
		        </el-table-column>
		    	
		    	<el-table-column
		    	  prop="phoneNumber"
		    	  label="手机号">
		    	</el-table-column>
		    	
		    	<el-table-column
		    	  prop="alipayAccount"
		    	  label="支付宝账号">
		    	 
		    	</el-table-column>
		    	
				<el-table-column
				  prop="relationId"
				  label="渠道ID">
				 
				</el-table-column>
				
				<el-table-column
				  prop="balance"
				  label="可提现金额">
				 
				</el-table-column>
				
				<el-table-column
				  prop="totalWithdrawalAmount"
				  label="总提现金额">
				  
				</el-table-column>
				
				<el-table-column
				  prop="promoteAmount"
				  label="推广金额">
				  
				</el-table-column>
				
				<el-table-column
				  prop="orderNumber"
				  label="订单数">
				  
				</el-table-column>
				
				<el-table-column
				  prop=""
				  label="上级对应ID">
				  
				</el-table-column>
				
				<el-table-column
				  prop=""
				  label="上级微信昵称">
				  
				</el-table-column>
				
				<el-table-column
				  prop="userLastLoginTime"
				  label="最近登录时间">
					<template slot-scope="scope">
					   <span>{{timeTransition(scope.row.userLastLoginTime)}}</span>
					</template>
				</el-table-column>
		    	
				<el-table-column
				  prop="userCreateTime"
				  label="注册时间">
						<template slot-scope="scope">
						   <span>{{timeTransition(scope.row.userCreateTime)}}</span>
						</template>
				</el-table-column>
		    	
		      </el-table>
		</div>
		

      
    </div>
</template>

<script>
    import { post,get } from '../../../api/index';
    export default {
        name: 'orderManagement',
        data() {
            return {
                user:{},
				onesFen:{
					list:[],
				},
				data:{},
				orderDetail:[],
				withdrawalDetail:[],
				onesFenData:[],
				loading:false,
				orderPage:{
					pageSize:10,
					pageNum: 1,
					total: 0,
				},
				
				MoneyDetailsPage:{
					pageSize:10,
					pageNum: 1,
					total: 0,
				},
            }
        },
        created() {
            this.getData();
			this.getOrderDetails(1)
			this.getUserGetMoneyDetails(1)
        },
        computed: {
           
        },
		watch:{
			'$route' (to, from) { //监听路由是否变化
				console.log(to)
				if(this.$route.query.userId){// 判断条件1  判断传递值的变化
				  //获取文章数据
				  this.getData(1);
				  this.getOrderDetails(1)
				  this.getUserGetMoneyDetails(1)
				  // this.commpanyList();
				}
			}
		},
        methods: {
           orderCurrentChange(val){
			   //订单分页 点击回调
			   this.getOrderDetails(val)
		   },
		   MoneyDetailsChange(val){
			   //提现分页 点击回调
			   this.getUserGetMoneyDetails(val)
		   },
		   
            // 获取数据
            getData(pageNum) {
               this.loading = true;
                let vue = this
                get("web/user/findUserDetails",{
                    params: {
						userId:this.$route.query.userId,
						
                    }
                })
                .then( (data) => {
					console.log(data.data.data)
					this.user = data.data.data.map.user;
					this.onesFen = data.data.data.map.onesFen;
					this.data = data.data.data;
					// this.orderDetail = data.data.data.map.appOrderDetailPageInfo.list;
					// this.withdrawalDetail = data.data.data.map.withdrawalListPageInfo.list;
					this.onesFenData = data.data.data.map.onesFen.list;
					// this.orderDetailsData = data.data.data.map.appOrderDetailPageInfo.list;
					this.loading = false
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			Violations(tradeId){
				console.log(tradeId)
				
				this.$confirm('此操作将永久把此订单设置成违规，返利将不会到账，是否添加?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					
					  get("web/order/violations/toSet",{
						  params: {
							tradeId:tradeId,
						  }
					  })
					  .then( (data) => {
						  if (data.data.status == 200) {
							
							this.$message.success(data.data.msg);
							this.getOrderDetails()
							// this.editVisible = false;
							
						} else{
							this.$message.error(data.data.msg);
						  }
					  })
					  .catch(function (error) {
						  console.log(error);
					  });
					
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消设置'
				  });          
				});
			},
			
			getOrderDetails(pageNum){
				// this.loading = true;
				get("web/user/findUserOrderDetails",{
				    params: {
						userId:this.$route.query.userId,
						
						currentPage: pageNum,
						pageSize: this.orderPage.pageSize,
						total: this.orderPage.total,
				    }
				})
				.then( (data) => {
				console.log(data)
					this.loading = false
					this.orderDetail = data.data.data.list
					
					this.orderPage.pageNum =  Number(data.data.data.pageSize);
					this.orderPage.total =  Number(data.data.data.total);
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			
			getUserGetMoneyDetails (pageNum){
				// this.loading = true;
				get("web/user/findUserGetMoneyDetails",{
				    params: {
						userId:this.$route.query.userId,
						
						currentPage: pageNum,
						pageSize: this.MoneyDetailsPage.pageSize,
						total: this.MoneyDetailsPage.total,
						
				    }
				})
				.then( (data) => {
				console.log("数据："+data)
					this.loading = false
					this.withdrawalDetail = data.data.data.list
					
					this.MoneyDetailsPage.pageNum =  Number(data.data.data.pageSize);
					this.MoneyDetailsPage.total =  Number(data.data.data.total);
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			
			timeTransition(beginTime){
				console.log(beginTime)
				//转换时间
				if (beginTime == null) {
					return	'';
				} else if(beginTime == ''){
					return	'';
				}else if(beginTime == "0"){
					return	'0';
				}else if(beginTime == undefined){
					return ""
				}
				let d = new Date( Number(beginTime) );    //根据时间戳生成的时间对象
				let date = (d.getFullYear()) + "-" + 
						   (d.getMonth() + 1) + "-" +
						   (d.getDate()) + " " + 
						   (d.getHours()) + ":" + 
						   (d.getMinutes()) + ":" + 
						   (d.getSeconds());
				return	date;
			},
			
		}
    }

</script>

<style scoped>
    #user{
		display: flex;
		flex-wrap:wrap;
	}
	#user div{
		width: 33%;
		display: inline-block;
		vertical-align: middle;
	}
	#user div img{
		width: 40px;
		border-radius:50%;
		display: inline-block;
		vertical-align: top;
	}
</style>





