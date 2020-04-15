<template>
    <div class="appPage" v-loading="loading">
        <el-alert
                title="首页相关开关管理,开关即时请求"
                type="info"
                effect="dark"
                :closable="false">
        </el-alert>

        <el-row :gutter="20">
            <el-col :span="8">
                <div class="itme">登录页面是否打开</div>
                <!-- 1开 0关 -->
                <div>
                    <el-radio v-model="loginPage" @change="changeUpdate(1,1)" :label="1">打开登录界面</el-radio>
                    <el-radio v-model="loginPage" @change="changeUpdate(1,0)" :label="0">关闭登录界面</el-radio>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="itme">5.56红包弹窗是否打开</div>
                <div>
                    <el-radio v-model="redPacket556" @change="changeUpdate(2,1)" :label="1">打开</el-radio>
                    <el-radio v-model="redPacket556" @change="changeUpdate(2,0)" :label="0">关闭</el-radio>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="itme">5.56红包弹窗叉号是否打开</div>
                <div>
                    <el-radio v-model="redPacketCross" @change="changeUpdate(3,1)" :label="1">打开</el-radio>
                    <el-radio v-model="redPacketCross" @change="changeUpdate(3,0)" :label="0">关闭</el-radio>
                </div>
            </el-col>
        </el-row>


        <el-alert
                title="任务界面开关管理"
                type="info"
                effect="dark"
                :closable="false"

        >
        </el-alert>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="itme">首次登录，任务阴影界面叉号是否打开</div>
                <div>
                    <el-radio v-model="FirstLoginMissionShadowCross" @change="changeUpdate(4,1)" :label="1">打开
                    </el-radio>
                    <el-radio v-model="FirstLoginMissionShadowCross" @change="changeUpdate(4,0)" :label="0">关闭
                    </el-radio>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="itme">任务界面，复制链接优惠弹框叉号开关</div>
                <div>
                    <el-radio v-model="taskPageCopyLinkAlertCross" @change="changeUpdate(5,1)" :label="1">打开</el-radio>
                    <el-radio v-model="taskPageCopyLinkAlertCross" @change="changeUpdate(5,0)" :label="0">关闭</el-radio>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="itme">任务界面，首购红包优惠弹窗叉号开关</div>
                <div>
                    <el-radio v-model="taskPageFirstPurchaseRedPacketAlertCross" @change="changeUpdate(6,1)" :label="1">
                        打开
                    </el-radio>
                    <el-radio v-model="taskPageFirstPurchaseRedPacketAlertCross" @change="changeUpdate(6,0)" :label="0">
                        关闭
                    </el-radio>
                </div>
            </el-col>

        </el-row>


        <!-- <el-alert
            title="消息界面开关管理"
            type="info"
            effect="dark"
            :closable="false">
          </el-alert>
          <el-row :gutter="20"> -->
        <!-- <el-col :span="8">
              <div class="itme" >确认收货是否发送消息</div>
              <div >
                  <el-radio v-model="confirmReceipt" @change="changeUpdate(7,1)" :label="1">发送</el-radio>
                  <el-radio v-model="confirmReceipt" @change="changeUpdate(7,0)" :label="0">不发送</el-radio>
              </div>
         </el-col> -->
        <!-- <el-col :span="8">
            <div class="itme" >订单结算是否发送消息</div>
            <div>
                <el-radio v-model="orderCloseAnAccount" @change="changeUpdate(8,1)" :label="1">发送</el-radio>
                <el-radio v-model="orderCloseAnAccount" @change="changeUpdate(8,0)" :label="0">不发送</el-radio>
            </div>
        </el-col>
      </el-row>-->
        <el-alert
                title="分享域名设置"
                type="info"
                effect="dark"
                :closable="false">
        </el-alert>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="shareUrl" style="width: 350px;" placeholder="请输入"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="shareUrlTwo" style="width: 350px;" placeholder="请输入"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="shareUrlThree" style="width: 350px;" placeholder="请输入"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="shareUrlFour" style="width: 350px;" placeholder="请输入"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="shareUrlFive" style="width: 350px;" placeholder="请输入"></el-input>
            </el-col>
        </el-row>


        <el-alert
                title="中间页分享域名设置"
                type="info"
                effect="dark"
                :closable="false">
        </el-alert>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="shareUrlTlj" style="width: 350px;" placeholder="请输入"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="shareUrlTwoTlj" style="width: 350px;" placeholder="请输入"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="shareUrlThreeTlj" style="width: 350px;" placeholder="请输入"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="shareUrlFourTlj" style="width: 350px;" placeholder="请输入"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="shareUrlFiveTlj" style="width: 350px;" placeholder="请输入"></el-input>
            </el-col>
        </el-row>


        <el-alert
                title="支付宝提现直接转账金额"
                type="info"
                effect="dark"
                :closable="false">
        </el-alert>
        <el-row :gutter="20">
            <el-col :span="7.5">
                <el-input v-model="zfbMoney" style="width: 200px;" placeholder="请输入金额"></el-input>
            </el-col>
            <el-col :span="5">
                元(设0元全部走审核)
            </el-col>
        </el-row>


        <el-alert
                title="邀请赚钱相关开关管理"
                type="info"
                effect="dark"
                :closable="false">
        </el-alert>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="itme">免单不算6元奖励开关</div>
                <div>
                    <el-radio v-model="Free6Yuan" @change="changeUpdate(9,1)" :label="1">不给奖励</el-radio>
                    <el-radio v-model="Free6Yuan" @change="changeUpdate(9,0)" :label="0">给奖励</el-radio>
                </div>
            </el-col>
        </el-row>

        <el-alert
                title="首页相关开关"
                type="info"
                effect="dark"
                :closable="false">
        </el-alert>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="itme">导航栏开关</div>
                <div>
                    <el-radio v-model="navigationBar" @change="changeUpdate(11,1)" :label="1">开启</el-radio>
                    <el-radio v-model="navigationBar" @change="changeUpdate(11,0)" :label="0">关闭</el-radio>
                </div>
            </el-col>

            <!-- <el-col :span="8">
              <div class="itme" >悬浮窗开关</div>
              <div >
                  <el-radio v-model="floatingWindow " @change="changeUpdate(12,1)" :label="1">开启</el-radio>
                  <el-radio v-model="floatingWindow" @change="changeUpdate(12,0)" :label="0">关闭</el-radio>
              </div>
            </el-col> -->
        </el-row>


        <el-alert
                title="红包金额设置"
                type="info"
                effect="dark"
                :closable="false"

        >
        </el-alert>
        <el-row :gutter="20">
            <el-col :span="20">
                购买低于
                <el-input v-model="invitationRedMoneyOrderpriceLimit" style="width: 80px;" placeholder="请输入"></el-input>
                元 订单，不给上级6元奖励。
                解释：下级购买的东西低于设置的金额，不给上级返利
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                邀请赚钱红包金额
                <el-input v-model="invitationRedMoneyAmount" style="width: 80px;" placeholder="请输入"></el-input>
                元
                订单收获成功延迟
                <el-input v-model="invitationRedMoneyExpireTime" style="width: 80px;" placeholder="请输入"></el-input>
                天 红包到账

            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="25">
                复制链接查询优惠红包金额
                <el-input v-model="newRedMoneyFixation" style="width: 80px;" placeholder="请输入"></el-input>
                元
                红包失效时间
                <el-input v-model="newRedMoneyInvalidTime" style="width: 80px;" placeholder="请输入"></el-input>
                天
                解释：第一次在淘宝复制链接到省公子查询优惠返0.36元红包。配置金额
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                首次复制链接查询优惠并下单奖励
                <el-input v-model="taskRedMoneyAmount" style="width: 80px;" placeholder="请输入"></el-input>
                元 红包失效时间
                <el-input v-model="taskRedMoneyInvalidTime" style="width: 80px;" placeholder="请输入"></el-input>
                天 订单收货成功延迟
                <el-input v-model="taskRedMoneyExpireTime" style="width: 80px;" placeholder="请输入"></el-input>
                天 红包到账
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="23">
                邀请赚钱0元购文案
                <el-input v-model="invitationTwoDesc" style="width: 350px;" placeholder="请输入"></el-input>
                邀请赚钱立赚6元文案
                <el-input v-model="invitationThreeDesc" style="width: 350px;" placeholder="请输入"></el-input>


            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="23">
                <!-- TAOLIJIN_APPKEY-->
                淘礼金appKey
                <el-input v-model="appKey" style="width: 350px;" placeholder="请输入"></el-input>
                <!--TAOLIJIN_ADZONEID-->
                淘礼金广告位adzone_id
                <el-input v-model="adzoneId" style="width: 350px;" placeholder="请输入"></el-input>


            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="23">
                <!--TAOLIJIN_SECRET-->
                淘礼金secret
                <el-input v-model="appSecret" style="width: 350px;" placeholder="请输入"></el-input>


            </el-col>
        </el-row>
        <el-button type="primary" @click="updateData" style="float: right;">保存</el-button>


    </div>
</template>

<script>
    import {post, get} from '../../../api/index';

    export default {
        name: 'appPage',
        data() {
            return {
                loginPage: 1,//登录界面
                redPacket556: 1,//5.56红包弹窗
                redPacketCross: 1,//5.56红包弹窗叉号是否打开

                FirstLoginMissionShadowCross: 1,//首次登录，任务阴影界面叉号
                taskPageCopyLinkAlertCross: 1,//任务界面，复制链接优惠弹框叉号
                taskPageFirstPurchaseRedPacketAlertCross: 1,//任务界面，首购红包优惠弹窗叉号

                confirmReceipt: 1,//确认收货
                orderCloseAnAccount: 1,//订单结算

                Free6Yuan: 1,//免单不算6元奖励
                navigationBar: "",


                loading: false,

                invitationRedMoneyOrderpriceLimit: '',	// 邀请赚钱客单价限额
                invitationRedMoneyAmount: '', //邀请赚钱红包金额
                invitationRedMoneyExpireTime: '', //邀请赚钱红包收货后到账日期
                newRedMoneyFixation: '', //新人红包固定金额
                newRedMoneyInvalidTime: '', //新人红包失效日期
                taskRedMoneyAmount: '', //任务红包金额
                taskRedMoneyInvalidTime: '', //任务红包失效日期
                taskRedMoneyExpireTime: '',//任务红包收货后到账日期
                invitationTwoDesc: '', //邀请赚钱0元购文案
                invitationThreeDesc: '', //邀请赚钱立赚6元文案
                shareUrl: '',
                shareUrlTwo: '',
                shareUrlThree: '',
                shareUrlFour: '',
                shareUrlFive: '',
                shareUrlTlj: '',
                shareUrlTwoTlj: '',
                shareUrlThreeTlj: '',
                shareUrlFourTlj: '',
                shareUrlFiveTlj: '',
                zfbMoney: '',
                appKey: '',
                appSecret: '',
                adzoneId: 0,
            }
        },
        created() {
            this.getData();
            this.getRedPacketData();
            this.getShareUrlData();
            this.getZfbMoney();
            this.getTljShareUrlData();
        },
        computed: {},
        methods: {
            changeUpdate(id, state) {
                // 点击单选框的时候触发的方法
                console.log(state)
                get("web/sySwitch/switchOff/update", {
                    params: {
                        switchId: id,
                        state: state,
                    }
                })
                    .then((data) => {
                        if (data.data.status == 200) {
                            // console.log(data.data.data)
                            this.$message.success(data.data.msg);
                            this.getData()

                        } else {
                            this.$message.error(data.data.msg);
                            this.getData()
                        }

                    })
                    .catch((error) => {
                        this.getData()
                        console.log(error);
                    });
            },
            getShareUrlData() {
                //获取红包设置的数据
                get("web/sySwitch/getShareUrl", {
                    params: {}
                })
                    .then((data) => {

                        this.shareUrl = data.data.data[0];
                        this.shareUrlTwo = data.data.data[1];
                        this.shareUrlThree = data.data.data[2];
                        this.shareUrlFour = data.data.data[3];
                        this.shareUrlFive = data.data.data[4];
                        console.log(data.data.data)

                    })
                    .catch((error) => {
                        this.loading = false
                        console.log(error);
                    });
            },

            getTljShareUrlData() {
                //获取红包设置的数据
                get("web/sySwitch/getTklShareUrl", {
                    params: {}
                })
                    .then((data) => {

                        this.shareUrlTlj = data.data.data[0];
                        this.shareUrlTwoTlj = data.data.data[1];
                        this.shareUrlThreeTlj = data.data.data[2];
                        this.shareUrlFourTlj = data.data.data[3];
                        this.shareUrlFiveTlj = data.data.data[4];
                        console.log(data.data.data)

                    })
                    .catch((error) => {
                        this.loading = false
                        console.log(error);
                    });
            },

            getZfbMoney() {
                //获取红包设置的数据
                get("web/sySwitch/getZfbMoney", {
                    params: {}
                })
                    .then((data) => {

                        this.zfbMoney = data.data.data;

                        console.log(data.data.data)

                    })
                    .catch((error) => {
                        this.loading = false
                        console.log(error);
                    });
            },

            getData() {
                // 获取数据
                this.loading = true
                get("web/sySwitch/switchOff/list", {
                    params: {}
                })
                    .then((data) => {
                        this.loading = false
                        // console.log(data)
                        for (let i = 0; i < data.data.data.length; i++) {
                            // console.log(data.data.data[i])
                            switch (Number(data.data.data[i].tableId)) {
                                case 1:
                                    //登录界面
                                    console.log(data.data.data[i].tableId)
                                    this.loginPage = data.data.data[i].state

                                    break;
                                case 2:
                                    //5.56红包弹窗
                                    this.redPacket556 = data.data.data[i].state

                                    break;
                                case 3:
                                    //5.56红包弹窗叉号是否打开

                                    this.redPacketCross = data.data.data[i].state
                                    break;


                                case 4:
                                    //首次登录，任务阴影界面叉号
                                    this.FirstLoginMissionShadowCross = data.data.data[i].state
                                    break;

                                case 5:
                                    //任务界面，复制链接优惠弹框叉号
                                    this.taskPageCopyLinkAlertCross = data.data.data[i].state
                                    break;

                                case 6:
                                    //任务界面，首购红包优惠弹窗叉号
                                    this.taskPageFirstPurchaseRedPacketAlertCross = data.data.data[i].state
                                    break;


                                case 7:
                                    //确认收货
                                    this.confirmReceipt = data.data.data[i].state
                                    break;
                                case 8:
                                    //订单结算
                                    this.orderCloseAnAccount = data.data.data[i].state
                                    break;

                                case 9:
                                    //订单结算
                                    this.Free6Yuan = data.data.data[i].state
                                    break;

                                case 11:
                                    //导航栏
                                    this.navigationBar = data.data.data[i].state
                                    break;


                                default:
                                // console.log(data.data.data[i].tableId)
                            }
                        }
                    })
                    .catch((error) => {
                        this.loading = false
                        console.log(error);
                    });
            },
            getRedPacketData() {
                //获取红包设置的数据
                get("web/appUserRewardSetup/list", {
                    params: {}
                })
                    .then((data) => {
                        this.invitationRedMoneyOrderpriceLimit = data.data.data[0].invitationRedMoneyOrderpriceLimit;
                        this.invitationRedMoneyAmount = data.data.data[0].invitationRedMoneyAmount;
                        this.invitationRedMoneyExpireTime = data.data.data[0].invitationRedMoneyExpireTime;
                        this.newRedMoneyFixation = data.data.data[0].newRedMoneyFixation;
                        this.newRedMoneyInvalidTime = data.data.data[0].newRedMoneyInvalidTime;
                        this.taskRedMoneyAmount = data.data.data[0].taskRedMoneyAmount;
                        this.taskRedMoneyInvalidTime = data.data.data[0].taskRedMoneyInvalidTime;
                        this.taskRedMoneyExpireTime = data.data.data[0].taskRedMoneyExpireTime;
                        this.invitationTwoDesc = data.data.data[0].invitationTwoDesc;
                        this.invitationThreeDesc = data.data.data[0].invitationThreeDesc;
                        this.appKey = data.data.data[0].appKey;
                        this.appSecret = data.data.data[0].appSecret;
                        this.adzoneId = data.data.data[0].adzoneId;
                        console.log(data.data.data[0])

                    })
                    .catch((error) => {
                        this.loading = false
                        console.log(error);
                    });
            },
            updateData() {
                //保存红包设置

                if (this.zfbMoney == null || this.zfbMoney == "" || this.zfbMoney == undefined || !Number(this.zfbMoney)) {
                    this.$message.warning("请填写正确的支付宝直接转账金额")
                    return
                }

                post("web/appUserRewardSetup/update", {
                    id: 1,
                    invitationRedMoneyOrderpriceLimit: this.invitationRedMoneyOrderpriceLimit,	// 邀请赚钱客单价限额
                    invitationRedMoneyAmount: this.invitationRedMoneyAmount, //邀请赚钱红包金额
                    invitationRedMoneyExpireTime: this.invitationRedMoneyExpireTime, //邀请赚钱红包收货后到账日期
                    newRedMoneyFixation: this.newRedMoneyFixation, //新人红包固定金额
                    newRedMoneyInvalidTime: this.newRedMoneyInvalidTime, //新人红包失效日期
                    taskRedMoneyAmount: this.taskRedMoneyAmount, //任务红包金额
                    taskRedMoneyInvalidTime: this.taskRedMoneyInvalidTime, //任务红包失效日期
                    taskRedMoneyExpireTime: this.taskRedMoneyExpireTime,//任务红包收货后到账日期
                    invitationTwoDesc: this.invitationTwoDesc, //邀请赚钱0元购文案
                    invitationThreeDesc: this.invitationThreeDesc, //邀请赚钱立赚6元文案
                    shareUrl: this.shareUrl, //邀请赚钱立赚6元文案
                    shareUrlTwo: this.shareUrlTwo,
                    shareUrlThree: this.shareUrlThree,
                    shareUrlFour: this.shareUrlFour,
                    shareUrlFive: this.shareUrlFive,
                    shareUrlTlj: this.shareUrlTlj,
                    shareUrlTwoTlj: this.shareUrlTwoTlj,
                    shareUrlThreeTlj: this.shareUrlThreeTlj,
                    shareUrlFourTlj: this.shareUrlFourTlj,
                    shareUrlFiveTlj: this.shareUrlFiveTlj,
                    zfbMoney: this.zfbMoney,
                    appKey: this.appKey,
                    appSecret: this.appSecret,
                    adzoneId: this.adzoneId,
                })
                    .then((data) => {
                        if (data.data.status == 200) {
                            // console.log(data.data.data)
                            this.$message.success(data.data.msg);
                            this.getRedPacketData()

                        } else {
                            this.$message.error(data.data.msg);
                            this.getRedPacketData()
                        }


                        console.log(data.data)

                    })
                    .catch((error) => {
                        this.loading = false
                        console.log(error);
                    });
            },

        }
    }

</script>

<style scoped>
    .appPage {
        width: 80%;
        margin: 0 auto;
    }

    .itme {
        height: 50px;
        line-height: 50px;
    }

    .el-row {
        margin-bottom: 20px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>

<style>
    .appPage .el-alert--info.is-dark {
        background-color: #ddd;
        color: #000;
    }
</style>

