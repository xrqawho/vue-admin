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
			<!-- 	 成交平台：
				<el-select v-model="goodsPlatform" placeholder="平台" class="handle-select mr10">
					<el-option key="0" label="全部" :value="null"></el-option>
				    <el-option key="1" label="淘宝" value="淘宝"></el-option>
					<el-option key="2" label="天猫" value="天猫"></el-option>
				</el-select> -->

				订单状态：
				<el-select v-model="payStatus" placeholder="请选择订单状态" class="handle-select mr10">
				    <el-option key="1" label="全部状态" :value="null"></el-option>
					<el-option key="2" label="订单失效" :value="13"></el-option>
					<el-option key="3" label="订单结算" :value="3"></el-option>
				    <el-option key="4" label="订单付款" :value="12"></el-option>
					<el-option key="3" label="维权订单" :value="4"></el-option>
					<el-option key="3" label="订单完成" :value="14"></el-option>
					<el-option key="5" label="无状态" :value="0"></el-option>
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

				<el-input v-model="keyWord" placeholder="请输入关键字" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>

			<div class="handle-box">

				<el-upload
					:action="url+'web/order/violations/import'"
					accept = ".xls, .xlsx"
					:headers="setToken()"
					:show-file-list = "false"
					style="width: auto;height: auto;"
					:on-success = "uploadImport"
					>
					<el-button size="small"  type="primary">点击上传</el-button>
				</el-upload>

			</div>




            <el-table v-loading="loading" :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">

             <!--   <el-table-column prop="orderType"  label="平台" sortable width="80">
                </el-table-column> -->

                <el-table-column prop="itemTitle" label="商品标题" width="300">
                </el-table-column>

                <el-table-column prop="tkStatus" label="状态" width="100" >
					<template slot-scope="scope">
						<span v-if="scope.row.tkStatus == 14">订单成功</span>
						<span v-if="scope.row.tkStatus == 13">订单失效</span>
						<span v-if="scope.row.tkStatus == 3">订单结算</span>
						<span v-if="scope.row.tkStatus == 4">维权订单</span>
						<span v-if="scope.row.tkStatus == 12">订单付款</span>
						<span v-if="scope.row.tkStatus == 0">无状态</span>
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
					<template slot-scope="scope">
						<div @click="taobao(scope.row.itemId)" style="cursor: pointer;">
							{{scope.row.itemId}}
						</div>
					</template>
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
							{{scope.row.expireTime }}
						</div>
					</template>
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

				payStatus: null,
				keyWord: null,
				goodsPlatform: null,
				//时间
				time: null,
				loading: false,
				url:url,
            }
        },
        created() {
            this.getData();
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
                get("web/order/selectAppOrderDetailListNew",{
                    params: {
						payStatus: this.payStatus,
						keyWord: this.keyWord,
						goodsPlatform: this.goodsPlatform,
						startTime: this.timeTransition(startTime),
						endTime: this.timeTransition(endTime),

                        currentPage: pageNum,
						pageSize: vue.page.pageSize,
						total: vue.page.total,
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
					return	'';
				} else if(beginTime == ''){
					return	'';
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



