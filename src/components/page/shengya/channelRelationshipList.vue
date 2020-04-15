<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 渠道关系列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit">新增</el-button>

            </div>
            <el-table :data="data" v-loading ="loading" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">

                <el-table-column prop="companyId" label="公司名称"  width="150">
                    <template slot-scope="scope">
                        <div v-for="item in list" :key="item.companyId" v-if="Number(item.companyId) == Number(scope.row.companyId)">
                            <!-- {{item.companyId}}
                            {{scope.row.companyId}} -->
                            {{ item.compayName }}
                        </div>
                    </template>

                </el-table-column>

                <el-table-column prop="channelName" label="渠道名称" width="120">
                </el-table-column>

                <el-table-column prop="channelInviteCode" label="邀请码">
                </el-table-column>
                <el-table-column prop="channelLink" label="生成链接">
                </el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text"
									v-clipboard:copy="scope.row.channelLink"
									v-clipboard:success="successCopy"
									v-clipboard:error="errorCopy"
								>复制</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"  @click="handleDelete(scope.row.tableId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="page.total" :page-size = "page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
        </div>

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="公司名称">
                    <el-select v-model="form.companyId" placeholder="请选择" class="handle-select mr10">
							<el-option v-for="itme in list"
									   :label="itme.compayName"
									   :value="itme.companyId"
							>{{itme.compayName}}</el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="渠道名称">
				    <el-input v-model="form.channelName" placeholder="请输入渠道名称" class="handle-input mr10"></el-input>
				</el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="addEdit">生成链接</el-button>
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
                multipleSelection: [],

                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    companyId: '',
					channelName:'',
                },
				page:{
					pageSize:20,
					pageNum: 1,
					total: 0,
				},
				loading:false,

                idx: -1,
                id: -1,
				list: [],
            }
        },
        created() {
            this.getData(1);
			this.commpanyList()
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
				vue.loading = true
                get("web/channel/syChannelList",{
                    params: {
						goodsPlatform: vue.select_cate,
						goodsTitle: vue.select_word,

						pageNum: pageNum,
						pageSize: vue.page.pageSize,
						total: vue.page.total,
                    }
                })
                .then(function (data) {
                   console.log(data)
                    vue.tableData =   data.data.data.records
					vue.loading = false

					vue.page.pageSize = Number(data.data.data.size);
					// vue.page.pageNum = data.data.data.pageNum;
					vue.page.total =  Number(data.data.data.total)
                })
                .catch(function (error) {
                    console.log(error);
					vue.loading = false
                });
            },

            search() {
                this.is_search = true;
            },

            handleEdit(index, row) {

                this.editVisible = true;
            },
            handleDelete(tableId,) {

				this.$confirm('将要删除该渠道, 是否继续?', '警告', {
				  confirmButtonText: '继续',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					post("web/channel/syChannelDel",{

							tableId: tableId,
							deleted: true,

					})
					.then((data) => {
					    if (data.data.status == 200) {
					    	this.$message.success(data.data.data)
							this.getData(1);
					    } else{
					    	this.$message.error(data.data.data)
					    }

					})
					.catch(function (error) {
					    console.log(error);
					});

				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });
				});

            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 新增
            addEdit() {

                 post("web/channel/syChannelSave",{
                       channelName: this.form.channelName,
					   companyId: this.form.companyId,
                })
                .then((data) => {
                    if (data.data.status == 200) {

                    	this.$message.success(`添加成功`);
						this.getData(1);
						this.editVisible = false;
                    } else{
                    	this.$message.error(data.data.msg)
                    }
                    //一个数组用来接收加工后台传过来的数据
                })
                .catch(function (error) {
                    console.log(error);
                });


            },
			successCopy(e){
				//复制成功的钩子函数
				console.log(e)
				this.$message({
				  message: '复制成功',
				  type: 'success'
				});
			},
			errorCopy(e){
				//复制失败的钩子函数
				console.log(e)
				this.$message.error('复制失败，请检查需要复制的链接是否为空');
			},
            // 确定删除
            deleteRow(){
                this.$message.success('删除成功');
                this.delVisible = false;

            },
			commpanyList(){
				//请求公司list
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
        width: 200px;
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

