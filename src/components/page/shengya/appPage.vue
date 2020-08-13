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
			    条件筛选 服务：
			    <el-select v-model="select_cate" placeholder="请选择服务" class="handle-select mr10">
					 <el-option key="3" label="全部" value=""></el-option>
			        <el-option key="0" label="未使用" value="0"></el-option>
					<el-option key="1" label="使用中" value="1"></el-option>
					<el-option key="2" label="已被封" value="2"></el-option>
			        <!-- <el-option key="2" label="总公司" value="总公司"></el-option> -->
			    </el-select>
			    <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
			</div>
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">添加公告</el-button>
                
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
                <el-table-column prop="id" label="ID"  >
                </el-table-column>
				<el-table-column prop="shareUrl" label="域名"  >
				</el-table-column>
                <el-table-column prop="remark" label="备注说明">
                </el-table-column>
				<el-table-column prop="shareType" label="分享类型" >
					<template slot-scope="scope">
					    {{enabledStatus(scope.row.shareType)}}
					</template>
				</el-table-column>
				<el-table-column prop="useStatus" label="使用状态" >
					<template slot-scope="scope">
					    {{funPictureStatus(scope.row.useStatus)}}
					</template>
				</el-table-column>
                <el-table-column prop="startTime" label="使用开始时间">
                </el-table-column>
				<el-table-column prop="endTime" label="使用结束时间">
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
							
						<el-form-item class="label_awarn" label="域名:" >
							<el-input
							  type="text"
							  placeholder="请输入"
							  v-model="form.shareUrl">
							</el-input>
						</el-form-item >
						
						
						<el-form-item class="label_awarn" label="备注:" >
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="remark"
							  v-model="form.remark">
							</el-input>
						</el-form-item >
							<el-form-item label="分享类型">
							    <el-select v-model="form.shareType" placeholder="请选择" class="goodsPlatform mr10" style="width: 120px;">
							         <el-option :key="itme.value" v-for="itme in platformTypeList" :label="itme.name"
							                   :value="itme.value">{{itme.name}}
							        </el-option>
							    </el-select>
							</el-form-item>
							<el-form-item label="使用状态">
							    <el-select v-model="form.useStatus" placeholder="请选择" class="goodsPlatform mr10" style="width: 120px;">
							         <el-option :key="itme.value" v-for="itme in useStatusList" :label="itme.name"
							                   :value="itme.value">{{itme.name}}
							        </el-option>
							    </el-select>
							</el-form-item>
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
				platformTypeList:[
				    {name: '分享赚', value: 0},
				    {name: '邀请好友', value: 1},
				],
				useStatusList:[
				    {name: '未使用', value: 0},
				    {name: '使用中', value: 1},
					 {name: '已被封', value: 2},
					 {name: '已过期', value: 3},
				],
            }
        },
        created() {
            this.getData(1);
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
                get("server-admin/AdminDomainName/list",{
                   params: {
					    useStatus: vue.select_cate,
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
			
			funPictureStatus(value){
				//平台
				// console.log(value)
				switch(value) {
					 case 0:
						return "未使用";
					 case 1:
						return "使用中";
					 case 2:
						return "已被封";
					 case 3:
						return "已过期";
					 default:
						return "未知";
				}
			},
			enabledStatus(value){
				switch(value) {
					 case 1:
						return "邀请好友";
					 case 0:
						return "分享赚";
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
						
						shareUrl: "",
						id:"",
						remark: "",
						useStatus: "",
						shareType:"",
					}
					this.StartEndTime = null
					
				} else{
					console.log(row)
					this.judge = index;
					this.judgeTitle = "编辑"
					this.form = {
						
						shareUrl: row.shareUrl,
						id:row.id,
					    remark: row.remark,
					    useStatus: row.useStatus,
						shareType:row.shareType,
					}
					this.oldForm = JSON.parse(JSON.stringify(this.form))
					this.dialogImageUrl = row.noticeUrl;
					this.StartEndTime =  [ new Date(Number(new Date(row.startTime))) , new Date(Number(new Date(row.endTime)))],
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
                post("server-admin/appNotice/insertOrUpdate",{
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
                		
                		this.$message.success("删除成功!");
                		this.getData(1);
                		
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
                
				
				
				if (this.form.shareUrl == null || this.form.shareUrl == ''){
					console.log(this.form.shareUrl)
					this.$message.error("请输入域名");
					return "请输入域名"
				}
				
				if (this.StartEndTime == null || this.StartEndTime == ''){
					console.log(this.form.noticeUrl)
					this.$message.error("请选择时间");
					return "请选择时间"
				}
				
				
				
				this.editVisible = false;
               console.log(this.form)
				post("server-admin/AdminDomainName/insertOrUpdate",{
					
					id: this.form.id,
					shareType: this.form.shareType,
					shareUrl: this.form.shareUrl,
					remark:this.form.remark,
					useStatus:this.form.useStatus,
					startTime: this.timeTransition(this.StartEndTime[0]),
					endTime: this.timeTransition(this.StartEndTime[1]),
					
				})
				.then((data) => {
					if (data.data.status == 200) {

						this.$message.success("操作成功~");
						this.getData(1);
						
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