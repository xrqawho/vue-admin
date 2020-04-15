<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 公司设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="delAll">添加任务</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
                <el-table-column prop="compayName" type="index" :index="0" label="公司昵称" sortable width="150">
					<template scope="scope">
						<el-input
						  placeholder="任务标题"
						  v-model="data[scope.$index].compayName"
						  clearable>
						</el-input>
					  </template>
                </el-table-column>
                <el-table-column prop="inviteCode" label="任务描述" width="300">
					<template scope="scope">
						<el-input
						  placeholder="任务描述"
						  v-model="data[scope.$index].inviteCode"
						  clearable>
						</el-input>
					  </template>
                </el-table-column>
                <el-table-column prop="common" label="奖励金额" width="150" >
					<template scope="scope">
						<el-input
						  placeholder="奖励金额"
						  v-model="data[scope.$index].common"
						  clearable>元
						</el-input>
					  </template>
                </el-table-column>
                <el-table-column prop="address" label="按钮点击前" >
                </el-table-column>
                <el-table-column prop="taobaoName" label="按钮点击后" >
                </el-table-column>
                <el-table-column prop="type" label="修改确认" width="100" align="center" >
					<template slot-scope="scope">
					    <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">确认</el-button>
					</template>
                </el-table-column>
                <el-table-column prop="time" label="排序" width="100" align="center" >
					<template slot-scope="scope">
					    <el-button type="text"  @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-lx-top"></i></el-button>
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
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
		
		
		<div class="container" style="margin-top: 80px;">
		   
		    <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
		        
		        <el-table-column prop="compayName" type="index" :index="0" label="公司昵称" sortable width="150">
					<template scope="scope">
						<el-input
						  placeholder="公司昵称"
						  v-model="data[scope.$index].compayName"
						  clearable>
						</el-input>
					  </template>
		        </el-table-column>
		        <el-table-column prop="inviteCode" label="邀请码" width="120">
					<template scope="scope">
						<el-input
						  placeholder="公司昵称"
						  v-model="data[scope.$index].inviteCode"
						  clearable>
						</el-input>
					  </template>
		        </el-table-column>
		        <el-table-column prop="common" label="普通佣金分佣" >
		        </el-table-column>
		        <el-table-column prop="address" label="杀熟佣金分佣" >
		        </el-table-column>
		        <el-table-column prop="taobaoName" label="联盟方案" >
		        </el-table-column>
		        <el-table-column prop="type" label="类型" >
		        </el-table-column>
		        <el-table-column prop="time" label="创建时间" >
		        </el-table-column>
		        <el-table-column label="操作" width="180" align="center">
		            <template slot-scope="scope">
		                <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">类型</el-button>
		                <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">配置</el-button>
		                <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">生成链接</el-button>
		            </template>
		        </el-table-column>
		    </el-table>
		    <div class="pagination">
		        <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
		        </el-pagination>
		    </div>
		</div>
		
		
		
        <!-- 编辑弹出框 -->
        <el-dialog title="新增任务" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="82px">
                <el-form-item label="任务标题">
                    <el-input v-model="form.name" placeholder="任务标题"></el-input>
                </el-form-item>
				
                <el-form-item label="任务描述" placeholder="任务描述">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
				
				<el-form-item label="任务类型">
				    <el-select v-model="form.type" placeholder="请选择">
						<el-option  label="新手任务"	  value="1"></el-option>
						<el-option  label="日常任务"	  value="2"></el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="奖励类型">
					<el-input v-model="form.name" :disabled="true" style="width: 80px;"></el-input>
					<span> 元 </span>
				    <el-input v-model="form.address" :disabled="true" style="width: 80px;"></el-input>
					<span> 金币 </span>
				</el-form-item>
				
				<el-form-item label="按钮点击前">
				    <el-input v-model="form.address" placeholder="按钮点击前"></el-input>
				</el-form-item>
				
				<el-form-item label="按钮点击后">
				    <el-input v-model="form.address" placeholder="按钮点击后"></el-input>
				</el-form-item>
				
				<el-form-item label="跳转地址">
				    <el-input v-model="form.address" placeholder="请以http或者https开头"></el-input>
				</el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
				
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
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
        name: 'taskManagement',
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
                form: {
                    title: '',
                    date: '',
                    address: '',
					type: '',
                },
                idx: -1,
                id: -1
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
                this.getData();
            },
            // 获取数据
            getData(type,keyword,currentPage,pageSize) {
                // fetchData({
                //     page: this.cur_page
                // }).then((res) => {
                //     this.tableData = res.list;
                //     console.log(this.tableData)
                // })
                let vue = this
                get("web/find/commpany/list",{
                    params: {
                        type: type,
                        keyword:keyword,
                        currentPage:currentPage,
                        pageSize: pageSize
                    }
                })
                .then(function (data) {
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
                   
                    vue.tableData =   data.data.data.list.map(list => {
                                        // console.log(list)
										console.log(list.generalFeeScheme.schemeName)
                                           let json = {
                                            "compayName":list.compayName,
                                            "inviteCode":list.inviteCode,
                                            "common":list.generalFeeScheme.schemeName,
                                            "address":"",
                                            "taobaoName":"list.taoBaoScheme.taobaoName",
                                            "type":"list.type",
                                            "time":"list.upadateTime",

                                        }
                                        return json
                                    })
                                    console.log(vue.tableData)
                    
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
            filterTag(value, row) {
                return row.tag === value;
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
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
                if(this.tableData[this.idx].id === this.id){
                    this.$set(this.tableData, this.idx, this.form);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.$set(this.tableData, i, this.form);
                            return ;
                        }
                    }
                }
            },
            // 确定删除
            deleteRow(){
                this.$message.success('删除成功');
                this.delVisible = false;
                if(this.tableData[this.idx].id === this.id){
                    this.tableData.splice(this.idx, 1);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.tableData.splice(i, 1);
                            return ;
                        }
                    }
                }
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

