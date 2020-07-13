<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 免单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">新增</el-button>
                条件筛选 平台：
                <el-select v-model="select_cate" placeholder="请选择" class="handle-select mr10">
                    <el-option key="0" label="淘宝" value="0"></el-option>
					<el-option key="1" label="京东" value="1"></el-option>
					<el-option key="2" label="拼多多" value="2"></el-option>
                    <!-- <el-option key="2" label="总公司" value="总公司"></el-option> -->
                </el-select>
                <el-input v-model="select_word" placeholder="请输入关键字查询" class="handle-input mr10"></el-input>
				<el-input v-model="select_itemId" placeholder="请输入商品Id查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">

                <!-- <el-table-column prop="companyName" label="公司" width="100">
                </el-table-column> -->
                <el-table-column prop="itemPictureUrl" label="商品主图" width="120">
                    <template slot-scope="scope">
                        <img id="goodsPicture" :src="scope.row.itemPictureUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="itemTitle" label="商品名称">
                </el-table-column>
                <el-table-column prop="itemId" width="120" label="商品ID">
                </el-table-column>
                <el-table-column prop="platformType" width="60" label="平台">
                    <template slot-scope="scope">
                        {{platform(scope.row.platformType)}}
                    </template>
                </el-table-column>
                <el-table-column prop="totalOrders" width="80" label="总免单数">
                </el-table-column>
                <el-table-column prop="invalidOrders" width="100" label="已领取数">
                </el-table-column>
                <el-table-column prop="totalRetureAmount" width="100" label="免单总金额">
                </el-table-column>

                <el-table-column prop="freeType" label="返利类型" :formatter="rebateFormatter">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="freeAccount" label="免单金额">
                </el-table-column>


                <el-table-column prop="beginTime" label="开始时间">
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间">
                </el-table-column>
                <el-table-column prop="freeStatus" width="70" label="状态">
                    <template slot-scope="scope">
                        {{ freeState(scope.row.freeStatus)}}
                    </template>
                </el-table-column>
                <el-table-column prop="freeSerialNumber" width="60" label="商品详情">
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(2,scope.row)">编辑</el-button>
                        <el-button @click="sortInput(scope.row.id,scope.row.freeSort)" type="text">序号（排序）
                        </el-button>
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
					<el-form-item class="label_awarn" label="公告图片:">
	
							<uploader
								dir="test/upload/img"
								v-model="form.itemPictureUrl"
								@upload-success="handleSuccess"
							></uploader>
						</el-form-item>
                <el-form-item label="商品ID">
                    <el-input v-model="form.itemId" style="width: 150px;"></el-input>
                </el-form-item>

                <el-form-item label="商品名称">
                    <el-input v-model="form.itemTitle" style="width: 250px;"></el-input>
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
                    <el-select v-model="form.freeType" placeholder="请选择" class="goodsPlatform mr10" style="width: 100px;">
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
                    {name: '淘宝', value: 0},
                    {name: '京东', value: 1},
					{name: '拼多多', value: 2},
                ],
                form: {
                    endTime: null,//1566626222378
                    itemId: null,//"12341234"
                    itemTitle: null,//"扫黄打非隧道口"
                    itemPictureUrl: null,//1
                    platformType: null,//1
                    printUrl: null,//"http://qiniuimage.shenggongzi.cn/FlyQn6NIXoPLp-s9-uNO0VTONIjf"
                    freeType: null,
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
                get("server-admin/goodsFree/list", {
                    params: {
                        platformType: vue.select_cate,
                        itemTitle: vue.select_word,
						itemId:vue.select_itemId,
                        pageNum: pageNum,
                        pageSize: vue.page.pageSize,
                    }
                })
                    .then(function (data) {
                        let arr = []
                        //一个数组用来接收加工后台传过来的数据
                        console.log(data.data.data.data);
                        vue.tableData = data.data.data.data.map(list => {
                            let json = {
                                "itemPictureUrl": list.itemPictureUrl,
                                "itemTitle": list.itemTitle,
                                "itemId": list.itemId,
                                "platformType": list.platformType,
                                "totalOrders": list.itemTotalNum,
                                "invalidOrders": list.itemReceivedNum,
                                "totalRetureAmount": list.itemTotalNum*list.freeAccount,
                                "beginTime": list.activityBeginTime,
                                "endTime": list.activityEndTime,
                                "freeStatus": list.freeStatus,
                                "freeSerialNumber": list.itemDetails,
                                "id": list.id,
								freeSort:list.freeSort,
                                "freeType": list.freeType,
								"freeAccount":list.freeAccount
                            };
                            return json;
                        })

                        // vue.page.pageSize = data.data.data.pageSize;
                        vue.page.pageNum = data.data.data.pageNum;
                        vue.page.total = Number(data.data.data.total)
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
                    case 0:
                        return "淘宝";
                    case 4:
                        return "天猫";
                    case 1:
                        return "京东";
                    case 2:
                        return "拼多多";
                    default:
                        return "未知";
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
                   	beginTime:"",
                       endTime: "",
                       itemId: "",
                       itemTitle:"",
                       itemPictureUrl:"",
                       platformType: "",
                       id: "",
                       freeType: "",
                   	freeAccount:"",
                   	totalOrders:"",
                   }

                } else {
                    this.judge = index;
                    this.judgeTitle = "编辑"
                    //alert("row.freeType====>>>>>"+row.freeType)
                    console.log(row.itemPictureUrl)
                    this.form = {
						beginTime:row.beginTime,
                        endTime: row.endTime,
                        itemId: row.itemId,
                        itemTitle: row.itemTitle,
                        itemPictureUrl: row.itemPictureUrl,
                        platformType: row.platformType,
                        id: row.id,
                        freeType: row.freeType,
						freeAccount:row.freeAccount,
						totalOrders:row.totalOrders,
                    }
                    this.dialogImageUrl = row.itemPictureUrl;


                }


            },
            handleDelete(index, row) {
                // console.log(row)
				 this.oldForm = { itemPictureUrl: row.itemPictureUrl }
                this.delId = row.id;
                this.form.itemId=row.itemId;
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
                        	activityBeginTime: this.form.beginTime,
                        	activityEndTime:  this.form.endTime,
                        	itemId:  this.form.itemId,
                        	itemTitle:  this.form.itemTitle,
                        	itemPictureUrl: this.form.itemPictureUrl,
                        	platformType:  this.form.platformType,
                        	freeType:  this.form.freeType,
                        	freeAccount: this.form.freeAccount,
                        	itemTotalNum: this.form.totalOrders,
                        }
                    )
                        .then((data) => {
                            console.log(data)
                            if (data.data.status == 200) {
                                this.$message.success(data.data.msg);
                                 this.form = {
                                	beginTime:"",
                                    endTime: "",
                                    itemId: "",
                                    itemTitle:"",
                                    itemPictureUrl:"",
                                    platformType: "",
                                    id: "",
                                    freeType: "",
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
                        	itemTitle:  this.form.itemTitle,
                        	itemPictureUrl: this.form.itemPictureUrl,
                        	platformType:  this.form.platformType,
                        	freeType:  this.form.freeType,
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
                post("server-admin/goodsFree/insertOrUpdate", {
                        itemId:this.form.itemId,
                        id: this.delId,
						delFlag:1,
                })
                    .then((data) => {
                        console.log(data)
                        if (data.data.status == 200) {
                            this.$message.success("删除成功~");
							// 删除旧图片
							deleteFile(this.oldForm.itemPictureUrl).then(result => {
								if (!result.success) {
									this.$message.error(result.msg)
								}
							})
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
                if (row.freeType == 1) {
                    return "固定返";
                } else if (row.freeType == 2) {
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
