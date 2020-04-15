<template>
    <div class="frozenCapital">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 佣金冻结设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--        <el-alert
                    title="温馨提示：提现金额大于设置金额时为不自动转账"
                    type="info"
                    effect="dark"
                    :closable="false">
                </el-alert> -->

        <el-card class="box-card">
            <div class="box_title">佣金冻结设置</div>

            <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">


                <el-form-item>
                    <el-tag type="warning">淘宝订单延迟结算：</el-tag>
                    佣金大于：
                    <el-input v-model.number="numberValidateForm.commissionlimit" autocomplete="off"></el-input>
                    元

                    延迟：
                    <el-input v-model.number="numberValidateForm.delaydays" autocomplete="off"></el-input>
                    天 结算
                </el-form-item>
                <el-form-item>
                    <el-tag type="warning">京东订单延迟结算：</el-tag>
                    佣金大于：
                    <el-input v-model.number="numberValidateForm.commissionlimitJD" autocomplete="off"></el-input>
                    元

                    延迟：
                    <el-input v-model.number="numberValidateForm.delaydaysJD" autocomplete="off"></el-input>
                    天 结算
                </el-form-item>
                <el-form-item>
                    <el-tag type="warning">拼多多订单延迟结算：</el-tag>
                    佣金大于：
                    <el-input v-model.number="numberValidateForm.commissionlimitPDD" autocomplete="off"></el-input>
                    元

                    延迟：
                    <el-input v-model.number="numberValidateForm.delaydaysPDD" autocomplete="off"></el-input>
                    天 结算
                </el-form-item>
                <!-- <el-form-item>
                    延迟：
                    <el-input  v-model.number="numberValidateForm.delaydays" autocomplete="off"></el-input>
                    结算
                </el-form-item> -->


                <el-form-item>
                    <el-tag type="warning">设备提现设置：</el-tag>
                    设备体现金额：
                    <el-input v-model.number="numberValidateForm.deviceWithdrawalAmount" autocomplete="off"></el-input>
                    元
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </el-card>


    </div>
</template>

<script>
    import {post, get} from '../../../api/index';

    export default {
        name: 'frozenCapital',
        data() {

            return {
                numberValidateForm: {

                    commissionlimit: null,
                    delaydays: null,
                    deviceWithdrawalAmount: null,
                    deviceWithdrawalDate: null,
                    tableId: null,
                    commissionlimitJD: null,
                    commissionlimitPDD: null,
                    delaydaysJD: null,
                    delaydaysPDD: null,
                }
            }
        },
        created() {
            this.getData()
        },
        computed: {
            data() {

            }
        },
        methods: {
            submitForm(formName) {
                post("web/commissionFreeze/save", {
                    commissionlimit: this.numberValidateForm.commissionlimit,
                    delaydays: this.numberValidateForm.delaydays,
                    commissionlimitJD: this.numberValidateForm.commissionlimitJD,
                    commissionlimitPDD: this.numberValidateForm.commissionlimitPDD,
                    delaydaysJD: this.numberValidateForm.delaydaysJD,
                    delaydaysPDD: this.numberValidateForm.delaydaysPDD,
                    deviceWithdrawalAmount: this.numberValidateForm.deviceWithdrawalAmount,
                })
                    .then((data) => {
                        if (data.data.status == 200) {
                            this.$message.success(data.data.msg);
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.numberValidateForm = {
                    commissionlimit: null,
                    delaydays: null,
                    deviceWithdrawalAmount: null,
                    deviceWithdrawalDate: null,
                    tableId: null,
                    commissionlimitJD: null,
                    commissionlimitPDD: null,
                    delaydaysJD: null,
                    delaydaysPDD: null,
                }
            },
            getData() {
                get("web/commissionFreeze/selectOfRedisById", {
                    params: {}
                })
                    .then((data) => {
                        console.log(data.data.data)
                        this.numberValidateForm = {
                            commissionlimit: data.data.data.commissionlimit,
                            delaydays: data.data.data.delaydays,
                            deviceWithdrawalAmount: data.data.data.deviceWithdrawalAmount,
                            deviceWithdrawalDate: data.data.data.deviceWithdrawalDate,
                            tableId: data.data.data.tableId,
                            commissionlimitJD: data.data.data.commissionlimitJD,
                            commissionlimitPDD: data.data.data.commissionlimitPDD,
                            delaydaysJD: data.data.data.delaydaysJD,
                            delaydaysPDD: data.data.data.delaydaysPDD,
                        }
                        console.log(this.numberValidateForm)

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        }
    }

</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 100%;
        margin: 0 auto;
        margin-top: 15px;

    }

    .el-alert--info.is-dark {
        margin: 5px 0 0 0;
    }

    .el-input {
        width: 20%;
    }

    .box_title {
        width: 100%;
        height: 40px;
    }
</style>
