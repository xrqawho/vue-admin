<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 提现明细</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
				 条件筛选：
				 处理状态：
				<el-select v-model="applicantStatus" placeholder="请选择订单状态" class="handle-select mr10">
				    <el-option key="1" label="未处理" value="0"></el-option>
					<el-option key="2" label="已处理" value="1"></el-option>
					<el-option key="3" label="已拒绝" value="2"></el-option>
				    <el-option key="4" label="全部" value=""></el-option>
				</el-select>
				 处理状态：
				<el-select v-model="cashType" placeholder="请选择订单状态" class="handle-select mr10">
				    <el-option key="1" label="微信" value="0"></el-option>
					<el-option key="2" label="支付宝" value="1"></el-option>
				    <el-option key="3" label="全部" value=""></el-option>
				</el-select>
				(申请时间)时间范围：
				<el-date-picker
				  v-model="time"
				  type="daterange"
				  range-separator="至"
				  start-placeholder="开始日期"
				  end-placeholder="结束日期">
				</el-date-picker>
				关键字搜索：
				<el-input v-model="keyWord" placeholder="请输入关键字" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>
			<!-- <div class="handle-box" style="display: flex;height: 34px;">
				<el-button type="small" @click="down()">下载信息<i class="el-icon-lx-down"></i></i></el-button>
				<el-upload
				 
				  :action="url+'web/withdrawal/import'"
				  accept = ".xls, .xlsx"
				  :headers="setToken()"
				  :show-file-list = "false"
				  style="width: auto;height: auto;"
				  :on-success = "uploadImport"
				  >
				  <el-button size="small"  type="primary">点击上传</el-button>
				</el-upload>
			</div> -->
			
			
            <el-table v-loading="loading" :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
				  <el-table-column prop="cashType" label="平台" width="100" >
					<template slot-scope="scope">
					   <span v-if="scope.row.cashType == 0"  style="color:#993399">微信</span>
					   <span v-if="scope.row.cashType == 1" style="color:#993399">支付宝</span>
					</template>
				</el-table-column>
                <el-table-column prop="wechatNickname" label="微信昵称" sortable width="150">
					
                </el-table-column>
                <el-table-column prop="realName" label="姓名" width="150">
					
                </el-table-column>
				
                <el-table-column prop="cashAccountName" label="支付宝" width="150" >
                </el-table-column>
				
                <el-table-column prop="phone" label="手机号" width="150" >
                </el-table-column>
				
				<el-table-column prop="cashAccount" label="申请金额(元)" width="110" >
					
				</el-table-column>
                <el-table-column prop="cashStatus" label="状态" width="100" >
					<template slot-scope="scope">
					   <span v-if="scope.row.cashStatus == 0"  style="color:#228B22">未处理</span>
					   <span v-if="scope.row.cashStatus == 1" style="color:#F00;">成功</span>
					   <span v-if="scope.row.cashStatus == 2" style="color:#808080">失败</span>
					</template>
                </el-table-column>
				<el-table-column prop="beforeTotalAccount" label="提现前金额" width="150" align="center" >
				</el-table-column>
				<el-table-column prop="afterTotalAccount" label="提现后金额" width="150" align="center" >
				</el-table-column>
				
				<el-table-column prop="createDate" label="申请时间" width="150" align="center" >
				</el-table-column>
				<el-table-column prop="updateDate" label="处理时间" width="150" align="center" >
				</el-table-column>
                <el-table-column prop="remark" label="备注(或拒绝原因)"  align="center" >
					<template slot-scope="scope">
						<div>{{scope.row.remark}}   {{scope.row.refuseReason}}</div>
					</template>
				</el-table-column>
				
				<!-- <el-table-column prop="blackScope" label="黑名单" width="150" >
					<template slot-scope="scope">
						<el-button type="text" @click="blacklistUser(scope.row.userId,1)" v-if="scope.row.blackScope == 0">拉黑该用户</el-button>
						<br v-if="scope.row.blackScope == 0">
						<el-button type="text" @click="blacklistUser(scope.row.userId,3)" v-if="scope.row.blackScope == 0">拉黑该用户，及下级</el-button>
						<br v-if="scope.row.blackScope == 0">
						<el-button type="text" @click="washUser(scope.row.userId)" v-if="scope.row.blackScope == 1">洗白该用户</el-button>
						<br v-if="scope.row.blackScope == 1">
						<el-button type="text" @click="washUser(scope.row.userId)" v-if="scope.row.blackScope == 3">洗白该用户，及下级</el-button>
						
					</template>
				</el-table-column> -->
				
                <el-table-column prop="time" label="操作" width="100" align="center" >
					<template slot-scope="scope">
					    <el-button type="text" v-if="scope.row.cashStatus == 1"  @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
						<el-button type="text" v-if="scope.row.cashStatus == 2"  @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
						<el-button type="text" v-if="scope.row.cashStatus == 0"  @click="saveEdit(1, scope.row)">确认</el-button>
						<el-button type="text" v-if="scope.row.cashStatus == 0" class="red"  @click="saveEdit(2, scope.row)">拒绝</el-button>
					</template>
                </el-table-column>
               <!-- <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">类型</el-button>
                        <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">配置</el-button>
                        <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">生成链接</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="page.total" :page-size = "page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
        </div>
		
		
		
		
		
        <!-- 编辑弹出框 -->
        <el-dialog title="详情" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" class="bj" label-width="82px">
                <el-form-item label="微信ID">
                    {{form.wechatId}}
                </el-form-item>
				
                <el-form-item label="提现金额" placeholder="任务描述">
                    {{form.amount}}
                </el-form-item>
				
				<el-form-item label="处理结果">
				    <!-- {{form.amount}} -->
					<span v-if="form.applicantStatus == 0" style="color:#228B22">未处理</span>
					<span v-if="form.applicantStatus == 1" style="color:#F00;">成功</span>
					<span v-if="form.applicantStatus == 2" style="color:#808080">已拒绝</span>
				</el-form-item>
				
				<el-form-item label="支付备注">
					 {{form.remark}}
				</el-form-item>
				
				<el-form-item label="申请时间">
				    {{form.applicantTime}}
				</el-form-item>
				
				<el-form-item label="处理时间">
				    {{form.processingTime}}
				</el-form-item>

            </el-form>
           
        </el-dialog>
		

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
		
		<!-- 确认信息 -->
		<el-dialog title="提示" :visible.sync="affirmVisible" width="500px" center>
		    <el-form ref="form" :model="affirmForm" label-width="82px">
		        <el-form-item :label="label1">
		           <el-input v-model="affirmForm.cashAccount" :disabled="true" placeholder="提现金额" class="handle-input mr10"></el-input>
		        </el-form-item>
		    	
		        <el-form-item :label="label2" >
		            <el-input v-model="affirmForm.remark" placeholder="转账备注" class="handle-input mr10"></el-input>
		        </el-form-item>
		    	
		    	<!-- <el-form-item :label="label3">
					   <el-select v-model="affirmForm.transferState" placeholder="请选择转账类型" class="handle-select mr10">
							<el-option key="1" label="不自动转账" :value="1"></el-option>
							<el-option key="2" label="自动转账" :value="2"></el-option>
					   </el-select>
		    	</el-form-item> -->
				
		    </el-form>
			
		    <span slot="footer" class="dialog-footer">
		        <el-button @click="affirmVisible = false">取 消</el-button>
		        <el-button type="primary" v-if="ConfirmRefusedTo == 1" @click="affirmMsg">确 定</el-button>
				<el-button type="primary" v-if="ConfirmRefusedTo == 2" @click="deleteRow">拒 绝</el-button>
		    </span>
		</el-dialog>
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
					cashType:'',
					refuseReason:"",//拒绝原因
					remark: '',//备注
					applicantTime: '',//申请时间
					processingTime: '',//处理时间
					
                },
				affirmForm: {
                    amount: '',
                    id: "",
                    remark: "",
                    transferState: 1,
                },
				page:{
					pageSize:20,
					pageNum: 1,
					total: 0,
				},
                idx: -1,
                id: -1,
				
				applicantStatus: null,
				cashType:null,
				keyWord: null,
				//时间
				time:null,
				startTime: null,
				endTime: null,
				loading:false,//数据加载
				url:url,
				ConfirmRefusedTo: '',
				label1:'',
				label2:'',
				/* label3:'', */
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
				this.loading = true;
			  let	endTime = null,startTime = null;
              if (this.time) {
				startTime = this.time[0]
				endTime = this.time[1]
              }
                let vue = this
                get("server-admin/zfbCashWithdrawal/list",{
                    params: {
                        cashStatus: this.applicantStatus,
						cashType:this.cashType,
						keyWord: this.keyWord,
						startTime: this.timeTransition(startTime),
						endTime: this.timeEndTransition(endTime), 
						
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
					
					// vue.page.pageSize = Number(data.data.data.size);
					vue.page.pageNum =  Number(data.data.data.pages);
					vue.page.total =  Number(data.data.data.total)
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			
			timeTransition(beginTime){
				//转换时间
				if (beginTime == null) {
					return	null;
				} else if(beginTime == ''){
					return	null;
				}
				const dateTime = new Date(beginTime)
			    const year = dateTime.getFullYear()
			    const month = dateTime.getMonth() + 1
			    const date = dateTime.getDate()
			    const hour = dateTime.getHours()
			    const minute = dateTime.getMinutes()
			    const second = dateTime.getSeconds()
				var a = year+"-"+month+"-"+date+" 00:00:00";
				return a;
			  
			},
			timeEndTransition(beginTime){
				//转换时间
				if (beginTime == null) {
					return	null;
				} else if(beginTime == ''){
					return	null;
				}
				const dateTime = new Date(beginTime)
			    const year = dateTime.getFullYear()
			    const month = dateTime.getMonth() + 1
			    const date = dateTime.getDate()
			    const hour = dateTime.getHours()
			    const minute = dateTime.getMinutes()
			    const second = dateTime.getSeconds()
				var a = year+"-"+month+"-"+date+" 23:59:59";
				return a;
			  
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
                
                this.form = {
                   wechatId: row.wechatNickname,//微信id
                   cashAccount: row.cashAccount,//提现金额
                   applicantStatus: row.cashStatus,//状态
                   
                   remark: row.remark,//备注
                   applicantTime: row.createDate,//申请时间
                   processingTime: row.updateDate,//处理时间 
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
					cashAccount: row.cashAccount,
					id: row.id,
					remark: row.remark,
				}
            },
			affirmMsg(){
			//确认信息
				this.affirmVisible = false;
				get("server-admin/zfbCashWithdrawal/updateZfbAdoptOrRefuse",{
                   params: {
                        id:this.affirmForm.id,
                        cashStatus:1,
						remark:this.affirmForm.remark,
						}
                   
                })
				.then( (data) => {
					
				    if (data.data.status == 200) {
				    	this.$message.success("审核成功~");
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
               get("server-admin/zfbCashWithdrawal/updateZfbAdoptOrRefuse",{
                  params: {
                       id:this.affirmForm.id,
                       cashStatus:2,
               		remark:this.affirmForm.remark,
               		}
                  
               })
               .then( (data) => {
               	
                   if (data.data.status == 200) {
                   	console.log(data.data.data)
                   	this.$message.success("拒绝成功~");
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

