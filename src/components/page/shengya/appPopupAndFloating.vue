<template>
    <div class="centCommission">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>app首页弹窗和浮窗</el-breadcrumb-item>
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
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">添加弹窗或浮窗</el-button>
                
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
                <el-table-column prop="name" label="公告标题"  >
                </el-table-column>
				<el-table-column prop="type" label="类型" >
					<template slot-scope="scope">
					    {{enabledType(scope.row.type)}}
					</template>
				</el-table-column>
				<el-table-column  prop="popFloatingType" label="弹窗类型" >
					<template slot-scope="scope">
					    {{enabledPopFloatingType(scope.row.type,scope.row.popFloatingType)}}
					</template>
				</el-table-column>
                <el-table-column prop="pictureUrl" label="图片" >
					<template slot-scope="scope">
					 <img :src="scope.row.pictureUrl" width="150" height="150" class="head_pic"/>
					 </template>
                </el-table-column>
                <el-table-column prop="showStartTime" label="展示开始时间">
                </el-table-column>
                <el-table-column prop="showEndTime" label="展示结束时间">
                </el-table-column>
				<el-table-column prop="sort" label="公告排序">
				</el-table-column>
				<el-table-column prop="jumpType" label="跳转类型" >
					<template slot-scope="scope">
					    {{enabledStatus(scope.row.jumpType)}}
					</template>
				</el-table-column>
				<el-table-column prop="jumpLink" label="跳转地址">
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
						<el-form-item class="label_awarn" label="图片:">

							<uploader
								dir="test/upload/img"
								v-model="form.pictureUrl"
								@upload-success="handleSuccess"
							></uploader>
						</el-form-item>
							
						
						<el-form-item class="label_awarn" label="排序:" >
							<el-input
							  type="text"
							  placeholder="请输入"
							  v-model="form.sort">
							</el-input>
						</el-form-item >
							 <el-form-item label="弹窗类型">
							    <el-select v-model="form.popFloatingType" placeholder="请选择" class="goodsPlatform mr10" style="width: 120px;">
							         <el-option :key="itme.value" v-for="itme in platformTypeList" :label="itme.name"
							                   :value="itme.value">{{itme.name}}
							        </el-option>
							    </el-select>
							</el-form-item>
					<el-form-item class="label_awarn" label="跳转类型:" >
						<label><input v-model="form.jumpType" type="radio" value="1" >外部跳转</label>
						<label><input v-model="form.jumpType" type="radio" value="0" >内部跳转</label>
					</el-form-item >
						<el-form-item class="label_awarn" label="跳转地址:" >
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="form.jumpLink">
							</el-input>
						</el-form-item >
						<el-form-item class="label_awarn" label="标题:" >
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="form.name">
							</el-input>
						</el-form-item >
							
							
						<el-form-item class="label_awarn" label="类型:" >
							<label><input v-model="form.type" type="radio" value="1" >浮窗</label>
							<label><input v-model="form.type" type="radio" value="0" >弹窗</label>
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
				platformTypeList:[
				    {name: '未登录弹窗', value: 1},
				    {name: '新人免单', value: 2},
					{name: '首单', value: 3},
				],
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
                this.getData(val);
            },
			
            // 获取数据
            getData(pageNum) {
                let vue = this
                get("server-admin/appPopupAndFloating/list",{
                   params: {
                        pageNum:pageNum,
                        pageSize: vue.page.pageSize,
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
			/* //获取上传图片的参数
			
			dialogClose(){
				console.log(this.$refs)
				this.$refs.upload.clearFiles()
			}, */
			
			
			enabledPopFloatingType(key,value){
				if(key == 0){
					switch(value) {
						 case 1:
							return "未登录弹窗";
						 case 0:
							return "新人免单";
						 default:
							return "首单";
					}
				} else{
					return "浮窗";
				}
				
			},
			enabledType(value){
				switch(value) {
					 case 1:
						return "浮窗";
					 case 0:
						return "弹窗";
					 default:
						return "未知";
				}
			},
			enabledStatus(value){
				switch(value) {
					 case 1:
						return "外部跳转";
					 case 0:
						return "内部跳转";
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
						pictureUrl: "",
						name: "",
						type: "0",
						popFloatingType:"",
						jumpType:"0",
						jumpLink:"",
						showStartTime:"",
						showEndTime:"",
						pictureUrl:"",
						sort:"",
					}
					this.StartEndTime = null
					
				} else{
					console.log(row)
					this.judge = index;
					this.judgeTitle = "编辑"
					this.form = {
						
						id:row.id,
					    pictureUrl: row.pictureUrl,
					    name: row.name,
						type: row.type,
						popFloatingType:row.popFloatingType,
						jumpType:row.jumpType,
						jumpLink:row.jumpLink,
						pictureUrl:row.pictureUrl,
						sort:row.sort,
					}
					this.oldForm = JSON.parse(JSON.stringify(this.form))
					this.dialogImageUrl = row.pictureUrl;
					this.StartEndTime =  [ new Date(Number(new Date(row.showStartTime))) , new Date(Number(new Date(row.showEndTime)))],
					//this.StartEndTime = [ new Date(Number(new Date(row.noticeBeginTime))) , new Date(Number(new Date(row.noticeEndTime)))]
					console.log(this.StartEndTime)
				}
            },
            handleDelete(index, row) {
                // this.idx = index;
                this.id = row.id;
                this.oldForm = { pictureUrl: row.pictureUrl }
                this.delVisible = true;
            },
            deleteRow() {
				 this.delVisible = false;
                post("server-admin/appPopupAndFloating/insertOrUpdate",{
						id: this.id,
						delFlag: 1,
                })
                .then((data) => {
                	if (data.data.status == 200) {

                		// 删除旧图片
						/* deleteFile(this.oldForm.noticeUrl).then(result => {
							if (!result.success) {
								this.$message.error(result.msg)
							}
						}) */
                		
                		this.$message.success("删除成功!");
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
				if (this.form.pictureUrl == null || this.form.pictureUrl == '') {
					console.log(this.form.pictureUrl)
					this.$message.error("请上传一张图片");
					return "请上传一张图片"
				}
				
				if (this.form.name == null || this.form.name == ''){
					console.log(this.form.noticeTitle)
					this.$message.error("请输入标题");
					return "请输入标题"
				}
				
				if (this.StartEndTime == null || this.StartEndTime == ''){
					console.log(this.form.noticeUrl)
					this.$message.error("请选择时间");
					return "请选择时间"
				}
				
				
				
				this.editVisible = false;
               console.log(this.form)
				post("server-admin/appPopupAndFloating/insertOrUpdate",{
					
					id: this.form.id,
					type: this.form.type,
					popFloatingType: this.form.popFloatingType,
					jumpType: this.form.jumpType,
					jumpLink:this.form.jumpLink,
					name:this.form.name,
					pictureUrl:this.form.pictureUrl,
					sort:this.form.sort,
					showStartTime: this.timeTransition(this.StartEndTime[0]),
					showEndTime: this.timeTransition(this.StartEndTime[1]),
					
				})
				.then((data) => {
					if (data.data.status == 200) {

						// 判断图片是否一致，不一致则删除旧图片
						if (this.form.pictureUrl !== this.oldForm.pictureUrl) {
							deleteFile(this.oldForm.pictureUrl).then(result => {
								if (!result.success) {
									this.$message.error(result.msg)
								}
							})
						}

						this.$message.success("操作成功~");
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