<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 渠道关系统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                
				<!-- <el-input v-model="select_word" placeholder="全局搜索" class="handle-input mr10" clearable></el-input> -->
                <el-select v-model="select_cate" placeholder="请选择" class="handle-select mr10">
					<el-option 
							   label="请选择"
							   :value="null"
					>请选择</el-option>
                    <el-option v-for="itme in list"
                    		   :label="itme.compayName"
                    		   :value="itme.companyId"
                    >{{itme.compayName}}</el-option>
                </el-select>
				<el-date-picker
				  v-model="time"
				  type="date"
				  placeholder="选择日期">
				</el-date-picker>
                <el-button type="small" @click="down()">下载信息<i class="el-icon-lx-down"></i></i></el-button>
                <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
				<el-button type="primary" icon="el-icon-search" @click="reset()">重置</el-button>
            </div>
            <el-table show-summary v-loading ="loading" :data="data" :summary-method="getSummaries" border class="table" ref="multipleTable" >
                
                <el-table-column prop="companyName" label="公司名称"  width="150">
                </el-table-column>
				
                <el-table-column prop="channelName" label="渠道名称" width="120">
                </el-table-column>
				
                <el-table-column prop="totalDownloadNum" label="下载量">
                </el-table-column>
				
                <el-table-column prop="totalRegistNum" label="注册量">
                </el-table-column>
				
                <el-table-column prop="totalMoney" label="联盟佣金数">
                </el-table-column>
				
                <!-- <el-table-column prop="currentRegistNum" label="今日注册量">
                </el-table-column> -->
				
				<el-table-column prop="orderNum" label="订单数">
				</el-table-column>
				
				<el-table-column prop="commission" label="返利佣金">
				</el-table-column>
				
				<el-table-column prop="orderTotalUser" label="下单总用户">
				</el-table-column>
                
				<el-table-column prop="commission" label="操作">
					<template slot-scope="scope">
					    <el-button type="text"   @click="viewMore(scope.row.channelId)">查看更多</el-button>
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
    import { post,get } from '../../../api/index';
    export default {
        name: 'goodsTop',
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                select_cate: null,
                select_word: null,
                del_list: [],
                loading:false,
                form: {
                    ID: '',
                },
				page:{
					pageSize:10,
					pageNum: 1,
					total: 0,
				},
                idx: -1,
                id: -1,
				time: null,
				list: [],
				totalList: [],
            }
        },
        created() {
            this.getData();
			this.commpanyList();
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
                let vue = this
				this.loading = true
                get("web/channel/manage/statistical",{
                    params: {
						companyId: vue.select_cate,
						searchDate: vue.getNowDate(vue.time),
						
						// currentPage: pageNum,
						// pageSize: vue.page.pageSize,
						// total: vue.page.total, 
                    }
                })
                .then(function (data) {
                   
                    vue.tableData =   data.data.data.department
					vue.totalList = data.data.data.summary[0]
					
					vue.loading = false
					// vue.page.pageSize = data.data.data.pageSize;
					// vue.page.pageNum = data.data.data.pageNum;
					// vue.page.total =  Number(data.data.data.total) 
                })
                .catch(function (error) {
                    console.log(error);
					vue.loading = false
                });
            },
			viewMore(id){
				//跳转到详情
				this.$router.push({path:'/channelRelationshipDetails',query: {id:id}})
				
			},
			commpanyList(){
				get("web/find/commpany/list",{
					params:{
						currentPage: 1,
						pageSize: 1000,
					}
				})
				.then( (data) => {
					console.log(data.data.data.list)
					this.list =	data.data.data.list
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			down(){
				let vue = this
				get("web/channel/export",{
					responseType: 'blob', //二进制流
					params:{
						companyId: vue.select_cate,
						searchDate: vue.getNowDate(vue.time),
					}
			    })
			    .then(function (response) {
					console.log(response)
						var blob = new Blob([response.data], {type: 'application/vnd.ms-excel;charset=utf-8'})//下载的excel表，加上头，防止乱码
						console.log(blob)
			            var downloadElement = document.createElement('a');
			            var href = window.URL.createObjectURL(blob); //创建下载的链接
			            downloadElement.href = href;
			            downloadElement.download = '下载信息表.xls'; //下载后文件名
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
			getSummaries(param) {
				// console.log(param)
				let vue = this
				const { columns, data } = param;
				console.log(vue.totalList)
				const sums = [
								'总量统计',
								'总',
								vue.totalList.totalDownloadNum,
								vue.totalList.totalRegistNum,
								vue.totalList.totalMoney,
								// vue.totalList.currentRegistNum,
								vue.totalList.orderNum,
								vue.totalList.commission,
								vue.totalList.orderTotalUser,
								];
								// console.log(sums)
				return sums;
			},
			getNowDate(time){
				// console.log(time)
				if (time == null) {
					return null
				} else if (time == ''){
					return null
				}
				//截取时间
				var date = new Date(time)
				var year = date.getFullYear()
				var month = date.getMonth()
				var day = date.getDate()
				//月份需要+1，因为月份获取的是0-11
				return `${year}-${(month+1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
			},
			reset(){
				//重置
				this.select_cate = null;
				this.time = null;
			},

        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
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

