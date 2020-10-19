<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户手机号码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">新增</el-button> -->
                条件筛选 来源：
                <el-select v-model="sourceType" placeholder="请选择" class="handle-select mr10">
                    <el-option key="0" label="公司购买" value="1"></el-option>
					<el-option key="1" label="外部" value="2"></el-option>
                </el-select>
				 条件筛选 添加状态：
				<el-select v-model="updateType" placeholder="请选择" class="handle-select mr10">
				    <el-option key="0" label="未添加" value="0" ></el-option>
					<el-option key="1" label="已添加" value="1"></el-option>
				</el-select>
                手机号码:<el-input v-model="phone" placeholder="请输入手机号查询" class="handle-input mr10"></el-input>
				姓名:<el-input v-model="realName" placeholder="请输入姓名查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">

                <el-table-column prop="phone" label="手机号码">
                </el-table-column>
				 <el-table-column prop="realName" label="姓名">
				</el-table-column>
                <el-table-column prop="zfbAccount" width="120" label="支付宝账号">
                </el-table-column>
                <el-table-column prop="sourceType" width="60" label="来源">
                    <template slot-scope="scope">
                        {{platform(scope.row.sourceType)}}
                    </template>
                </el-table-column>
				
				 <el-table-column prop="updateType" width="60" label="状态">
				    <template slot-scope="scope">
				        {{freeState(scope.row.updateType)}}
				    </template>
				</el-table-column>
                <el-table-column prop="remark" width="80" label="备注">
                </el-table-column>
                <el-table-column prop="createDate" width="100" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(2,scope.row)" style="color:#228B22"> 未添加</el-button>
                        <el-button type="text" @click="handleEdit(1,scope.row)" >已添加</el-button>
                        
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper"
                               :total="page.total" :page-size="page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="judgeTitle" :visible.sync="editVisible" width="35%">
            <el-form :model="form"
                     label-width="80px"
                     style="width: 70%;margin: 0 auto;">
                <el-form-item label="商品ID">
                    <el-input v-model="form.itemId" style="width: 150px;"></el-input>
                </el-form-item>
                <el-form-item label="自定名称">
                    <el-input v-model="form.aliasDtitle" style="width: 250px;"></el-input>
                </el-form-item>
				 <el-form-item label="免单金额">
				    <el-input v-model="form.freeAccount" style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="总免单数">
				    <el-input v-model="form.totalOrders" style="width: 150px;"></el-input>
				</el-form-item>

                <el-form-item label="平台">
                    <el-select v-model="form.platformType" placeholder="请选择" class="goodsPlatform mr10" style="width: 120px;">
                         <el-option :key="itme.value" v-for="itme in platformTypeList" :label="itme.name"
                                   :value="itme.value">{{itme.name}}
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="label_awarn" label="返利类型">
                    <el-select v-model="form.subsidyType" placeholder="请选择" class="goodsPlatform mr10" style="width: 100px;">
                        <el-option :key="itme.value" v-for="itme in linkTypeList" :label="itme.name"
                                   :value="itme.value">{{itme.name}}
                        </el-option>
                    </el-select>
                </el-form-item>
				 <el-form-item label="开始时间">
				    <el-date-picker
				            v-model="form.beginTime"
				            type="datetime"
				            placeholder="选择日期时间"
				            :default-time="dateTime">
				    </el-date-picker>
				</el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                            v-model="form.endTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            :default-time="dateTime">
                    </el-date-picker>
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

        <!-- 序号排序提示框 -->
        <el-dialog title="序号排序" :visible.sync="sortVisible" width="300px" center>
            <el-input v-model="sortValue"></el-input>
            <span slot="footer" class="dialog-footer">
		        <el-button @click="sortVisible = false">取 消</el-button>
		        <el-button type="primary" @click="sortSave">确 定</el-button>
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
	import { deleteFile } from '@/api/OssUpload'
	import Uploader from '@/components/common/Uploader'
    import {post, get} from '../../../api/index';

    export default {
        name: 'freeChage',
		components: {
			Uploader
		},
        data() {
            return {
                tableData: [],

                multipleSelection: [],
                sourceType: '',
                updateType: '',
				phone: null,
				realName:null,
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                sortVisible: false,
                form: {
                    endTime: null,//1566626222378
                    itemId: null,//"12341234"
                    aliasDtitle: null,//"扫黄打非隧道口"
                    itemPictureUrl: null,//1
                    platformType: null,//1
                    printUrl: null,//"http://qiniuimage.shenggongzi.cn/FlyQn6NIXoPLp-s9-uNO0VTONIjf"
                    subsidyType: null,
                    freeAccount: 0,
                },
                page: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                },
                //当前时分秒
                dateTime: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
                dialogImageUrl: '',
                dialogVisible: false,
                //上传图片获取的参数
                imgToken: null,//token
                imgSite: null,//site七牛云需要拼接的url
                imgUpsite: null,//上传图片需要的地址
                qiniuimage: null,
                qiniu: {
                    token: null,
                },
                judge: 1,//判断依据，用于判断是新增还是修改
                judgeTitle: "编辑",//弹出框的标题，和judge一起进行

                fileListLength: 0,//图片文件列表的长度

                sortValue: null,//需要排序的值
                sortId: null,//需要排序的id

                phone: null,//要删除的id
            }
        },
        created() {
            this.getData(1);
            //this.getImgData();
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
                get("server-admin/appUserPhone/list", {
                    params: {
                        phone: vue.phone,
                        realName: vue.realName,
						updateType:vue.updateType,
						sourceType:vue.sourceType,
                        pageNum: pageNum,
                        pageSize: vue.page.pageSize,
                    }
                })   .then(function (data) {
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
            platform(value) {
                //平台
                console.log(value)
                switch (value) {
                    case 1:
                        return "公司购买";
                    case 2:
                        return "外部";
                    default:
                        return "未知";
                }
            },
			
            freeState(value) {
                //免单状态
                switch (value) {
                    case 0:
                        return "未添加";
                    case 1:
                        return "已添加";
                    default:
                        return "未知";
                }
            },
            timeTransition(beginTime) {
                let d = new Date(Number(beginTime));    //根据时间戳生成的时间对象
                let date = (d.getFullYear()) + "-" +
                    (d.getMonth() + 1) + "-" +
                    (d.getDate()) + " " +
                    (d.getHours()) + ":" +
                    (d.getMinutes()) + ":" +
                    (d.getSeconds());
                return date;
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
				if (index == 1) {
				   post("server-admin/appUserPhone/insertOrUpdate", {
				        phone:row.phone,
						updateType:1,
				   })
				       .then((data) => {
				           console.log(data)
				           if (data.data.status == 200) {
				               this.$message.success("修改成功~");
							 this.getData(1);
				              
				           } else {
				               this.$message.error(data.data.msg);
				           }
				       })
				       .catch(function (error) {
				           console.log(error);
				       });	
				} else{
					   post("server-admin/appUserPhone/insertOrUpdate", {
					        phone:row.phone,
							updateType:0,
					   })
					       .then((data) => {
					           console.log(data)
					           if (data.data.status == 200) {
					               this.$message.success("修改成功~");
								 this.getData(1);
					              
					           } else {
					               this.$message.error(data.data.msg);
					           }
					       })
					       .catch(function (error) {
					           console.log(error);
					       });
				}
             
               },
            handleDelete(index, row) {
                // console.log(row)
				// this.oldForm = { itemPictureUrl: row.itemPictureUrl }
                this.form.phone = row.phone;
                //this.form.itemId=row.itemId;
                this.delVisible = true;
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
                // this.editVisible = false;

                // this.$message.success(`修改第 ${this.idx+1} 行成功`);
                if (this.form.itemId == null || this.form.itemId == "") {
                    this.$message.error("商品ID不能为空");
                    return
                }
				
                if (this.form.endTime == null || this.form.endTime == "") {
                    this.$message.error("时间不能为空");
                    return
                }

                if (this.judge == 1) {
                    //新增
                    this.form.printUrl = this.qiniuimage;
                    this.editVisible = false;
                    post("server-admin/goodsFree/insertOrUpdate",
                        {
                        	activityBeginTime: this.timeTransition(this.form.beginTime),
                        	activityEndTime: this.timeTransition(this.form.endTime),
                        	itemId:  this.form.itemId,
                        	aliasDtitle:  this.form.aliasDtitle,
                        	itemPictureUrl: this.form.itemPictureUrl,
                        	platformType:  this.form.platformType,
                        	subsidyType:  this.form.subsidyType,
                        	freeAccount: this.form.freeAccount,
                        	itemTotalNum: this.form.totalOrders,
                        }
                    )
                        .then((data) => {
                            console.log(data)
                            if (data.data.status == 200) {
								
                                this.$message.success("新增成功~");
                                 this.form = {
                                	beginTime:"",
                                    endTime: "",
                                    itemId: "",
                                    aliasDtitle:"",
                                    itemPictureUrl:"",
                                    platformType: "",
                                    id: "",
                                    subsidyType: "",
                                	freeAccount:"",
                                	totalOrders:"",
                                }
                                this.getData(1)
                            } else {
                                this.$message.error(data.data.msg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else if (this.judge == 2) {
                    //修改
                    if (this.qiniuimage != null) {
                        this.form.printUrl = this.qiniuimage;
                    }
                    this.editVisible = false;
                    //alert("form===>>>>"+JSON.stringify(this.form))
                    post("server-admin/goodsFree/insertOrUpdate", 
                        {
							id:this.form.id,
                        	activityBeginTime: this.form.beginTime,
                        	activityEndTime:  this.form.endTime,
                        	itemId:  this.form.itemId,
							 aliasDtitle: this.form.aliasDtitle,
                        	itemPictureUrl: this.form.itemPictureUrl,
                        	platformType:  this.form.platformType,
                        	subsidyType:  this.form.subsidyType,
                        	freeAccount: this.form.freeAccount,
                        	itemTotalNum: this.form.totalOrders,
                        })
                        .then((data) => {
                            console.log(data)
                            if (data.data.status == 200) {
                                this.$message.success("修改成功");

                                this.getData(1)
                            } else {
                                this.$message.error(data.data.msg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }


            },
            // 确定删除
            deleteRow() {
                // this.$message.success('删除成功');
                this.delVisible = false;
                //alert("id="+this.form.goodsId);
                post("server-admin/appUserPhone/insertOrUpdate", {
                        phone:this.form.phone,
						delFlag:1,
                })
                    .then((data) => {
                        console.log(data)
                        if (data.data.status == 200) {
                            this.$message.success("删除成功~");
							 this.getData(1);
							// 删除旧图片
							deleteFile(this.oldForm.itemPictureUrl).then(result => {
								if (!result.success) {
									this.$message.error(result.msg)
								}
							})
                            this.sortVisible = false;
                           
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //打开序号排序的弹出框，并把需要排序的id值拿出来
            sortInput(id, val) {
                this.sortVisible = true;
                this.sortId = id;
                this.sortValue = val;
            },
            //进行序号排序保存操作
            sortSave() {
                post("server-admin/goodsFree/insertOrUpdate", {
                    freeSort: this.sortValue,
                    id: this.sortId,
                })
                    .then((data) => {
                        console.log(data)
                        if (data.data.status == 200) {
                            this.$message.success("修改成功~");
                            this.sortVisible = false;
                            this.getData(1);
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //获取上传图片的参数
            getImgData() {

                get("web/bannerPicture/uploadPic", {
                    params: {}
                })
                    .then((data) => {

                        this.qiniu.token = data.data.data.token;
                        this.imgSite = data.data.data.site;
                        this.imgUpsite = data.data.data.upsite;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            rebateFormatter(row, column) {
                if (row.subsidyType == 1) {
                    return "固定返";
                } else if (row.subsidyType == 2) {
                    return "淘礼金";
                } else {
                    return null;
                }
            },
            //上传图片
            handleSuccess(response, file, fileList) {
                //成功的回调函数
                console.log(response.key)
                this.qiniuimage = this.imgSite + "/" + response.key
                if (fileList.length == 1) {
                    let upload = document.getElementsByClassName("el-upload--picture-card")
                    upload[0].style.display = "none"
                }
            },
            handleRemove(file, fileList) {
                //删除的回调函数
                console.log(file);
                this.qiniuimage = null;
                if (fileList.length == 0) {
                    let upload = document.getElementsByClassName("el-upload--picture-card");
                    upload[0].style.display = "inline-block";
                    this.fileListLength = fileList.length;
                }

            },
            handlePictureCardPreview(file) {

                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
        },
        watch: {
            // console.log(this)
            refs(newValue, old) {
                console.log(newValue)
                console.log(old)
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

    .goodsPlatform {
        width: 70%;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    #goodsPicture {
        width: 100%;
    }
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
