<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
				 条件筛选
				 <br>
			 	 平台：
				<el-select v-model="platformType" placeholder="平台" class="handle-select mr10">
					<el-option key="0" label="全部" :value="null"></el-option>
				    <el-option key="1" label="淘宝" value="1"></el-option>
					<el-option key="2" label="京东" value="2"></el-option>
					<el-option key="3" label="拼多多" value="3"></el-option>
				</el-select> 

				订单状态：
				<el-select v-model="payStatus" placeholder="请选择订单状态" class="handle-select mr10">
				    <el-option key="1" label="全部状态" :value="null"></el-option>
					<el-option key="2" label="订单失效" :value="13"></el-option>
					<el-option key="3" label="订单结算" :value="3"></el-option>
				    <el-option key="4" label="订单付款" :value="12"></el-option>
					<el-option key="5" label="维权订单" :value="4"></el-option>
					<el-option key="6" label="订单完成" :value="14"></el-option>
				</el-select>
				(申请时间)时间范围：
				<el-date-picker
				  v-model="time"
				  type="daterange"
				  disabledDate = "disabledDate"
				  range-separator="至"
				  start-placeholder="开始日期"
				  end-placeholder="结束日期">
				</el-date-picker>

				关键字：<el-input v-model="keyWord" placeholder="请输入关键字" class="handle-input mr10"></el-input><br />
				用户id：<el-input v-model="userId" placeholder="请输入用户id" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>

			<div class="handle-box">

				<!-- <el-upload
					:action="url+'web/order/violations/import'"
					accept = ".xls, .xlsx"
					:headers="setToken()"
					:show-file-list = "false"
					style="width: auto;height: auto;"
					:on-success = "uploadImport"
					>
					<el-button size="small"  type="primary">点击上传</el-button>
				</el-upload> -->

			</div>




            <el-table v-loading="loading" :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">

             <!--   <el-table-column prop="orderType"  label="平台" sortable width="80">
                </el-table-column> -->

                <el-table-column prop="itemTitle" label="商品标题" width="300">
                </el-table-column>

                <el-table-column prop="orderStatus" label="状态" width="100" >
					<template slot-scope="scope">
						<span v-if="scope.row.orderStatus == 14">订单成功</span>
						<span v-if="scope.row.orderStatus == 13">订单失效</span>
						<span v-if="scope.row.orderStatus == 3">订单结算</span>
						<span v-if="scope.row.orderStatus == 4">维权订单</span>
						<span v-if="scope.row.orderStatus == 12">订单付款</span>
					</template>
                </el-table-column>

                <el-table-column prop="payTime" label="下单时间" >

                </el-table-column>
				 <el-table-column prop="receivingTime" label="确认收货时间" >
				
				</el-table-column>
				 <el-table-column prop="settlementTime" label="结算时间" >
				
				</el-table-column>
				 <el-table-column prop="returnGoodsTime" label="退货时间" >
				
				</el-table-column>
				<el-table-column prop="hander" label="到账状态" >
					<template slot-scope="scope">
						<span v-if="scope.row.hander == 0" style="color:#228B22">未到账</span>
						<span v-if="scope.row.hander == 1" style="color:#F00;">已到账</span>
					</template>
				</el-table-column>
				
				 <el-table-column prop="largeExpireTime" label="预计到账时间" >
				
				</el-table-column>
				
				
                <el-table-column prop="userId" label="用户id" >
                </el-table-column>

				<el-table-column prop="itemId" label="商品ID" >
					<template slot-scope="scope">
						<div @click="taobao(scope.row.itemId)" style="cursor: pointer; color:#0000FF" >
							{{scope.row.itemId}}
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="orderId" label="订单编号" >
				</el-table-column>

				<el-table-column prop="payMoney" label="付费金额" >
				</el-table-column>

				<el-table-column prop="userCommission" label="客户佣金" >
					
				</el-table-column>

				<el-table-column prop="parentUserId" label="上级用户id" >
					
				</el-table-column>
				<el-table-column prop="parentUserCommission" label="上级佣金" >
				</el-table-column>
					
				<el-table-column prop="estimateMoney" label="预估收入" >
				</el-table-column>
				<el-table-column prop="commissionRate" label="佣金比例" >
				</el-table-column>
				<el-table-column prop="orderType" label="状态" width="100" >
					<template slot-scope="scope">
						<span v-if="scope.row.orderType == 0">正常单</span>
						<span v-if="scope.row.orderType == 1">淘礼金单</span>
						<span v-if="scope.row.orderType == 2">免单</span>
						<span v-if="scope.row.orderType == 3">首单</span>
						<span v-if="scope.row.orderType == 4">淘礼金及首单</span>
					</template>
				</el-table-column>	
				<el-table-column prop="giftMoney" label="淘礼金金额" >
				</el-table-column>
				<el-table-column prop="redpackageMoney" label="红包金额" >
				</el-table-column>

				<el-table-column prop="orderSettleStatus" width="120" label="订单是否违规" >
					<template slot-scope="scope">
						<div v-if="scope.row.orderSettleStatus == '3'">订单已违规</div>
						<el-button type="text" v-if="scope.row.orderSettleStatus != '3' && scope.row.tkStatus == 3"  @click="Violations(scope.row.tradeId)">未违规</el-button>
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
                <el-pagination background  @current-change="handleCurrentChange" layout="prev, pager, next" :total="page.total" :page-size = "page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
        </div>




    </div>
</template>

<script>
    import { post,get,url } from '../../../api/index';
    export default {
        name: 'orderManagement',
        data() {
            return {
                tableData: [],
				TransactionPlatform: '',
				orderStatus: '',
				userId:'',
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

				payStatus: '',
				keyWord: null,
				platformType: '',
				//时间
				time: null,
				loading: false,
				url:url,
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
            taobao(id) {
                window.open("https://detail.tmall.com/item.htm?id=" + id)
                // window.location = "https://detail.tmall.com/item.htm?id="+ id
            },
            // 获取数据
            getData(pageNum) {
				this.loading = true
				let	startTime = null,endTime = null;

				if (this.time) {
					startTime =	this.time[0]
					endTime = this.time[1]
				}
                let vue = this
                get("server-admin/appUserOrder/list",{
                    params: {
						platformType: this.platformType,
						userId:this.userId,
						orderStatus: this.payStatus,
						keyWord: this.keyWord,
						startDate: this.timeTransition(startTime),
						endDate: this.timeEndTransition(endTime), 
                        pageNum: pageNum,
						pageSize: vue.page.pageSize,
                    }
                })
                .then( (data) => {
					console.log(data)
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据

                    vue.tableData =   data.data.data.list
                                    console.log(vue.tableData)
									// vue.page.pageSize = data.data.data.pageSize;
									vue.page.pageNum = data.data.data.pageNum;
									vue.page.total =  Number(data.data.data.total)
									this.loading = false

                })
                .catch( (error) => {
                    console.log(error);
					this.loading = false
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
							this.getData(this.page.pageNum)
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
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
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
			uploadImport(response, file, fileList){
				console.log(response)
				if (response.status == 200) {
					this.$message.success(response.msg);
					const jsonData = response.data.map(parame => {
					            if (parame.describe == null) {
					                parame.describe = ""
					            }
					            if (parame.orderId == null) {
					                parame.orderId = ""
					            }

					            return {
									orderId:parame.orderId,
									describe:parame.describe,
					            }
					        });



					        //列标题，逗号隔开，每一个逗号就是隔开一个单元格
					        let str = `订单id,处理结果\n`;

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
			disabledDate(res){
				console.log(res)
				return this.dateEnd
			},
			setToken(){
				let set_token = localStorage.getItem("set_token")
				return{
					"Authorization": set_token,
					responseType: 'blob',
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

</style>

<style>
	.el-upload--text{
		width: auto;
		height: auto;
		border: 0px;
	}
	.red{
	    color: #ff0000;
	}
</style>



