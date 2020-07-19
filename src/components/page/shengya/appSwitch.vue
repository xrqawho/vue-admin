<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> app配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">新增</el-button>
                条件筛选 服务：
                <el-select v-model="select_cate" placeholder="请选择服务" class="handle-select mr10">
                    <el-option key="0" label="server-user" value="1"></el-option>
					<el-option key="1" label="server-api" value="2"></el-option>
					<el-option key="2" label="server-task" value="3"></el-option>
                    <!-- <el-option key="2" label="总公司" value="总公司"></el-option> -->
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">

                <!-- <el-table-column prop="companyName" label="公司" width="100">
                </el-table-column> -->
                <el-table-column prop="content" label="内容" width="120">
                    
                </el-table-column>
                <el-table-column prop="day" label="天数">
                </el-table-column>
                <el-table-column prop="num" width="120" label="数量">
                </el-table-column>
                <el-table-column prop="service" width="120" label="服务">
                    <template slot-scope="scope">
                        {{platform(scope.row.service)}}
                    </template>
                </el-table-column>
                <el-table-column prop="account" width="80" label="金额">
                </el-table-column>
                <el-table-column prop="remark" width="100" label="备注">
                </el-table-column>
                <el-table-column prop="isSwitch" width="100" label="开关">
                </el-table-column>

                <el-table-column show-overflow-tooltip prop="switchRemark" label="开关说明">
                </el-table-column>


                <el-table-column prop="createDate" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(2,scope.row)">编辑</el-button>
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
                <el-form-item label="内容">
                    <el-input v-model="form.content" style="width: 350px;"></el-input>
                </el-form-item>

                <el-form-item label="天数">
                    <el-input v-model="form.day" style="width: 150px;"></el-input>
                </el-form-item>
				 <el-form-item label="次数">
				    <el-input v-model="form.num" style="width: 150px;"></el-input>
				</el-form-item>
					<el-form-item label="金额">
				    <el-input v-model="form.account" style="width: 150px;"></el-input>
				</el-form-item>
				</el-form-item>
					<el-form-item label="备注">
				    <el-input v-model="form.remark" style="width: 350px;"></el-input>
				</el-form-item>
                <el-form-item class="label_awarn" label="服务">
                    <el-select v-model="form.serviceId" placeholder="请选择" class="goodsPlatform mr10" style="width: 120px;">
                         <el-option :key="itme.value" v-for="itme in platformTypeList" :label="itme.name"
                                   :value="itme.value">{{itme.name}}
                        </el-option>
                    </el-select>
                </el-form-item>
					<el-form-item  label="开关:" >
							<label><input v-model="form.isSwitch" type="radio" value="0" >开</label>
							<label><input v-model="form.isSwitch" type="radio" value="1" >关</label>
						</el-form-item >
							<el-form-item label="开关说明">
							    <el-input v-model="form.switchRemark" style="width: 350px;"></el-input>
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
                select_cate: '',
                select_word: '',
				select_itemId: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                sortVisible: false,
                linkTypeList: [
                    {name: '固定返', value: 1},
                    {name: '淘礼金', value: 2},
                ],
				platformTypeList:[
                    {name: 'server-user', value: 1},
                    {name: 'server-api', value: 2},
					{name: 'server-task', value: 3},
                ],
                form: {
                    content:"",
                    day:"",
                    num: "",
                    service: "",
                    account: "",
                    remark: "",
                    isSwitch: "",
                    id: "",
                    switchRemark: "",
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

                delId: null,//要删除的id
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
                get("server-admin/appSwitch/list", {
                    params: {
                        service: vue.select_cate,
                    }
                })
                    .then(function (data) {
                        let arr = []
                        //一个数组用来接收加工后台传过来的数据
                        console.log(data.data.data.data);
                        vue.tableData = data.data.data.map(list => {
                            let json = {
								id:list.id,
                                "content": list.content,
                                "day": list.day,
                                "num": list.num,
                                "service": list.service,
                                "account": list.account,
                                "remark": list.remark,
                                "totalRetureAmount": list.itemTotalNum*list.freeAccount,
                                "createDate": list.createDate,
                                "isSwitch": list.isSwitch,
                                "switchRemark": list.switchRemark,
                            };
                            return json;
                        })

                        // vue.page.pageSize = data.data.data.pageSize;
                        vue.page.pageNum = data.data.data.pageNum;
                       // vue.page.total = Number(data.data.data.total)
                        console.log(vue.tableData)

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            platform(value) {
                //平台
				if(value == 1){
					return "server-user";
				} else if(value == 2){
					return "server-api";
				} else{
					return "server-task";
				}
               
            },
            freeState(value) {
                //免单状态
                switch (value) {
                    case 0:
                        return "正常";
                    case 1:
                        return "已抢空";
					case 2:
						return "已过期";
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
                //打开新增和编辑的弹框

                this.qiniuimage = null;
                this.editVisible = true;
               
                if (index == 1) {

                    this.judge = index;
                    this.judgeTitle = "新增"
                   this.form = {
                   	content:"",
                       day: "",
                       num: "",
                       account:"",
                       remark:"",
					   service: "",
                       isSwitch: "0",
                       switchRemark: "",
					   id:"",
                   }

                } else {
                    this.judge = index;
                    this.judgeTitle = "编辑"
                    this.form = {
						content:row.content,
                        day: row.day,
                        num: row.num,
						serviceId: Number(row.service),
                        account: row.account,
                        remark: row.remark,
                        isSwitch: row.isSwitch,
                        id: row.id,
                        switchRemark: row.switchRemark,
                    }

                }


            },
            handleDelete(index, row) {
                // console.log(row)
                this.delId = row.id;
                this.form.serviceId=row.service;
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
                if (this.form.serviceId == null || this.form.serviceId == "") {
                    this.$message.error("服务不能为空");
                    return
                }
				if(this.form.serviceId == 1){
					//用户
					if (this.judge == 1) {
					    //新增
					    this.editVisible = false;
					    post("server-admin/appSwitch/insertOrUpdateAppUserSwitch",
					        {
					        	content:this.form.content,
					        	day: this.form.day,
					        	num: this.form.num,
					        	serviceId: Number(this.form.serviceId),
					        	account: this.form.account,
					        	remark: this.form.remark,
					        	isSwitch: this.form.isSwitch,
					        	switchRemark: this.form.switchRemark,
					        }
					    )
					        .then((data) => {
					            console.log(data)
					            if (data.data.status == 200) {
					                this.$message.success("新增成功~");
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
					    this.editVisible = false;
					    post("server-admin/appSwitch/insertOrUpdateAppUserSwitch", 
					        {
								id:this.form.id,
					        	content:this.form.content,
					        	day: this.form.day,
					        	num: this.form.num,
					        	serviceId: Number(this.form.serviceId),
					        	account: this.form.account,
					        	remark: this.form.remark,
					        	isSwitch: this.form.isSwitch,
					        	switchRemark: this.form.switchRemark,
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
					
				} else if(this.form.serviceId == 2){
					 if (this.judge == 1) {
					    //新增
					    this.editVisible = false;
					    post("server-admin/appSwitch/insertOrUpdateAppApiSwitch",
					        {
					        	content:this.form.content,
					        	day: this.form.day,
					        	num: this.form.num,
					        	serviceId: Number(this.form.serviceId),
					        	account: this.form.account,
					        	remark: this.form.remark,
					        	isSwitch: this.form.isSwitch,
					        	switchRemark: this.form.switchRemark,
					        }
					    )
					        .then((data) => {
					            console.log(data)
					            if (data.data.status == 200) {
					                this.$message.success("新增成功~");
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
					    post("server-admin/appSwitch/insertOrUpdateAppApiSwitch", 
					        {
					        	id:this.form.id,
					        	content:this.form.content,
					        	day: this.form.day,
					        	num: this.form.num,
					        	serviceId: Number(this.form.serviceId),
					        	account: this.form.account,
					        	remark: this.form.remark,
					        	isSwitch: this.form.isSwitch,
					        	switchRemark: this.form.switchRemark,
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
				} else{
					                if (this.judge == 1) {
					    //新增
					    this.editVisible = false;
					    post("server-admin/appSwitch/insertOrUpdateAppOrderSwitch",
					        {
					        	content:this.form.content,
					        	day: this.form.day,
					        	num: this.form.num,
					        	serviceId: Number(this.form.serviceId),
					        	account: this.form.account,
					        	remark: this.form.remark,
					        	isSwitch: this.form.isSwitch,
					        	switchRemark: this.form.switchRemark,
					        }
					    )
					        .then((data) => {
					            console.log(data)
					            if (data.data.status == 200) {
					                this.$message.success("新增成功~");
					                
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
					    post("server-admin/appSwitch/insertOrUpdateAppOrderSwitch", 
					        {
								id:this.form.id,
								content:this.form.content,
								day: this.form.day,
								num: this.form.num,
								serviceId: Number(this.form.serviceId),
								account: this.form.account,
								remark: this.form.remark,
								isSwitch: this.form.isSwitch,
								switchRemark: this.form.switchRemark,
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
				}	 



            },
            // 确定删除
            deleteRow() {
                // this.$message.success('删除成功');
                this.delVisible = false;
				if(this.form.serviceId == 1){
					 post("server-admin/appSwitch/insertOrUpdateAppUserSwitch", 
					    {
							id: this.delId,
							delFlag :1,
					    })
					    .then((data) => {
					        console.log(data)
					        if (data.data.status == 200) {
					            this.$message.success("删除成功~");
					            this.getData(1)
					        } else {
					            this.$message.error(data.data.msg);
					        }
					    })
					    .catch(function (error) {
					        console.log(error);
					    });
				} else if(this.form.serviceId == 2){
					 post("server-admin/appSwitch/insertOrUpdateAppApiSwitch", 
					   {
												id: this.delId,
												delFlag :1,
					   })
					   .then((data) => {
					       console.log(data)
					       if (data.data.status == 200) {
					           this.$message.success("删除成功~");
					           this.getData(1)
					       } else {
					           this.$message.error(data.data.msg);
					       }
					   })
					   .catch(function (error) {
					       console.log(error);
					   });
				} else{
					 post("server-admin/appSwitch/insertOrUpdateAppOrderSwitch", 
					   {
												id: this.delId,
												delFlag :1,
					   })
					   .then((data) => {
					       console.log(data)
					       if (data.data.status == 200) {
					           this.$message.success("删除成功~");
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
            //打开序号排序的弹出框，并把需要排序的id值拿出来
            sortInput(id, val) {
                this.sortVisible = true;
                this.sortId = id;
                this.sortValue = val;
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
