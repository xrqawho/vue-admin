<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 商品置顶</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit">新增</el-button>
                条件筛选 平台：
                <el-select v-model="select_cate" placeholder="请选择" class="handle-select mr10">
                    <el-option key="1" label="淘宝" value="1"></el-option>
                    <!-- <el-option key="2" label="总公司" value="总公司"></el-option> -->
                </el-select>
                <el-input v-model="select_word" placeholder="请输入商品名字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
                <el-table-column prop="goodsPlatform" label="平台"  width="150">
					<template slot-scope="scope">
					   {{platform(scope.row.goodsPlatform)}}
					</template>
                </el-table-column>
                <el-table-column prop="companyName" label="公司" width="120">
                </el-table-column>
                <el-table-column prop="goodsTitle" label="商品标题">
                </el-table-column>
                <el-table-column prop="goodsName" label="商品名称">
                </el-table-column>
                <el-table-column prop="goodsTopStage" label="置顶状态">
					<template slot-scope="scope">
					   {{goodsTopStatus(scope.row.goodsTopStage)}}
					</template>
                </el-table-column>
                <el-table-column prop="topSerialNumber" label="序号">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
						<el-button type="text" v-if="scope.row.goodsTopStage == 1"  @click="goodsTop(scope.row.goodsId, 2)">置顶</el-button>
                        <el-button type="text" v-if="scope.row.goodsTopStage == 2" @click="goodsTop(scope.row.goodsId, 1)">不置顶</el-button>
                        <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">排序</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"  @click="handleDelete(scope.row.goodsId)">删除</el-button>
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
                <el-form-item label="商品ID">
                    <el-input v-model="form.ID"></el-input>
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
        name: 'goodsTop',
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
                form: {
                    ID: '',
                },
				page:{
					pageSize:10,
					pageNum: 1,
					total: 0,
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
                this.getData(val);
            },
            // 获取数据
            getData(pageNum) {
                let vue = this
                get("web/goodsTop/findGoodsTopByKeyWord",{
                    params: {
						
						goodsPlatform: vue.select_cate,
						goodsTitle: vue.select_word,
						
                       currentPage: pageNum,
                       pageSize: vue.page.pageSize,
                       total: vue.page.total, 
                    }
                })
                .then(function (data) {
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
                    // console.log(data.data.data.list)
                    vue.tableData =   data.data.data.list.map(list => {
                                        // console.log(list)
                                           let json = {
                                            "goodsPlatform": list.goodsPlatform,
                                            "companyName": list.companyName,
                                            "goodsTitle": list.goodsTitle,
                                            "goodsName": list.goodsName,
                                            "goodsTopStage": list.goodsTopStage,
                                            "topSerialNumber": list.topSerialNumber,
											"goodsId": list.goodsId,
                                        }
                                        return json
                                    })
					// vue.page.pageSize = data.data.data.pageSize;
					vue.page.pageNum = data.data.data.pageNum;
					vue.page.total =  Number(data.data.data.total)
                                    console.log(vue.tableData)
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			platform(value){
				//平台
				console.log(value)
				switch(value) {
					 case 1:
						return "淘宝";
					 case 2:
						return "天猫";
					 case 3:
						return "京东";
					 case 4:
						return "拼多多";
					 default:
						return "未知";
				}
			},
			goodsTopStatus(value){
				// 置顶状态
				switch(value) {
					 case 1:
						return "未置顶";
					 case 2:
						return "置顶";
					 default:
						return "未知";
				}
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
                
                this.editVisible = true;
            },
            handleDelete(goodsId) {
                
				this.$confirm('将要删除该商品, 是否继续?', '警告', {
				  confirmButtonText: '继续',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					get("web/goodsTop/deleteByGoodsId",{
						params: {
							goodsId: goodsId,
						}
					})
					.then((data) => {
					    if (data.data.status == 200) {
					    	this.$message.error(data.data.msg)
							this.getData(1);
					    } else{
					    	this.$message.error(data.data.msg)
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
                 
                 post("web/goodsTop/addGoodsTop",{
                       goodsId: this.form.ID
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
			goodsTop(goodsId,type){
				// type是置顶或者取消置顶
				// id是商品的id
				get("web/goodsTop/updateGoodsTopStageByGoodsId",{
					params: {
						goodsId: goodsId,
						goodsTopStage: type,
					}
				})
				.then((data) => {
				    if (data.data.status == 200) {
						
				    	this.$message.error(data.data.msg)
						this.getData(1);
						
				    } else{
				    	this.$message.error(data.data.msg)
				    }
				    //一个数组用来接收加工后台传过来的数据
				   
				    
				})
				.catch(function (error) {
				    console.log(error);
				});
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
