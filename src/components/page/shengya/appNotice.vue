<template>
    <div class="centCommission">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>app公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-alert
            title="温馨提示："
            type="info"
            effect="dark"
            :closable="false">
        </el-alert>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">添加公告</el-button>
                
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
                <el-table-column prop="noticeTitle" label="公告标题"  >
                </el-table-column>
                <el-table-column prop="noticeUrl" label="公告图片" >
					<!-- <template slot-scope="scope">
					    <img :src="scope.row.noticeUrl+'?'+new Date().getTime()" width="90%" alt="">
					    
					</template> -->
                </el-table-column>
                <el-table-column prop="noticeStartTime" label="公告开始时间">
                </el-table-column>
                <el-table-column prop="noticeEndTime" label="公告结束时间">
                </el-table-column>
				<el-table-column prop="noticeSort" label="公告排序">
				</el-table-column>
				<el-table-column prop="enabled" label="公告启用状态" >
					<template slot-scope="scope">
					    {{enabledStatus(scope.row.enabled)}}
					</template>
				</el-table-column>
                <el-table-column prop="noticeStatus" label="公告状态" >
					<template slot-scope="scope">
					    {{funPictureStatus(scope.row.noticeStatus)}}
					</template>
                </el-table-column>
                
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
						<el-form-item class="label_awarn" label="公告图片:">
							
							<uploader
								dir="test/upload/img"
								v-model="form.noticeUrl"
								@upload-success="handleSuccess"
							></uploader>
						</el-form-item>
							
						<el-form-item class="label_awarn" v-if="form.jumpType == 12" label="商品id" >
							<el-input
							  type="text"
							  placeholder="商品id"
							  v-model="form.itemId">
							</el-input>
						</el-form-item >
							
						<el-form-item class="label_awarn" label="公告排序:" >
							<el-input
							  type="text"
							  placeholder="请输入"
							  v-model="form.noticeSort">
							</el-input>
						</el-form-item >
						
						
						<el-form-item class="label_awarn" label="公告标题:" >
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="form.noticeTitle">
							</el-input>
						</el-form-item >
							
							
						<el-form-item class="label_awarn" label="公告状态:" >
							<label><input v-model="form.enabled" type="radio" value="1" >启用</label>
							<label><input v-model="form.enabled" type="radio" value="0" >禁用</label>
						</el-form-item >
							
						
						<el-form-item class="label_awarn" label="开始结束时间:" >
							<el-date-picker
							      v-model="StartEndTime"
							      type="datetimerange"
							      range-separator="至"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期">
							    </el-date-picker>
						</el-form-item >	
					</el-form-item>
			
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
					noticeUrl:"",
					thumbnailsUrl:"",
					jumpType:"",
					link: "",
					sort: "",
					moduleCode: "",
					linkType: "",
                	itemId: "",
                },
                // 保存一份旧数据，用于判断图片是否进行了修改
                oldForm: {},
				StartEndTime:null,
				
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
				pictureState:[
					{ name: '未使用', value: 1 },
					{ name: '使用', value: 2 },
				],
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
				alert(val);
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
                get("server-admin/appNotice/list",{
                   
                        pageNum:vue.page.pageNum,
                        pageSize: vue.page.pageSize
                   
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
			/* //获取上传图片的参数
			
			dialogClose(){
				console.log(this.$refs)
				this.$refs.upload.clearFiles()
			}, */
			
			funPictureStatus(value){
				//平台
				// console.log(value)
				switch(value) {
					 case 1:
						return "已过期";
					 case 0:
						return "正常";
					 default:
						return "未知";
				}
			},
			enabledStatus(value){
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
						
						id:"",
						enabled:1,
						noticeUrl:"http://qiniuimage.shenggongzi.cn/FjmmVxzQS3vQsvvwEUe7Ofg_b2TO?1584084840146",
						noticeTitle:"",
						noticeBeginTime:"",
						noticeEndTime:"",
						itemId: "",
					}
					this.StartEndTime = null
					
				} else{
					console.log(row)
					this.judge = index;
					this.judgeTitle = "编辑"
					this.form = {
						
						enabled: row.enabled,
						id:row.id,
					    noticeUrl: row.noticeUrl,
					    noticeTitle: row.noticeTitle,
						noticeSort: row.noticeSort,
					}
					this.oldForm = JSON.parse(JSON.stringify(this.form))
					this.dialogImageUrl = row.noticeUrl;
					this.StartEndTime =  [ new Date(Number(new Date(row.noticeStartTime))) , new Date(Number(new Date(row.noticeEndTime)))],
					//this.StartEndTime = [ new Date(Number(new Date(row.noticeBeginTime))) , new Date(Number(new Date(row.noticeEndTime)))]
					console.log(this.StartEndTime)
				}
            },
            handleDelete(index, row) {
                // this.idx = index;
                this.id = row.id;
                this.oldForm = { noticeUrl: row.noticeUrl }
                this.delVisible = true;
            },
            deleteRow() {
				 this.delVisible = false;
                post("sy/appNotice/insertOrUpdate",{
						id: this.id,
						delFlag: 1,
                })
                .then((data) => {
                	if (data.data.status == 200) {

                		// 删除旧图片
						deleteFile(this.oldForm.noticeUrl).then(result => {
							if (!result.success) {
								this.$message.error(result.msg)
							}
						})
                		
                		this.$message.success(data.data.msg);
                		this.getData()
                		
                	} else{
                		this.$message.error(data.data.msg);
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
				if (this.form.noticeUrl == null || this.form.noticeUrl == '') {
					console.log(this.form.noticeUrl)
					this.$message.error("请上传一张图片");
					return "请上传一张图片"
				}
				
				
				if (this.form.noticeSort == null || this.form.noticeSort == ''|| this.form.noticeSort <= 0){
					console.log(this.form.noticeUrl)
					this.$message.error("请输入公告排序并且大于0");
					return "请输入公告排序并且大于0"
				}
				
				if (this.form.noticeTitle == null || this.form.noticeTitle == ''){
					console.log(this.form.noticeTitle)
					this.$message.error("请输入公告标题");
					return "请输入公告标题"
				}
				
				if (this.StartEndTime == null || this.StartEndTime == ''){
					console.log(this.form.noticeUrl)
					this.$message.error("请选择时间");
					return "请选择时间"
				}
				
				
				
				this.editVisible = false;
               console.log(this.form)
				post("sy/appNotice/insertOrUpdate",{
					
					id: this.form.id,
					noticeUrl: this.form.noticeUrl,
					noticeTitle: this.form.noticeTitle,
					enable: this.form.enable,
					noticeSort:this.form.noticeSort,
					noticeBeginTime: this.timeTransition(this.StartEndTime[0]),
					noticeEndTime: this.timeTransition(this.StartEndTime[1]),
					
				})
				.then((data) => {
					if (data.data.status == 200) {

						// 判断图片是否一致，不一致则删除旧图片
						if (this.form.noticeUrl !== this.oldForm.noticeUrl) {
							deleteFile(this.oldForm.noticeUrl).then(result => {
								if (!result.success) {
									this.$message.error(result.msg)
								}
							})
						}

						this.$message.success(data.data.msg);
						this.getData();
						
					} else{
						this.$message.error(data.data.msg);
					}
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			handleSuccess (data) {
				console.log(data)
			},
			handleRemove(file, fileList) {
				//删除的回调函数
				console.log(file);
				this.qiniuimage = null;
				this.form.noticeUrl = null,
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