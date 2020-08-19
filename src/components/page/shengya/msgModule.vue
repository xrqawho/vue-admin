<template>
    <div class="centCommission">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>消息模板</el-breadcrumb-item>
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
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">添加消息模板</el-button>
                
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
                <el-table-column prop="id" label="ID"  >
                </el-table-column>
				<el-table-column prop="messageType" label="消息类型"  >
					<template slot-scope="scope">
					    {{messageTypeMsg(scope.row.messageType)}}
					</template>
				</el-table-column>
                <el-table-column prop="title" label="标题" >
                </el-table-column>
                <el-table-column prop="content" label="内容">
                </el-table-column>
				<el-table-column prop="jumpType" label="跳转类型" >
					<template slot-scope="scope">
					    {{enabledStatus(scope.row.jumpType)}}
					</template>
				</el-table-column>
             <el-table-column prop="jumpLink" label="跳转链接">
             </el-table-column>
                <el-table-column prop="remark" label="备注说明">
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
							
						<el-form-item class="label_awarn"  label="消息类型" >
							<el-select v-model="form.messageType" placeholder="请选择" class="goodsPlatform mr10" style="width: 120px;">
							     <el-option :key="itme.value" v-for="itme in platformTypeList" :label="itme.name"
							               :value="itme.value">{{itme.name}}
							    </el-option>
							</el-select>
						</el-form-item >
							
						<el-form-item class="label_awarn" label="标题:" >
							<el-input
							  type="text"
							  placeholder="请输入"
							  v-model="form.title">
							</el-input>
						</el-form-item >
						
						
						<el-form-item class="label_awarn" label="内容:" >
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="form.content">
							</el-input>
						</el-form-item >
							
							
						<el-form-item class="label_awarn" label="公告状态:" >
							<label><input v-model="form.jumpType" type="radio" value="1" >外部跳转</label>
							<label><input v-model="form.jumpType" type="radio" value="0" >内部跳转</label>
						</el-form-item >
							
							<el-form-item class="label_awarn" label="跳转链接:" >
								<el-input
								  type="textarea"
								  :rows="2"
								  placeholder="请输入内容"
								  v-model="form.jumpLink">
								</el-input>
							</el-form-item >
					</el-form-item>
					<el-form-item class="label_awarn" label="备注说明:" >
						<el-input
						  type="text"
						  placeholder="请输入"
						  v-model="form.remark">
						</el-input>
					</el-form-item >
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
				platformTypeList:[
				    {name: '支付宝提现', value: "1"},
				    {name: '用户下单', value: "2"},
					{name: '下级用户下单', value: "3"},
					{name: '邀请好友', value: "4"},
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
                get("server-admin/appMessageTemple/list",{
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
						return "外部跳转";
					 case 0:
						return "内部跳转";
					 default:
						return "未知";
				}
			},
			messageTypeMsg(value){
				switch(value) {
					 case "0":
						return "其他";
					 case "1":
						return "支付宝提现";
					 case "2":
						return "用户下单";
					 case "3":
					 	return "下级用户下单";
					case "4":
						return "邀请好友";
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
						messageType:"",
						title:"",
						content:"",
						jumpType:"0",
						jumpLink:"",
						remark: "",
					}
					this.StartEndTime = null
					
				} else{
					console.log(row)
					this.judge = index;
					this.judgeTitle = "编辑"
					this.form = {
						
						messageType: row.messageType,
						id:row.id,
					    title: row.title,
					    content: row.content,
						jumpType:row.jumpType,
						jumpLink: row.jumpLink,
						remark:row.remark,
						}
					this.oldForm = JSON.parse(JSON.stringify(this.form))
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
                post("server-admin/appMessageTemple/insertOrUpdate",{
						id: this.id,
						delFlag: 1,
                })
                .then((data) => {
                	if (data.data.status == 200) {

                		this.$message.success("删除成功!");
                		this.getData();
                		
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
				 if (this.form.title == null || this.form.title == '') {
					this.$message.error("标题不能为空！");
					return "标题不能为空！"
				}
				
				
				if (this.form.content == null || this.form.content == ''){
					this.$message.error("内容不能为空！");
					return "内容不能为空！"
				}
				
				
				if (this.form.messageType == null || this.form.messageType == ''){
					this.$message.error("消息类型不能为空！");
					return "消息类型不能为空！"
				} 
				
				
				
				this.editVisible = false;
               console.log(this.form)
				post("server-admin/appMessageTemple/insertOrUpdate",{
					
					id: this.form.id,
					messageType: this.form.messageType,
					title: this.form.title,
					content: this.form.content,
					jumpType:this.form.jumpType,
					jumpLink:this.form.jumpLink,
					remark:	this.form.remark,
				})
				.then((data) => {
					if (data.data.status == 200) {


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