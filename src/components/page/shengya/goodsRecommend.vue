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

                <div style="width: 30%;display: inline-block;">
					 <span>名称： </span>
                    <el-input style="width: 80%" v-model="keyWord" placeholder="请输入关键字名称搜索"
                              class="handle-input mr10"></el-input>
                </div>
				<div style="width: 20%;display: inline-block;">
				    <span>ID： </span>
				    <el-input style="width: 80%" v-model="itemId" placeholder="请输入ID搜索"
				              class="handle-input mr10"></el-input>
				</div>
                <el-button type="primary" icon="el-icon-search" @click="getData(1)">搜索</el-button>
            </div>
            <el-table v-loading="loading" :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column prop="itemId" label="宝贝ID">
                    <template slot-scope="scope">
                        <div @click="taobao(scope.row.itemId)" style="cursor: pointer;color: #4873FF;">
                            {{scope.row.itemId}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="itemMainPic" label="缩略图">
                    <template slot-scope="scope">
                        <img style="width: 90%;" :src="scope.row.itemMainPic" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="itemDtitle" label="商品名称">
                </el-table-column>
				<el-table-column prop="aliasDtitle" label="自定义名称">
				</el-table-column>
                <el-table-column prop="classifyType" label="分类">
                    <template slot-scope="scope">
                        <span v-if="scope.row.classifyType=='0'">推荐</span>
                        <span v-else-if="scope.row.classifyType=='1'">女装</span>
                        <span v-else-if="scope.row.classifyType=='2'">男装</span>
                        <span v-else-if="scope.row.classifyType=='3'">内衣配饰</span>
                        <span v-else-if="scope.row.classifyType=='4'">美妆</span>
						<span v-else-if="scope.row.classifyType=='5'">鞋品箱包</span>
                        <span v-else-if="scope.row.classifyType=='6'">母婴儿童</span>
						<span v-else-if="scope.row.classifyType=='7'">居家</span>
						<span v-else-if="scope.row.classifyType=='8'">美食</span>
						 <span v-else-if="scope.row.classifyType=='9'">数码家电</span>
                        <span v-else-if="scope.row.classifyType=='10'">文体车品</span>
                        <span v-else-if="scope.row.classifyType=='15'">文体车品</span>
						<span v-else-if="scope.row.classifyType=='14'">其他</span>
                    </template>
                </el-table-column>
                <el-table-column prop="originalPrice" label="原价">
                </el-table-column>
                <el-table-column prop="actualPrice" label="劵后价">
                </el-table-column>
                <el-table-column prop="couponPrice" label="劵额">
                </el-table-column>
                <el-table-column prop="itemCommissionRate" label="比率">
                </el-table-column>
                <el-table-column prop="monthSales" label="销量">
                </el-table-column>
                <el-table-column prop="shopType" label="来源">
                    <template slot-scope="scope">
                        <span v-if="scope.row.shopType == 1">天猫</span>
                        <span v-else="scope.row.shopType == 0">淘宝</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序(倒序)">
                </el-table-column>
				<el-table-column prop="sourceType" label="拉取来源">
				    <template slot-scope="scope">
				        <span v-if="scope.row.sourceType == 1">好单</span>
				        <span v-else="scope.row.sourceType == 2">大淘</span>
				    </template>
				</el-table-column>
				<el-table-column prop="createDate" label="开始时间">
                </el-table-column>	
				<el-table-column prop="updateDate" label="结束时间">
				</el-table-column>
              <!--  <el-table-column prop="rebateType" label="返利类型" :formatter="rebateFormatter">
                </el-table-column>

                <el-table-column prop="rebateAmt" label="返利金额">
                </el-table-column>

                <el-table-column prop="rebateNum" label="返利数量">
                </el-table-column>

                <el-table-column show-overflow-tooltip prop="giftUrl" label="淘礼金url">
                </el-table-column> -->

                <el-table-column label="操作" align="center">
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
        <el-dialog :title="judgeTitle" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="商品ID" v-if="judge == 1">
                    <el-input v-model="form.itemId"></el-input>
                </el-form-item>
				 <el-form-item label="命名名称">
				    <el-input v-model="form.aliasDtitle"></el-input>
				</el-form-item>
                <el-form-item label="排序(倒序)">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
               
                <el-form-item class="label_awarn" label="发布时间">
					<el-date-picker
					      v-model="insertOrUpdateTime"
					      type="datetimerange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
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
				insertOrUpdateTime:null,

                endCreateTime: null,//发布的开始时间
                startCreateTime: null,
                fqcat: "",//分类

                itemid: null,//商品id
                itemtitle: null,//商品标题


                // 价格
                maxItemprice: "",//价格大
                minItemprice: "",//价格小
                // 销量
                keyWord: null,//销量大
                itemId: null,//销量小

                shoptype: "",//店铺类型

                linkTypeList: [
                    {name: '固定返', value: 1},
                    {name: '淘礼金', value: 2},
                ],
                taoBaoGift: [],
                dateTime: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
                form: {
                    itemId: '',
                    itemDtitle: '',
                    aliasDtitle: '',
                    sort: '',
                    startTime : '',
                    endTime:'',
                },
                page: {
                    pageSize: 20,
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
            //this.getClassifyData()
            //this.getImgData()
        },
        computed: {
           /* data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    return d
                })
            } */
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
                post("server-admin/appGoodsHander/list",{
                    // 排序
					startTime: endCreateTime,
					endTime:startCreateTime,
					itemId:this.itemId,
					keyWord:this.keyWord,
                    pageNum: pageNum,
                    pageSize: vue.page.pageSize,
				})
                    .then(function (data) {
                        vue.loading = false;
                        let arr = []
						//alert(JSON.stringify(data))
                        //一个数组用来接收加工后台传过来的数据
                        vue.tableData = data.data.data.list;

                         //vue.page.pageSize = Number(data.data.data.pageSize);
                        vue.page.pageNum = Number(data.data.data.pageNum);
                        vue.page.total = Number(data.data.data.total)

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            addGoods() {
				
				let endCreateTime = null, startCreateTime = null
				if (this.insertOrUpdateTime) {
				    endCreateTime = this.insertOrUpdateTime[0]
				    startCreateTime = this.insertOrUpdateTime[1]
				}
                //添加接口
                post("server-admin/appGoodsHander/insert", {
                    itemId: this.form.itemId,
                   aliasDtitle: this.form.aliasDtitle,
                   sort: this.form.sort,
                   startTime : endCreateTime,
                   endTime:startCreateTime,
                })
                    .then((data) => {
                        console.log(data)
                        if (data.data.status == 200) {
                            console.log(data.data.data)
                            this.$message.success("新增成功");
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
				let endCreateTime = null, startCreateTime = null
				if (this.insertOrUpdateTime) {
				    endCreateTime = this.insertOrUpdateTime[0]
				    startCreateTime = this.insertOrUpdateTime[1]
				}
                post("server-admin/appGoodsHander/update", {
                    itemId: this.form.itemId,
                    aliasDtitle: this.form.aliasDtitle,
                    sort: this.form.sort,
					startTime : endCreateTime,
					endTime:startCreateTime,
                    
                })
                    .then((data) => {
                        if (data.data.status == 200) {
                            this.$message.success("修改成功~");
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
						itemId:null,
                        itemDtitle: null,
                        name: null,
                        aliasDtitle: null,
                        sort: null,
                    }
					this.insertOrUpdateTime = null;
                } else {
                    this.judge = index;
                    this.judgeTitle = "编辑"
                    //console.log(row.goodsPictureUrl)
                    //alert("id-==="+row.syTableId);
                    this.form = {
                        itemId: row.itemId,
                        itemDtitle: row.itemDtitle,
                        aliasDtitle: row.aliasDtitle,
                        sort: row.sort,
                    }
					this.insertOrUpdateTime =  [ new Date(Number(new Date(row.createDate))) , new Date(Number(new Date(row.updateDate)))]


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
