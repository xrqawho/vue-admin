<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 意见反馈 </el-breadcrumb-item> 
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                
				用户名：
				<el-input v-model="userName" placeholder="请输入用户名" class="handle-input mr10"></el-input>
				关键字：
				<el-input v-model="keyword" placeholder="请输入关键字" class="handle-input mr10"></el-input>
				手机号：
				<el-input v-model="phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
				
				<el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
			
			</div>
            <el-table :data="data" border class="table" ref="multipleTable">
                
                <el-table-column prop="userId" label="账号ID" >
                </el-table-column>
				
                <el-table-column prop="userName" label="分类名称">
                </el-table-column>
				
                <el-table-column prop="contentFeedback" label="反馈问题" >
                </el-table-column>
				
				<el-table-column prop="createTime" label="反馈时间" >
					<template slot-scope="scope">
					    {{timeTransition(scope.row.createTime)}}
					</template>
				</el-table-column>
				
				<el-table-column prop="phone" label="用户手机" >
				</el-table-column>
				
				<el-table-column prop="sort" label="图片" >
					<template slot-scope="scope">
					    <img class="feedbackImg" v-for="itme in truncationPicture(scope.row.feedbackImg)" @click="magnifyImg(itme)"  :src="itme" alt="">
					</template>
				</el-table-column>
				
				<el-table-column prop="manageWay" label="解决方式" >
					<template slot-scope="scope">
						<el-button v-if="scope.row.manageStatus == 0" type="text" @click="clickSolution(scope.row)">还未解决，去解决</el-button>
					</template>
				</el-table-column>
				
				<el-table-column prop="manageStatus" label="处理状态" >
					<template slot-scope="scope">
					    <div v-if="scope.row.manageStatus == 1">已解决</div>
						<el-button v-if="scope.row.manageStatus == 0" type="text" @click="clickSolution(scope.row)">未解决</el-button>
						
					</template>
				</el-table-column>
                
                
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="page.total" :page-size = "page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
			
        </div>
		
		<el-dialog title="解决方式" :visible.sync="editVisible" width="30%">
			
		    <el-form ref="form" :model="form" label-width="82px">
		        <el-form-item label="解决方式">
		            <el-input v-model="form.manageWay" placeholder="解决方式"></el-input>
		        </el-form-item>
		    </el-form>
			
		    <span slot="footer" class="dialog-footer">
				
		        <el-button @click="editVisible = false">取 消</el-button>
		        <el-button type="primary" @click="solution">确 定</el-button>
		    </span>
		</el-dialog>
		
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
        
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
				userName:'',
				keyword: '',
				phone: '',
				page:{
					pageSize:10,
					pageNum: 1,
					total: 0,
				},
				form:{
					manageWay:"",
				},
				tableId:"",
				dialogVisible:false,
				editVisible:false,
				dialogImageUrl:"",
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
            // 获取数据
            getData(pageNum) {
                
                let vue = this
                get("feedback/list",{
                    params: {
						userName: this.userName,
						keyWord: this.keyword,
						phone: this.phone,
						
						
                        currentPage: pageNum,
                        pageSize: vue.page.pageSize,
                        total: vue.page.total,
                    }
                })
                .then(function (data) {
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
                    console.log(data.data.data.list)
                    vue.tableData =   data.data.data.list;
					// vue.page.pageSize = data.data.data.pageSize;
					vue.page.pageNum = data.data.data.pageNum;
					vue.page.total =  Number(data.data.data.total)
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			// 点击处理
			clickSolution(row){
				console.log(row)
				this.editVisible = true;
				this.tableId = row.tableId;
			},
            solution(){
				post("feedback/manage",{
					
						tableId:this.tableId,
						manageStatus:1,
						manageWay:this.form.manageWay,
						
				})
				.then( (data) => {
					if (data.data.status == 200) {
						console.log(data.data.data)
						this.$message.success(data.data.msg);
						this.getData(this.page.pageNum)
						this.editVisible = false;
					} else{
						this.$message.error(data.data.msg);
					}
				})
				.catch(function (error) {
					this.editVisible = false;
				    console.log(error);
				});
			},
			truncationPicture(feedbackImg){
				if (feedbackImg == null) {
				   return [];
				} else {
				  let str= String(feedbackImg); //这是一字符串
				  let strs= new Array(); //定义一数组
				  strs=str.split(","); //字符分割
				  // console.log(strs)
				  return strs;
				}
			},
			magnifyImg(src){
				console.log(src)
				this.dialogImageUrl = src;
				this.dialogVisible = true;
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
        width: 170px;
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
	.feedbackImg{
		width: 30px;
		cursor: pointer;
	}
</style>

