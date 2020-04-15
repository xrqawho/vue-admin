<template>
	<div class="dataStatistics">
		<div class="crumbs">

			数据统计

		</div>

		<div class="detailData" style="display: flex;">
			<div class="data_box" style="width:12.5%">
				<div class="itme itme1_fontSize">总下载量</div>
				<div class="itme itme1_fontSize" style="color: #FF4E4E;font-weight: 600;">{{yesterdayNewUsersData.totalDownloadVolume}}</div>
				<div class="itme itme2_fontSize">昨日下载量</div>
				<div class="itme itme2_fontSize" style="color: #FF4E4E;font-weight: 600;">{{yesterdayNewUsersData.yesterdayDownloadVolume}}</div>
			</div>

			<div class="data_box" style="width:14.5%">
				<div class="itme itme1_fontSize">今日之前用户量</div>
				<div class="itme itme1_fontSize" style="color: #FF7E00;font-weight: 600;">{{yesterdayNewUsersData.totalNumberYesterday}}</div>
				<div class="itme itme2_fontSize">昨日注册量</div>
				<div class="itme itme2_fontSize" style="color: #FF7E00;font-weight: 600;">{{yesterdayNewUsersData.yesterdayUserRegistration}}</div>
			</div>



			<div class="data_box" style="width:14.5%">
				<div class="itme itme1_fontSize">总下单用户</div>
				<div class="itme itme1_fontSize" style="color: #6468FF;font-weight: 600;">{{yesterdayNewUsersData.totalOrderUserRegistration}}</div>
				<div class="itme itme2_fontSize">昨日下单用户</div>
				<div class="itme itme2_fontSize" style="color: #6468FF;font-weight: 600;">{{yesterdayNewUsersData.yesterdayOrderQuantity}}</div>
			</div>



			<div class="data_box" style="width:14.5%">
				<div class="itme itme1_fontSize">昨日新增A</div>
				<div class="itme itme1_fontSize" style="color: #FF009C;font-weight: 600;">{{yesterdayNewUsersData.yesterdayAddingUsers}}</div>
				<div class="itme itme2_fontSize">昨日复购用户</div>
				<div class="itme itme2_fontSize" style="color: #FF009C;font-weight: 600;">{{yesterdayNewUsersData.yesterdayOrderRepeat}}</div>
			</div>

			<div class="data_box" style="width:14.5%">
				<div class="itme itme1_fontSize">昨日新增A占比</div>
				<div class="itme itme1_fontSize" style="color: #FF009C;font-weight: 600;">{{yesterdayNewUsersData.yesterdayOrderQuantityProportion}}%</div>
				<div class="itme itme2_fontSize">昨日复购用户占比</div>
				<div class="itme itme2_fontSize" style="color: #FF009C;font-weight: 600;">{{yesterdayNewUsersData.yesterdayOrderRepeatProportion}}%</div>
			</div>

			<!-- 以上完成++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

			<div class="data_box" style="width:14.5%">
				<div class="itme itme1_fontSize">总B人数</div>
				<div class="itme itme1_fontSize" style="color: #48B488;font-weight: 600;">{{yesterdayNewUsersData.totalNoBuy}}</div>
				<div class="itme itme2_fontSize">昨日新增B</div>
				<div class="itme itme2_fontSize" style="color: #48B488;font-weight: 600;">{{yesterdayNewUsersData.yesterdayNoBuy}}</div>
			</div>

			<div  style="width:14.5%">
				<div class="itme itme1_fontSize">总查B占比</div>
				<div class="itme itme1_fontSize" style="color: #A800FF;font-weight: 600;">{{yesterdayNewUsersData.totalNoBuyProportion}}%</div>
				<div class="itme itme2_fontSize">昨日新增B占比</div>
				<div class="itme itme2_fontSize" style="color: #A800FF;font-weight: 600;">{{yesterdayNewUsersData.yesterdayNoBuyProportion}}%</div>
			</div>

			<!-- <div style="width:16.5%">
				<div class="itme itme1_fontSize">总下单用户占比</div>
				<div class="itme itme1_fontSize" style="color: #FF009C;font-weight: 600;">{{placeAnOrder.totalOrderQuantityProportion}}%</div>
				<div class="itme itme2_fontSize">昨日下单用户占比</div>
				<div class="itme itme2_fontSize" style="color: #FF009C;font-weight: 600;">{{placeAnOrder.yesterdayOrderQuantityProportion}}%</div>
			</div> -->


		</div>


		<div class="detailData" >
			<div class="detailDataTitle">
				订单预览
				<div class="btn30">30天记录下载</div>
			</div>
			<div class="detailDataBody">
				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/new1/9.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">总订单数</div>
							<div class="commission_box_div_div2">{{orderOverviewData.totalOrder}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new1/8.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1 secondLevel">昨日订单数</div>
							<div class="commission_box_div_div2">{{orderOverviewData.OrderNumberOfYesterday}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/new1/0.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">0元购占比</div>
							<div class="commission_box_div_div2">{{orderOverviewData.totalGoodFreesProportion}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new1/1.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1 secondLevel">昨日0元购占比</div>
							<div class="commission_box_div_div2">{{orderOverviewData.yesterdayTotalGoodFreesProportion}}%</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/new1/6.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">单笔0元购成本</div>
							<div class="commission_box_div_div2">{{orderOverviewData.singleZeroPurchaseCost}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new1/7.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1 secondLevel">昨日单笔0元购成本</div>
							<div class="commission_box_div_div2">{{orderOverviewData.yesterdayZeroPurchaseCost}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/new1/3.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">首单占比</div>
							<div class="commission_box_div_div2">{{orderOverviewData.firstShareRatio}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new1/2.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1 secondLevel">昨日首单占比</div>
							<div class="commission_box_div_div2">{{orderOverviewData.yesterdayFirstShareRatio}}%</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/new1/5.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">单笔首单成本</div>
							<div class="commission_box_div_div2">{{orderOverviewData.singleInitialCost}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new1/4.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1 secondLevel">昨日单笔首单成本</div>
							<div class="commission_box_div_div2">{{orderOverviewData.yesterdaySingleInitialCost}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/new1/11.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">0元购单数</div>
							<div class="commission_box_div_div2">{{orderOverviewData.totalGoodFrees}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new1/10.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1 secondLevel">昨日0元购单数</div>
							<div class="commission_box_div_div2">{{orderOverviewData.yesterdayTotalGoodFrees}}</div>
						</div>
					</div>
				</div>


			</div>
		</div>



		<div class="detailData" >
			<div class="detailDataTitle">
				佣金和单产
				<div class="btn30">30天记录下载</div>
			</div>
			<div class="detailDataBody">
				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/佣金@2x.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">今日佣金</div>
							<div class="commission_box_div_div2">{{commissionAmountData.todayCommission}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/佣金1@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日佣金</div>
							<div class="commission_box_div_div2">{{commissionAmountData.yesterdayCommission}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/提现@2x.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">今日提现</div>
							<div class="commission_box_div_div2">{{commissionAmountData.todayWithdrawal}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/提现1@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日提现</div>
							<div class="commission_box_div_div2">{{commissionAmountData.yesterdayWithdrawal}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/钱@2x.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">近30天佣金</div>
							<div class="commission_box_div_div2">{{commissionAmountData.nearOneMonthCommission}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/占比@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">提现占比</div>
							<div class="commission_box_div_div2">{{commissionAmountData.commissionProportion}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/市场产出@2x.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">单粉产出</div>
							<div class="commission_box_div_div2">{{commissionAmountData.fansOutput}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/渠道产出@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">下单用户单产</div>
							<div class="commission_box_div_div2">{{commissionAmountData.orderingUser}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/new1/9.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日免单补贴金额</div>
							<div class="commission_box_div_div2">{{orderOverviewData.yesterdaySubsidyFreeAmount}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new1/8.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1" >昨天免单联盟佣金</div>
							<div class="commission_box_div_div2">{{orderOverviewData.freeAllianceCommissionYesterday}}</div>
						</div>
					</div>
				</div>

				<!-- <div class="commission_box">
                    <div class="commission_box_div" >
                        <img class="commission_box_div_img" src="../../../assets/icon/总裂变奖励@2x.png" alt="">
                        <div class="commission_box_div_div">
                            <div class="commission_box_div_div1">总裂变人数</div>
                            <div class="commission_box_div_div2">{{byOneself.totalFissionNumber}}</div>
                        </div>
                    </div>
                    <div class="commission_box_div" >
                        <img src="../../../assets/icon/昨日裂变人数@2x.png" class="commission_box_div_img" alt="">
                        <div class="commission_box_div_div">
                            <div class="commission_box_div_div1">昨日裂变人数</div>
                            <div class="commission_box_div_div2">{{byOneself.yesterdayFissionSpend}}</div>
                        </div>
                    </div>
                </div> -->

				<!-- <div class="commission_box">
                    <div class="commission_box_div" >
                        <img class="commission_box_div_img" src="../../../assets/icon/预计花费@2x.png" alt="">
                        <div class="commission_box_div_div">
                            <div class="commission_box_div_div1">总裂变花费</div>
                            <div class="commission_box_div_div2">{{byOneself.totalFissionSpend}}</div>
                        </div>
                    </div>
                    <div class="commission_box_div" >
                        <img src="../../../assets/icon/昨日裂变花费@2x.png" class="commission_box_div_img" alt="">
                        <div class="commission_box_div_div">
                            <div class="commission_box_div_div1">昨日裂变花费</div>
                            <div class="commission_box_div_div2">{{byOneself.yesterdayFissionNumber}}</div>
                        </div>
                    </div>
                </div> -->
			</div>
		</div>





		<div class="detailData" style="height: 320px;" >
			<div class="detailDataTitle" style="height: 10%;border-bottom: none;">
				其他金额
				<div class="btn30" @click="down">30天记录下载</div>
			</div>
			<div class="detailDataBody" style="border-top: 1px solid #999;">
				<div class="commission_box1">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/new2/5.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">总邀请人数</div>
							<div class="commission_box_div_div2">{{elseMoney.inviteNum.totMoney}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new2/4.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日邀请人数（有效）</div>
							<div class="commission_box_div_div2">{{elseMoney.inviteNum.yesMoney}}</div>
						</div>
					</div>
				</div>

				<!-- <div class="commission_box1">
                    <div class="commission_box_div" >
                        <img class="commission_box_div_img" src="../../../assets/icon/new2/6.png" alt="">
                        <div class="commission_box_div_div">
                            <div class="commission_box_div_div1">总邀请花费</div>
                            <div class="commission_box_div_div2">{{otherAmountStatisticsData.totalInvitationCost}}</div>
                        </div>
                    </div>
                    <div class="commission_box_div" >
                        <img src="../../../assets/icon/new2/1.png" class="commission_box_div_img" alt="">
                        <div class="commission_box_div_div">
                            <div class="commission_box_div_div1">昨日邀请花费</div>
                            <div class="commission_box_div_div2">{{otherAmountStatisticsData.invitationExpenseYesterday}}</div>
                        </div>
                    </div>
                </div> -->

				<div class="commission_box1">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/邀请@2x.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">邀请奖励总额</div>
							<div class="commission_box_div_div2">{{elseMoney.inviteAward.totMoney}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/昨日邀请奖励@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日邀请奖励（预估）</div>
							<div class="commission_box_div_div2">{{elseMoney.inviteAward.yesMoney}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box1">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/下级@2x.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">分佣提成总额</div>
							<div class="commission_box_div_div2">{{elseMoney.subordinate.totMoney}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/下级汇报@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日分佣提成（预估）</div>
							<div class="commission_box_div_div2">{{elseMoney.subordinate.yesMoney}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box1">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/总签到金额@2x.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">总签到金额</div>
							<div class="commission_box_div_div2">{{elseMoney.signIn.totMoney}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/昨日签到金额@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日签到金额</div>
							<div class="commission_box_div_div2">{{elseMoney.signIn.yesMoney}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box1">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/新手红包总额.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">新手红包总额</div>
							<div class="commission_box_div_div2">{{elseMoney.Newbie.totMoney}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/昨日新手红包@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日新手红包</div>
							<div class="commission_box_div_div2">{{elseMoney.Newbie.yesMoney}}</div>
						</div>
					</div>
				</div>
			</div>


			<div class="detailDataBody" style="border-top: 1px solid #999;">


				<div class="commission_box1">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/首购红包总额.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">首购红包总额</div>
							<div class="commission_box_div_div2">{{elseMoney.firstOrder.totMoney}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/昨日首购红包.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日首购红包（预估）</div>
							<div class="commission_box_div_div2">{{elseMoney.firstOrder.yesMoney}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box1">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/new2/3.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">金币金额</div>
							<div class="commission_box_div_div2">{{elseMoney.gold.totMoney}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new2/2.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日金币金额</div>
							<div class="commission_box_div_div2">{{elseMoney.gold.yesMoney}}</div>
						</div>
					</div>
				</div>




			</div>



		</div>


	</div>
</template>

<script>
    import { post,get } from '../../../api/index';
    export default {
        name: 'dataStatistics',
        data() {
            return {
                downloads:{
                    total: '',
                    yesterday: '',
                },

                userNumber:{
                    total: '',
                    yesterday: '',
                },

                CheckTheVolumeNoShopping:{
                    total: '',
                    yesterday: '',
                },

                placeAnOrder:{
                    total: '',
                    yesterday: '',
                },

                elseMoney: {//其他金额
                    Newbie:{},//新手红包
                    firstOrder:{},//首单红包
                    cellPhoneNumber:{},//绑定手机号
                    inviteAward:{},//邀请红包
                    signIn:{},//签到金额
                    subordinate:{},//下级提成
                    gold:{},//金币金额
                    inviteNum:{},//邀请人数
                    commission:{},//佣金
                },

                commissionStatistics:'',
                byOneself: '',
                yesterdayData: "",
                orderRelatedData: "",
                otherAmountData: "",
                //新的统计
                yesterdayNewUsersData: "",
                orderOverviewData: "",
                commissionAmountData: "",
                otherAmountStatisticsData: "",
            }
        },
        created() {
            // this.cashDownload()
            //       this.ownloadVolume()
            // this.userRegistration()
            // this.voucherPurchaseQuantity()
            // this.orderQuantity()
            // this.commissionAmount()
            // this.singleOutput()
            this.otherMoney()
            // this.yesterdayNewUsers()
            // this.orderRelated()
            // this.otherAmount()
            //新的接口
            this.yesterdayNewUsersMethod()
            this.orderOverviewMethod()
            this.commissionAmountMethod()
            // this.otherAmountStatisticsMethod()
        },
        computed: {

        },
        methods: {
            cashDownload(){
                // 30天下载未完成
                get("web/data/statistics/cashDownload",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            ownloadVolume(){
                // 下载量统计
                get("web/data/statistics/ownloadVolume",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.downloads.total = data.data.data.totalDownloadVolume
                        this.downloads.yesterday = data.data.data.yesterdayDownloadVolume
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            userRegistration(){
                // 用户注册量统计
                get("web/data/statistics/userRegistration",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.userNumber.total = data.data.data.totalUserRegistration
                        this.userNumber.yesterday = data.data.data.yesterdayUserRegistration
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            voucherPurchaseQuantity(){
                // 查券购买量统计
                get("web/data/statistics/voucherPurchaseQuantity",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.CheckTheVolumeNoShopping = data.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            orderQuantity(){
                // 下单量统计
                get("web/data/statistics/orderQuantity",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.placeAnOrder = data.data.data

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commissionAmount(){
                // 佣金量统计
                get("web/data/statistics/commissionAmount",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.commissionStatistics = data.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            singleOutput(){
                // 单产量统计
                get("web/data/statistics/singleOutput",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.byOneself = data.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            otherMoney(){
                // 金额统计
                get("web/data/statistics/otherMoney",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        // this.otherAmountStatisticsData = data.data.data
                        for (let i = 0; i < data.data.data.length; i++) {

                            switch (data.data.data[i].id){
                                case 1:
                                    // 新手红包
                                    this.elseMoney.Newbie = data.data.data[i]
                                    break;
                                case 2:
                                    // 首购红包
                                    this.elseMoney.firstOrder = data.data.data[i]
                                    break;
                                case 5:
                                    // 邀请奖励
                                    this.elseMoney.inviteAward = data.data.data[i]
                                    break;
                                case 8:
                                    // 总签到
                                    this.elseMoney.signIn = data.data.data[i]
                                    break;
                                case 12:
                                    // 下级提成
                                    this.elseMoney.subordinate = data.data.data[i]
                                    break;
                                case 13:
                                    // 金币金额
                                    this.elseMoney.gold = data.data.data[i]
                                    break;
                                case 14:
                                    // 总邀请人数
                                    this.elseMoney.inviteNum = data.data.data[i]
                                    break;
                                default:
                                    break;
                            }
                        }
                        console.log(this.elseMoney)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            yesterdayNewUsers(){
                //昨日新增用户相关统计
                get("web/data/statistics/yesterdayNewUsers",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.yesterdayData = data.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            orderRelated(){
                //订单相关
                get("web/data/statistics/orderOverview",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.orderRelatedData = data.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            otherAmount(){
                //其他金额
                get("web/data/statistics/otherAmountStatistics",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        // this.otherAmountData = data.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },



            yesterdayNewUsersMethod(){
                //用户相关数据统计
                get("web/data/statistics/yesterdayNewUsers",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.yesterdayNewUsersData = data.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            orderOverviewMethod(){
                //订单相关数据统计
                get("web/data/statistics/orderOverview",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.orderOverviewData = data.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commissionAmountMethod(){
                //佣金和单产数据统计
                get("web/data/statistics/commissionAmount",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.commissionAmountData = data.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // otherAmountStatisticsMethod(){
            // 			   //其他金额数据统计
            // 			   get("web/data/statistics/otherAmountStatistics",{
            // 					params: {
            //
            // 					}
            // 			   })
            // 			   .then( (data) => {
            // 					console.log(data)
            // 					this.otherAmountStatisticsData = data.data.data
            // 			   })
            // 			   .catch(function (error) {
            // 				  console.log(error);
            // 			   });
            // },

            down(){
                //下载
                get("web/data/statistics/cashDownload",{
                        params: {
                        },
                        responseType: 'blob', //二进制流
                    }

                )
                    .then(function (response) {
                        console.log(response)
                        var blob = new Blob([response.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                        console.log(blob)
                        var downloadElement = document.createElement('a');
                        var href = window.URL.createObjectURL(blob); //创建下载的链接
                        downloadElement.href = href;
                        downloadElement.download = '30天记录.xls'; //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素

                        window.URL.revokeObjectURL(href); //释放掉blob对象

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        }
    }

</script>

<style scoped>
	.crumbs{
		width: calc(100% - 40px);
		background-color: #FFF;
		height: 60px;
		line-height: 60px;
		font-size: 22px;
		font-weight: 400;
		padding-left: 30px;
		border-radius: 8px;
	}
	.detailData{
		width: calc(95% - 60px);
		margin: 30px auto;
		padding: 20px 10px;
		height: 160px;
		background-color: #FFF;
		border-radius: 10px;

	}
	.data_box{
		border-right: 1px solid #ccc;
	}
	.itme{
		height: 28%;
		/* line-height: 25%; */
		color: #333333;
		text-align: center;

	}
	.itme1_fontSize{
		font-size: 22px;
		color: #000000;
	}
	.itme2_fontSize{
		font-size: 18px;
		color: #666666;
	}
	.detailDataTitle{
		width: 96%;
		border-bottom:1px #999 solid;
		height: 18%;
		font-weight: 600;
		margin: 0 auto;
	}
	.detailDataBody{
		width: 96%;
		display: flex;
		margin-left: 10px;
	}
	.commission_box{
		width: 16.6%;
	}
	.commission_box_div{
		width: calc(91% - 1px);
		height: 50px;
		border-right: 1px solid #999;
		margin: 15px 29px 15px 29px
	}
	.commission_box_div_img{
		width: 50px;
	}
	.commission_box_div_div{
		float: right;
		width: calc(100% - 50px);
		text-align: center;
	}
	.commission_box_div_div1{
		color: #333;
		font-size: 18px;
	}
	.commission_box_div_div2{
		color: #4873FF;
		font-size: 20px;
	}
	.commission_box1{
		width: 20%;
	}
	.btn30{
		float: right;
		width: 120px;
		background-color: #5AC3FF;
		color: #FFF;
		text-align: center;
		padding: 2px;
		border-radius:5px;
		cursor: pointer;
	}
	#secondLevel{
		font-size: 14px;
		color: #9f9f9f;
	}
</style>
