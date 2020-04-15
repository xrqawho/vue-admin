<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 公司设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit()">添加配置</el-button>
                使用状态：
                <el-select v-model="select_cate" placeholder="请选择" class="handle-select mr10">
                    <el-option v-for="item in companyType" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="请输入公司名字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" >
                
                <el-table-column prop="compayName" label="公司昵称" sortable width="150">
                </el-table-column>
                <el-table-column prop="inviteCode" label="邀请码" width="120">
                </el-table-column>
                <el-table-column prop="common" label="普通佣金分佣" >
                </el-table-column>
                <el-table-column prop="address" label="杀熟佣金分佣" >
                </el-table-column>
                <el-table-column prop="taobaoName" label="联盟方案" >
                </el-table-column>
                <el-table-column prop="type" label="类型" >
					<template slot-scope="scope">
						<span v-if="scope.row.type == 2">分公司</span>
						<span v-else="scope.row.type == 1">总公司</span>
					</template>
                </el-table-column>
                <el-table-column prop="time" label="创建时间" >
					<template slot-scope="scope">
						{{timeTransition(scope.row.time)}}
					</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text"  @click="typeEdit(scope.row)" >类型</el-button>
                        <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">配置</el-button>
                        <el-button type="text"  @click="getLink(scope.$index, scope.row)">生成链接</el-button>
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
                <el-form-item label="公 司 昵 称">
                    <el-input v-model="form.name" placeholder="请输入公司昵称"></el-input>
                </el-form-item>
				
                <el-form-item label="分 佣 方 案">
                    <el-select v-model="shareTheMoneyPlan" placeholder="请选择">
						<el-option
						  v-for="item in shareTheMoneyPlanList"
						  :key="item.generalFeeSchemeId"
						  :label="item.schemeName"
						  :value="item.generalFeeSchemeId">
						</el-option>
					</el-select>
                </el-form-item>
				
				<el-form-item label="杀 熟 方 案">
				    <el-select v-model="KillCookedPlan" placeholder="请选择">
				    	<el-option
				    	  v-for="item in KillCookedPlanList"
				    	  :key="item.orderFeeSchemeId"
				    	  :label="item.schemeName"
				    	  :value="item.orderFeeSchemeId">
				    	</el-option>
				    </el-select>
				</el-form-item>
				
				<el-form-item label="淘 宝 账 号">
				    <el-select v-model="TaobaoNumber" placeholder="请选择">
				    	<el-option
				    	  v-for="item in TaobaoNumberList"
				    	  :key="item.id"
				    	  :label="item.taobaoName"
				    	  :value="item.id">
				    	</el-option>
				    </el-select>
				</el-form-item>
				
				<el-form-item label="联盟推广位">
				    <el-input v-model="form.generalizePid"></el-input>
				</el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 链接提示框 -->
        <el-dialog title="" :visible.sync="delVisible" width="500px" center>
            <h3>长链接为：</h3>
			
			<div>{{longLink}}</div>
			<br>
			<h3>短链接为：</h3>
			
			<div>{{shortLink}}</div>
        </el-dialog>
		
		<!-- 类型选择 -->
		<el-dialog title="修改类型" :visible.sync="typeVisible" width="500px" center>
			<div style="text-align: center;">
				<span style="margin: 0 5px;">选择类型</span>
				<el-select v-model="select_type" placeholder="请选择" class="handle-select mr10">
					<el-option v-for="item in companyType" :key="item.value" :label="item.name" :value="item.value"></el-option>
				</el-select>
				<el-button type="primary" @click="typeUpdate" >确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    import { post,get } from '../../api/index';
    export default {
        name: 'company',
        data() {
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
				longLink: null,
				//长连接
				shortLink: null,
				//短链接
				shareTheMoneyPlanList: [],
				//分佣方案列表
				KillCookedPlanList: [],
				//杀熟方案列表
				TaobaoNumberList: [],
				//淘宝账号列表
				shareTheMoneyPlan: "",
				//分佣方案
				KillCookedPlan: "",
				//杀熟方案
				TaobaoNumber: "",
				//淘宝账号
				companyId: "",
				//公司id
				companyType: [ //公司类型的列表数据
					{
					name: "全部",
					value: 0,
					},
					{
					name: "总公司",
					value: 1,
					},{
					name: "分公司",
					value: 2,
					},
				],
				companyType_id: null,
				//需要类型修改的公司id
				
            }
        },
        created() {
            this.getData();
			this.getDropDownData();
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
                get("web/find/commpany/list",{
                    params: {
						type: vue.select_cate,
						keyword: vue.select_word,
						
                        currentPage: pageNum,
                    	pageSize: vue.page.pageSize,
                    	total: vue.page.total,
                    }
                })
                .then(function (data) {
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
                    vue.tableData = data.data.data.list.map(list => {
                                        // console.log(list)
										let json
										
										if (list.generalFeeScheme) {
											 json = {
											    "compayName":list.compayName,
											    "inviteCode":list.inviteCode,
											    "common":list.generalFeeScheme.schemeName,
											    "address":vue.ParametersToEmpty(list.orderFeeScheme),
											    "taobaoName":list.taoBaoScheme.taobaoName,
											    "type":list.type,
											    "time":list.upadateTime,
												"companyId" :list.companyId,
											}
										} else{
											json = {
											    "compayName":list.compayName,
											    "inviteCode":list.inviteCode,
											    "common":null,
											    "address":vue.ParametersToEmpty(list.orderFeeScheme),
											    "taobaoName":list.taoBaoScheme.taobaoName,
											    "type":list.type,
											    "time":list.upadateTime,
												"companyId" :list.companyId,
											}
										}
										
                                        
                                        return json
                                    })
									
								// vue.pageData
								// vue.page.pageSize = data.data.data.pageSize;
								vue.page.pageNum = data.data.data.pageNum;
								vue.page.total =  Number(data.data.data.total)
                                    console.log(vue.tableData)
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			
			ParametersToEmpty(parame){
				if (parame) {
					return parame.schemeName
				} else{
					return ""
				}
			},
			getDropDownData() {
			    //请求下拉框的数据
			    let vue = this
			    get("web/find/commpany/three/list",{
			        params: {
						
			        }
			    })
			    .then( (data) => {
			        console.log(data.data.data)
					this.shareTheMoneyPlanList = data.data.data.generalFeeList;
					this.KillCookedPlanList = data.data.data.orderFeelist;
					this.TaobaoNumberList = data.data.data.taoBaoPlanList;
					
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
				if (row) {
					
					get("web/find/commpany",{
					    params: {
							companyId :row.companyId,
					    }
					}).then((data) => {
					    this.form = {
					       name: data.data.data.compayName,
						   generalizePid: data.data.data.generalizePid,
						   
					   }
					   this.shareTheMoneyPlan = data.data.data.generalFeeScheme ? data.data.data.generalFeeScheme.generalFeeSchemeId:null;
					   this.KillCookedPlan = data.data.data.orderFeeScheme ? data.data.data.orderFeeScheme.orderFeeSchemeId:null;
					   this.TaobaoNumber = data.data.data.taoBaoScheme.id ? data.data.data.taoBaoScheme.id:null;
					   console.log(data.data.data)
					   this.companyId = data.data.data.companyId;
					    
					}).catch(function (error) {
					    console.log(error);
					});
				} else{
					this.form = {
					    name: null,
						generalizePid: null,
					}
					this.shareTheMoneyPlan = null
					this.KillCookedPlan = null;
					this.TaobaoNumber = null;
					this.companyId = null;
				}
                
                this.editVisible = true;
            },
			
			
			
            getLink(index, row) {
				//获取连接
				let vue = this
				get("web/find/commpany/getInviteCodeUrl",{
				    params: {
						companyId :row.companyId,
				    }
				}).then((data) => {
				   
				   this.longLink = data.data.data.redirectUrl;
				   this.shortLink = data.data.data.shorUrl;
				    
				}).catch(function (error) {
				    console.log(error);
				});
                this.delVisible = true;
            },
            
            // 保存编辑
            saveEdit() {
				let param = {
					
					compayName: this.form.name,
					generalFeeScheme: this.shareTheMoneyPlan,
					generalizePid: this.form.generalizePid,
					orderFeeScheme: this.KillCookedPlan,
					taoBaoScheme: this.TaobaoNumber,
				}
				if (this.companyId) {
					param.companyId = this.companyId
				}
                post("web/find/commpany/save",param)
                .then( (data) => {
					console.log(data)
					if (data.data.status == 200) {
						console.log(data.data.data)
						this.$message.success(data.data.data);
						this.getData()
						this.editVisible = false;
					} else{
						this.$message.error(data.data.msg);
					}
                })
                .catch(function (error) {
                    console.log(error);
                });
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
