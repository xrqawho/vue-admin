<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户管理</el-breadcrumb-item> 
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
				 关键字搜索：
				<el-input v-model="select_word" placeholder="请输入关键字" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>

            <el-table :data="data" v-loading ="loading" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
                <el-table-column prop="userId"  label="用户ID" width="100">
                </el-table-column>
				
                <el-table-column prop="username" label="用户名" width="180">
                </el-table-column>
				
                <el-table-column prop="userRealName" label="姓名" width="100" >
                </el-table-column>
				 <el-table-column prop="wechatNickname" label="微信名称" width="100" >
				</el-table-column>
                <el-table-column prop="mobile" label="手机号" >
                </el-table-column>
				
                <el-table-column prop="alipayAccountName" label="支付宝账号" >
                </el-table-column>
				
				<el-table-column prop="relationId" label="渠道ID" >
				</el-table-column>
				
				<el-table-column prop="totalAccount" label="可提现金额" >
				</el-table-column>
				<el-table-column prop="vipAccount" label="总佣金" >
				</el-table-column>
				<el-table-column prop="inviteAccount" label="邀请总金额" >
				</el-table-column>
				
				<el-table-column prop="totalGoldNum" label="总金币" >
				</el-table-column>
				
				<el-table-column prop="meInviteCode" label="我的邀请码" >
				</el-table-column>
				<el-table-column prop="superInviteCode" label="上级邀请码" >
				</el-table-column>
				<el-table-column prop="loginFirstDate" label="用户注册时间" >
					<!-- <template slot-scope="scope">
						{{timeTransition(scope.row.userCreateTime)}}
					</template> -->
				</el-table-column>
				
				<!-- <el-table-column prop="enable" label="状态" >
					<template slot-scope="scope">
						<span v-if="scope.row.enable == 1">正常</span>
						<span v-if="scope.row.enable == 0">已禁用</span>
					</template>
				</el-table-column> -->
				
				<el-table-column prop="isBlack" label="黑名单" width="150" >
					<template slot-scope="scope">
						<el-button type="text" @click="blacklistUser(scope.row.userId,1)" v-if="scope.row.isBlack == 0">拉黑该用户</el-button>
						<br v-if="scope.row.isBlack == 0">
						<el-button type="text" @click="blacklistUser(scope.row.userId,3)" v-if="scope.row.isBlack == 0">拉黑该用户，及下级</el-button>
						<br v-if="scope.row.isBlack == 0">
						<el-button type="text" @click="washUser(scope.row.userId)" v-if="scope.row.isBlack == 1">洗白该用户</el-button>
						<br v-if="scope.row.isBlack == 1">
						<el-button type="text" @click="washUser(scope.row.userId)" v-if="scope.row.isBlack == 3">洗白该用户，及下级</el-button>
						
					</template>
				</el-table-column>
				
				<el-table-column prop="commission" align="center" label="操作" >
					<template slot-scope="scope">
						
						
					    <el-button type="text" v-if="scope.row.enable == 1" @click="disableUser(0,scope.row)">禁用</el-button>
						<el-button type="text" v-if="scope.row.enable == 0" @click="disableUser(1,scope.row)">取消（禁用）</el-button>
					    <el-button type="text" @click="userDetails(scope.row.userId)">查看详情</el-button>
					    
					</template>
				</el-table-column>
				
				
                
               <!-- <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">类型</el-button>
                        <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">配置</el-button>
                        
                    </template>
                </el-table-column> -->
            </el-table>
            <div class="pagination">
                <el-pagination background  @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="page.total" :page-size = "page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
        </div>

		

      
    </div>
</template>

<script>
    import { post,get } from '../../../api/index';
    export default {
        name: 'orderManagement',
        data() {
            return {
                tableData: [],
				TransactionPlatform: '',
				orderStatus: '',
              
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
               
                idx: -1,
                id: -1,
				dateTime: '',
				dateEnd: new Date(),
				page:{
					pageSize:10,
					pageNum: 1,
					total: 0,
				},
				loading:false,
            }
        },
        created() {
            this.getData(1);
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    return d
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.getData(val);
				
            },
            // 获取数据
            getData(pageNum) {
                // fetchData({
                //     page: this.cur_page
                // }).then((res) => {
                //     this.tableData = res.list;
                //     console.log(this.tableData)
                // })
                let vue = this
				this.loading = true
                get("server-admin/appUser/findUserList",{
                    params: {
						userName: vue.select_word,
                        pageNum: pageNum,
						pageSize: vue.page.pageSize,
						total: vue.page.total,
                    }
                })
                .then( (data) => {
					console.log(data)
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
					// 请求数据老键名
                    // vue.tableData =  data.data.data.list
                   // 请求数据新键名
                    vue.tableData =  data.data.data.list
                                    console.log(vue.tableData)
									// vue.page.pageSize = data.data.data.pageSize;
									vue.page.pageNum = data.data.data.pageNum;
									vue.page.total =  Number(data.data.data.total)
									this.loading = false
                    
                })
                .catch( (error) => {
					this.loading = false
                    console.log(error);
                });
            },
			disableUser(enable,row){
				//禁用用户
				
				console.log(row)
				post("web/user/forbid",{
				    enable: enable,
				    tableId: row.tableId
				})
				.then( (data) => {
					console.log(data)
				    if (data.data.status == 200) {
				    	console.log(data.data.data)
				    	this.$message.success("成功");
				    	this.getData(1)
				    	
				    } else{
				    	this.$message.error("失败");
				    }
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			userDetails(userId){
				//用户详情跳转
				console.log(userId)
				this.$router.push({path:'/userDetails',query: {userId:userId}})
			},
			blacklistUser(userId,blackScope){
				//拉黑用户

				post("web/syBlacklist/save",{
				    userId:userId,
					blackScope:blackScope,
				})
				.then( (data) => {
					console.log(data)
				    if (data.data.status == 200) {
				    	console.log(data.data.data)
				    	this.$message.success("拉黑成功");
				    	this.getData(this.page.pageNum)
				    	
				    } else{
				    	this.$message.error("拉黑失败");
				    }
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			washUser(userId){
				//洗白用户
			
				post("web/syBlacklist/update",{
				    userId:userId,
				})
				.then( (data) => {
					console.log(data)
				    if (data.data.status == 200) {
				    	console.log(data.data.data)
				    	this.$message.success("洗白成功");
				    	this.getData(this.page.pageNum)
				    	
				    } else{
				    	this.$message.error("洗白失败");
				    }
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                this.id = row.id;
                this.form = {
                    id: row.id,
                    name: row.name,
                    date: row.date,
                    address: row.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
          
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
          
			disabledDate(res){
				console.log(res)
				return this.dateEnd
			},
			
			timeTransition(beginTime){
				//转换时间
				// console.log(beginTime)
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
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 150px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
	
</style>




