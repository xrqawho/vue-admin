<template>
    <div class="centCommission">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 分佣设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <el-alert
            title="温馨提示：提现金额大于设置金额时为不自动转账"
            type="info"
            effect="dark"
            :closable="false">
        </el-alert> -->
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="handleEdit(1)">添加配置</el-button>
                <!--<el-button type="primary" class="handle-del mr10" @click="handleEditOne(1)">添加京东配置</el-button>
                <el-button type="primary" class="handle-del mr10" @click="handleEditTwo(1)">添加拼多多配置</el-button>-->
                <el-button @click="clearCache()" type="primary" class="handle-del mr10">一键清除缓存
                </el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">

                <el-table-column prop="userLevel" label="vip等级" width="150">
					<template slot-scope="scope">
					    {{enabledStatus(scope.row.userLevel)}}
					</template>
                </el-table-column>

                <el-table-column prop="startLevelTotalAmount" label="起始金额" width="120">
                </el-table-column>
				<el-table-column prop="endLevelTotalAmount" label="结束金额" width="120">
				</el-table-column>
				<el-table-column prop="onePay" label=" 佣金小于等于(1)" width="120">
					<template slot-scope="scope">
					    {{scope.row.onePay}} 元
					</template>
				</el-table-column>
				<el-table-column prop="oneReturnProportion" label="分出总佣金比例(1)" width="120">
					<template slot-scope="scope">
					    {{scope.row.oneReturnProportion}} %
					</template>
				</el-table-column>
				<el-table-column prop="twoPay" label=" 佣金小于等于(2)" width="120">
					<template slot-scope="scope">
					    {{scope.row.twoPay}} 元
					</template>
				</el-table-column>
				<el-table-column prop="twoReturnProportion" label="分出总佣金比例(2)" width="120">
					<template slot-scope="scope">
					    {{scope.row.twoReturnProportion}} %
					</template>
				</el-table-column>
				
				<el-table-column prop="threePay" label=" 佣金小于等于(3)" width="120">
					<template slot-scope="scope">
					    {{scope.row.threePay}} 元
					</template>
				</el-table-column>
				<el-table-column prop="threeReturnProportion" label="分出总佣金比例(3)" width="120">
					<template slot-scope="scope">
					    {{scope.row.threeReturnProportion}} %
					</template>
				</el-table-column>
				
				<el-table-column prop="fourPay" label=" 佣金小于等于(4)" width="120">
					<template slot-scope="scope">
					    {{scope.row.fourPay}} 元
					</template>
				</el-table-column>
				<el-table-column prop="fourReturnProportion" label="分出总佣金比例(4)" width="120">
					<template slot-scope="scope">
					    {{scope.row.fourReturnProportion}} %
					</template>
				</el-table-column>
				
				<el-table-column prop="fivePay" label=" 佣金小于等于(5)" width="120">
					<template slot-scope="scope">
					    {{scope.row.fivePay}} 元
					</template>
				</el-table-column>
				<el-table-column prop="fiveReturnProportion" label="分出总佣金比例(5)" width="120">
					<template slot-scope="scope">
					    {{scope.row.fiveReturnProportion}} %
					</template>
				</el-table-column>
				
					<el-table-column prop="sixPay" label=" 佣金小于等于(6)" width="120">
					<template slot-scope="scope">
					    {{scope.row.sixPay}} 元
					</template>
				</el-table-column>
				<el-table-column prop="sixReturnProportion" label="分出总佣金比例(6)" width="120">
					<template slot-scope="scope">
					    {{scope.row.sixReturnProportion}} %
					</template>
				</el-table-column>
				
				<el-table-column prop="sevenPay" label=" 佣金小于等于(7)" width="120">
					<template slot-scope="scope">
					    {{scope.row.sevenPay}} 元
					</template>
				</el-table-column>
				<el-table-column prop="sevenReturnProportion" label="分出总佣金比例(7)" width="120">
					<template slot-scope="scope">
					    {{scope.row.sevenReturnProportion}} %
					</template>
				</el-table-column>
				
				<el-table-column prop="eightPay" label=" 佣金小于等于(8)" width="120">
					<template slot-scope="scope">
					    {{scope.row.eightPay}} 元
					</template>
				</el-table-column>
				<el-table-column prop="eightReturnProportion" label="分出总佣金比例(8)" width="120">
					<template slot-scope="scope">
					    {{scope.row.eightReturnProportion}} %
					</template>
				</el-table-column>
				
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEditTwo(2, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除
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
        <el-dialog title="淘宝编辑" :visible.sync="editVisible" width="45%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="分佣方案名称:">
                    <el-input v-model="form.schemeName" placeholder="普通分佣官方参考方案"></el-input>
                </el-form-item>
                <el-form-item class="label_awarn" label="公司名称:">
                    <el-select v-model="form.companyId" placeholder="请选择公司">
                        <el-option
                                v-for="itme in list"
                                :label="itme.compayName"
                                :value="itme.companyId"
                        >{{itme.compayName}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个性分佣1:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.onepay"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.onepayScale"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣2:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.twopay"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.twopayScale"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣3:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.thirdpay"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.thirdpayScale"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣4:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.forpay"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.forpayScale"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣5:">
                    佣金小于等于
                    <el-input style="width: 90px;" v-model="form.fivepay"></el-input>
                    元 分出总佣金
                    <el-input style="width: 90px;" v-model="form.fivepayScale"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣6:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.sixpay"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.sixpayScale"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣7:">
                    佣金小于等于
                    <el-input style="width: 90px;" v-model="form.sevenpay"></el-input>
                    元 分出总佣金
                    <el-input style="width: 90px;" v-model="form.sevenpayScale"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="一级佣金分成:">
                    佣金分给一级代理人
                    <el-input style="width: 80px;" v-model="form.oneAgentScale"></el-input>
                    %
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveSet">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="京东编辑" :visible.sync="editVisibleJD" width="45%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="分佣方案名称:">
                    <el-input v-model="form.schemeName" placeholder="普通分佣官方参考方案"></el-input>
                </el-form-item>
                <el-form-item class="label_awarn" label="公司名称:">
                    <el-select v-model="form.companyId" placeholder="请选择公司">
                        <el-option
                                v-for="itme in list"
                                :label="itme.compayName"
                                :value="itme.companyId"
                        >{{itme.compayName}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个性分佣1:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.onepayJD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.onepayScaleJD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣2:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.twopayJD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.twopayScaleJD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣3:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.thirdpayJD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.thirdpayScaleJD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣4:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.forpayJD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.forpayScaleJD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣5:">
                    佣金小于等于
                    <el-input style="width: 90px;" v-model="form.fivepayJD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 90px;" v-model="form.fivepayScaleJD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣6:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.sixpayJD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.sixpayScaleJD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣7:">
                    佣金小于等于
                    <el-input style="width: 90px;" v-model="form.sevenpayJD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 90px;" v-model="form.sevenpayScaleJD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="一级佣金分成:">
                    佣金分给一级代理人
                    <el-input style="width: 80px;" v-model="form.oneAgentScale"></el-input>
                    %
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleJD = false">取 消</el-button>
                <el-button type="primary" @click="saveSet">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="拼多多编辑" :visible.sync="editVisiblePDD" width="45%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="分佣方案名称:">
                    <el-input v-model="form.schemeName" placeholder="普通分佣官方参考方案"></el-input>
                </el-form-item>
                <el-form-item class="label_awarn" label="公司名称:">
                    <el-select v-model="form.companyId" placeholder="请选择公司">
                        <el-option
                                v-for="itme in list"
                                :label="itme.compayName"
                                :value="itme.companyId"
                        >{{itme.compayName}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个性分佣1:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.onepayPDD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.onepayScalePDD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣2:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.twopayPDD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.twopayScalePDD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣3:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.thirdpayPDD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.thirdpayScalePDD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣4:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.forpayPDD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.forpayScalePDD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣5:">
                    佣金小于等于
                    <el-input style="width: 90px;" v-model="form.fivepayPDD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 90px;" v-model="form.fivepayScalePDD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣6:">
                    佣金小于等于
                    <el-input style="width: 70px;" v-model="form.sixpayPDD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 70px;" v-model="form.sixpayScalePDD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="个性分佣7:">
                    佣金小于等于
                    <el-input style="width: 90px;" v-model="form.sevenpayPDD"></el-input>
                    元 分出总佣金
                    <el-input style="width: 90px;" v-model="form.sevenpayScalePDD"></el-input>
                    % 给客户
                </el-form-item>
                <el-form-item label="一级佣金分成:">
                    佣金分给一级代理人
                    <el-input style="width: 80px;" v-model="form.oneAgentScale"></el-input>
                    %
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisiblePDD = false">取 消</el-button>
                <el-button type="primary" @click="saveSet">确 定</el-button>
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
    import {post, get} from '../../../api/index';

    export default {
        name: 'centCommission',
        data() {
            return {
                tableData: [],

                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                editVisibleJD: false,
                editVisiblePDD: false,
                delVisible: false,
                form: {
                    companyName: '',//公司名称
                    companyId: '',//公司Id
                    schemeName: '',//分佣方案名称
                    //一级分佣
                    onepay: '',//钱
                    onepayScale: '',//比例
                    onepayScaleJD: '',//比例
                    onepayScalePDD: '',//比例
                    onepayJD: '',
                    onepayPDD: '',
                    //二级分佣
                    twopay: '',//钱
                    twopayJD: '',//钱
                    twopayPDD: '',//钱
                    twopayScale: '',//比例
                    twopayScaleJD: '',//比例
                    twopayScalePDD: '',//比例
                    //三级分佣
                    thirdpay: '',//钱
                    thirdpayJD: '',//钱
                    thirdpayPDD: '',//钱
                    thirdpayScale: '',//比例
                    thirdpayScaleJD: '',//比例
                    thirdpayScalePDD: '',//比例
                    //四级分佣
                    forpay: '',//钱
                    forpayJD: '',//钱
                    forpayPDD: '',//钱
                    forpayScale: '',//比例
                    forpayScaleJD: '',//比例
                    forpayScalePDD: '',//比例
                    //五级分佣
                    fivepay: '',//钱
                    fivepayJD: '',//钱
                    fivepayPDD: '',//钱
                    fivepayScale: '',//比例
                    fivepayScaleJD: '',//比例
                    fivepayScalePDD: '',//比例

                    oneAgentScale: '',//代理分佣

                    sixpay: "",//6级分佣金额
                    sixpayJD: "",//6级分佣金额
                    sixpayPDD: "",//6级分佣金额

                    sixpayScale: "",//6级分佣金额 比例
                    sixpayScaleJD: "",//6级分佣金额 比例
                    sixpayScalePDD: "",//6级分佣金额 比例

                    sevenpay: "",//7级分佣金额
                    sevenpayJD: "",//7级分佣金额
                    sevenpayPDD: "",//7级分佣金额

                    sevenpayScale: "", //7级分佣金额 比例
                    sevenpayScaleJD: "", //7级分佣金额 比例
                    sevenpayScalePDD: "", //7级分佣金额 比例
                },
                page: {
                    pageSize: 50,
                    pageNum: 1,
                    total: 0,
                },

                judge: '',//判断依据，判断是编辑还是新增 1是新增 2是编辑
                list: [],//公司列表
                id: '',//即将删除的id
            }
        },
        created() {
            this.getData(1);
            //this.getCommpanyList();
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
                get("server-admin/orderCommission/list", {
                    params: {
                        currentPage: pageNum,
                        pageSize: vue.page.pageSize,
                        total: vue.page.total,
                    }
                })
                    .then(function (data) {
                        let arr = []
                        //一个数组用来接收加工后台传过来的数据

                        vue.tableData = data.data.data.list

                        // vue.page.pageSize = data.data.data.pageSize;
                        vue.page.pageNum = data.data.data.pageNum;
                        vue.page.total = Number(data.data.data.total)


                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
           /* getCommpanyList() {
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
            }, */
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            //打开新增和编辑的弹窗
            handleEdit(index, row) {
                if (index == 2) {
                    //编辑
                    this.judge = index;
                    this.form = {
                        userLevel: row.userLevel,//公司名称
                        startLevelTotalAmount: row.startLevelTotalAmount,//公司Id
                        endLevelTotalAmount: row.endLevelTotalAmount,//分佣方案名称
                        //一级分佣
                        onePay: row.onePay,//钱
                        onepayScale: row.onepayScale,//比例
                        //二级分佣
                        oneReturnProportion: row.oneReturnProportion,//钱
                        twoPay: row.twoPay,//比例
                        //三级分佣
                        twoReturnProportion: row.twoReturnProportion,//钱
                        threePay: row.threePay,//比例
                        //四级分佣
                        threeReturnProportion: row.threeReturnProportion,//钱
                        fourPay: row.fourPay,//比例
                        //五级分佣
                        fourReturnProportion: row.fourReturnProportion,//钱
                        fivePay: row.fivePay,//比例

                        fiveReturnProportion: row.fiveReturnProportion,//代理分佣

                        sixPay: row.sixPay,//编辑识别ID


                        sixReturnProportion: row.sixReturnProportion,//6级分佣金额

                        sevenPay: row.sevenPay,//6级分佣金额 比例

                        sevenReturnProportion: row.sevenReturnProportion,//7级分佣金额

                        eightPay: row.eightPay, //7级分佣金额 比例
						eightReturnProportion: row.eightReturnProportion,
                    }
                } else {
                    //新增
                    this.judge = index;
                    this.form = {
                         userLevel: "",//公司名称
                        startLevelTotalAmount: "",//公司Id
                        endLevelTotalAmount: "",//分佣方案名称
                        //一级分佣
                        onePay: "",//钱
                        onepayScale: "",//比例
                        //二级分佣
                        oneReturnProportion: "",//钱
                        twoPay: row.twoPay,//比例
                        //三级分佣
                        twoReturnProportion: row.twoReturnProportion,//钱
                        threePay: row.threePay,//比例
                        //四级分佣
                        threeReturnProportion: row.threeReturnProportion,//钱
                        fourPay: row.fourPay,//比例
                        //五级分佣
                        fourReturnProportion: row.fourReturnProportion,//钱
                        fivePay: row.fivePay,//比例
                        
                        fiveReturnProportion: row.fiveReturnProportion,//代理分佣
                        
                        sixPay: row.sixPay,//编辑识别ID
                        
                        
                        sixReturnProportion: row.sixReturnProportion,//6级分佣金额
                        
                        sevenPay: row.sevenPay,//6级分佣金额 比例
                        
                        sevenReturnProportion: row.sevenReturnProportion,//7级分佣金额
                        
                        eightPay: row.eightPay, //7级分佣金额 比例
                        eightReturnProportion: row.eightReturnProportion,

                    }
                }
                this.editVisible = true;
            },
            handleEditOne(index, row) {
                if (index == 2) {
                    //编辑
                    this.judge = index;
                    this.form = {
                        companyName: row.companyName,//公司名称
                        companyId: row.companyId,//公司Id
                        schemeName: row.schemeName,//分佣方案名称
                        //一级分佣
                        onepayJD: row.onepayJD,//钱
                        onepayScaleJD: row.onepayScaleJD,//比例
                        //二级分佣
                        twopayJD: row.twopayJD,//钱
                        twopayScaleJD: row.twopayScaleJD,//比例
                        //三级分佣
                        thirdpayJD: row.thirdpayJD,//钱
                        thirdpayScaleJD: row.thirdpayScaleJD,//比例
                        //四级分佣
                        forpayJD: row.forpayJD,//钱
                        forpayScaleJD: row.forpayScaleJD,//比例
                        //五级分佣
                        fivepayJD: row.fivepayJD,//钱
                        fivepayScaleJD: row.fivepayScaleJD,//比例
                        oneAgentScale: row.oneAgentScale,//代理分佣
                        generalFeeSchemeId: row.generalFeeSchemeId,//编辑识别ID
                        sixpayJD: row.sixpayJD,//6级分佣金额
                        sixpayScaleJD: row.sixpayScaleJD,//6级分佣金额 比例
                        sevenpayJD: row.sevenpayJD,//7级分佣金额
                        sevenpayScaleJD: row.sevenpayScaleJD, //7级分佣金额 比例
                    }
                } else {
                    //新增
                    this.judge = index;
                    this.form = {
                        companyName: '',//公司名称
                        companyId: '',//公司Id
                        schemeName: '',//分佣方案名称
                        //一级分佣
                        onepayJD: '',//钱
                        onepayScaleJD: '',//比例
                        //二级分佣
                        twopayJD: '',//钱
                        twopayScaleJD: '',//比例
                        //三级分佣
                        thirdpayJD: '',//钱
                        thirdpayScaleJD: '',//比例
                        //四级分佣
                        forpayJD: '',//钱
                        forpayScaleJD: '',//比例
                        //五级分佣
                        fivepayJD: '',//钱
                        fivepayScaleJD: '',//比例
                        oneAgentScale: '',//代理分佣
                        sixpayJD: "",//6级分佣金额
                        sixpayScaleJD: "",//6级分佣金额 比例
                        sevenpayJD: "",//7级分佣金额c
                        sevenpayScaleJD: "", //7级分佣金额 比例
                    }
                }
                this.editVisibleJD = true;
            },
            handleEditTwo(index, row) {
                if (index == 2) {
                    //编辑
                    this.judge = index;
                    this.form = {
                        companyName: row.companyName,//公司名称
                        companyId: row.companyId,//公司Id
                        schemeName: row.schemeName,//分佣方案名称
                        //一级分佣
                        onepayPDD: row.onepayPDD,//钱
                        onepayScalePDD: row.onepayScalePDD,//比例
                        //二级分佣
                        twopayPDD: row.twopayPDD,//钱
                        twopayScalePDD: row.twopayScalePDD,//比例
                        //三级分佣
                        thirdpayPDD: row.thirdpayPDD,//钱
                        thirdpayScalePDD: row.thirdpayScalePDD,//比例
                        //四级分佣
                        forpayPDD: row.forpayPDD,//钱
                        forpayScalePDD: row.forpayScalePDD,//比例
                        //五级分佣
                        fivepayPDD: row.fivepayPDD,//钱
                        fivepayScalePDD: row.fivepayScalePDD,//比例
                        oneAgentScale: row.oneAgentScale,//代理分佣
                        generalFeeSchemeId: row.generalFeeSchemeId,//编辑识别ID
                        sixpayPDD: row.sixpayPDD,//6级分佣金额
                        sixpayScalePDD: row.sixpayScalePDD,//6级分佣金额 比例
                        sevenpayPDD: row.sevenpayPDD,//7级分佣金额
                        sevenpayScalePDD: row.sevenpayScalePDD, //7级分佣金额 比例
                    }
                } else {
                    //新增
                    this.judge = index;
                    this.form = {
                        companyName: '',//公司名称
                        companyId: '',//公司Id
                        schemeName: '',//分佣方案名称
                        //一级分佣
                        onepayPDD: '',//钱
                        onepayScalePDD: '',//比例
                        //二级分佣
                        twopayPDD: '',//钱
                        twopayScalePDD: '',//比例
                        //三级分佣
                        thirdpayPDD: '',//钱
                        thirdpayScalePDD: '',//比例
                        //四级分佣
                        forpayPDD: '',//钱
                        forpayScalePDD: '',//比例
                        //五级分佣
                        fivepayPDD: '',//钱
                        fivepayScalePDD: '',//比例
                        oneAgentScale: '',//代理分佣
                        sixpayPDD: "",//6级分佣金额
                        sixpayScalePDD: "",//6级分佣金额 比例
                        sevenpayPDD: "",//7级分佣金额
                        sevenpayScalePDD: "", //7级分佣金额 比例
                    }
                }
                this.editVisiblePDD = true;
            },
            /**
             * 清除redis缓存
             */
            clearCache() {
                get("server-admin/orderCommission/reflashOrderCommission")
                    .then((data) => {
                        console.log(data);
                        if (data.data.status == 200) {
                            this.$message.success("清除成功");
                            this.getData()
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            saveSet() {
                //编辑保存操作
                delete this.form.companyName
                if (this.judge == 1) {
                    //新增
                    post("web/appGeneralfeescheme/add?type=0", this.form)
                        .then((data) => {
                            console.log(data)
                            if (data.data.status == 200) {
                                this.$message.success(data.data.msg);
                                this.getData()
                                this.editVisible = false;
                                this.editVisibleJD = false;
                                this.editVisiblePDD = false;
                            } else {
                                this.$message.error(data.data.msg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    //编辑
                    post("web/appGeneralfeescheme/add?type=1", this.form)
                        .then((data) => {
                            console.log(data)
                            alert("11111"+JSON.stringify(this.getData()))
                            if (data.data.status == 200) {
                                this.$message.success(data.data.msg);
                                this.getData();
                                this.clearCache();
                                this.editVisible = false;
                                this.editVisibleJD = false;
                                this.editVisiblePDD = false;
                            } else {
                                this.$message.error(data.data.msg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            handleDelete(row) {
                console.log(row.generalFeeSchemeId)
                this.id = row.generalFeeSchemeId;
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
                this.editVisible = false;
                this.editVisibleJD = false;
                this.editVisiblePDD = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                if (this.tableData[this.idx].id === this.id) {
                    this.$set(this.tableData, this.idx, this.form);
                } else {
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].id === this.id) {
                            this.$set(this.tableData, i, this.form);
                            return;
                        }
                    }
                }
            },
				enabledStatus(value){
				switch(value) {
					 case 2:
						return "中级vip";
					case 1:
						return "初级vip";
					 case 3:
						return "高级vip";
					 default:
						return "未知";
				}
			},
            // 确定删除
            deleteRow() {
                console.log(this.id)
                this.delVisible = false;
                get("web/appGeneralfeescheme/remove", {
                    params: {
                        id: this.id,
                    }
                })
                    .then((data) => {
                        console.log(data)
                        if (data.data.status == 200) {
                            this.$message.success(data.data.msg);
                            this.getData(1)

                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
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

    .el-form-item__label::before {
        display: inline-block;
        margin-right: 4px;
        color: #f5222d;
        font-size: 14px;
        font-family: SimSun, sans-serif;
        line-height: 1;
        content: '*';
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
