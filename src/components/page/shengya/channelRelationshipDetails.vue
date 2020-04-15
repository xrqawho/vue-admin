<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 渠道关系详情 </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button type="small" @click="down()"> 数据下载 <i class="el-icon-lx-down"></i></i></el-button>
			</div>
			
			<el-table :data="data" v-loading ="loading" border class="table" ref="multipleTable" >
				
				<el-table-column prop="companyName" label="公司名称"  width="150">
				</el-table-column>
				
				<el-table-column prop="channelName" label="渠道名称" width="120">
				</el-table-column>
				
				<el-table-column prop="totalDownloadNum" label="当日下载量">
				</el-table-column>
				
				<el-table-column prop="commission" label="返利佣金">
				</el-table-column>
				
				<el-table-column prop="totalRegistNum" label="当日注册量">
				</el-table-column>
				
				<el-table-column prop="orderNum" label="当日订单量">
				</el-table-column>
				
				<el-table-column prop="todayAdd" label="新增下单用户">
				</el-table-column>
				
				<el-table-column prop="totalMoney" label="联盟佣金">
				</el-table-column>
				
				<el-table-column prop="createTime" label="日期">
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
                loading:true,
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
            this.getData(1);
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
				console.log(this.$route)
				vue.loading = true
                get("web/channel/statistical/detail",{
                    params: {
						
						channelId: this.$route.query.id,
						currentPage: pageNum,
						pageSize: vue.page.pageSize,
						total: vue.page.total, 
						
                    }
                })
                .then(function (data) {
                   
				   if(data.data.data == null){
						vue.tableData = []
						return;
				   }
                    vue.tableData =   data.data.data.list
					
					// vue.page.pageSize = data.data.data.pageSize;
					vue.page.pageNum = data.data.data.pageNum;
					vue.page.total =  Number(data.data.data.total) 
					vue.loading = false
                })
                .catch(function (error) {
                    console.log(error);
					vue.loading = false
                });
            },
			viewMore(id){
				this.$router.push({
					name: 'channelRelationshipDetails',
					params: {
						id: id
					}
				});
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
				get("web/channel/detail/export",{
					responseType: 'blob', //二进制流
					params:{
						channelId:this.$route.query.id,
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
								vue.totalList.currentRegistNum,
								vue.totalList.orderNum,
								vue.totalList.commission,
								
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
				
			}

        },
		watch:{
			'$route' (to, from) { //监听路由是否变化
				console.log(to)
			    if(this.$route.query.id){// 判断条件1  判断传递值的变化
			      //获取文章数据
				  this.getData(1);
				  this.commpanyList();
			    }
			}
		},
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


