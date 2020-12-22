<template>
    <div v-loading="loading">
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>
                        限时抢购
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="container">
                <el-button type="primary" size="medium" @click="addEdit()">添加</el-button>
                <div class="handle-box">
                    <el-input v-model="itemId" placeholder="请输入宝贝ID搜索" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
                </div>
                <el-table v-loading="loading" :data="data" border class="table" ref="multipleTable"
                          @selection-change="handleSelectionChange">
                    <!--<el-table-column prop="id" label="id">
                    </el-table-column>-->

                    <el-table-column prop="itemId" label="宝贝ID">
                    </el-table-column>

                    <el-table-column prop="itemMainPic" label="缩略图">
                        <template slot-scope="scope">
                            <img style="width: 90%;" :src="scope.row.itemMainPic" alt="">
                        </template>
                    </el-table-column>

                    <el-table-column prop="itemTitle" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="accountName" label="公司名称">
                    </el-table-column>
                    <el-table-column prop="limitNum" label="虚拟创建份数">
                    </el-table-column>
                    <el-table-column prop="tljTotal" label="实际创建份数">
                    </el-table-column>
                    <!--<el-table-column prop="clickNum" label="点击兑换次数">
                    </el-table-column>-->

                    <el-table-column prop="tljSurplus" label="剩余数量">
                    </el-table-column>

                    <el-table-column prop="tljPrice" label="淘礼金金额">
                    </el-table-column>

                    <el-table-column prop="limitTime" label="限时点" style="color:red">
                    </el-table-column>
                    <el-table-column prop="startDate" label="抢购开始日期">
                    </el-table-column>

                    <el-table-column prop="endDate" label="抢购结束日期">
                    </el-table-column>

                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            {{ freeState(scope.row.status)}}
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <!--<el-button type="text" @click="updateEdit(1, scope.row)">编辑</el-button>-->
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
                    <el-form ref="addTljTotal" :model="gift">
                        <el-form-item label="添加淘礼金数量">
                            <el-input v-model="gift.addNum" placeholder="不能为空"
                                      style="width:100px;height: 40px"></el-input>
                        </el-form-item>
                        <el-button @click="saveTaotalNum = false">取 消</el-button>

                        <el-button type="primary" @click="saveTaoBaoTotalNum">确 定</el-button>
                    </el-form>
                </el-dialog>


                <!--添加弹出框-->
                <el-dialog title="添加" :visible.sync="saveLimitGood" width="40%">
                    <el-form ref="saveGiftForm" :model="gift" label-width="25%">
                        <el-form-item label="淘礼金类型" v-if="addGift==1">
                            <el-select v-model="gift.campaignType" placeholder="请选择">
                                <el-option key="1" label="相同路径" :value="1"></el-option>
                                <el-option key="2" label="不同路径" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择公司">
                            <el-select v-model="gift.companyId" placeholder="请选择" @change="handleSelectionChange">
                                <el-option v-for="itme in list" :key="itme.accountId" :label="itme.accountName"
                                           :value="itme.accountId">{{itme.accountName}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="虚拟总份数" v-if="addGift==1">
                            <el-input v-model="gift.limitNum" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="真实总份数" v-if="addGift==1">
                            <el-input v-model="gift.tljTotal" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="商品id" v-if="addGift==1">
                            <el-input v-model="gift.itemId" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="淘礼金金额" v-if="addGift==1">
                            <el-input v-model="gift.tljPrice" style="width: 250px;"></el-input>
                        </el-form-item>
                        <el-form-item label="创建类型" v-if="addGift==1">
                            <el-select v-model="gift.createType" placeholder="请选择">
                                <el-option key="1" label="营销" :value="1"></el-option>
                                <el-option key="2" label="定向" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="每人兑换次数" v-if="addGift==1">
                            <el-input v-model="gift.numOfPerson" style="width: 250px;"></el-input>
                        </el-form-item>

                        <el-form-item label="抢购日期">
                            <el-date-picker
                                    v-model="startEndDate"
                                    type="date"
                                    :picker-options="pickerOptionsStop"
                                    placeholder="选择日期"
                            >
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="抢购时间点">
                            <el-select v-model="gift.limitId" placeholder="请选择" @change="handleSelectionLimitChange">
                                <el-option v-for="itme in limitList" :key="itme.limitId" :label="itme.limitTime"
                                           :value="itme.limitId">{{itme.limitTime}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="saveLimitGood = false">取 消</el-button>
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
                            <el-input v-model="gift.tljTotal"></el-input>
                        </el-form-item>
                        <el-form-item label="淘礼金金额" v-if="addGift==1">
                            <el-input v-model="gift.tljPrice"></el-input>
                        </el-form-item>-->
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
                        <el-form-item label="排序" v-if="addGift==1">
                            <el-input v-model="gift.itemRanking"
                                      type="text"
                                      placeholder="请输入0到10之间的数"
                                      style="width: 100px;"></el-input>
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
                itemId: null,
                itemRanking: 1,
                gift: {
                    id: '',
                    itemId: '',
                    createType: '',
                    tljPrice: '',
                    tljTotal: '',
                    numOfPerson: '1',
                    startDate: '',
                    endDate: '',
                    itemRanking: 1,
                    giftNum: '',
                    limitNum: 5000,
                    clickNum: 0,
                    activeId: '',
                    companyId: '',
                    dsTime: '',
                    campaignType: '',
                    addNum: 0,
                    limitId: ''
                },
                startDate: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
                startEndDate: null,
                openFinishDate: null,
                addTaobaoGift: false,
                saveTaotalNum: false,
                loading: false,
                addGift: '1',
                saveLimitGood: false,
                list: [],
                limitList: [],
                pickerOptionsStop: {//截止时间的校验
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                delId: null,//要删除的id
                delVisible: false,
                page: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                },
                isDs: 1,
                companyData: [],
                limitData: [],
                companyName: '',
                limitTime: ''
            }
        },
        created() {
            this.getData(1);
            //this.getTaoBaoGiftById();
            this.getCompanyData();
            this.getLimitTimeList();
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
            handleSelectionChange(id) {
                this.companyData.find((item) => {
                    if (item.accountId == id) {
                        this.companyName = item.accountName;
                        return;
                    }

                })
            },
            handleSelectionLimitChange(id) {
                this.limitData.find((item) => {
                    if (item.limitId == id) {
                        this.limitTime = item.limitTime;
                        return;
                    }

                })
            },
            freeState(value) {
                //免单状态
                switch (value) {
                    case "0":
                        return "有效";
                    case "1":
                        return "已过期";
                    default:
                        return "未知";
                }
            },
            handleCurrentChange(val) {
                this.getDate(val)
            },
            //分页查询
            getData(pageNum) {
                this.loading = true;
                let vue = this;
                post("server-admin/limit/getLimitGoodsList", {
                    //params: {
                    itemId: this.itemId,
                    //分页
                    pageNum: pageNum,
                    pageSize: vue.page.pageSize,
                    total: vue.page.total,
                    //}
                }).then(function (data) {
                    vue.loading = false;
                    let arr = []
                    //一个数组用来接收加工后台传过来的数据
                    vue.tableData = data.data.data.list;
                    vue.page.pageNum = Number(data.data.data.pageNum);
                    vue.page.total = Number(data.data.data.total)

                })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            //添加
            add() {
                this.loading = true;
                let startDate = null;
                if (this.startEndDate) {
                    startDate = this.timeTransition(this.startEndDate)
                }
                let vue = this;
                post("server-admin/limit/createLimitGoods", {
                    itemId: this.gift.itemId,
                    //giftUrl: this.gift.giftUrl,
                    tljTotal: this.gift.tljTotal,
                    tljPrice: this.gift.tljPrice,
                    activeId: this.gift.activeId,
                    createType: this.gift.createType,
                    numOfPerson: this.gift.numOfPerson,
                    startDate: startDate,
                    campaignType: this.gift.campaignType,
                    accountId: this.gift.companyId,
                    accountName: this.companyName,
                    limitId: this.gift.limitId,
                    limitTime: this.limitTime,
                    limitNum: this.gift.limitNum
                }).then((data) => {
                    if (data.data.status == 200) {
                        this.$message.success(data.data.msg);
                        this.getData();
                        this.saveLimitGood = false;
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
                this.saveLimitGood = true;
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
                this.openFinishDate = null
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
                this.gift.tljId = row.tljId;
                this.gift.accountId = row.accountId;
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
                this.gift.tljTotal = null;
                this.startEndDate = null;
                this.openFinishDate = null;
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
                this.delId = row.id;
                this.gift.itemId = row.itemId;
                this.delVisible = true;
            },
            addAPPTaobaoGift() {
                this.loading = true,
                    this.saveLimitGood = false
                let startDate = null, endDate = null
                if (this.startEndDate) {
                    startDate = this.startEndDate[0]
                    endDate = this.startEndDate[1]
                }
                if (this.openFinishDate) {
                    openTime = this.openFinishDate[0]
                    finishTime = this.openFinishDate[1]
                }
                let vue = this
                post("web/taobao/update", {
                    id: this.gift.id,
                    itemId: this.gift.itemId,
                    //giftUrl: this.gift.giftUrl,
                    /*tljTotal: this.gift.tljTotal,
                    tljPrice: this.gift.tljPrice,
                    activeId: this.gift.activeId,*/
                    //numOfPerson: this.gift.numOfPerson,
                    startDate: startDate,
                    endDate: endDate
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
                        createType: data.data.createType,
                        tljTotal: data.data.tljTotal,
                        tljPrice: data.data.tljPrice,
                        activeId: data.data.activeId,
                        clickNum: data.data.clickNum,
                        numOfPerson: data.data.numOfPerson,
                        startDate: data.data.startDate,
                        endDate: data.data.endDate,
                        finishTime: data.data.finishTime,
                        openTime: data.data.openTIme,
                        dsTime: data.data.dsTime,
                        campaignType: data.data.campaignType,
                        accountId: data.data.accountId
                    };
                    this.startEndDate = [new Date(Number(new Date(this.gift.startDate))), new Date(Number(new Date(this.gift.endDate)))]
                    this.openFinishDate = [new Date(Number(new Date(this.gift.openTime))), new Date(Number(new Date(this.gift.finishTime)))]
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
                this.saveLimitGood = false;
                this.addTaobaoGift = false;
                this.addAPPTaobaoGift();
                //this.getData();
            },
            saveTaoBaoTotalNum() {
                this.loading = true
                this.saveTaotalNum = false;
                //alert("11111:"+this.gift.id)
                get("server-admin/tlj/updateTljNum", {
                    params: {
                        tljId: this.gift.tljId,
                        addNum: this.gift.addNum,
                        accountId: this.gift.accountId
                    }/*,
                    startDate: this.timeTransition(startDate),
                    endDate: this.timeTransition(endDate)*/
                }).then((data) => {
                    //console.log(JSON.stringify(data.data.data))
                    if (data.data.status == 200) {
                        console.log(data.data.data)
                        this.$message.success(data.data.msg);
                        this.getData();
                        this.saveTaotalNum = false;
                        this.gift.tljTotal = '';
                        this.startEndDate = null;
                        this.openFinishDate = null;
                        this.gift.giftUrl = null;
                        this.isDs = 1;
                    } else {
                        this.loading = false;
                        this.$message.error(data.data.msg);
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            addSaveTaoBaoGift() {

                this.saveLimitGood = false;

                if (this.gift.itemId == null || this.gift.itemId == "") {
                    this.$message.error("商品ID不能为空");
                    return
                }
                /*if (this.gift.giftUrl == null || this.gift.giftUrl == ""){
                    this.$message.error("淘礼金地址不能为空或淘礼金地址有误!");
                    return
                }*/
                if (this.gift.tljTotal == null || this.gift.tljTotal == "" || this.gift.tljTotal <= 0) {
                    this.$message.error("淘礼金数量必须大于零并且不能为空!");
                    return
                }
                if (this.gift.tljPrice == null || this.gift.tljPrice == "" || this.gift.tljPrice <= 0) {
                    this.$message.error("淘礼金金额不能小于等于零并且淘礼金不能为空!");
                    return
                }
                if (this.gift.numOfPerson == null || this.gift.numOfPerson == "" || this.gift.numOfPerson < 0) {
                    this.$message.error("淘礼金兑换码次数必须大于等与0且总换次数不能为空!");
                    return
                }
                if (this.gift.itemRanking == null || this.gift.itemRanking == "" || this.gift.itemRanking < 0 || this.gift.itemRanking > 10) {
                    this.$message.error("请输入0-10的序号并且淘礼金排序不能为空");
                    return
                }
                this.add();
            },
            timeTransition(time) {
                let d = new Date(Number(time));    //根据时间戳生成的时间对象
                let date = (d.getFullYear()) + "-" +
                    (d.getMonth() + 1) + "-" +
                    (d.getDate()) + " " +
                    (d.getHours()) + ":" +
                    (d.getMinutes()) + ":" +
                    (d.getSeconds());
                return date;
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
            getCompanyData() {
                get("server-user/company/getCompanyList", {
                    params: {
                        currentPage: 1,
                        pageSize: 1000,
                    }
                })
                    .then((data) => {
                        this.list = data.data.data;
                        this.companyData = data.data.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getLimitTimeList() {
                get("server-api/limit/getLimitTimeList",)
                    .then((data) => {
                        this.limitList = data.data.data;
                        this.limitData = data.data.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
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
