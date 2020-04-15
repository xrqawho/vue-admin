<template>
    <div class="centCommission">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 联盟设置</el-breadcrumb-item>
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
                <el-button type="primary" class="handle-del mr10" @click="openWindow">添加联盟账号</el-button>

            </div>
            <!-- {{UnionSet}} -->
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">

                <el-table-column prop="taobaoName" label="联盟账号名称">
                </el-table-column>
                <el-table-column prop="expireTime" label="授权到期时间(有效期一个月)">
                    <template slot-scope="scope">
                        <span>{{timeTransition(scope.row.expireTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status == 1">
                            <span class="succeed" style=""></span>
                            授权正常
                        </div>
                        <div v-if="scope.row.status == 0">
                            <span class="error" style=""></span>
                            授权失败
                        </div>
                    </template>

                </el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="openWindow">重新授权</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row.id)">删除
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
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
    import {post, get, url} from '../../../api/index';
    import store from '../../../store/store';

    export default {
        name: 'centCommission',
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
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                page: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                },
                idx: -1,
                id: -1,
                token: '',
                UnionSet: "1",
                openUrl: ""
                // store: store.state.authorization,
            }
        },
        created() {
            this.getData(1);

            this.token = localStorage.getItem('set_token');
            this.getUrl()
        },

        watch: {
            authorization: function (val) {
                console.log(val)
            }
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    return d
                })
            },

        },
        methods: {
            getal(v) {
                alert(v)
                this.UnionSet = v
                console.log()
            },
            // 分页导航
            handleCurrentChange(val) {
                this.UnionSet = val;
                this.getData(val);
                // this.$store.dispatch('upauthorization',val)//保存upauthorization

                // store.commit('increment',val)
            },
            // 获取数据
            getData(pageNum) {

                let vue = this
                get("web/taobaoplan/find/taobaoplan/all", {
                    params: {

                        currentPage: pageNum,
                        pageSize: vue.page.pageSize,
                        total: vue.page.total,
                    }
                })
                    .then(function (data) {
                        let arr = []
                        //一个数组用来接收加工后台传过来的数据
                        console.log(data.data.data.list)
                        vue.tableData = data.data.data.list.map(list => {
                            // console.log(list)
                            let json = {
                                "taobaoName": list.taobaoName,
                                "expireTime": list.expireTime,
                                "status": list.status,
                                "address": "",

                                "type": "",
                                "time": "",
                                "id": list.id
                            }
                            return json
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
            getUrl(pageNum) {


                get("web/taobaoplan/getUrl", {
                    params: {
                        token: this.token,
                    }
                })
                    .then((data) => {
                        console.log(data)
                        this.openUrl = data.data.data + "?token=" + this.token
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            openWindow() {

                // let win = window.open('https://oauth.taobao.com/authorize?response_type=token&client_id=27584113&redirect_uri=http%3a%2f%2fconsole.shengyaapp.com%2Fcallback%2Ftaobao?token='+this.token ,
                // 			'new',
                // 			'location=no',
                // 			'width=800,height=500'
                // 			)

                // if (url == "http://47.110.233.53:9081/") {
                // 	let win = window.open('https://oauth.taobao.com/authorize?response_type=token&client_id=27584113&redirect_uri=http%3a%2f%2fconsole.shengyaapp.com%2Fcallback%2Ftaobao?token='+this.token,
                // 				'new',
                // 				'location=no',
                // 				'width=800,height=500'
                // 				)
                // } else if(url == "http://47.111.178.192:8081/"){
                // 	let win = window.open('https://oauth.taobao.com/authorize?response_type=token&client_id=27584113&redirect_uri=http%3a%2f%2fconsole.shengyaapp.com%2Fcallback%2Ftaobao%2FdevOper?token='+this.token,
                // 				'new',
                // 				'location=no',
                // 				'width=800,height=500'
                // 				)
                // }

                let win = window.open(this.openUrl,
                    'new',
                    'location=no',
                    'width=800,height=500'
                )


                console.log(win)

                var loop = setInterval(() => {
                    console.log("win")
                    if (win != null && win.closed) {
                        clearInterval(loop);
                        this.getData(1)
                        //do something 在这里执行回调
                    }
                }, 800);


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
                this.idx = index;
                this.id = row.id;
                this.form = {
                    id: row.id,
                    name: row.name,
                    date: row.date,
                    address: row.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                //this.id = row.id;
                this.id = row;
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
            // 确定删除
            deleteRow() {
                //this.$message.success('删除成功');
                this.delVisible = false;
                get("web/taobaoplan/remove", {
                    params: {
                        id: this.id
                    }
                }).then((data) => {
                    console.log(data)
                    if (data.data.status == 200) {
                        this.$message.success(data.data.msg);
                        this.sortVisible = false;
                        if(this.tableData[this.idx].id === this.id){
                            this.tableData.splice(this.idx, 1);
                        }else{
                            for(let i = 0; i < this.tableData.length; i++){
                                if(this.tableData[i].id === this.id){
                                    this.tableData.splice(i, 1);
                                    return ;
                                }
                            }
                        }
                    } else {
                        this.$message.error(data.data.msg);
                    }
                }).catch(function (error) {
                    console.log(error);
                });

            },
            timeTransition(date) {
                var arr = date.split("T");
                var d = arr[0];
                var darr = d.split('-');

                var t = arr[1];
                var tarr = t.split('.000');
                var marr = tarr[0].split(':');

                var dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
                return dd;

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

    .succeed {
        display: inline-block;
        width: 6px;
        height: 6px;
        vertical-align: middle;
        border-radius: 50%;
        background-color: #52c41a;
        box-sizing: border-box;
    }

    .error {
        display: inline-block;
        width: 6px;
        height: 6px;
        vertical-align: middle;
        border-radius: 50%;
        background-color: #f5222d;
        box-sizing: border-box;
    }
</style>
