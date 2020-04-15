<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 推送列表 </el-breadcrumb-item> 
            </el-breadcrumb>
        </div>
        <div class="container">
           <!-- <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="addVisible = true">新增</el-button>
            </div> -->
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
               
                <el-table-column prop="title" label="推送标题">
                </el-table-column>
				 <el-table-column prop="content" label="推送内容">
				</el-table-column>
				 <el-table-column prop="jump_link" label="跳转链接">
				</el-table-column>
                <el-table-column prop="type" label="推送对象类型" >
					<template slot-scope="scope">
					    {{funPictureType(scope.row.type)}}
					</template>
                </el-table-column>
				 <el-table-column prop="enable" label="启用/禁用" >
					 <template slot-scope="scope">
					     {{funPictureEnable(scope.row.enable)}}
					 </template>
				</el-table-column>
				<el-table-column prop="create_time" label="创建时间" >
					<template slot-scope="scope">
					    {{formartDate(scope.row.create_time)}}
					</template>
				</el-table-column>
				<el-table-column prop="update_time" label="修改时间" >
					<template slot-scope="scope">
					    {{formartDate(scope.row.update_time)}}
					</template>
				</el-table-column>
				<el-table-column prop="jump_type" label="推送方式" >
					<template slot-scope="scope">
					    {{funPictureJumpType(scope.row.jump_type)}}
					</template>
				</el-table-column>
				<el-table-column prop="push_time" label="定时推送时间" >
					<template slot-scope="scope">
					    {{formartDate(scope.row.push_time)}}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="推送状态" >
					<template slot-scope="scope">
					    {{funPictureStatus(scope.row.status)}}
					</template>
				</el-table-column>
                  
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                       <!-- <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button type="text" icon="el-icon-delete" class="red"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="page.total" :page-size = "page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
			
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="商品分类">
                    <el-input v-model="form.cname"></el-input>
                </el-form-item>
                <el-form-item label="列表排序">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
            </el-form>
			
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
		
		
		<!-- 新增弹出框 -->
		<el-dialog title="新增" :visible.sync="addVisible" width="30%">
			
		    <el-form ref="form" :model="add" label-width="80px">
		        <el-form-item label="商品分类">
		            <el-input v-model="add.cname"></el-input>
		        </el-form-item>
		        <el-form-item label="列表排序">
		            <el-input v-model="add.sort"></el-input>
		        </el-form-item>
		    </el-form>
			
		    <span slot="footer" class="dialog-footer">
		        <el-button @click="addVisible = false">取 消</el-button>
		        <el-button type="primary" @click="addClassify">确 定</el-button>
		    </span>
		</el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
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
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
				addVisible:false,
                form: {
                    cname: '',
                    sort: '',
                    tableId: '',
                },
				add:{
					cname: '',
					sort: '',
				},
				page:{
					pageSize:20,
					pageNum: 1,
					total: 0,
				},
                delId: '',//要删除的id
				
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
                this.cur_page = val;
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
                get("web/message/push/list",{
                    params: {
											
                        currentPage: pageNum,
						pageSize: vue.page.pageSize,
						total: vue.page.total,
                    }
                })
                .then(function (data) {
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
                    console.log(data.data.data.list)
                    vue.tableData =   data.data.data.records;
					
					// vue.page.pageSize = Number(data.data.data.size);
					vue.page.pageNum =  Number(data.data.data.current);
					vue.page.total =  Number(data.data.data.total)
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			funPictureStatus(value){
				//平台
				// console.log(value)
				switch(value) {
					 case 1:
						return "成功";
					 case 0:
						return "失败";
					 default:
						return "未知";
				}
			},
			funPictureJumpType(value){
				//平台
				// console.log(value)
				switch(value) {
					case 4001:
						return "纯消息推送";
					case 4002:
						return "html推送";
					case 4003:
						return "消息界面推送";
					case 4004:
						return "任务";
					case 4005:
						return "免单";
					case 4006:
						return "邀请";
					case 4007:
						return "商品详情";
					 default:
						return "未知";
				}
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
			funPictureEnable(value){
				//平台
				// console.log(value)
				switch(value) {
					 case 1:
						return "启用";
					 case 0:
						return "禁用";
					 default:
						return "未知";
				}
			},
			funPictureType(value){
				//平台
				// console.log(value)
				switch(value) {
					 case 1:
						return "已下单用户";
					 case 3:
						return "全部用户";
					 case 2:
						return "未下单用户";
					 case 4:
					    return "指定用户";
					 default:
						return "未知";
				}
			},
			addClassify(){
				this.addVisible = false;
				// this.$message.success(`修改第 ${this.idx+1} 行成功`);
				post("web/goodsClassify/add",this.add)
				.then( (data) => {
				    console.log(data.data.data)
					if (data.data.status == 200) {
						console.log(data.data.data)
						this.$message.success(data.data.msg);
						this.getData(1)
						
					} else{
						this.$message.error(data.data.msg);
					}
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
            handleEdit(index, row) {
                
                this.form = {
                    cname:row.cname,
					sort:row.sort,
					tableId: row.tableId,
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                //打开删除dialog，并传参
				this.delId = row.id;
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
            saveEdit() {
                this.editVisible = false;
                // this.$message.success(`修改第 ${this.idx+1} 行成功`);
                post("web/goodsClassify/update",this.form)
                .then( (data) => {
                    console.log(data.data.data)
					if (data.data.status == 200) {
						console.log(data.data.data)
						this.$message.success(data.data.msg);
						this.getData(1)
						
					} else{
						this.$message.error(data.data.msg);
					}
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            // 确定删除
            deleteRow(){
                
                this.delVisible = false;
                post("web/message/push/delete/"+this.delId,
				)
                .then( (data) => {
                    console.log(data.data.data)
                	if (data.data.status == 200) {
                		console.log(data.data.data)
                		this.$message.success(data.data.msg);
                		this.getData(1)
                		
                	} else{
                		this.$message.error(data.data.msg);
                	}
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
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
