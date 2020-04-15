<template>
    <div class="centCommission">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> Banner图设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-alert
                title="温馨提示："
                type="info"
                effect="dark"
                :closable="false">
        </el-alert>
        <button @click="gotolink" class="btn btn-success">点击返回上一页面</button>
        <!--<el-dropdown>
            <el-button type="primary" style="float: left;margin-left: 750px;">
                图片位置<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-select v-model="form.picType" placeholder="请选择" class="goodsPlatform mr10">
                    <el-option :key="itme.value" v-for="itme in pictureType" :label="itme.name" :value="itme.value">
                        {{itme.name}}
                    </el-option>
                </el-select>
            </el-dropdown-menu>
        </el-dropdown>-->
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">添加Banner图</el-button>
            </div>
            图片位置：
            <el-select v-model="picType" placeholder="请选择" class="handle-select mr10">
                <el-option key="1" label="请选择" value=""></el-option>
                <el-option :key="itme.value" v-for="itme in pictureType" :label="itme.name" :value="itme.value">
                    {{itme.name}}
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="companyName" label="公司">
                </el-table-column>
                <el-table-column prop="mainPictureUrl" label="缩略图">
                    <template slot-scope="scope">
                        <img :src="scope.row.mainPictureUrl+'?'+new Date().getTime()" width="90%" alt="">

                    </template>
                </el-table-column>
                <el-table-column prop="mainPictureUrl" label="链接">
                </el-table-column>
                <el-table-column prop="pictureDescription" label="描述">
                </el-table-column>
                <el-table-column prop="pictureStatus" label="显示状态">
                    <template slot-scope="scope">
                        {{funPictureStatus(scope.row.pictureStatus)}}
                    </template>
                </el-table-column>
                <el-table-column prop="picType" label="图片类型">
                    <template slot-scope="scope">
                        {{funpicType(scope.row.picType)}}
                    </template>
                </el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(2, scope.row)">编辑</el-button>
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
        <el-dialog :title="judgeTitle"
                   :visible.sync="editVisible"
                   @close="dialogClose"
                   width="40%">
            <el-form :model="form"
                     label-width="140px"
                     style="width: 70%;margin: 0 auto;">
                <el-form-item class="label_awarn" label="主图">

                    <el-upload
                            :action="imgUpsite"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            ref="upload"
                            :limit="1"
                            :data="qiniu"
                            accept=".png,.bmp,.jpg,.gif,"
                    >
                        <img v-if="form.mainPictureUrl != null" style="width:146px;height: 146px;display: inline-block;"
                             :src="form.mainPictureUrl" alt="">
                        <i class="el-icon-plus" v-if="form.mainPictureUrl == null"></i>
                    </el-upload>

                </el-form-item>


                <el-form-item class="label_awarn" label="图片位置">
                    <el-select v-model="form.picType" placeholder="请选择" class="goodsPlatform mr10">
                        <el-option :key="itme.value" v-for="itme in pictureType" :label="itme.name" :value="itme.value">
                            {{itme.name}}
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="label_awarn" label="跳转类型">
                    <el-select v-model="form.jumpType" placeholder="请选择" class="goodsPlatform mr10">
                        <el-option :key="itme.value" v-for="itme in linkTypeList" :label="itme.name"
                                   :value="itme.value">{{itme.name}}
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="label_awarn" v-if="form.jumpType == 11" label="H5跳app内或外">
                    <el-select v-model="form.linkType" placeholder="请选择" class="goodsPlatform mr10">
                        <el-option :key="0" label="在app内部跳转" :value="0"></el-option>
                        <el-option :key="1" label="跳淘宝" :value="1"></el-option>
                        <el-option :key="2" label="在app外部跳转" :value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="label_awarn" v-if="form.jumpType == 11" label="跳转链接">
                    <el-input
                            type="text"
                            placeholder="请以http或者https开头"
                            v-model="form.link">
                    </el-input>
                </el-form-item>

                <el-form-item class="label_awarn" v-if="form.jumpType == 12" label="商品id">
                    <el-input
                            type="text"
                            placeholder="商品id"
                            v-model="form.itemId">
                    </el-input>
                </el-form-item>
                <el-form-item class="label_awarn" v-if="form.jumpType == 20" label="活动id">
                    <el-input
                            type="text"
                            placeholder="活动id"
                            v-model="form.itemId">
                    </el-input>
                </el-form-item>
                <el-form-item class="label_awarn" label="图片排序">
                    <el-input
                            type="text"
                            placeholder="请输入"
                            v-model="form.sort">
                    </el-input>
                </el-form-item>

                <el-form-item label="code" class="label_awarn" v-if="form.jumpType != 20">

                    <el-select v-model="form.moduleCode" placeholder="code">
                        <el-option v-for="codeItme in codeList" :key="codeItme.value" :label="codeItme.name"
                                   :value="codeItme.value">{{codeItme.name}}
                        </el-option>
                    </el-select>

                </el-form-item>

                <el-form-item class="label_awarn" label="活动标题">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="form.pictureDescription">
                    </el-input>
                </el-form-item>


                <el-form-item class="label_awarn" label="图片状态">
                    <el-select v-model="form.pictureStatus" placeholder="请选择" class="goodsPlatform mr10">

                        <el-option :key="itme.value" v-for="itme in pictureState" :label="itme.name"
                                   :value="itme.value">{{itme.name}}
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item class="label_awarn" label="开始结束时间">
                    <el-date-picker
                            v-model="StartEndTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>


                <!-- <el-form-item label="公司" >
                    <el-select v-model="form.companyId" :disabled="judge == 2" placeholder="请选择" class="goodsPlatform mr10">
                        <el-option :key="itme.companyId" v-for="itme in list" :label="itme.compayName" :value="itme.companyId">{{itme.compayName}}</el-option>
                    </el-select>
                </el-form-item > -->

                <!--</el-form-item>-->

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
    import {post, get} from '../../../api/index';

    export default {
        name: 'centCommission',
        data() {
            return {
                picType: null,
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
                codeList: [
                    {name: "1（今日爆款数据）", value: 1},
                    {name: "2（白菜专区数据）", value: 2},
                    {name: "3（聚划算数据）", value: 3},
                    {name: "4（淘抢购数据）", value: 4},
                    {name: "5（9.9包邮）", value: 5},
                    {name: "6（好物推荐）", value: 6},
                    /*{name: "7", value: 7},
                    {name: "8", value: 8},
                    {name: "9", value: 9},
                    {name: "10", value: 10}*/
                ],

                form: {

                    goodsPictureUrl: null,
                    pictureDescription: "",
                    picType: "",
                    pictureStatus: "",
                    // companyId: "",
                    id: "",
                    mainPictureUrl: "",
                    thumbnailsUrl: "",
                    jumpType: "",
                    link: "",
                    sort: "",
                    moduleCode: "",
                    linkType: "",
                    itemId: "",
                    activeId: "",
                },
                StartEndTime: null,
                //上传图片获取的参数
                imgToken: null,//token
                imgSite: null,//site七牛云需要拼接的url
                imgUpsite: null,//上传图片需要的地址
                qiniu: {
                    token: null,
                },

                fileListLength: 0,//图片文件列表的长度
                page: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                },
                idx: -1,
                id: -1,
                judge: "",
                judgeTitle: "新增",
                list: [],
                pictureType: [
                    {name: '首页banner广告位', value: 1},
                    {name: '新人免单banner区', value: 2},
                    {name: '淘宝天猫活动区', value: 3},
                    {name: '广告弹窗', value: 4},
                    {name: '首页海报', value: 5},//备注6不可用，王跃说的
                    {name: '首页浮窗', value: 7},
                ],
                linkTypeList: [
                    {name: '今日爆款', value: 1},
                    {name: '白菜专区', value: 2},
                    {name: '新人专享（免单）', value: 3},
                    {name: '朋友圈', value: 4},
                    {name: '邀请赚钱', value: 5},
                    {name: '签到模块', value: 6},
                    {name: 'H5链接', value: 11},
                    {name: '商品详情', value: 12},
                    {name: '省钱教程', value: 13},
                    {name: '官方活动页', value: 20},
                    {name: '快速提现', value: 21},
                    {name: '9.9包邮', value: 22},
                    {name: '好物推荐', value: 23},
                    {name: '任务页面', value: 24},
					{name: '首单弹窗', value: 25},
                ],
                pictureState: [
                    {name: '未使用', value: 1},
                    {name: '使用', value: 2},
                ],
            }
        },
        created() {
            this.getData(1);
            this.getImgData();
            this.getCompanyData();
        },

        /*watch:{
            '$route' (to, from) { //监听路由是否变化
                console.log(to)
                if(this.$route.query.tableId){// 判断条件1  判断传递值的变化
                    //获取文章数据
                    this.getData(1);

                }
            }
        },*/
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    return d
                })
            }
        },
        methods: {
            gotolink() {
                this.$router.go(-1);
            },
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
                get("web/bannerPicture/findAllBanner", {
                    params: {
                        picType: this.picType,
                        currentPage: pageNum,
                        pageSize: vue.page.pageSize,
                        total: vue.page.total,
                    }
                })
                    .then(function (data) {
                        let arr = []
                        //一个数组用来接收加工后台传过来的数据
                        console.log(data.data.data.list)
                        vue.tableData = data.data.data.list
                        // vue.page.pageSize = data.data.data.pageSize;
                        vue.page.pageNum = data.data.data.pageNum;

                        vue.page.total = Number(data.data.data.total)
                        console.log(vue.tableData)

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
            dialogClose() {
                console.log(this.$refs)
                this.$refs.upload.clearFiles()
            },
            getCompanyData() {
                //获取公司数据
                get("web/find/commpany/list", {
                    params: {
                        currentPage: 1,
                        pageSize: 1000,
                    }
                })
                    .then((data) => {
                        console.log(data.data.data.list)
                        this.list = data.data.data.list
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            funPictureStatus(value) {
                //平台
                // console.log(value)
                switch (value) {
                    case 1:
                        return "未使用";
                    case 2:
                        return "使用";
                    default:
                        return "未知";
                }
            },
            funpicType(value) {
                //平台
                // console.log(value)
                switch (value) {
                    case 1:
                        return "首页banner广告位";
                    case 2:
                        return "新人免单banner区";
                    case 3:
                        return "淘宝天猫活动区";
                    case 4:
                        return "广告弹窗";
                    case 5:
                        return "首页海报";
                    case 6:
                        return "新人免单(老版)";
                    case 7:
                        return "首页浮窗";
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

                if (this.$refs.upload) {
                    if (this.$refs.upload.fileList.length == 0) {
                        let upload = document.getElementsByClassName("el-upload--picture-card");
                        upload[0].style.display = "inline-block";
                    } else {
                        this.$refs.upload.clearFiles()
                        let upload = document.getElementsByClassName("el-upload--picture-card");
                        upload[0].style.display = "inline-block";
                    }
                }


                if (index == 1) {
                    this.judge = index;
                    this.judgeTitle = "新增"
                    this.form = {
                        goodsPictureUrl: null,
                        pictureDescription: "",
                        picType: "",
                        pictureStatus: "",
                        companyId: "",
                        id: "",
                        mainPictureUrl: null,
                        thumbnailsUrl: "",
                        jumpType: "",
                        linkType: "",
                        link: "",
                        sort: "",
                        moduleCode: "",
                        itemId: "",
                        activeId: "",
                    }
                    this.StartEndTime = null

                } else {
                    console.log(row)
                    this.judge = index;
                    this.judgeTitle = "编辑"
                    console.log(row.goodsPictureUrl)
                    this.form = {
                        goodsPictureUrl: row.goodsPictureUrl,
                        pictureDescription: row.pictureDescription,
                        picType: row.picType,
                        pictureStatus: row.pictureStatus,
                        companyId: row.companyId,
                        id: row.id,
                        mainPictureUrl: row.mainPictureUrl,
                        thumbnailsUrl: row.thumbnailsUrl,
                        jumpType: row.jumpType,
                        linkType: row.linkType,
                        link: row.pictureLink,
                        sort: row.sort,
                        moduleCode: row.moduleCode,
                        itemId: row.itemId,
                        activeId: row.activeId,
                    }
                    this.dialogImageUrl = row.mainPictureUrl;
                    this.StartEndTime = [new Date(Number(new Date(row.popupStartTime))), new Date(Number(new Date(row.popupEndTime)))]
                    console.log(this.StartEndTime)
                }
            },
            handleDelete(index, row) {
                // this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
            deleteRow() {
                this.delVisible = false;
                //alert("id====>>>>"+this.id)
                get("web/bannerPicture/delete", {
                    params: {
                        id: this.id
                    }
                })
                    .then((data) => {
                        if (data.data.status == 200) {

                            this.$message.success(data.data.msg);
                            this.getData()

                        } else {
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
                if (this.form.mainPictureUrl == null || this.form.mainPictureUrl == '') {
                    console.log(this.form.mainPictureUrl)
                    this.$message.error("请上传一张图片");
                    return "请上传一张图片"
                }
                if (this.form.picType == null || this.form.picType == '') {
                    console.log(this.form.mainPictureUrl)
                    this.$message.error("请选择图片位置");
                    return "请选择图片位置"
                }
                if (this.form.jumpType == null || this.form.jumpType == '') {
                    console.log(this.form.mainPictureUrl)
                    this.$message.error("请选择跳转类型");
                    return "请选择跳转类型"

                }
                if (this.form.link == null || this.form.link == '') {
                    console.log(this.form.mainPictureUrl)
                    if (this.form.jumpType == 11) {
                        this.$message.error("请输入跳转链接");
                        return "请输入跳转链接"
                    }

                }

                if (this.form.sort == null || this.form.sort == '') {
                    console.log(this.form.mainPictureUrl)
                    this.$message.error("请输入图片排序");
                    return "请输入图片排序"
                }
                if (this.form.moduleCode == null || this.form.moduleCode == '') {
                    console.log(this.form.mainPictureUrl)
                    if (this.form.jumpType == 1 || this.form.jumpType == 2 || this.form.jumpType == 20) {

                    } else {
                        this.$message.error("当跳转类型为今日爆款，白菜专区是需要输入code");
                        return "当跳转类型为今日爆款，白菜专区是需要输入code"
                    }
                }
                if (this.form.pictureDescription == null || this.form.pictureDescription == '') {
                    console.log(this.form.mainPictureUrl)
                    this.$message.error("请输入活动标题");
                    return "请输入活动标题"
                }
                if (this.form.pictureStatus == null || this.form.pictureStatus == '') {
                    console.log(this.form.mainPictureUrl)
                    this.$message.error("请输入图片状态");
                    return "请输入图片状态"
                }
                if (this.StartEndTime == null || this.StartEndTime == '') {
                    console.log(this.form.mainPictureUrl)
                    this.$message.error("请选择时间");
                    return "请选择时间"
                }


                this.editVisible = false;
                console.log(this.form)
                post("web/bannerPicture/save", {
                    //companyId: this.form.companyId,
                    id: this.form.id,
                    mainPictureUrl: this.form.mainPictureUrl,
                    picType: this.form.picType,
                    pictureDescription: this.form.pictureDescription,
                    pictureName: "",
                    picturePath: "",
                    pictureStatus: this.form.pictureStatus,
                    // thumbnailsUrl: this.form.mainPictureUrl,
                    sort: this.form.sort,
                    jumpType: this.form.jumpType,
                    linkType: this.form.linkType,
                    pictureLink: this.form.link,
                    moduleCode: this.form.moduleCode,
                    itemId: this.form.itemId,
                    activeId: this.form.activeId,

                    popupStartTime: this.timeTransition(this.StartEndTime[0]),
                    popupEndTime: this.timeTransition(this.StartEndTime[1]),

                })
                    .then((data) => {
                        if (data.data.status == 200) {

                            this.$message.success(data.data.msg);
                            this.getData()

                        } else {
                            this.$message.error(data.data.msg);
                        }
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
                this.form.mainPictureUrl = this.imgSite + "/" + response.key
                this.form.goodsPictureUrl = null
                if (fileList.length == 1) {
                    let upload = document.getElementsByClassName("el-upload--picture-card")
                    upload[0].style.display = "none"
                }
            },
            handleRemove(file, fileList) {
                //删除的回调函数
                console.log(file);
                this.qiniuimage = null;
                this.form.mainPictureUrl = null,
                    this.$refs.upload.clearFiles()
                if (fileList.length == 0) {
                    let upload = document.getElementsByClassName("el-upload--picture-card");
                    upload[0].style.display = "inline-block";
                    this.fileListLength = fileList.length;
                }

            },
            timeTransition(beginTime) {
                //转换时间
                if (beginTime == null) {
                    return '';
                } else if (beginTime == '') {
                    return '';
                }
                let d = new Date(Number(beginTime));    //根据时间戳生成的时间对象
                let date = (d.getFullYear()) + "-" +
                    (d.getMonth() + 1) + "-" +
                    (d.getDate()) + " " +
                    (d.getHours()) + ":" +
                    (d.getMinutes()) + ":" +
                    (d.getSeconds());
                return date;
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

    .el-alert--info.is-dark {
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

    .el-dropdown {
        vertical-align: top;
    }

    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>
