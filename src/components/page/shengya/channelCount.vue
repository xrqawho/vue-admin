<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>
                    渠道统计列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form>
                    <el-form-item label="开始结束时间">
                        <!--<el-date-picker
                                v-model="startEndDate"
                                :default-time="['00:00:00', '23:59:59']"
                                type="datetimerange"
                                value-format="timestamp"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>-->
                        <el-date-picker
                                v-model="startEndDate"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                        <el-input v-model="channelNameChecked" class="inputForChannelName" :disabled="true">
                        </el-input>
                        <el-button type="warning" icon="el-icon-delete" @click="clearAll()">清空</el-button>
                        <el-button type="primary" @click="compileShop()">选择渠道</el-button>
                        <el-button type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <el-table show-summary v-loading="loading" :data="data" border class="table"
                      ref="multipleTable">

                <el-table-column prop="channelId" label="渠道ID" width="150" align="center">
                </el-table-column>

                <el-table-column prop="channelName" label="渠道名称" width="120" align="center">
                </el-table-column>

                <el-table-column prop="userCount" label="用户总数" width="120" align="center">
                </el-table-column>

                <el-table-column prop="newRegistNum" label="新增注册人数" align="center">
                </el-table-column>

                <el-table-column prop="conversionNum" label="转化人数" align="center">
                </el-table-column>

                <el-table-column prop="conversionRate" label="转化率" align="center">
                </el-table-column>

                <el-table-column prop="freeNum" label="免单数" align="center">
                </el-table-column>

                <el-table-column prop="freeConversionRate" label="免单率" align="center">
                </el-table-column>

                <el-table-column prop="conversionNumB" label="转B人数" align="center">
                </el-table-column>

                <el-table-column prop="conversionRateB" label="转B率" align="center">
                </el-table-column>

                <el-table-column prop="allAmt" label="补贴金额" align="center">
                </el-table-column>

                <el-table-column prop="estimatedAmt" label="预估佣金" align="center">
                </el-table-column>

            </el-table>

            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper"
                               :total="page.total" :page-size="page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="渠道" :visible.sync="editVisible" width="60%">

            <el-form label-width="82px">

                <el-form-item label="渠道名称">
                    <el-input
                            size="medium"
                            placeholder="请输入内容"
                            suffix-icon="el-icon-date"
                            v-model="channelName"
                    style="width: 250px;">
                    </el-input><br/>
                    <el-button type="primary" icon="el-icon-search" @click="getChannelName()">渠道名称搜索</el-button>
                </el-form-item>


                <el-form-item label="渠道">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="channelChecked">
                        <div class="channelList">
                            <div v-for="item in channelNameList">
                                <el-checkbox align="center" style="margin-top: 2px" :label="item.tableId" :key="item.tableId"
                                             @change="handleCheckedChange()" border>{{item.channelName}}
                                </el-checkbox>
                            </div>
                        </div>
                    </el-checkbox-group>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {post, get} from '../../../api/index';

    export default {
        name: "channelCount",
        data() {
            return {
                tableData: [],
                startEndDate: null,
                startDate: null,
                endDate: null,
                channelId: null,
                overchannel: [],
                loading: false,
                page: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                },
                //全选
                checkAll: true,
                isIndeterminate: true,
                channelNameList: [],
                channelChecked: [],
                //点击后返回后台的值
                channelCheckedStr: "",
                channelNameChecked: "",
                editVisible: false,
                channelName: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        created() {
            //this.startEndDate=[new Date(), new Date()],
            this.fetchData();
            this.getData(1);

            //this.getSyChannelList(1);

        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    //let is_del = false;
                    return d
                })
            }
        },
        methods: {
            getData(row) {
                this.loading = true;
                let vue = this;
                let startDate = null, endDate = null;
                let str='00:00:00',str1='23:59:59' ;
                if (this.startEndDate) {
                    startDate = this.startEndDate[0].getTime();
                    endDate = this.startEndDate[1].getTime();
                }
                post("web/channel/channelCount", {

                    startDate: startDate,

                    endDate: endDate,

                    overchannel: this.channelCheckedStr,

                }).then(function (data) {

                    vue.loading = false;

                    let arr = []

                    //一个数组用来接收加工后台传过来的数据
                    console.log(data.data.list)
                    //alert("1111"+JSON.stringify(data.data.data))
                    vue.tableData = data.data.data;


                })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            getChannelName() {
                this.loading = true;
                post("web/channel/getSyChannelList", {
                    channelName: this.channelName,
                }).then((data) => {
                    console.log(data);
                    //获取全部数据
                    this.channelNameList = data.data.data;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleCheckedChange() {

                if(this.channelChecked.length == 0){
                    this.channelNameChecked = "";
                    this.channelCheckedStr = "";
                }

                for (let i = 0; i < this.channelChecked.length; i++) {
                    if (i == 0) {
                        this.channelCheckedStr = this.channelChecked[i];
                    } else {
                        this.channelCheckedStr = this.channelCheckedStr + "," + this.channelChecked[i];
                    }
                    for (let j = 0; j < this.channelNameList.length; j++) {
                        if (this.channelChecked[i] == this.channelNameList[j].tableId) {
                            if (i == 0) {
                                this.channelNameChecked = this.channelNameList[j].channelName
                            } else {
                                this.channelNameChecked = this.channelNameChecked + "," + this.channelNameList[j].channelName;
                            }
                            break;
                        }
                    }
                }

            },
            handleCheckAllChange(val) {
                //this.channelChecked = val ? this.channelNameList : [];
                this.channelChecked = [];
                if (this.checkAll){
                    for (let i = 0; i < this.channelNameList.length; i++) {
                        this.channelChecked.push(this.channelNameList[i].tableId)
                    }
                }
                this.handleCheckedChange();
                //alert("11111"+JSON.stringify(this.channelChecked))
                this.isIndeterminate = false;
            },
            clearAll(){
                this.channelChecked = [];
                this.handleCheckedChange();
                this.checkAll = false;
                this.channelName='';
                this.getData()

            },
            compileShop() {
                this.editVisible = true;
                this.loading = true;
                get("web/channel/syChannelListNew", {})
                    .then((data) => {
                        //获取全部数据
                        this.channelNameList = data.data.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 分页导航
            handleCurrentChange(val) {

                this.getData(val);
            },
            timeTransition(beginTime) {
                //转换时间
                if (beginTime == null) {
                    return '';
                } else if (beginTime == '') {
                    return '';
                }
                let d = new Date(Number(beginTime)); //根据时间戳生成的时间对象
                let date = (d.getFullYear()) + "-" +
                    (d.getMonth() + 1) + "-" +
                    (d.getDate()) + " " +
                    (d.getHours()) + ":" +
                    (d.getMinutes()) + ":" +
                    (d.getSeconds());
                return date;
            },
            fetchData() {
                let date = new Date()
                let y = date.getFullYear()
                let m = date.getMonth()
                let d = date.getDate()
                this.startEndDate = [new Date(y, m, d,0,0,0), new Date(y, m, d,23,59,59)]
                //console.log(time)
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

    .inputForChannelName {
        width: 50%;
        margin-left: 10px;
        margin-right: 10px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .channelList {
        display: flex;
        width: 70%;
        flex-flow: row wrap;
    }

    .channelList div {
        margin: 0 10px;
    }
</style>
