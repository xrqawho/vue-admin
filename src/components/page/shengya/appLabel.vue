<template>
    <div class="centCommission">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>app5眼</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-alert
            title="温馨提示："
            type="info"
            effect="dark"
            :closable="false">
        </el-alert>
        <div class="container">
           <!-- <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">添加5眼</el-button>
            </div> -->
			<div class="handle-box">
			    <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">添加5眼</el-button>
			    条件筛选 服务：
			    <el-select v-model="select_cate" placeholder="请选择服务" class="handle-select mr10">
			        <el-option key="0" label="老版本" value="0"></el-option>
					<el-option key="1" label="新版本第一行" value="1"></el-option>
					<el-option key="2" label="新版本第二行" value="2"></el-option>
			     
			    </el-select>
			    <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
			</div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                
                <el-table-column prop="labelTitile" label="标题名称"  >
                </el-table-column>
                <el-table-column prop="labelUrl" label="标题图片" >
					<template slot-scope="scope">
					 <img :src="scope.row.labelUrl" width="150" height="150" class="head_pic"/>
					 </template>
                </el-table-column>
				<el-table-column prop="labelIcon" label="头标">
				</el-table-column>
				<el-table-column prop="activityId" label="活动id">
				</el-table-column>
				<el-table-column prop="labelOfficial" label="是否官方活动" >
					<template slot-scope="scope">
					    {{labelOfficial(scope.row.labelOfficial)}}
					</template>
				</el-table-column>
				<el-table-column prop="showRow" label="第几行">
					<template slot-scope="scope">
					    {{showRow(scope.row.showRow)}}
					</template>
				</el-table-column>
				
				<el-table-column prop="labelType" label="平台" >
					<template slot-scope="scope">
					    {{labelType(scope.row.labelType)}}
					</template>
				</el-table-column>
				<el-table-column prop="sort" label="排序">
				</el-table-column>
				<el-table-column prop="jumpType" label="跳转类型" >
					<template slot-scope="scope">
					    {{enabledStatus(scope.row.jumpType)}}
					</template>
				</el-table-column>
				<el-table-column prop="jumpLink" label="跳转地址">
				</el-table-column>
                <el-table-column prop="onOff" label="公告状态" >
					<template slot-scope="scope">
					    {{funPictureStatus(scope.row.onOff)}}
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
								v-model="form.labelUrl"
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
							  v-model="form.sort">
							</el-input>
						</el-form-item >
						<el-form-item label="平台">
						    <el-select v-model="form.labelType" placeholder="请选择" class="goodsPlatform mr10" style="width: 120px;">
						         <el-option :key="itme.value" v-for="itme in platformTypeList" :label="itme.name"
						                   :value="itme.value">{{itme.name}}
						        </el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="行">
						    <el-select v-model="form.showRow" placeholder="请选择" class="goodsPlatform mr10" style="width: 120px;">
						         <el-option :key="itme.value" v-for="itme in showRowList" :label="itme.name"
						                   :value="itme.value">{{itme.name}}
						        </el-option>
						    </el-select>
						</el-form-item>
						<el-form-item class="label_awarn" label="标题名称:" >
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="form.labelTitile">
							</el-input>
						</el-form-item >
							<el-form-item class="label_awarn" label="头标:" >
								<el-input
								  type="text"
								  :rows="2"
								  placeholder="请输入内容"
								  v-model="form.labelIcon">
								</el-input>
							</el-form-item >
							<el-form-item class="label_awarn" label="活动id:" >
								<el-input
								  type="textarea"
								  :rows="2"
								  placeholder="请输入内容"
								  v-model="form.activityId">
								</el-input>
							</el-form-item >
							<el-form-item class="label_awarn" label="是否官方活动:" >
								<label><input v-model="form.labelOfficial" type="radio" value="0" >非官方活动</label>
								<label><input v-model="form.labelOfficial" type="radio" value="1" >官方活动</label>
							</el-form-item >
							<el-form-item class="label_awarn" label="跳转类型:" >
								<label><input v-model="form.jumpType" type="radio" value="0" >内部跳转</label>
								<label><input v-model="form.jumpType" type="radio" value="1" >外部跳转</label>
							</el-form-item >
								<el-form-item class="label_awarn" label="跳转地址:" >
									<el-input
									  type="textarea"
									  :rows="2"
									  placeholder="请输入内容"
									  v-model="form.jumpLink">
									</el-input>
								</el-form-item >
						<el-form-item class="label_awarn" label="状态:" >
							<label><input v-model="form.onOff" type="radio" value="0" >启用</label>
							<label><input v-model="form.onOff" type="radio" value="1" >禁用</label>
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
				platformTypeList:[
					 {name: '内部', value: 0},
				    {name: '淘宝', value: 1},
				    {name: '京东', value: 2},
					{name: '拼多多', value: 3},
					{name: '饿了么', value: 4},
					{name: '美团', value: 5},
					{name: '唯品会', value: 6},
				],
				showRowList:[{name:'老版本',value:0},{name:'新版本第一行',value:1},{name:'新版本第二行',value:2},],
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
                get("server-admin/appLabel/list",{
                   params: {
					   showRow:vue.select_cate,
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
						return "禁用";
					 case 0:
						return "启用";
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
			showRow(value){
				switch(value) {
					 case 1:
						return "新版本第一行";
					case 2:
						return "新版本第二行";
					 case 0:
						return "老版本";
					 default:
						return "未知";
				}
			},
			
			labelType(value){
				switch(value) {
					 case 2:
						return "京东";
					 case 3:
						return "拼多多";
					case 4:
						return "饿了么";
					case 5:
						return "美团";
					case 6:
						return "唯品会";
					case 1:
						return "淘宝";
					 default:
						return "内部";
				}
			},
			labelOfficial(value){
				switch(value) {
					 case 1:
						return "官方活动";
					 case 0:
						return "非官方活动";
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
				
				
				
				if (index == 1) {
					this.judge = index;
					this.judgeTitle = "新增"
					this.form = {
						
						jumpLink:"",
						jumpType:0,
						onOff: 1,
						id:"",
						labelUrl: "",
						activityId:"",
						labelOfficial:"0",
						showRow:"",
						labelIcon:"",
						labelTitile: "",
						sort: 0,
					}
					this.StartEndTime = null
					
				} else{
					console.log(row)
					this.judge = index;
					this.judgeTitle = "编辑"
					this.form = {
						jumpLink:row.jumpLink,
						jumpType:row.jumpType,
						onOff: row.onOff,
						id:row.id,
						labelType:row.labelType,
						labelIcon:row.labelIcon,
						showRow:row.showRow,
						labelOfficial:row.labelOfficial,
						activityId:row.activityId,
					    labelUrl: row.labelUrl,
					    labelTitile: row.labelTitile,
						sort: row.sort,
					}
				}
            },
            handleDelete(index, row) {
                // this.idx = index;
                this.id = row.id;
                this.oldForm = { labelUrl: row.labelUrl }
                this.delVisible = true;
            },
            deleteRow() {
				 this.delVisible = false;
                post("server-admin/appLabel/insertOrUpdateAppLabel",{
						id: this.id,
						delFlag: 1,
                })
                .then((data) => {
                	if (data.data.status == 200) {

                		// 删除旧图片
						deleteFile(this.oldForm.labelUrl).then(result => {
							if (!result.success) {
								this.$message.error(result.msg)
							}
						})
                		
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
				if (this.form.labelUrl == null || this.form.labelUrl == '') {
					this.$message.error("请上传一张图片");
					return "请上传一张图片"
				}
				
				if (this.form.sort == null || this.form.sort == ''){
					this.$message.error("请输入排序");
					return "请输入排序"
				}
				
				if (this.form.labelTitile == null || this.form.labelTitile == ''){
					console.log(this.form.noticeTitle)
					this.$message.error("请输入标题名称");
					return "请输入标题名称"
				}
				
				
				
				this.editVisible = false;
				post("server-admin/appLabel/insertOrUpdateAppLabel",{
					
					jumpLink:this.form.jumpLink,
					jumpType:this.form.jumpType,
					onOff: this.form.onOff,
					id:this.form.id,
					labelUrl: this.form.labelUrl,
					labelTitile: this.form.labelTitile,
					sort: this.form.sort,
					labelIcon:this.form.labelIcon,
					showRow:this.form.showRow,
					labelOfficial:this.form.labelOfficial,
					activityId:this.form.activityId,
					labelType:this.form.labelType,
					
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