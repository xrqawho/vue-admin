<template>
    <div class="centCommission">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>兑换红包模板列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">添加兑换红包</el-button>
                
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
                <el-table-column prop="id" label="ID"  >
                </el-table-column>
                <el-table-column prop="conchRedPackageUrl" label="图片" >
					<template slot-scope="scope">
					    <img :src="scope.row.conchRedPackageUrl+'?'+new Date().getTime()" width="90%" alt="">
					</template>
                </el-table-column>
				<el-table-column prop="goldCoin" label="金币"  >
				</el-table-column>
                <el-table-column prop="conchRedPackageMoney" label="红包金额">
                </el-table-column>
				<el-table-column prop="orderMoney" label="使用红包条件金额">
				</el-table-column>
				<el-table-column prop="sort" label="排序">
				</el-table-column>
				<el-table-column prop="remark" label="备注" width="200px" height = "200px">
				</el-table-column>
				<el-table-column prop="createDate" label="创建时间">
					<!-- <template slot-scope="scope">
					    {{formartDate(scope.row.createDate)}}
					</template> -->
				</el-table-column>
				<el-table-column prop="updateDate" label="修改时间">
					<!-- <template slot-scope="scope">
					    {{formartDate(scope.row.updateDate)}}
					</template> -->
				</el-table-column>
               <!-- <el-table-column prop="enable" label="公告状态" >
					<template slot-scope="scope">
					    {{funPictureStatus(scope.row.enable)}}
					</template>
                </el-table-column> -->
                
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text"  @click="handleEdit(2, scope.row)">编辑</el-button>
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
			<el-dialog :title="judgeTitle"
						:visible.sync="editVisible"
						 width="40%">
					<el-form :model="form"
							label-width="140px"
							style="width: 70%;margin: 0 auto;">
					<el-form-item class="label_awarn" label="图片:">
					
						<uploader
							dir="test/upload/img"
							v-model="form.conchRedPackageUrl"
							@upload-success="handleSuccess"
						></uploader>
					</el-form-item>
							
						<!-- <el-form-item class="label_awarn" v-if="form.jumpType == 12" label="商品id" >
							<el-input
							  type="text"
							  placeholder="商品id"
							  v-model="form.itemId">
							</el-input>
						</el-form-item > -->
							
						<el-form-item class="label_awarn" label="金币:" >
							<el-input
							  type="text"
							  placeholder="请输入"
							  v-model="form.goldCoin">
							</el-input>
						</el-form-item >
						<el-form-item class="label_awarn" label="红包金额:" >
							<el-input
							  type="text"
							  placeholder="请输入 单位元"
							  v-model="form.conchRedPackageMoney">
							</el-input>
						</el-form-item >
							<el-form-item class="label_awarn" label="红包条件金额:" >
								<el-input
								  type="text"
								  placeholder="请输入 单位元"
								  v-model="form.orderMoney">
								</el-input>
							</el-form-item >
						<el-form-item class="label_awarn" label="排序:" >
							<el-input
							  type="text"
							  placeholder="请输入"
							  v-model="form.sort">
							</el-input>
						</el-form-item >
						<el-form-item class="label_awarn" label="备注:" >
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="form.remark">
							</el-input>
						</el-form-item >
							
							
						<!-- <el-form-item class="label_awarn" label="公告状态:" >
							<label><input v-model="form.enable" type="radio" value="1" >启用</label>
							<label><input v-model="form.enable" type="radio" value="0" >禁用</label>
						</el-form-item >
			 -->
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</el-dialog>
        
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
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
	import { deleteFile } from '@/api/OssUpload'
	import Uploader from '@/components/common/Uploader'
   import { post,get } from '../../../api/index';
    export default {
        name: 'centCommission',
		 components: {
			Uploader
		},
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
				dialogVisible: false,//图片放大
				dialogImageUrl: "",//图片放大的url
				
                form: {
					
                    goodsPictureUrl: null,
                	pictureDescription: "",
					picType:"",
					pictureStatus: "",
					// companyId: "",
					id:"",
					redPackageUrl:"",
					thumbnailsUrl:"",
					jumpType:"",
					link: "",
					sort: "",
					moduleCode: "",
					linkType: "",
                	itemId: "",
                },
				StartEndTime:null,
				//上传图片获取的参数
				imgToken:null,//token
				imgSite:null,//site七牛云需要拼接的url
				imgUpsite:null,//上传图片需要的地址
				qiniu:{
					token:null,
				},
				
				fileListLength:0,//图片文件列表的长度
				page:{
					pageSize:20,
					pageNum: 1,
					total: 0,
				},
                idx: -1,
                id: -1,
				judge: "",
				judgeTitle: "新增",
				list:[],
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
                get("server-admin/admin/conchGold/list",{
						 params: {
                        pageNum:pageNum,
                        pageSize: vue.page.pageSize,
                        total: vue.page.total, 
						}
                   
                })
                .then(function (data) {
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
                    console.log(data.data.data.list)
					vue.tableData =   data.data.data.list
					// vue.page.pageSize = data.data.data.pageSize;
					vue.page.pageNum = data.data.data.pageNum;
					
					vue.page.total =  Number(data.data.data.total)
					console.log(vue.tableData)
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
			/* dialogClose(){
				console.log(this.$refs)
				this.$refs.upload.clearFiles()
			}, */
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
			funPictureStatus(value){
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
                
				this.qiniuimage = null;
                this.editVisible = true;
				
				if(this.$refs.upload){
					if (this.$refs.upload.fileList.length == 0) {
						let upload = document.getElementsByClassName("el-upload--picture-card");
						upload[0].style.display = "inline-block";
					}else{
						this.$refs.upload.clearFiles()
						let upload = document.getElementsByClassName("el-upload--picture-card");
						upload[0].style.display = "inline-block";
					}
				}
				
				
				if (index == 1) {
					this.judge = index;
					this.judgeTitle = "新增"
					this.form = {
						
						goldCoin: "",
						id:"",
						conchRedPackageUrl: "",
						conchRedPackageMoney: "",
						sort: "",
						remark: "",
						orderMoney:"",
					}
					this.StartEndTime = null
					
				} else{
					console.log(row)
					this.judge = index;
					this.judgeTitle = "编辑"
					console.log(row.goodsPictureUrl)
					this.form = {
						goldCoin: row.goldCoin,
						id:row.id,
					    conchRedPackageUrl: row.conchRedPackageUrl,
					    conchRedPackageMoney: row.conchRedPackageMoney,
						sort: row.sort,
						remark: row.remark,
						orderMoney:row.orderMoney,
					}
					this.dialogImageUrl = row.redPackageUrl;
					//this.StartEndTime = [ new Date(Number(new Date(row.noticeBeginTime))) , new Date(Number(new Date(row.noticeEndTime)))]
				}
            },
            handleDelete(index, row) {
                // this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
            deleteRow() {
				 this.delVisible = false;
                post("server-admin/admin/conchGold/insertOrUpdate",{
						id: this.id,
						delFlag: 1,
                })
                .then((data) => {
                	if (data.status == 200) {
                		this.$message.success("删除成功");
                		this.getData()
                		
                	} else{
                		this.$message.error(data.msg);
                	}
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			
			
            // 保存编辑
            saveEdit() {
                
				// 判断接口参数是否正确
				if (this.form.conchRedPackageUrl == null || this.form.conchRedPackageUrl == '') {
					this.$message.error("请上传一张图片");
					return "请上传一张图片"
				}
				
				
				if (this.form.sort == null || this.form.sort == ''|| this.form.sort < 0){
					this.$message.error("请输入排序大于等于0");
					return "请输入排序大于等于0"
				}
				
				if (this.form.conchRedPackageMoney == null || this.form.conchRedPackageMoney == ''){
					console.log(this.form.redPackageMoney)
					this.$message.error("请输入红包金额");
					return "请输入红包金额"
				}
				if (this.form.orderMoney == null || this.form.orderMoney == ''){
					this.$message.error("请输入红包条件金额");
					return "请输入红包条件金额"
				}
				
				this.editVisible = false;
               console.log(this.form)
				post("server-admin/admin/conchGold/insertOrUpdate",{
					
					id: this.form.id,
					goldCoin: this.form.goldCoin,
					conchRedPackageUrl: this.form.conchRedPackageUrl,
					remark: this.form.remark,
					conchRedPackageMoney: this.form.conchRedPackageMoney,
					sort: this.form.sort,
					orderMoney:this.form.orderMoney,
					delFlag:0
					
				})
				.then((data) => {
					if (data.status == 200) {
						this.$message.success("操作成功");
						this.getData();
						
					} else{
						this.$message.error(data.msg);
					}
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			
			//上传图片
			handleSuccess(response, file, fileList){
				//成功的回调函数
				console.log(response.key)
				this.qiniuimage = this.imgSite +"/"+ response.key
				this.form.redPackageUrl = this.imgSite +"/"+ response.key
				this.form.goodsPictureUrl = null
				if (fileList.length == 1) {
					let upload = document.getElementsByClassName("el-upload--picture-card")
					upload[0].style.display = "none"
				}
			},
			handleRemove(file, fileList) {
				//删除的回调函数
				console.log(file);
				this.form.redPackageUrl = null,
				this.$refs.upload.clearFiles()
				if (fileList.length == 0) {
					let upload = document.getElementsByClassName("el-upload--picture-card");
					upload[0].style.display = "inline-block";
					this.fileListLength = fileList.length;
				}
				
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
			handlePictureCardPreview(file) {
				//放大图片的钩子
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
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
    .el-alert--info.is-dark{
        margin: 0 0 18px 0;
    }
</style>

<style>
	.label_awarn > .el-form-item__label::before {
	display: inline-block;
	margin-right: 4px;
	color: #f5222d;
	font-size: 14px;
	font-family: SimSun, sans-serif;
	line-height: 1;
	content: '*';
	}
</style>