<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <!-- <el-breadcrumb-item><i class="el-icon-rank"></i> 拖拽组件</el-breadcrumb-item> -->
                <el-breadcrumb-item>APP首页模块管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="course">

                <div style="width: 150px">首页文字配置 ：</div>
                <el-input v-for="itme in course"
                          :key="itme.tableId"

                          style="width:25%;margin: 0 5px;"
                          v-model="itme.moduleName"
                          placeholder="请输入内容"></el-input>
                <!-- maxlength="6" -->
                <el-button type="primary" @click="courseSave" style="float: right;margin-left: 61px;">保存</el-button>
            </div>

            <div class="Kong">
                <div class="KongKim">

                    <div v-for="(itme,index) in KongKim" :key="itme.tableId" v-if="itme.deleted == false"
                         class="KongKim_itme">
                        <img :src="itme.moduleIcon" alt="" class="KongKim_itme_img">
                        <div class="KongKim_itme_div">{{itme.moduleName}}</div>
                        <el-button @click="editKongKimItme(itme,index)">编辑</el-button>
                        <img @click="delKongKimItme(itme,index)" class="KongKim_itme_close"
                             src="http://qiniuimage.shengyaapp.com/image/RMS/close.png" alt="">
                    </div>
                </div>

                <div @click="addKongKimItmeVisible()" class="KongAdd">
                    <img src="../../assets/img/add.png" alt="">
                    <div>添加</div>
                </div>
            </div>

            <el-button type="primary" @click='kongKimSave' style="float: right;margin-top: -109px;">保存</el-button>


            <div class="pageImgSwitch">
                <div class="pageImgSwitchItme" v-for="itme in pageImgSwitch" :key="itme.tableId"
                     v-if="itme.tableId != 1 && itme.tableId != 2">

                    <div class="pageImgSwitchItme_div">{{itme.moduleName}}</div>
                    <el-switch
                            v-model="itme.enable"
                            active-text="开"
                            inactive-text="关">
                    </el-switch>
                    <el-button v-if="itme.tableId != 7" @click="pageJumps(itme.tableId)">配置图片</el-button>
                    <el-button v-if="itme.tableId == 7" @click="pageJumps(itme.tableId)">进入限时秒杀管理</el-button>
                </div>

            </div>
            <el-button @click="moduleSwitch()" type="primary" style="float: right;margin-top: -22px;">保存</el-button>

            <el-button @click="clearCache()" type="primary" style="float: left;margin-top: -22px;">刷新缓存
            </el-button>
        </div>

        <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="40%"
                :center="true">
            <div class="el_upload_box">
                <span style="width: 75px;">icon</span>
                <el-upload
                        class="avatar-uploader"
                        :action="imgUpsite"
                        :show-file-list="false"
                        :on-success="handleSuccess"
                        :before-upload="beforeAvatarUpload"
                        accept=".png,.bmp,.jpg,.gif,"
                        :data="qiniu"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span style="width: 75px;">title</span>
                <el-upload
                        class="avatar-uploader"
                        :action="imgUpsite"
                        :show-file-list="false"
                        :on-success="contentHandleSuccess"
                        :before-upload="beforeAvatarUpload"
                        accept=".png,.bmp,.jpg,"
                        :data="qiniu"
                >
                    <img v-if="contentImageUrl" :src="contentImageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="页面类型">
                    <el-select v-model="form.type" placeholder="页面类型">
                        <el-option :key="1" label="今日爆款" :value="1"></el-option>
                        <el-option :key="2" label="白菜专区" :value="2"></el-option>
                        <el-option :key="3" label="新人专享(免单)" :value="3"></el-option>
                        <el-option :key="4" label="朋友圈" :value="4"></el-option>
                        <el-option :key="5" label="邀请赚钱" :value="5"></el-option>
                        <el-option :key="6" label="签到模块" :value="6"></el-option>
                        <el-option :key="11" label="H5链接" :value="11"></el-option>
                        <el-option :key="12" label="商品详情" :value="12"></el-option>
                        <el-option :key="13" label="省钱教程" :value="13"></el-option>
                        <el-option :key="20" label="官方活动页" :value="20"></el-option>
                        <el-option :key="21" label="快速提现" :value="21"></el-option>
                        <el-option :key="22" label="9.9包邮" :value="22"></el-option>
                        <el-option :key="23" label="好物推荐" :value="23"></el-option>
                        <el-option :key="24" label="任务页面" :value="24"></el-option>
						<el-option :key="30" label="动态H5" :value="30"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="label_awarn" v-if="form.type == 20" label="活动ID">
                    <el-input
                            type="text"
                            placeholder="官方活动页ID"
                            v-model="form.activeId">
                    </el-input>
                </el-form-item>

                <el-form-item label="标题">
                    <el-input v-model="form.moduleName" placeholder="标题"></el-input>
                </el-form-item>

                <el-form-item label="排序">
                    <el-input v-model="form.sort" placeholder="排序"></el-input>
                </el-form-item>

                <el-form-item v-if="form.type == 11" label="H5跳app内或外">
                    <el-select v-model="form.linkType" placeholder="请选择" class="goodsPlatform mr10">
                        <el-option :key="0" label="在app内部跳转" :value="0"></el-option>
                        <el-option :key="1" label="跳淘宝" :value="1"></el-option>
                        <el-option :key="2" label="在app外部跳转" :value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="code">
                    <el-select v-model="form.code" placeholder="code">
                        <el-option v-for="codeItme in codeList" :key="codeItme.value" :label="codeItme.name"
                                   :value="codeItme.value">{{codeItme.name}}
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item v-if="form.type == 11" label="链接">
                    <el-input v-model="form.moduleLink" placeholder="链接"></el-input>
                </el-form-item>

            </el-form>


            <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="saveKongKimItme">确 定</el-button>
		  </span>
        </el-dialog>

    </section>
</template>

<script>
    import {post, get} from '../../api/index';

    export default {
        name: 'draglist',
        data() {
            return {
                course: [],
                KongKim: [],//金刚区组件

                // 页面图片开与关
                pageImgSwitch: "",
                centerDialogVisible: false,
                imageUrl: '',
                form: {
                    type: 1,
                    moduleName: '',
                    sort: '',
                    moduleLink: '',
                    modulePicture: '',
                    code: 1,
                    linkType: "",
                    activeId: "",
                },
                //上传图片获取的参数
                imgToken: null,//token
                imgSite: null,//site七牛云需要拼接的url
                imgUpsite: null,//上传图片需要的地址
                qiniu: {
                    token: null,
                },
                codeList: [
                    {name: "1（今日爆款数据）", value: 1},
                    {name: "2（白菜专区数据）", value: 2},
                    {name: "3（聚划算数据）", value: 3},
                    {name: "4（淘抢购数据）", value: 4},
                    {name: "5（9.9包邮）", value: 5},
                    {name: "6（好物推荐）", value: 6},
					{name: "7（美团）", value: 7},
                    {name: "8（空）", value: 8},
                ],
                qiniuimage: '',//七牛云图片拼接地址
                indexOf: '',
                addOnedit: 1,
                contentImageUrl: "",
                contentQiniuimage: "",
                picType: "",
            }
        },
        created() {
            this.getData();
            this.getImgData()
        },
        components: {},
        methods: {
            getData() {

                get("web/syModule/list", {
                    params: {}
                })
                    .then((data) => {
                        console.log(data.data.data);
                        for (let i = 0; i < data.data.data.length; i++) {
                            console.log(data.data.data[i]);
                            switch (data.data.data[i].tableId) {
                                case 1:
                                    this.course = data.data.data[i].syModuleChildrenList;
                                    break;
                                case 2:
                                    this.KongKim = data.data.data[i].syModuleChildrenList;
                                    break;

                                default:
                                    break;
                            }
                        }
                        this.pageImgSwitch = data.data.data

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 路由跳转
            pageJumps(index) {
            /*    alert("111==="+index)
                if ((index == 3)) {
                    this.$router.push({path: '/ImageHosting'})
                }*/
                if (index != 7) {
                    this.$router.push({path: '/ImageHosting',query:{tableId:index}});
                } else if (index == 7) {
                    this.$router.push({path: '/seckill'})
                }

            },
            //操作引导的保存
            courseSave() {
                post("web/syModule/update", {
                    tableId: 1,
                    syModuleChildrenList: this.course,
                })
                    .then((data) => {
                        console.log(data);
                        if (data.data.status == 200) {
                            this.$message.success(String(data.data.msg));
                            this.getData()
                        } else {
                            this.$message.error(String(data.data.msg));
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },


            kongKimSave() {
                post("web/syModule/update", {
                    tableId: 2,
                    syModuleChildrenList: this.KongKim,
                })
                    .then((data) => {
                        console.log(data);
                        if (data.data.status == 200) {

                            this.$message.success(String(data.data.msg));
                            this.getData()
                        } else {
                            this.$message.error(String(data.data.msg));
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },


            moduleSwitch() {
                post("web/syModule/onOff",
                    this.pageImgSwitch
                )
                    .then((data) => {
                        console.log(data);
                        if (data.data.status == 200) {

                            this.$message.success(String(data.data.msg));
                            this.getData()
                        } else {
                            this.$message.error(String(data.data.msg));
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            /**
             * 清除redis缓存
             */
            clearCache() {
                post("web/syModule/clearCache")
                    .then((data) => {
                        console.log(data);
                        if (data.data.status == 200) {
                            this.$message.success("刷新缓存成功");
                            this.getData()
                        } else {
                            this.$message.error("刷新缓存失败");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            saveKongKimItme() {
                console.log(this.indexOf.length);
                if (this.addOnedit == 1) {
                    console.log("indexOf");
                    this.updateKongKimItme()
                } else {
                    this.addKongKimItme()
                }
            },


            delKongKimItme(itme, index) {
                itme.deleted = true;
                this.$set(this.KongKim, index, itme)
                // this.KongKim.splice(index,1)
            },
            addKongKimItme() {
                //新增点击确定
                if (this.KongKim.length >= 10) {
                    this.$message.error("金刚眼区最多十个子组件");
                    return
                }

                if (this.form.type == 1) {
                    console.log(this.qiniuimage);
                    console.log(this.form.moduleName);
                    console.log(this.form.sort);
                    console.log(this.form.moduleLink);
                    if (this.qiniuimage == '' || this.form.moduleName == '' || this.form.sort == '') {
                        this.$message.error("必须上传一张图，输入名字，排序，链接");
                        return
                    }
                } else {
                    if (this.qiniuimage == '' || this.form.moduleName == '' || this.form.sort == '') {
                        this.$message.error("必须上传一张图，输入名字，排序");
                        return
                    }
                }


                let json = {
                    moduleIcon: this.qiniuimage,
                    enable: true,
                    deleted: false,
                    type: this.form.type,
                    moduleName: this.form.moduleName,
                    sort: this.form.sort,
                    moduleLink: this.form.moduleLink,
                    moduleCode: this.form.code,
                    modulePicture: this.form.modulePicture,
                    linkType: this.form.linkType,
                };
                this.KongKim.push(json);
                this.centerDialogVisible = false
            },
            addKongKimItmeVisible() {
                //点击新增
                this.addOnedit = 2;
                this.centerDialogVisible = true;
                this.indexOf = '';
                this.contentQiniuimage = '';
                this.contentImageUrl = '';
                this.imageUrl = "";
                this.form = {
                    type: 1,
                    moduleName: '',
                    sort: '',
                    moduleLink: '',
                    linkType: "",
                    activeId: "",
                };
                // console.log(itme)
            },
            editKongKimItme(itme, index) {
                //点击编辑
                this.addOnedit = 1;
                this.centerDialogVisible = true;
                this.indexOf = index;
                this.imageUrl = itme.moduleIcon;
                this.contentQiniuimage = itme.modulePicture;
                this.contentImageUrl = itme.modulePicture;
                this.qiniuimage = itme.moduleIcon;
                this.form = {
                    type: itme.type,
                    moduleName: itme.moduleName,
                    sort: itme.sort,
                    moduleLink: itme.moduleLink,
                    tableId: itme.tableId,
                    modulePicture: itme.modulePicture,
                    code: itme.moduleCode,
                    linkType: itme.linkType,
                    activeId: itme.activeId,
                };
                console.log(itme)
            },
            updateKongKimItme() {
                // 编辑完成点击确定
                if (this.form.sort == 0) {
                    this.$message.error("排序不能是0");
                    return
                }

                if (this.form.type == 1) {
                    console.log(this.qiniuimage);
                    console.log(this.form.moduleName);
                    console.log(this.form.sort);
                    // console.log(this.form.moduleLink)
                    if (this.qiniuimage == '' || this.form.moduleName == '' || this.form.sort == '') {
                        this.$message.error("必须上传一张图，输入名字，排序，链接");
                        return
                    }
                } else {
                    if (this.qiniuimage == '' || this.form.moduleName == '' || this.form.sort == '') {
                        this.$message.error("必须上传一张图，输入名字，排序");
                        return
                    }
                }

                let json = {
                    moduleIcon: this.qiniuimage,
                    enable: true,
                    deleted: false,
                    type: this.form.type,
                    moduleName: this.form.moduleName,
                    sort: this.form.sort,
                    moduleLink: this.form.moduleLink,
                    tableId: this.form.tableId,
                    modulePicture: this.contentQiniuimage,
                    moduleCode: this.form.code,
                    linkType: this.form.linkType,
                    activeId: this.form.activeId,
                };
                console.log(json);
                // this.KongKim.push(json)
                this.$set(this.KongKim, this.indexOf, json);
                this.centerDialogVisible = false

            },

            beforeAvatarUpload(file) {
                console.log(file.type);
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG ，PNG格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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

            //上传图片
            handleSuccess(response, file, fileList) {
                //成功的回调函数
                this.qiniuimage = this.imgSite + "/" + response.key;
                this.imageUrl = this.qiniuimage;
                console.log(this.qiniuimage)
            },

            contentHandleSuccess(response, file, fileList) {
                this.contentQiniuimage = this.imgSite + "/" + response.key;
                this.contentImageUrl = this.contentQiniuimage;
                console.log(this.contentQiniuimage)
            }
        },
        watch: {}
    }

</script>

<style scoped>
    .course {
        width: 90%;
        text-align: center;
        margin: 0 0 0 10%;
        display: flex;
    }

    .Kong {
        display: flex;
        width: 80%;
        margin: 50px auto;
    }

    .KongKim {
        width: 390px;
        /* margin-left: 100px; */
        display: flex;
        flex-wrap: wrap;
    }

    .KongKim_itme {
        width: 17%;
        margin: 10px 1.5%;
        cursor: pointer;
        position: relative;
    }

    .KongKim_itme:hover .KongKim_itme_close {
        display: block;
    }

    .KongKim_itme_img {
        width: 60px;
        height: 60px;
    }

    .KongKim_itme_div {
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .KongKim_itme_close {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 15px;
        display: none;
    }

    .KongAdd {
        width: 50px;
        height: 50px;
        margin-top: 16px;
    }

    .KongAdd img {
        width: 100%;
        /* border: #000000 2px solid; */
        cursor: pointer;
    }

    .KongAdd div {
        width: 100%;
        cursor: pointer;
        text-align: center;
    }

    .pageImgSwitch {
        width: 80%;
        margin: 124px auto;
    }

    .pageImgSwitchItme {
        height: 30px;
        line-height: 30px;
        margin: 5px 0;
        display: flex;
    }

    .pageImgSwitchItme_div {
        width: 30%;
    }

    .el-switch {
        width: 30%;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style>
    .el_upload_box .el-upload {
        width: 185px;
    }

    .main .el-dialog__body .el_upload_box {
        text-align: center;
        display: flex;
        justify-content: center;
    }

    .main .KongKim .el-button--small {
        padding: 2px 15px;
    }
</style>

