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
				<el-input v-model="searchKey" placeholder="请输入关键字" class="handle-input mr10"></el-input>
				<el-select v-model="logType" placeholder="请选择">
				    <el-option label="微信" :value="1"></el-option>
					<el-option label="支付宝" :value="2"></el-option>
					<el-option label="全部" :value="null"></el-option>
				  </el-select>
				<el-button style="margin-left: 20px;" type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>

            <el-card class="box-card" v-loading = "loading">
              <div v-for="itme in tableData" :key="itme.tableId" class="text item">
                {{ itme.userName + itme.remark}}
				<span v-if="itme.logStatus == 0">
					+
				</span>
				<span v-if="itme.logStatus == 1">
					-
				</span>
				{{ itme.amount  }}
				&nbsp;&nbsp;&nbsp;&nbsp;
				<span v-if="itme.logType == 1">微信余额：</span>
				<span v-if="itme.logType == 2">支付宝余额：</span>
				变更前
				{{itme.beforeBalance}}
				变更后
				{{itme.afterBalance}}
              </div>
            </el-card>
			
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
        name: 'userBalanceRecord',
        data() {
            return {
                tableData: [],
				searchKey: '',
				logType: null,
				
				page:{
					pageSize:15,
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
			
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.getData(val);
            },
            // 获取数据
            getData(pageNum) {
				this.loading = true
                get("web/syUserMoneyLog/findList",{
                    params: {
						//搜索参数
						searchKey: this.searchKey,
						logType: this.logType,
						//分页
                        currentPage: pageNum,
						pageSize: this.page.pageSize,
						
                    }
                })
                .then( (data) => {
					this.loading = false
					console.log(data.data.data.records)
                    this.tableData = data.data.data.list
					
					// this.page.pageSize = Number(data.data.data.size);
					this.page.pageNum = Number(data.data.data.pageNum);
					this.page.total = Number(data.data.data.total);
                })
                .catch( (error) => {
					this.loading = false
                });
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
	.text{
		line-height: 30px;
	}
</style>





