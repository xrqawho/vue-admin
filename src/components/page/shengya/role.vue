<!-- 角色 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 角色</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleAdd(1)">添加角色</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" >
                
                <el-table-column prop="roleName" label="角色名称" >
                </el-table-column>
                <el-table-column prop="menus" label="角色权限" >
					<template slot-scope="scope">
					    <el-tag type="info" v-for="itme in scope.row.menus"  >{{itme.menuName}}</el-tag>
					</template>
                </el-table-column>
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        
                        <el-button type="text"  @click="handleEdit(2, scope.row)">编辑</el-button>
                        <el-button type="text"  @click="dleFun(scope.$index, scope.row)">删除</el-button>
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
            <el-form ref="form" :model="form" label-width="90px">
                <!-- <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
                <el-form-item label="角色名称">
                    <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
                </el-form-item>
				
				<el-form-item label="已有权限">
				    <el-tag
				      v-for="tag in tags"
				      :key="tag.name"
				      closable
				      type="info"
					  @close="handleClose(tag)"
					  >
				      {{tag.name}}
				    </el-tag>
				</el-form-item>
				
                <el-form-item label="分 佣 方 案" >
                    <div style="max-height: 250px;
								overflow-x: hidden;
								overflow-y: scroll;">
						<el-tree
						  :data="data2"
						  show-checkbox
						  node-key="id"
						  ref="tree"
						  @check = "treeClick"
						  :props="defaultProps">
						</el-tree>
					</div>
					
                </el-form-item>
				
				

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        
		
		<!-- 类型选择 -->
		<el-dialog title="修改类型" :visible.sync="typeVisible" width="500px" center>
			<div style="text-align: center;">
				<span style="margin: 0 5px;">选择类型</span>
				
				<el-button type="primary" @click="typeUpdate" >确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import { post,get } from '../../../api/index';
    export default {
        name: 'company',
        data() {
            return {
                tableData: [],
                
                multipleSelection: [],
                
				select_type: '',
				//类型修改里面的select的值
                del_list: [],
                
                editVisible: false,
                delVisible: false,
				typeVisible: false,
                form: {
                    name: '',
                    generalizePid: '',
					
                },
                // idx: -1,
                // id: -1,
				page:{
					pageSize:10,
					pageNum: 1,
					total: 0,
				},
				tags: [
				],
				data1: [],
				data2: [],
				defaultProps: {
				    children: 'children',
				    label: 'label',
					pid: 'pid',
				},
				
				 
				
				judge: '',
				roleId: null,
				//需要保存的角色id
				
            }
        },
        created() {
            this.getData();
			this.getJurisdiction()
			
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
                get("back/subUser/findRoleList",{
                    params: {
                        currentPage: pageNum,
                    	pageSize: vue.page.pageSize,
                    	total: vue.page.total,
                    }
                })
                .then(function (data) {
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
					vue.tableData = data.data.data;
					// vue.pageData
					// vue.page.pageSize = data.data.data.pageSize;
					vue.page.pageNum = data.data.data.pageNum;
					vue.page.total =  Number(data.data.data.total)
					// console.log(vue.tableData)
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			handleClose(tag){
				this.tags.splice(this.tags.indexOf(tag), 1);
				console.log(this.tags)
				
				let list  = this.tags.map(msg => {
					return {
						id:msg.id,
						label: msg.name,
					}
				})
				setTimeout(() => {
					this.$refs.tree.setCheckedNodes(list);
				},200)
				// console.log()
			},
			processingData(data){
				//处理数据一级
			this.data1 = data.map(msg => {
						// console.log(msg)
						// console.log(msg.menuUrl)
						let json = eval('(' + msg.menuUrl + ')');//字符串转换json
						// console.log(json)
						if ('children' in json) {

							return {
								id:msg.id,
								label:msg.menuName,
								children: this.processingChildrenData(json.children),
							};
						} else{
							return {
								id:msg.id,
								label:msg.menuName,
							};
						}
						
					})
			},
			processingChildrenData(data){
				//处理数据子集
				return	data.map(msg => {
							let json = eval('(' + msg.menuUrl + ')');//字符串转换json
							console.log(json)
							if (json) {
								if ('children' in json) {
									return {
										id:msg.id,
										label:msg.text,
										children: this.processingChildrenData(json.children),
									};
								} else{
									return {
										id:msg.id,
										label:msg.text,
									};
								}
							} else{
								return {
									id:msg.id,
									label:msg.text,
								};
							}

						})
			},
			wipeOutRepetition(list){
				
				// 便利数据，组装数据
				let listChildren = [] //所有子集
				for (let i = 0; i < list.length; i++) {
					if ('children' in list[i]) {
						console.log(list[i].children)
						for (let y = 0; y < list[i].children.length; y++) {
							listChildren.push(list[i].children[y])	
						}
					} else{
						
					}
				}
				console.log(listChildren)
				let newList = []//通过子集得到重复的数据
				for (let i = 0; i < list.length; i++) {
					if ('children' in list[i]) {
						
					} else{
						for (let y = 0; y < listChildren.length; y++) {
							if (listChildren[y].label == list[i].label) {
								newList.push(list[i])
							}
						}
					}
				}
				
				console.log(newList)
				let inTheEndList = list//通过子集数据，和重复数据比对，得到最终数据
				for (let i = 0; i < inTheEndList.length; i++) {
					
					if ('children' in inTheEndList[i]) {
						// console.log(inTheEndList[i])
						for (let x = 0; x < inTheEndList[i].children.length; x++) {
							for (let y = 0; y < newList.length; y++) {
								// console.log(newList[y].label)
								if (newList[y].label == inTheEndList[i].children[x].label) {
									inTheEndList[i].children[x].id = newList[y].id
									inTheEndList[i].children[x].pid = inTheEndList[i].id
								} 
							}
							
						}
						
					}else{
						for (let y = 0; y < newList.length; y++) {
							
							
							if (inTheEndList[i].label == newList[y].label) {
								inTheEndList.splice(i, 1);
							}
						}
					}
				}
				
				console.log(inTheEndList)
				this.data2 = inTheEndList
				
			},
			handleAdd(){
				this.editVisible = true;
				this.judge = 1,
				setTimeout(() => {
					this.$refs.tree.setCheckedNodes([]);
				},200)
				this.tags = [];
				this.form.name = null;
				
			},
            handleEdit(index, row) {
				
				//弹出层，编辑
				console.log(row)
				this.editVisible = true;
				this.judge = 2;
				this.roleId = row.id;
				this.form.name = row.roleName
				let tags = []
				for (let i = 0; i < row.menus.length; i++) {
					let json = {
						name: row.menus[i].menuName,
						id: row.menus[i].id,
					}
					// console.log(json)
					tags.push(json)
				}
				this.tags = tags
				
				let	tree = [];
				
				for (let i = 0; i < tags.length; i++) {
					let json = {
						label: tags[i].name,
						id: tags[i].id,
					}
					// console.log(json)
					tree.push(json)
				}
				console.log(this.$refs)
				setTimeout(() => {
					this.$refs.tree.setCheckedNodes(tree);
				},200)
				
					      
				
            },
			treeClick(clickEl,treeList,c){
				// 树形结构的点击回调
				console.log(clickEl)
				console.log(treeList)
				let treeChildrenList = treeList.checkedNodes;
				let treeArr = [];
				for (let i = 0; i < treeChildrenList.length; i++) {
					if ('children' in treeChildrenList[i]) {
						console.log(treeChildrenList[i].id)
						treeArr.push(treeChildrenList[i].id)
						
						
					}
				}
				let newTreeChildrenList = []
				for (let x = 0; x < treeChildrenList.length; x++) {
					if (treeArr.indexOf(treeChildrenList[x].pid) != -1){
						// treeChildrenList.splice(x, 1);
					}else{
						newTreeChildrenList.push(treeChildrenList[x])
					}
				}
				console.log(newTreeChildrenList)
				this.tags =	newTreeChildrenList.map(list => {
					return {
						name:list.label,
						id: list.id,
					}
					
				})
				console.log(this.tags)
			},
			getJurisdiction(){
				//获取权限的数据
				get("back/subUser/getMenuList",{
				    params: {
						
				    }
				}).then((data) => {
				    this.processingData(data.data.data)
					this.wipeOutRepetition(this.data1)
					console.log(this.data1)
				    
				}).catch(function (error) {
				    console.log(error);
				});
			},
            dleFun(index, row) {
				//删除方法
				this.$confirm('删除该角色, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							  get("back/subUser/delRole",{
								  params: {
									id:row.id
								  }
							  }).then((data) => {
								  if (data.data.status == 200) {
								  	this.$message.success(data.data.data);
								  	this.getData()
								  	
								  } else{
								  	this.$message.error(data.data.data);
								  }
								  
							  }).catch(function (error) {
								  console.log(error);
							  });
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          });          
				        });
			},
            // 保存编辑
            saveEdit() {
				
				let ids = [];
				for (let i = 0; i < this.tags.length; i++) {
					this.tags[i]
					ids.push(this.tags[i].id)
				}
				this.editVisible = false;
				if (this.judge == 2) {
					get("back/subUser/saveRole",{
						params:{
							id:this.roleId,
							roleName: this.form.name,
							ids: String(ids),
						}
					})
					.then( (data) => {
						console.log(data)
						if (data.data.status == 200) {
							this.$message.success(data.data.msg);
							this.getData()
							
						} else{
							this.$message.error(data.data.msg);
						}
					})
					.catch(function (error) {
					    console.log(error);
					});
				} else{
					get("back/subUser/saveRole",{
						params:{
							
							roleName: this.form.name,
							ids: String(ids),
						}
					})
					.then( (data) => {
						console.log(data)
						if (data.data.status == 200) {
							this.$message.success(data.data.msg);
							this.getData()
							this.editVisible = false;
						} else{
							this.$message.error(data.data.msg);
						}
					})
					.catch(function (error) {
					    console.log(error);
					});
				}
				
				
                
            },
			
			
			typeEdit(row) {
				//给select_type赋值
				//给companyType_id赋值
				//打开修改类型dialog
				console.log(row.type)
				this.select_type = row.type;
				this.typeVisible = true;
				this.companyType_id = row.companyId
			},
			
			typeUpdate(){
				post("web/find/commpany/update/by/type",{
					companyId: this.companyType_id,
					type: this.select_type,
				})
				.then( (data) => {
					console.log(data)
					if (data.data.status == 200) {
						this.$message.success("修改成功");
						this.getData()
						this.typeVisible = false;
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


