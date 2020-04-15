<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 商品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">新增</el-button>
                发布时间：
                <el-date-picker
                        v-model="time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>

                店铺类型：
                <el-select v-model="shoptype" placeholder="请选择" class="handle-select mr10">
                    <el-option key="1" label="请选择" value=""></el-option>
                    <el-option v-for="itme in storeTypeList" :label="itme.name" :value="itme.Value">{{itme.name}}
                    </el-option>
                    <!-- <el-option key="2" label="总公司" value="总公司"></el-option> -->
                </el-select>
                分类：
                <el-select v-model="fqcat" placeholder="请选择" class="handle-select mr10">
                    <el-option key="1" label="请选择" value=""></el-option>
                    <el-option v-for="itme in ClassifyList" :label="itme.cname" :value="itme.cid">{{itme.cname}}
                    </el-option>
                    <!-- <el-option key="2" label="总公司" value="总公司"></el-option> -->
                </el-select>
                <div style="width: 20%;display: inline-block;">
                    <span>价格区间： </span>
                    <el-input style="width: 20%" v-model="minItemprice" placeholder="小"
                              class="handle-input mr10"></el-input>
                    <span>— &nbsp; </span>
                    <el-input style="width: 20%" v-model="maxItemprice" placeholder="大"
                              class="handle-input mr10"></el-input>
                </div>
                <div style="width: 20%;display: inline-block;">
                    <span>销量区间： </span>
                    <el-input style="width: 20%" v-model="minItemsale" placeholder="小"
                              class="handle-input mr10"></el-input>
                    <span>— &nbsp; </span>
                    <el-input style="width: 20%" v-model="maxItemsale" placeholder="大"
                              class="handle-input mr10"></el-input>
                </div>
                <el-input v-model="itemtitle" placeholder="请输入关键字搜索" class="handle-input mr10"></el-input>
                <el-input v-model="itemid" placeholder="请输入ID搜索" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>
            <el-table v-loading="loading" :data="data" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column prop="itemid" label="宝贝ID">
                    <template slot-scope="scope">
                        <div @click="taobao(scope.row.itemid)" style="cursor: pointer;">
                            {{scope.row.itemid}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="itempic" label="缩略图">
                    <template slot-scope="scope">
                        <img style="width: 90%;" :src="scope.row.itempic" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="itemshorttitle" label="商品名称">
                </el-table-column>
                <el-table-column prop="fqcat" label="分类">
                    <template slot-scope="scope">
                        <span v-if="scope.row.fqcat=='0'">推荐</span>
                        <span v-else-if="scope.row.fqcat=='1'">女装</span>
                        <span v-else-if="scope.row.fqcat=='2'">男装</span>
                        <span v-else-if="scope.row.fqcat=='3'">内衣配饰</span>
                        <span v-else-if="scope.row.fqcat=='4'">美妆</span>
                        <span v-else-if="scope.row.fqcat=='6'">鞋靴箱包</span>
                        <span v-else-if="scope.row.fqcat=='9'">母婴</span>
                        <span v-else-if="scope.row.fqcat=='10'">居家</span>
                        <span v-else-if="scope.row.fqcat=='11'">美食</span>
                        <span v-else-if="scope.row.fqcat=='12'">数码家电</span>
                        <span v-else-if="scope.row.fqcat=='15'">文体车品</span>
                    </template>
                </el-table-column>
                <el-table-column prop="itemprice" label="原价">
                </el-table-column>
                <el-table-column prop="itemendprice" label="劵后价">
                </el-table-column>
                <el-table-column prop="couponmoney" label="劵否">
                    <template slot-scope="scope">
                        <span v-if="scope.row.couponmoney">有券</span>
                        <span v-else="scope.row.couponmoney">无券</span>
                    </template>
                </el-table-column>
                <el-table-column prop="couponmoney" label="劵额">
                </el-table-column>

                <el-table-column prop="commission" label="佣金">

                </el-table-column>

                <el-table-column prop="tkrates" label="比率">
                </el-table-column>
                <el-table-column prop="itemsale" label="销量">
                </el-table-column>
                <el-table-column prop="shoptype" label="来源">
                    <template slot-scope="scope">
                        <span v-if="scope.row.shoptype == 'B' ">天猫</span>
                        <span v-else="scope.row.shoptype == 'C'">淘宝</span>
                    </template>
                </el-table-column>
                <el-table-column prop="itemRanking" label="排序">
                </el-table-column>
                <!--<el-table-column prop="type" label="状态" :formatter="formatter">
                    可用
                </el-table-column>-->
                <!-- <el-table-column prop="updateTime" label="发布时间">
                     <template slot-scope="scope">
                         {{timeTransition(scope.row.updateTime)}}
                     </template>
                 </el-table-column>-->

                <el-table-column prop="rebateType" label="返利类型" :formatter="rebateFormatter">
                </el-table-column>

                <el-table-column prop="rebateAmt" label="返利金额">
                </el-table-column>

                <el-table-column prop="rebateNum" label="返利数量">
                </el-table-column>

                <el-table-column show-overflow-tooltip prop="giftUrl" label="淘礼金url">
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(2, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <el-button type="text" @click="sortUp(1,scope.row)">上移</el-button>
                        <el-button type="text" @click="sortDown(1, scope.row)">下移</el-button>
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
        <el-dialog :title="judgeTitle" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="商品ID" v-if="judge == 1">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="返利金额">
                    <el-input v-model="form.rebateAmt"></el-input>
                </el-form-item>
                <el-form-item label="返利数量">
                    <el-input v-model="form.rebateNum"></el-input>
                </el-form-item>
                <el-form-item class="label_awarn" label="返利类型">
                    <el-select v-model="form.rebateType" placeholder="请选择" class="goodsPlatform mr10">
                        <el-option :key="itme.value" v-for="itme in linkTypeList" :label="itme.name"
                                   :value="itme.value">{{itme.name}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="label_awarn" v-if="form.rebateType == 2" label="淘礼金url">
                    <el-input
                            type="text"
                            placeholder="请以http或者https开头"
                            v-model="form.giftUrl">
                    </el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.itemRanking"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 图片放大 -->
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
    import Vue from 'vue'

    export default {
        name: 'goodsRecommend',
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
                updateTaoBao: false,
                column: null,//排序的字段名
                descOrAsc: null,//排序的升序降序1降2升
                // 时间
                time: null,

                endCreateTime: null,//发布的开始时间
                startCreateTime: null,
                fqcat: "",//分类

                itemid: null,//商品id
                itemtitle: null,//商品标题


                // 价格
                maxItemprice: "",//价格大
                minItemprice: "",//价格小
                // 销量
                maxItemsale: null,//销量大
                minItemsale: null,//销量小

                shoptype: "",//店铺类型

                linkTypeList: [
                    {name: '固定返', value: 1},
                    {name: '淘礼金', value: 2},
                ],
                taoBaoGift: [],
                dateTime: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
                form: {
                    name: '',
                    id: '',
                    fqcat: '',
                    itemRanking: '',
                    rebateType: '',
                    rebateNum: '',
                    rebateAmt: '',
                    giftUrl: '',
                },
                page: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                },
                idx: -1,
                id: -1,
                loading: false,
                storeTypeList: [
                    {Value: "C", name: "淘宝店"},
                    {Value: "B", name: "天猫"}
                ],
                ClassifyList: [],
                qiniu: {
                    token: null,
                },
                dialogImageUrl: '',
                dialogVisible: false,
                imgToken: null,//token
                imgSite: null,//site七牛云需要拼接的url
                imgUpsite: null,//上传图片需要的地址
                qiniuimage: null,
                goodsPictureUrl: null,
                judge: 1,//判断依据，用于判断是新增还是修改
                judgeTitle: "编辑",//弹出框的标题，和judge一起进行
                tableId: null,//更新用的tableId
                syTableId: null,
            }

        },
        created() {
            this.getData(1);
            this.getClassifyData()
            this.getImgData()
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
            taobao(id) {
                window.open("https://detail.tmall.com/item.htm?id=" + id)
                // window.location = "https://detail.tmall.com/item.htm?id="+ id
            },
            // 获取数据
            getData(pageNum) {
                this.loading = true,
                    console.log(this.time)
                let endCreateTime = null, startCreateTime = null
                if (this.time) {
                    endCreateTime = this.time[0]
                    startCreateTime = this.time[1]
                }
                let vue = this
                post("web/appGoods/goodsRecommend", {
                    // 排序
                    column: this.column,//排序的字段名
                    descOrAsc: this.descOrAsc,//排序的升序降序1降2升
                    // 时间
                    endCreateTime: endCreateTime,//发布的开始时间
                    startCreateTime: startCreateTime,

                    fqcat: this.fqcat,//分类

                    itemid: this.itemid,//商品id
                    itemtitle: this.itemtitle,//商品标题

                    // 价格
                    maxItemprice: this.maxItemprice,//价格大
                    minItemprice: this.minItemprice,//价格小
                    // 销量
                    maxItemsale: this.maxItemsale,//销量大
                    minItemsale: this.minItemsale,//销量小

                    shoptype: this.shoptype,//店铺类型


                    //分页
                    pageNum: pageNum,
                    pageSize: vue.page.pageSize,
                    total: vue.page.total,

                })
                    .then(function (data) {
                        vue.loading = false;
                        let arr = []
                        //一个数组用来接收加工后台传过来的数据
                        console.log(data.data.data.records)
                        //alert("1111111111111111======="+JSON.stringify(data.data.data.records))
                        vue.tableData = data.data.data.records;

                        // vue.page.pageSize = Number(data.data.data.size);
                        vue.page.pageNum = Number(data.data.data.current);
                        vue.page.total = Number(data.data.data.total)

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getClassifyData() {
                get("web/appGoods/getClassify", {
                    params: {}

                })
                    .then((data) => {
                        this.ClassifyList = data.data.data;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
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
            addGoods() {
                //添加接口
                post("web/goodsRecommend/insert", {
                    itemid: this.form.id,
                    itemRanking: this.form.itemRanking,
                    itemtitle: this.form.name,
                    rebateType: this.form.rebateType,
                    rebateNum: this.form.rebateNum,
                    rebateAmt: this.form.rebateAmt,
                    giftUrl: this.form.giftUrl,
                    tableId: this.tableId,
                })
                    .then((data) => {
                        console.log(data)
                        if (data.data.status == 200) {
                            console.log(data.data.data)
                            this.$message.success(data.data.msg);
                            this.getData(1)
                            this.editVisible = false;
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            updateGoods() {
                //修改接口

                post("web/goodsRecommend/update", {
                    itemid: this.form.id,
                    itemRanking: this.form.itemRanking,
                    itemshorttitle: this.form.name,
                    tableId: this.tableId,
                    syTableId: this.syTableId,
                    rebateType: this.form.rebateType,
                    rebateNum: this.form.rebateNum,
                    rebateAmt: this.form.rebateAmt,
                    giftUrl: this.form.giftUrl,
                })
                    .then((data) => {
                        if (data.data.status == 200) {
                            this.$message.success(data.data.msg);
                            this.getData(1);
                            this.editVisible = false;
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 上移按钮
            sortUp(index, row) {
                //alert("row======"+row)
                /*if (index === 0) {
                    this.$message({
                        message: '已经是列表中第一个！',
                        type: 'warning'
                    })
                } else {
                    let temp = this.data[index - 1]
                    Vue.set(this.data, index - 1, this.data[index])
                    Vue.set(this.data, index, temp)
                }*/
                //alert("id======>>>>>>>>>>>>>" + row.itemid);
                //alert("111==="+this.fqcat);
                post("web/goodsRecommend/sortUp", {
                    itemid: row.itemid,
                    fqcat: this.fqcat,
                    shoptype:this.shoptype,
                })
                    .then((data) => {
                        if (data.data.status == 200) {
                            this.$message.success(data.data.msg);
                            this.getData(1);
                            //this.editVisible = false;
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 下移按钮
            sortDown(index, row) {
                /*if (index === (this.data.length - 1)) {
                    this.$message({
                        message: '已经是列表中最后一个！',
                        type: 'warning'
                    })
                } else {
                    let i = this.data[index + 1]
                    Vue.set(this.data, index + 1, this.data[index])
                    Vue.set(this.data, index, i)
                }*/
                //alert("id==========>>>>>>>>>>>>>" + row.itemid);
                post("web/goodsRecommend/sortDown", {
                    itemid: row.itemid,
                    fqcat: this.fqcat,
                    shoptype:this.shoptype,
                })
                    .then((data) => {
                        if (data.data.status == 200) {
                            this.$message.success(data.data.msg);
                            this.getData(1);
                            //this.editVisible = false;
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            handleDelete(index, row) {
                this.syTableId = row.syTableId;
                this.form.id=row.itemid;
                this.delVisible = true;

            },
            //删除
            deleteRow() {
                this.delVisible = false;
                //alert("id====>>>>"+this.form.id);
                post("web/goodsRecommend/del", {
                    syTableId: this.syTableId,
                    itemid:this.form.id,
                })
                    .then((data) => {
                        //console.log(data)
                        if (data.data.status == 200) {

                            this.$message.success(data.data.msg);
                            this.getData(1)
                            this.editVisible = false;
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            timeTransition(beginTime) {
                //转换时间
                let arr = beginTime.split("T");
                let d = arr[0];
                let darr = d.split('-');

                let t = arr[1];
                let tarr = t.split('.000');
                let marr = tarr[0].split(':');

                let dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);

                return dd;
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            rebateFormatter(row, column) {
                if (row.rebateType == 1) {
                    return "固定返";
                } else if (row.rebateType == 2) {
                    return "淘礼金";
                } else {
                    return null;
                }
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                //打开新增和编辑的弹框

                this.qiniuimage = '';
                this.editVisible = true;
                // 				if(json.hasOwnProperty("key1")){
                //
                // console.log(json["key1]);
                //
                // }
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
                        id: null,
                        itemRanking: null,
                        name: null,
                        rebateType: null,
                        rebateNum: null,
                        rebateAmt: null,
                        giftUrl: null,
                    }
                } else {
                    this.judge = index;
                    this.judgeTitle = "编辑"
                    //console.log(row.goodsPictureUrl)
                    //alert("id-==="+row.syTableId);
                    this.form = {
                        id: row.itemid,
                        itemRanking: row.itemRanking,
                        name: row.itemshorttitle,
                        rebateType: row.rebateType,
                        rebateNum: row.rebateNum,
                        rebateAmt: row.rebateAmt,
                        giftUrl: row.giftUrl,
                    }
                    this.tableId = row.tableId;
                    this.syTableId = row.syTableId;
                    this.dialogImageUrl = row.goodsPictureUrl;


                }
            },

            delAll() {

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                if (this.judge == 1) {
                    //新增
                    this.addGoods()
                } else {
                    //修改
                    this.updateGoods()
                }
            },
            //上传图片
            handleSuccess(response, file, fileList) {
                //成功的回调函数
                console.log(response.key)
                this.qiniuimage = this.imgSite + response.key
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
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 160px;
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
