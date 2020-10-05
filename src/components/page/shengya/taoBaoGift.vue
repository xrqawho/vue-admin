<template>
    <div v-loading="loading">
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>兑换码</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="container">
                <el-button type="primary" size="medium" @click="addEdit()">添加</el-button>
                <div class="handle-box">
                    <el-input v-model="giftCode" placeholder="请输入总换码搜索" class="handle-input mr10"></el-input>
                    <el-input v-model="itemId" placeholder="请输入宝贝ID搜索" class="handle-input mr10"></el-input>
                    <el-input v-model="giftStatus" placeholder="请输入状态搜索" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
                </div>
                <el-table v-loading="loading" :data="data" border class="table" ref="multipleTable"
                          @selection-change="handleSelectionChange">
                    <!--<el-table-column prop="id" label="id">
                    </el-table-column>-->

                    <el-table-column prop="itemId" label="宝贝ID">
                    </el-table-column>

                    <el-table-column prop="itempic" label="缩略图">
                        <template slot-scope="scope">
                            <img style="width: 90%;" :src="scope.row.itempic" alt="">
                        </template>
                    </el-table-column>

                    <el-table-column prop="itemshorttitle" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="giftlable" label="淘礼金标签">
                    </el-table-column>
                    <!--<el-table-column show-overflow-tooltip prop="giftUrl" label="淘礼金Url">
                    </el-table-column>-->
                    <el-table-column prop="activeId" label="活动id">
                    </el-table-column>
                    <el-table-column prop="giftCode" label="总换码">
                    </el-table-column>

                    <el-table-column prop="totalNum" label="淘礼金总数量">
                    </el-table-column>
                    <!--<el-table-column prop="clickNum" label="点击兑换次数">
                    </el-table-column>-->

                    <el-table-column prop="giftNum" label="剩余数量">
                    </el-table-column>

                    <el-table-column prop="giftAmt" label="淘礼金金额">
                    </el-table-column>

                    <el-table-column prop="numOfPerson" label="每人兑换次数">
                    </el-table-column>
                    <el-table-column prop="startDate" label="活动开始日期" value-format="yyyy-MM-dd">
                        <template slot-scope="scope">
                            {{ timeTransition(scope.row.startDate,"yyyy-MM-dd hh:mm:ss")}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="endDate" label="活动结束日期" value-format="yyyy-MM-dd">
                        <template slot-scope="scope">
                            {{ timeTransition(scope.row.endDate,"yyyy-MM-dd hh:mm:ss")}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="giftStatus" label="状态" :formatter="formatter">
                    </el-table-column>

                    <!--<el-table-column prop="createTime" label="创建时间">
                    </el-table-column>

                    <el-table-column prop="updateTime" label="修改时间">
                    </el-table-column>-->

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="updateEdit(1, scope.row)">编辑</el-button>
                            <el-button type="text" @click="addTotalNum(1, scope.row)">添加数量</el-button>
                            <el-button type="text" icon="el-icon-delete" class="red"
                                       @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>

                    <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTaobaoGift">确 定</el-button>
                </span>
                </el-table>

                <!--添加数量弹出框-->
                <el-dialog title="添加" :visible.sync="saveTaotalNum" width="30%">
                    <el-form ref="addTotalNum" :model="gift">
                        <el-form-item label="淘礼金数量">
                            <el-input v-model="gift.totalNum" placeholder="不能为空" style="width:100px;height: 40px"></el-input>
                        </el-form-item>
                        <el-form-item label="活动id">
                            <el-input v-model="gift.activeId" placeholder="可以为空" style="width:350px;height: 40px;margin-left: 30px"></el-input>
                        </el-form-item>
                        <el-form-item label="淘礼金url">
                            <el-input v-model="gift.giftUrl"  placeholder="可以为空" style="width:450px;height: 40px;margin-left: 10px"></el-input>
                        </el-form-item>
                        <el-form-item label="开始结束时间">
                            <el-date-picker
                                    v-model="startEndDate"
                                    :default-time="['00:00:00', '23:59:59']"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-button @click="saveTaotalNum = false">取 消</el-button>
                        <el-button type="primary" @click="saveTaoBaoTotalNum">确 定</el-button>
                    </el-form>
                </el-dialog>


                <!--添加弹出框-->
                <el-dialog title="添加" :visible.sync="saveGift" width="40%">
                    <el-form ref="saveGiftForm" :model="gift" label-width="25%">

                        <el-form-item label="商品id" v-if="addGift==1">
                            <el-input v-model="gift.itemId" style="width: 250px;"></el-input>
                        </el-form-item>

                        <!--<el-form-item label="淘礼金Url" v-if="addGift==1">
                            <el-input v-model="gift.giftUrl"></el-input>
                        </el-form-item>-->
                        <el-form-item label="活动id" v-if="addGift==1">
                            <el-input v-model="gift.activeId" style="width: 300px;"></el-input>
                        </el-form-item>
                        <el-form-item label="淘礼金数量" v-if="addGift==1">
                            <el-input v-model="gift.totalNum" style="width: 100px;"></el-input>
                        </el-form-item>

                        <el-form-item label="淘礼金金额" v-if="addGift==1">
                            <el-input v-model="gift.giftAmt" style="width: 100px;"></el-input>
                        </el-form-item>

                        <el-form-item label="每人兑换次数" v-if="addGift==1">
                            <el-input v-model="gift.numOfPerson" style="width: 100px;"></el-input>
                        </el-form-item>

                        <el-form-item label="兑换码" v-if="addGift==1">
                            <el-input v-model="gift.giftCode" style="width: 100px;"></el-input>
                        </el-form-item>

                        <el-form-item label="淘礼金标签" v-if="addGift==1">
                            <el-input v-model="gift.giftlable" style="width: 150px;"></el-input>
                        </el-form-item>

                        <el-form-item label="排序" v-if="addGift==1">
                            <el-input v-model="gift.itemRanking"
                                      type="text"
                                      placeholder="请输入0到10之间的数"
                                      style="width: 100px;"></el-input>
                        </el-form-item>

                        <el-form-item label="状态" v-if="addGift==1">
                            <el-select v-model="gift.giftStatus" placeholder="请选择" class="handle-select mr10">
                                <el-option key="1" label="有效" :value="1"></el-option>
                                <el-option key="2" label="无效" :value="2"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="开始结束时间" v-if="addGift==1">
                            <el-date-picker
                                    v-model="startEndDate"
                                    :default-time="['00:00:00', '23:59:59']"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>

                    </el-form>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="saveGift = false">取 消</el-button>
                <el-button type="primary" @click="addSaveTaoBaoGift">确 定</el-button>
            </span>
                </el-dialog>
                <!--编辑弹出框-->
                <el-dialog title="编辑" :visible.sync="addTaobaoGift" width="30%">
                    <el-form ref="addTaobaoGiftForm" :model="gift" label-width="25%">
                        <!--<el-form-item label="淘礼金Url" v-if="addGift==1">
                            <el-input v-model="gift.giftUrl"></el-input>
                        </el-form-item>-->
                        <!--<el-form-item label="活动id" v-if="addGift==1">
                            <el-input v-model="gift.activeId"></el-input>
                        </el-form-item>
                        <el-form-item label="淘礼金数量" v-if="addGift==1">
                            <el-input v-model="gift.totalNum"></el-input>
                        </el-form-item>
                        <el-form-item label="淘礼金金额" v-if="addGift==1">
                            <el-input v-model="gift.giftAmt"></el-input>
                        </el-form-item>-->
                        <el-form-item label="兑换码" v-if="addGift==1">
                            <el-input v-model="gift.giftCode" style="width: 100px;"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="每人兑换次数" v-if="addGift==1">
                            <el-input v-model="gift.numOfPerson"></el-input>
                        </el-form-item>-->
                        <el-form-item label="开始结束时间" v-if="addGift==1">
                            <el-date-picker
                                    v-model="startEndDate"
                                    :default-time="['00:00:00', '23:59:59']"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="淘礼金标签" v-if="addGift==1">
                            <el-input v-model="gift.giftlable" style="width: 150px;"></el-input>
                        </el-form-item>
                        <el-form-item label="排序" v-if="addGift==1">
                            <el-input v-model="gift.itemRanking"
                                      type="text"
                                      placeholder="请输入0到10之间的数"
                                      style="width: 100px;"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" v-if="addGift==1">
                            <el-select v-model="gift.giftStatus" value-key="有效" placeholder="请选择"
                                       class="handle-select mr10">
                                <el-option key="1" label="有效" value="1"></el-option>
                                <el-option key="2" label="无效" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="addTaobaoGift = false">取 消</el-button>
                <el-button type="primary" @click="saveTaobaoGift">确 定</el-button>
            </span>
                </el-dialog>
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper"
                                   :total="page.total" :page-size="page.pageSize" :current-page="page.pageNum">
                    </el-pagination>
                </div>

            </div>
            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {post, get} from '../../../api/index';

    export default {
        name: "taoBaoGift",
        data() {
            return {

                tableData: [],

                cur_page: 1,

                multipleSelection: [],
                giftCode: null,
                itemId: null,
                giftStatus: null,
                itemRanking: 1,
                gift: {
                    id: '',
                    itemId: '',
                    giftUrl: '',
                    giftAmt: '',
                    giftCode: '',
                    totalNum: '',
                    numOfPerson: '',
                    startDate: '',
                    endDate: '',
                    giftlable: '',
                    giftStatus: 1,
                    itemRanking: 1,
                    giftNum: '',
                    clickNum: 0,
                    activeId: '',
                },
                startDate: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
                startEndDate: null,
                addTaobaoGift: false,
                saveTaotalNum: false,
                loading: false,
                addGift: 1,
                saveGift: false,
                delId: null,//要删除的id
                delVisible: false,
                page: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                },
            }
        },
        created() {
            this.getData(1);
            //this.getTaoBaoGiftById();
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange(val) {
                this.getDate(val)
            },
            //分页查询
            getData(pageNum) {
                debugger;
                this.loading = true;
                let vue = this;
                post("server-admin/tlj/getTljList", {
                    //params: {
                    itemId: this.itemId,

                    giftCode: this.giftCode,

                    giftStatus: this.giftStatus,

                    //分页
                    pageNum: pageNum,
                    pageSize: vue.page.pageSize,
                    total: vue.page.total,
                    //}
                }).then(function (data) {
                    vue.loading = false;
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
                    console.log(data.data.data.records)
                    vue.tableData = data.data.data.records;

                    // vue.page.pageSize = Number(data.data.data.size);
                    vue.page.pageNum = Number(data.data.data.current);
                    vue.page.total = Number(data.data.data.total)

                })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            //添加
            add() {
                this.loading = true,
                    console.log(this.startEndDate)
                let startDate = null, endDate = null
                if (this.startEndDate) {
                    startDate = this.startEndDate[0]
                    endDate = this.startEndDate[1]
                }
                let vue = this

                post("web/taobao/add", {
                    itemId: this.gift.itemId,
                    //giftUrl: this.gift.giftUrl,
                    totalNum: this.gift.totalNum,
                    giftAmt: this.gift.giftAmt,
                    activeId: this.gift.activeId,
                    giftCode: this.gift.giftCode,
                    numOfPerson: this.gift.numOfPerson,
                    startDate: startDate,
                    endDate: endDate,
                    giftlable: this.gift.giftlable,
                    giftStatus: this.gift.giftStatus,
                    itemRanking: this.gift.itemRanking,

                }).then((data) => {
                    //console.log(data)
                    if (data.data.status == 200) {
                        //console.log(data.data.data)
                        this.$message.success(data.data.msg);
                        this.getData();
                        this.saveGift = false;
                        /*this.getTaoBao(
                            itemId=this.taoBaoGift.itemId,
                            giftUrl=this.taoBaoGift.giftUrl,

                        );*/
                    } else {
                        this.loading = false;
                        this.$message.error(data.data.msg);

                    }
                }).catch(function (error) {
                    this.loading = true;
                    console.log(error);
                })
            },
            addEdit() {
                this.saveGift = true;
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
                this.startEndDate = null
            },
            //编辑
            updateEdit(index, row) {
                //alert("itemId==========>>>>"+row.id)
                this.getTaoBaoGiftById(row.id);
                this.addTaobaoGift = true;
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
            },
            addTotalNum(index, row) {
                //alert("22222====="+row.id);
                this.gift.id = row.id;
                this.saveTaotalNum = true;
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
                this.gift.totalNum = null;
                this.startEndDate = null;
                this.activeId = null;
            },
            //删除
            deleteRow() {
                // this.$message.success('删除成功');
                this.delVisible = false;
                //alert("id="+this.form.goodsId);
                get("web/taobao/del", {
                    params: {
                        id: this.delId,
                        itemId: this.gift.itemId,
                    }
                })
                    .then((data) => {
                        console.log(data)
                        //alert("22"+data.data.msg)
                        if (data.data.status == 200) {
                            this.$message.success(data.data.msg);
                            this.getData();
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleDelete(index, row) {
                // console.log(row)
                //alert("id=====" + row.id)
                this.delId = row.id;
                this.gift.itemId = row.itemId;
                this.delVisible = true;
            },
            addAPPTaobaoGift() {
                this.loading = true,
                    this.saveGift = false,
                    console.log(this.startEndDate)
                let startDate = null, endDate = null
                if (this.startEndDate) {
                    startDate = this.startEndDate[0]
                    endDate = this.startEndDate[1]
                }
                let vue = this
                //alert(JSON.stringify(this.startEndDate));
                //alert("id=====>>>>"+this.gift.giftUrl);
                post("web/taobao/update", {
                    id: this.gift.id,
                    itemId: this.gift.itemId,
                    //giftUrl: this.gift.giftUrl,
                    /*totalNum: this.gift.totalNum,
                    giftAmt: this.gift.giftAmt,
                    activeId: this.gift.activeId,*/
                    giftCode: this.gift.giftCode,
                    //numOfPerson: this.gift.numOfPerson,
                    startDate: startDate,
                    endDate: endDate,
                    giftlable: this.gift.giftlable,
                    itemRanking: this.gift.itemRanking,
                    giftStatus: this.gift.giftStatus
                }).then((data) => {
                    //console.log(data)
                    if (data.data.status == 200) {
                        console.log(data.data.data)
                        this.$message.success(data.data.msg);
                        this.getData();
                        this.addTaobaoGift = false;
                    } else {
                        this.loading = false;
                        this.$message.error(data.data.msg);
                    }
                }).catch(function (error) {
                    this.loading = true;
                    console.log(error);
                })
            },
            getTaoBaoGiftById(id) {
                //alert("id======>>>>>>>"+id);
                get("web/taobao/getById", {
                    params: {
                        id: id,
                    }
                }).then((data) => {
                    //alert("zzzzzzzzzz======="+data.data.id)
                    this.gift = {
                        id: data.data.id,
                        itemId: data.data.itemId,
                        giftUrl: data.data.giftUrl,
                        totalNum: data.data.totalNum,
                        giftAmt: data.data.giftAmt,
                        activeId: data.data.activeId,
                        clickNum: data.data.clickNum,
                        giftCode: data.data.giftCode,
                        numOfPerson: data.data.numOfPerson,
                        startDate: data.data.startDate,
                        endDate: data.data.endDate,
                        giftlable: data.data.giftlable,
                        itemRanking: data.data.itemRanking,
                        giftStatus: data.data.giftStatus,
                    };
                    this.startEndDate = [new Date(Number(new Date(this.gift.startDate))), new Date(Number(new Date(this.gift.endDate)))]

                    this.addTaobaoGift = true;
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
                }).catch(function (error) {
                    console.log(error);
                });
            },
            saveTaobaoGift() {
                this.saveGift = false;
                this.addTaobaoGift = false;
                this.addAPPTaobaoGift();
                //this.getData();
            },
            saveTaoBaoTotalNum() {
                this.loading = true,
                    console.log(this.startEndDate)
                let startDate = null, endDate = null
                if (this.startEndDate) {
                    startDate = this.startEndDate[0]
                    endDate = this.startEndDate[1]
                }
                this.saveTaotalNum = false;
                //alert("11111:"+this.gift.id)
                post("web/taobao/updateTotalNum", {
                    id: this.gift.id,

                    totalNum: this.gift.totalNum,

                    activeId: this.gift.activeId,

                    giftUrl: this.gift.giftUrl,

                    startDate: startDate,

                    endDate: endDate,

                }).then((data) => {
                    //console.log(JSON.stringify(data.data.data))
                    if (data.data.status == 200) {
                        console.log(data.data.data)
                        this.$message.success(data.data.msg);
                        this.getData();
                        this.saveTaotalNum = false;
                        this.gift.totalNum = '';
                        this.startEndDate = null;
                        this.gift.giftUrl=null;
                    } else {
                        this.loading = false;
                        this.$message.error(data.data.msg);
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            addSaveTaoBaoGift() {

                this.saveGift = false;

                if (this.gift.itemId == null || this.gift.itemId == "") {
                    this.$message.error("商品ID不能为空");
                    return
                }
                /*if (this.gift.giftUrl == null || this.gift.giftUrl == ""){
                    this.$message.error("淘礼金地址不能为空或淘礼金地址有误!");
                    return
                }*/
                if (this.gift.totalNum == null || this.gift.totalNum == "" || this.gift.totalNum <= 0) {
                    this.$message.error("淘礼金数量必须大于零并且不能为空!");
                    return
                }
                if (this.gift.giftAmt == null || this.gift.giftAmt == "" || this.gift.giftAmt <= 0) {
                    this.$message.error("淘礼金金额不能小于等于零并且淘礼金不能为空!");
                    return
                }
                if (this.gift.numOfPerson == null || this.gift.numOfPerson == "" || this.gift.numOfPerson < 0) {
                    this.$message.error("淘礼金兑换码次数必须大于等与0且总换次数不能为空!");
                    return
                }
                if (this.gift.giftlable == null || this.gift.giftlable == "") {
                    this.$message.error("淘礼金标签不能为空!");
                    return
                }
                if (this.gift.itemRanking == null || this.gift.itemRanking == "" || this.gift.itemRanking < 0 || this.gift.itemRanking > 10) {
                    this.$message.error("请输入0-10的序号并且淘礼金排序不能为空");
                    return
                }
                this.add();
            },
            timeTransition(dataPara, fmt) {
                var date = new Date(dataPara);
                var o = {
                    "M+": date.getMonth() + 1,                 //月份
                    "d+": date.getDate(),                    //日
                    "h+": date.getHours(),                   //小时
                    "m+": date.getMinutes(),                 //分
                    "s+": date.getSeconds(),                 //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds()             //毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            },
            /*timeTransition(startDate) {
                //转换时间
                let arr = startDate.split("T");
                let d = arr[0];
                let darr = d.split('-');

                let t = arr[1];
                let tarr = t.split('.000');
                let marr = tarr[0].split(':');

                let dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);

                return dd;
            },*/
            /*    timeTransition1(startDate) {
                    let d = new Date(Number(startDate));    //根据时间戳生成的时间对象
                    let date = (d.getFullYear()) + "-" +
                        (d.getMonth() + 1) + "-" +
                        (d.getDate()) + " " +
                        (d.getHours()) + ":" +
                        (d.getMinutes()) + ":" +
                        (d.getSeconds());
                    return date;
                },*/
            formatter(row, column) {
                return row.giftStatus == 1
                    ? "有效" : "无效";

            },
        },
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
</style>
