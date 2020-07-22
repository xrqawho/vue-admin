<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户红包</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
				 条件筛选：
				 兑换状态：
				<el-select v-model="redpageStatus" placeholder="请选择订单状态" class="handle-select mr10">
				    <el-option key="0" label="未使用" value="0"></el-option>
					<el-option key="1" label="入账中" value="1"></el-option>
					<el-option key="2" label="已到账" value="2"></el-option>
					<el-option key="3" label="失效" value="3"></el-option>
					<el-option key="4" label="回退" value="4"></el-option>
				    <el-option key="5" label="全部" value="null"></el-option>
				</el-select>
				单个用户ID查询：
				<el-input v-model="userId" placeholder="请输入用户ID" class="handle-input mr10"></el-input>
				模糊订单ID查询：
				<el-input v-model="orderId" placeholder="请输入用户ID" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>
			
			
			
            <el-table v-loading="loading" :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
                <el-table-column prop="userId" label="用户ID"  width="150">
					
                </el-table-column>
				
                <el-table-column prop="orderId" label="订单ID" width="110" >
                </el-table-column>
				
                <el-table-column prop="redPackageMoney" label="红包金额" width="150" >
                </el-table-column>
                <el-table-column prop="redpageStatus" label="处理状态" width="100" >
					<template slot-scope="scope">
					   <span v-if="scope.row.redpageStatus == 0">未使用</span>
					   <span v-if="scope.row.redpageStatus == 1">入账中</span>
					    <span v-if="scope.row.redpageStatus == 2">已到账</span>
					   <span v-if="scope.row.redpageStatus == 3">失效</span>
					   <span v-if="scope.row.redpageStatus == 4">回退</span>
					</template>
                </el-table-column>
				<el-table-column prop="hander" label="处理状态" width="100" >
					<template slot-scope="scope">
					   <span v-if="scope.row.hander ==0">未处理</span>
					   <span v-if="scope.row.hander == 1">已处理</span>
					</template>
				</el-table-column>
				
				<el-table-column prop="createDate" label="创建时间" width="150" align="center" >
					
					<!-- <template slot-scope="scope">
					    {{formartDate(scope.row.createTime)}}
					</template> -->
				</el-table-column>
				<el-table-column prop="updateDate" label="修改时间" width="150" align="center" >
					<!-- <template slot-scope="scope">
					    {{formartDate(scope.row.updateTime)}}
					</template> -->
				</el-table-column>
                <el-table-column prop="remark" label="备注"  align="center" >
					<template slot-scope="scope">
						<div>{{scope.row.remark}}</div>
					</template>
				</el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="page.total" :page-size = "page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
        </div>
	
    </div>
</template>

<script>
    import { post,get,url } from '../../../api/index';
    export default {
        name: 'taskManagement',
        data() {
            return {
                tableData: [],
                
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
				affirmVisible: false,
                form: {
                    wechatId: '',//微信id
					amount: '',//提现金额
					applicantStatus: '',//状态
					refuseReason:"",//拒绝原因
					remark: '',//备注
					applicantTime: '',//申请时间
					processingTime: '',//处理时间
					
                },
				
				page:{
					pageSize:20,
					pageNum: 1,
					total: 0,
				},
                idx: -1,
                id: -1,
				orderId:null,
				redpageStatus: null,
				userId: null,
				//时间
				time:null,
				startTime: null,
				endTime: null,
				loading:false,//数据加载
				url:url,
				ConfirmRefusedTo: '',
            }
        },
        created() {
            this.getData(1);
        },
        computed: {
            data() {
                /* return this.tableData.filter((d) => {
                    let is_del = false;
                    return d
                }) */
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                
                this.getData(val);
            },
            // 获取数据
            getData(pageNum) {
				this.loading = true;
			  let	endTime = null,startTime = null;
              if (this.time) {
				startTime = this.time[0]
				endTime = this.time[1]
              }
                let vue = this
                get("server-admin/admin/conchGold/getAdminMyRedPackageList",{
						 params: {
						orderId: this.orderId,
						userId:this.userId,
						redpageStatus:this.redpageStatus,
						pageNum: pageNum,
						pageSize: vue.page.pageSize,
						total: vue.page.total,
						}
                   
                })
                .then( (data) => {
					this.loading = false;
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
					console.log(data)
                   // console.log(data.data.data)
                    vue.tableData = data.data.data.list
					vue.page.pageNum = Number(data.data.data.pageNum);
					
					vue.page.total =  Number(data.data.data.total)
					// vue.page.pageSize = Number(data.data.data.size);
					//vue.page.pageNum =  Number(data.data.data.pages);
					//vue.page.total =  Number(data.data.data.total)
                    
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
				formartDate(value){
							if(value==null){
								return null;
							}
			
			let date = new Date(parseInt(value)) // 时间戳为10位需乘1000，为13位则不用
			let Y = date.getFullYear() // 年
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
			let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '' // 日
			
			let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 时
			let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // 分
			let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 秒
						  
			// 一个函数只能有一个return，以下仅做示例
			return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s // yyyy-mm-dd hh:mm:ss
						},
           /* filterTag(value, row) {
                return row.tag === value;
            }, */
            handleEdit(index, row) {
                
                this.form = {
                   wechatId: row.wechatId,//微信id
                   amount: row.amount,//提现金额
                   applicantStatus: row.applicantStatus,//状态
                   
                   remark: row.remark,//备注
				   refuseReason: row.refuseReason,//拒绝原因
                   applicantTime: row.applicantTime,//申请时间
                   processingTime: row.processingTime,//处理时间 
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			
            // 保存编辑
            saveEdit(index, row) {
				this.affirmVisible = true;
				this.ConfirmRefusedTo = index
				console.log(row)
				if (index == 1) {
					this.label1 = "提现金额";
					this.label2 = "转账备注";
					/* this.label3 = "转账类型"; */
				} else{
					this.label1 = "拒绝金额";
					this.label2 = "拒绝原因";
					/* this.label3 = "类型"; */
				}
				this.affirmForm = {
					amount: row.amount,
					id: row.id,
					remark: row.remark,
					transferState: 1,
				}
            },
			affirmMsg(){
			//确认信息
				this.affirmVisible = false;
				post("web/withdrawal/updateSum",this.affirmForm)
				.then( (data) => {
					
				    if (data.data.status == 200) {
				    	console.log(data.data.data)
				    	this.$message.success(data.data.msg);
				    	this.getData()
				    	
				    } else{
				    	this.$message.error(data.data.msg);
				    }
				    
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
            // 确定拒绝
            deleteRow(){
               this.affirmVisible = false;
               post("web/withdrawal/updateRefuseSum",this.affirmForm)
               .then( (data) => {
               	
                   if (data.data.status == 200) {
                   	console.log(data.data.data)
                   	this.$message.success(data.data.msg);
                   	this.getData()
                   	
                   } else{
                   	this.$message.error(data.data.msg);
                   }
                   
               })
               .catch(function (error) {
                   console.log(error);
               });
            },
			popoverMouseenter(wechatNickname){
				//移入
				console.log(this.$refs)
				console.log(this.$refs[`popover` + wechatNickname])
				this.$refs[`popover` + wechatNickname].doShow()
			},
			popoverMouseleave(wechatNickname){
				//移除
				this.$refs[`popover` + wechatNickname].doClose()
				
			},
			uploadImport(response, file, fileList){
				console.log(response)
				if (response.status == 200) {
					this.$message.success(response.msg);
					const jsonData = response.data.map(parame => {
					            if (parame.id == null) {
					                parame.id = ""
					            }
					            if (parame.userRealName == null) {
					                parame.userRealName = ""
					            }
					            if (parame.alipayAccount == null) {
					                parame.alipayAccount = ""
					            }
					            if (parame.amount == null) {
					                parame.amount = ""
					            }
					            if (parame.remark == null) {
					                parame.remark = ""
					            }
					
					            if (parame.status == null) {
					                parame.status = ""
					            }else if(parame.status == 1){
					                parame.status = "未处理"
					            }else if(parame.status == 2){
					                parame.status = "已处理"
					            }else if(parame.status == 3){
					                parame.status = "已拒绝"
					            }
					
					            if (parame.processingTimeDate == null) {
					                parame.processingTimeDate = ""
					            }
					            if (parame.errorMsg == null) {
					                parame.errorMsg = ""
					            }
					            return {
					                
					                userRealName : parame.userRealName,
					                alipayAccount : parame.alipayAccount,
					                amount : parame.amount,
					                remark : parame.remark,
					                ID: parame.id,
					                errorMsg : parame.errorMsg,
					            }
					        });
					        
							
							
					        //列标题，逗号隔开，每一个逗号就是隔开一个单元格
					        let str = `真实姓名,支付宝账号,转账金额,转账备注,关联id,错误原因\n`;
					
					        //增加\t为了不让表格显示科学计数法或者其他格式
					        for(let i = 0 ; i < jsonData.length ; i++ ){
					          for(let item in jsonData[i]){
					              str+=`${jsonData[i][item] + '\t'},`;     
					          }
					          str+='\n';
					        }
					        //encodeURIComponent解决中文乱码
					        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
					        //通过创建a标签实现
					        let link = document.createElement("a");
					        link.href = uri;
					        //对下载的文件命名
					        link.download =  "失败数据表.csv";
					        document.body.appendChild(link);
					        link.click();
					        document.body.removeChild(link);
				} else{
					this.$message.error(response.msg);
				}
			},
			down(){
				let endTime = null,startTime = null;
				  if (this.time) {
					startTime = this.time[0]
					endTime = this.time[1]
				  }
				get("web/withdrawal/export",{
                    params: {
                        withdrawalType: 1,
                        applicantStatus: this.applicantStatus,
                        keyWord: this.keyWord,
                        startTime: startTime,
                        endTime: endTime,
                    },
					responseType: 'blob', //二进制流
                }
				
				)
                .then(function (response) {
					console.log(response)
						var blob = new Blob([response.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
						console.log(blob)
                        var downloadElement = document.createElement('a');
                        var href = window.URL.createObjectURL(blob); //创建下载的链接
                        downloadElement.href = href;
                        downloadElement.download = '导出文件.xls'; //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
						console.log(href)
                        window.URL.revokeObjectURL(href); //释放掉blob对象
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
			},
			setToken(){
				let set_token = localStorage.getItem("set_token")
				return{
					"Authorization": set_token
				};
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
	.remarkPopover{
		width: 90%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.remarkPopover:hover{
		overflow: visible;
		text-overflow:clip;
		white-space: normal;
		width: 500px;
		background-color: #FFF;
		border: 1px #888 solid;
		position: absolute;
		left: -280px;
		/* top: 0px; */
		bottom: 20px;
		z-index: 9999999999999999999999999999999999;
		transform-origin: center top;
	}
	.bj	.el-form-item {
		border-bottom: 1px #eee solid;
	}
	
</style>

<style>
	.el-upload--text{
		width: auto;
		height: auto;
	}
	.red{
	    color: #ff0000;
	}
</style>

