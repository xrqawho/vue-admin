<!-- 子账号管理 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 子账号管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">添加子账户</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" >
                
                <el-table-column prop="username" label="登录名" width="150">
                </el-table-column>
                <el-table-column prop="nickName" label="用户昵称" width="120">
                </el-table-column>
                <el-table-column prop="role.roleName" label="用户角色" >
                </el-table-column>
                <el-table-column prop="companyName" label="所属公司" >
                </el-table-column>
                
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(2, scope.row)"   >编辑</el-button>
                        <el-button type="text" @click="typeEdit(scope.row)" >修改密码</el-button>
                        <el-button type="text"  @click="dle(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="page.total" :page-size = "page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible"  width="30%">
			<el-form ref="form" :model="form"  :rules="rules" label-width="90px">
                <el-form-item label="登录账号">
                    <el-input v-model="form.username" placeholder="请输入账号"></el-input>
                </el-form-item>
				
                <el-form-item label="用户昵称">
                    <el-input v-model="form.nickName"></el-input>
                </el-form-item>
				
				<el-form-item v-if="judge == 1" label="用户密码" prop="password">
				    <el-input v-model="form.password" type="password"></el-input>
				</el-form-item>
				
				<el-form-item v-if="judge == 1" label="确认密码" prop="password1">
				    <el-input v-model="form.password1" type="password"></el-input>
				</el-form-item>
				
				<el-form-item label="选择子公司">
				   <el-select v-model="form.companyId" placeholder="请选择">
						<el-option
						  v-for="item in companyList"
						  :key="item.companyId"
						  :label="item.compayName"
						  :value="item.companyId">
						</el-option>
				   </el-select>
				</el-form-item>
				
				<el-form-item label="选择角色">
					<el-select v-model="form.roleId" placeholder="请选择">
						<el-option
						  v-for="item in roleList"
						  :key="item.id"
						  :label="item.roleName"
						  :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        
		
		<!-- 类型选择  -->
		<el-dialog title="修改密码" :visible.sync="typeVisible" width="500px" center>
			<div style="text-align: center;">
				
					<el-form ref="formPassword" :model="formPassword"  :rules="rules" label-width="90px">
					
					<el-form-item  label="新密码" prop="passwordA">
					    <el-input v-model="formPassword.password" type="password"></el-input>
					</el-form-item>
					
					<el-form-item  label="确认密码" prop="password1A">
					    <el-input v-model="formPassword.password1" type="password"></el-input>
					</el-form-item>

				
				</el-form>
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
				var checkAge = (rule, value, callback) => {
					console.log(rule)
					console.log(value)
					console.log(callback)
						if (!value) {
						  return callback(new Error('年龄不能为空'));
						}
			        setTimeout(() => {
						var pattern = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);       //只能为英文
						console.log()
						if (!pattern.test(value) ) {
							callback(new Error('只能是英文和数字'));
						} else {
			            if (value < 18) {
			              callback(new Error('必须年满18岁'));
			            } else {
			              callback();
			            }
			          }
			        }, 1000);
			      };
			      var validatePass = (rule, value, callback) => {
			        if (value === '') {
			          callback(new Error('请输入密码'));
			        } else {
			          if (this.form.password !== '') {
			            this.$refs.form.validateField('checkPass');
			          }
			          callback();
			        }
			      };
			      var validatePass2 = (rule, value, callback) => {
			        if (value === '') {
			          callback(new Error('请再次输入密码'));
			        } else if (value !== this.form.password) {
			          callback(new Error('两次输入密码不一致!'));
			        } else {
			          callback();
			        }
			      };
				  
				  var password = (rule, value, callback) => {
				    if (value === '') {
				      callback(new Error('请输入密码'));
				    } else {
				      if (this.formPassword.password !== '') {
				        this.$refs.formPassword.validateField('password');
				      }
				      callback();
				    }
				  };
				  var password1 = (rule, value, callback) => {
				    if (value === '') {
				      callback(new Error('请再次输入密码'));
					  console.log(this.formPassword.password)
					  console.log(value)
				    } else if (this.formPassword.password1 !== this.formPassword.password) {
				      callback(new Error('两次输入密码不一致!'));
				    } else {
				      callback();
				    }
				  };
            return {
                tableData: [],
                
                multipleSelection: [],
                select_cate: '',
                select_word: '',
				select_type: '',
				//类型修改里面的select的值
                del_list: [],
                
                editVisible: false,
                delVisible: false,
				typeVisible: false,
                form: {
					password: '',
					password1: '',
					nickName: '',
					username: '',
					roleId: '',
					companyId: '',
                },
				formPassword: {
					password: '',
					password1: '',
					
				},
                // idx: -1,
                // id: -1,
				page:{
					pageSize:10,
					pageNum: 1,
					total: 0,
				},
				
				companyList:[],
				childrenCompany: '',
				
				roleList: [],
				role: '',
				password1: '',
				rules: {
				  password: [
					{ validator: validatePass, trigger: 'blur' }
				  ],
				  password1: [
					{ validator: validatePass2, trigger: 'blur' }
				  ],
				  username: [
					{ validator: checkAge, trigger: 'blur' }
				  ],
				  passwordA: [
				  	{ validator: password, trigger: 'blur' }
				  ],
				  password1A: [
				  	{ validator: password1, trigger: 'blur' }
				  ],
				},
				judge:1,
				EditId: '',
				changePasswordId:'',
            }
        },
        created() {
            this.getData(1);
			this.getDropDownData();
			this.getRoleData()
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
                get("back/subUser/findAllByUserId",{
                    params: {
						type: vue.select_cate,
						keyword: vue.select_word,
						
                        pageNum: pageNum,
                    	pageSize: vue.page.pageSize,
                    	total: vue.page.total,
                    }
                })
                .then(function (data) {
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
					console.log(data.data.data)
                    vue.tableData = data.data.data.records
					// vue.pageData
					// vue.page.pageSize = data.data.data.pageSize;
					vue.page.pageNum = Number(data.data.data.current);
					vue.page.total =  Number(data.data.data.total)
					
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			 getDropDownData() {
			    //请求下拉框的数据
			    let vue = this
			    get("companys/all/list",{
					params: {
						
					}
			    })
			    .then( (data) => {
					this.companyList =	data.data
				})
			    .catch(function (error) {
			        console.log(error);
				});
			},
			getRoleData() {
				//请求下拉框的数据
				let vue = this
				get("back/subUser/findRoleList",{
					params: {
						
					}
				})
				.then( (data) => {
					this.roleList =	data.data.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			
			
			timeTransition(beginTime){
				//转换时间
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
				//打开配置/编辑弹出层，
				//再打开的同时获取数据
				this.getRoleData()
				this.getDropDownData()
				if (index == 1) {
					this.judge = index;
					this.form = {
					   password: '',
					   password1: '',
					   nickName: '',
					   username: '',
					   roleId: '',
					   companyId: '', 
					}
				} else{
					this.judge = index;
					this.EditId = row.id;
					this.form = {
					    nickName: row.nickName,
					    username: row.username,
					    roleId: row.roleId,
					    companyId: row.companyId, 
					}
					
				}
                
                this.editVisible = true;
            },
			dle(row){
				this.$confirm('删除本账号, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          get("back/subUser/delSubUser",{
				          	params:{
				          		id:row.id,
				          	}
				          	
				          })
				          .then( (data) => {
				          	console.log(data)
				          	if (data.data.status == 200) {
				          		console.log(data.data.data)
				          		this.$message.success(data.data.data);
				          		this.getData()
				          		this.editVisible = false;
				          	} else{
				          		this.$message.error(data.data.data);
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
			
            
            // 保存编辑
            saveEdit() {
				if (this.judge == 1) {
					//新增
					this.$refs['form'].validate((valid) => {
					  if (valid) {
						get("back/subUser/register",{
							params:{
								password: this.form.password,
								nickName: this.form.nickName,
								username: this.form.username,
								roleId: this.form.roleId,
								companyId: this.form.companyId,
							}
							
						})
						.then( (data) => {
							console.log(data)
							if (data.data.status == 200) {
								console.log(data.data.data)
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
					  } else {
						console.log('error submit!!');
						
						return false;
					  }
					});
				} else{
					//编辑
					get("back/subUser/update",{
						params:{
							id: this.EditId,
							nickName: this.form.nickName,
							username: this.form.username,
							roleId: this.form.roleId,
							companyId: this.form.companyId,
						}
					})
					.then( (data) => {
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
				console.log(row)
				
				this.typeVisible = true;
				this.changePasswordId = row.id;
				this.formPassword = {
					password: null,
					password1: null,
				}
			},
			
			typeUpdate(){
				this.typeVisible = false;
				this.$refs['formPassword'].validate((valid) => {
				  if (valid) {
					get("back/subUser/changePassword",{
						params:{
							password: this.formPassword.password,
							id: this.changePasswordId,
						}
						
					})
					.then( (data) => {
						if (data.data.status == 200) {
							console.log(data.data.data)
							this.$message.success(data.data.msg);
							this.getData()
						} else{
							this.$message.error(data.data.msg);
						}
					})
					.catch(function (error) {
					    console.log(error);
					});
				  } else {
					console.log('error submit!!');
					this.$message.error("验证失败");
					return false;
				  }
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

