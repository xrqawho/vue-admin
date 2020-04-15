<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 版本更新</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

            </div>

            <el-table :data="data" border class="table" ref="multipleTable">

                <totalDownloadVolumeel-table-column prop="id" label="序号" width="200">
                </totalDownloadVolumeel-table-column>

                <el-table-column prop="app_version" label="版本号" width="180">
                </el-table-column>

                <el-table-column prop="strongVersion" label="强更版本号" width="180">
                </el-table-column>

                <el-table-column prop="app_system" label="设备" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.app_system == 1">安卓</span>
                        <span v-if="scope.row.app_system == 2">IOS</span>
                    </template>
                </el-table-column>

                <el-table-column prop="iosversion" label="App版本号">
                </el-table-column>

                <el-table-column prop="downUrl" label="下载链接">
                </el-table-column>

                <el-table-column prop="phoneNumber" label="更新类型">
                </el-table-column>

                <el-table-column prop="chineseDescription" label="中文文案">
                </el-table-column>

                <el-table-column prop="englishDescription" label="英文文案">
                </el-table-column>

                <el-table-column prop="updateTime" label="更新时间">

                    <template slot-scope="scope">
                        {{timeTransition(scope.row.updateTime)}}
                    </template>
                </el-table-column>

                <el-table-column prop="commission" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="compile(0,scope.row)">编辑</el-button>
                    </template>
                </el-table-column>


                <!-- <el-table-column label="操作" width="180" align="center">
                     <template slot-scope="scope">
                         <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">类型</el-button>
                         <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">配置</el-button>
                     </template>
                 </el-table-column> -->

            </el-table>

            <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="100px">

                    <el-form-item label="版本号">
                        <el-input v-model="form.minVersion" style="width: 20%;" placeholder="最小"></el-input>
                        <span> —— </span>
                        <el-input v-model="form.maxVersion" style="width: 20%;" placeholder="最大"></el-input>
                    </el-form-item>

                    <el-form-item label="当前版本号">

                        <el-input v-model="form.app_version" style="width: 20%;" placeholder="最大"></el-input>
                    </el-form-item>

                    <el-form-item label="强更版本号">

                        <el-input v-model="form.strongVersion" style="width: 50%;" placeholder="多个版本号用英文逗号隔开"></el-input>
                    </el-form-item>

                    <el-form-item label="设备">
                        <span v-if="form.app_system == 1">安卓</span>
                        <span v-if="form.app_system == 2">ios</span>
                        <!-- <el-input v-model="form.system" :disabled="true" >安卓</el-input> -->
                    </el-form-item>

                    <el-form-item label="App版本号">
                        <el-input v-model="form.iosversion"></el-input>
                    </el-form-item>

                    <el-form-item label="下载链接">
                        <el-input v-model="form.downUrl"></el-input>
                    </el-form-item>

                    <el-form-item label="中文更新说明">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="form.chineseDescription">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="英文更新说明">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="form.englishDescription">
                        </el-input>
                    </el-form-item>


                </el-form>
                <span slot="footer" class="dialog-footer">
			        <el-button @click="editVisible = false">取 消</el-button>
			        <el-button type="primary" @click="saveEdit">确 定</el-button>
			    </span>
            </el-dialog>

            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper"
                               :total="page.total" :page-size="page.pageSize" :current-page="page.pageNum">
                </el-pagination>
            </div>
        </div>


    </div>
</template>

<script>
    import {post, get} from '../../../api/index';

    export default {
        name: 'orderManagement',
        data() {
            return {
                tableData: [],
                TransactionPlatform: '',
                orderStatus: '',

                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,

                idx: -1,
                id: -1,
                dateTime: '',
                dateEnd: new Date(),
                page: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                },
                editVisible: false,
                form: {
                    chineseDescription: "",
                    downUrl: "",
                    englishDescription: "",
                    id: '',
                    app_system: "",
                    updateScope: "",
                    updateTime: "",
                    updateType: "",
                    app_version: "",
                    maxVersion: "",
                    minVersion: "",
                    iosversion: "",
                    strongVersion:  "",
                },
            }
        },
        created() {
            this.getData();
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
                // fetchData({
                //     page: this.cur_page
                // }).then((res) => {
                //     this.tableData = res.list;
                //     console.log(this.tableData)
                // })
                let vue = this
                get("web/version/selectAppVersionList", {
                    params: {
                        userName: vue.select_word,

                        currentPage: pageNum,
                        pageSize: vue.page.pageSize,
                        total: vue.page.total,
                    }
                })
                    .then(function (data) {
                        console.log(data)
                        let arr = []
                        //一个数组用来接收加工后台传过来的数据
                        //alert(JSON.stringify(data.data.data.list))
                        vue.tableData = data.data.data.list
                        // vue.page.pageSize = data.data.data.pageSize;
                        vue.page.pageNum = data.data.data.pageNum;
                        vue.page.total = Number(data.data.data.total)

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            compile(enable, row) {
                //编辑
                this.editVisible = true;
                //alert("1111:" + row.iosversion)
                this.form = {
                    chineseDescription: row.chineseDescription,
                    downUrl: row.downUrl,
                    englishDescription: row.englishDescription,
                    app_system: row.app_system,
                    updateType: row.updateType,
                    minVersion: row.minVersion,
                    maxVersion: row.maxVersion,
                    id: row.id,
                    app_version: row.app_version,
                    iosversion: row.iosversion,
                    strongVersion: row.strongVersion,
                }
            },
            saveEdit() {
                this.editVisible = false;
                post("web/version/updateAppVersion", {
                    chineseDescription: this.form.chineseDescription,
                    downUrl: this.form.downUrl,
                    englishDescription: this.form.englishDescription,
                    app_system: this.form.app_system,
                    updateType: this.form.updateType,
                    minVersion: this.form.minVersion,
                    maxVersion: this.form.maxVersion,
                    id: this.form.id,
                    app_version: this.form.app_version,
                    iosversion: this.form.iosversion,
                    strongVersion: this.form.strongVersion,
                })
                    .then((data) => {
                        if (data.data.status == 200) {
                            console.log(data.data.data)
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
            disabledDate(res) {
                console.log(res)
                return this.dateEnd
            },
            timeTransition(beginTime) {
                //转换时间
                let d = new Date(Number(beginTime));    //根据时间戳生成的时间对象
                let date = (d.getFullYear()) + "-" +
                    (d.getMonth() + 1) + "-" +
                    (d.getDate()) + " " +
                    (d.getHours()) + ":" +
                    (d.getMinutes()) + ":" +
                    (d.getSeconds());
                return date;
            },
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 150px;
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




