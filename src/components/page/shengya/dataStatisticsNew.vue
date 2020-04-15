<template>
	<div class="dataStatistics">
		<div class="crumbs">数据统计</div>

		<div class="detailData" >
			<div class="detailDataTitle">
				会员概览
			</div>
			<div class="detailDataBody">
				<div class="commission_box535">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/佣金@2x.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">注册人数</div>
							<div class="commission_box_div_div2">{{totalData.zyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/佣金1@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">今日注册数</div>
							<div class="commission_box_div_div2">{{todayData.zyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/佣金1@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日注册数</div>
							<div class="commission_box_div_div2">{{yesterdayData.zyh}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总转化数</div>
							<div class="commission_box_div_div2">{{totalData.zzhyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日转化数</div>
							<div class="commission_box_div_div2">{{todayData.zzhyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日转化数</div>
							<div class="commission_box_div_div2">{{yesterdayData.zzhyh}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总转化率</div>
							<div class="commission_box_div_div2">{{totalData.zzhl}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日转化率</div>
							<div class="commission_box_div_div2">{{todayData.zzhl}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日转化率</div>
							<div class="commission_box_div_div2">{{yesterdayData.zzhl}}%</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总渠道数</div>
							<div class="commission_box_div_div2">{{totalData.qdyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日渠道数</div>
							<div class="commission_box_div_div2">{{todayData.qdyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日渠道数</div>
							<div class="commission_box_div_div2">{{yesterdayData.qdyh}}</div>
						</div>
					</div>
				</div>


				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总渠道转化</div>
							<div class="commission_box_div_div2">{{totalData.qdzhyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日渠道转化</div>
							<div class="commission_box_div_div2">{{todayData.qdzhyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日渠道转化</div>
							<div class="commission_box_div_div2">{{yesterdayData.qdzhyh}}</div>
						</div>
					</div>
				</div>


				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总渠道转化率</div>
							<div class="commission_box_div_div2">{{totalData.qdzhl}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今渠道转化率</div>
							<div class="commission_box_div_div2">{{todayData.qdzhl}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨渠道转化率</div>
							<div class="commission_box_div_div2">{{yesterdayData.qdzhl}}%</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总裂变数</div>
							<div class="commission_box_div_div2">{{totalData.lbyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日裂变数</div>
							<div class="commission_box_div_div2">{{todayData.lbyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日裂变数</div>
							<div class="commission_box_div_div2">{{yesterdayData.lbyh}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总裂变转化数</div>
							<div class="commission_box_div_div2">{{totalData.lbzhyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今裂变转化数</div>
							<div class="commission_box_div_div2">{{todayData.lbzhyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨裂变转化数</div>
							<div class="commission_box_div_div2">{{yesterdayData.lbzhyh}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总裂变转化率</div>
							<div class="commission_box_div_div2">{{totalData.lbzhl}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今裂变转化率</div>
							<div class="commission_box_div_div2">{{todayData.lbzhl}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨裂变转化率</div>
							<div class="commission_box_div_div2">{{yesterdayData.lbzhl}}%</div>
						</div>
					</div>
				</div>


			</div>
		</div>



		<div class="detailData" >
			<div class="detailDataTitle">
				佣金和单产
			</div>
			<div class="detailDataBody">
				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/佣金@2x.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">总佣金</div>
							<div class="commission_box_div_div2">{{totalData.zyj}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/佣金1@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">今日佣金</div>
							<div class="commission_box_div_div2">{{todayData.zyj}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/佣金1@2x.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">昨日佣金</div>
							<div class="commission_box_div_div2">{{yesterdayData.zyj}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总订单补贴</div>
							<div class="commission_box_div_div2">{{totalData.zddbt}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日订单补贴</div>
							<div class="commission_box_div_div2">{{todayData.zddbt}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日订单补贴</div>
							<div class="commission_box_div_div2">{{yesterdayData.zddbt}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总任务补贴</div>
							<div class="commission_box_div_div2">{{totalData.rwbt}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日任务补贴</div>
							<div class="commission_box_div_div2">{{todayData.rwbt}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日任务补贴</div>
							<div class="commission_box_div_div2">{{yesterdayData.rwbt}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总提现</div>
							<div class="commission_box_div_div2">{{totalData.ztx}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日提现</div>
							<div class="commission_box_div_div2">{{todayData.ztx}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日提现</div>
							<div class="commission_box_div_div2">{{yesterdayData.ztx}}</div>
						</div>
					</div>
				</div>


				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总首购红包</div>
							<div class="commission_box_div_div2">{{totalData.sghb}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日首购红包</div>
							<div class="commission_box_div_div2">{{todayData.sghb}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日首购红包</div>
							<div class="commission_box_div_div2">{{yesterdayData.sghb}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总邀请红包</div>
							<div class="commission_box_div_div2">{{totalData.yqhb}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日邀请红包</div>
							<div class="commission_box_div_div2">{{todayData.yqhb}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日邀请红包</div>
							<div class="commission_box_div_div2">{{yesterdayData.yqhb}}</div>
						</div>
					</div>
				</div>
				<!--
				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总净收益</div>
							<div class="commission_box_div_div2">{{totalData.jsy}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日净收益</div>
							<div class="commission_box_div_div2">{{todayData.jsy}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日净收益</div>
							<div class="commission_box_div_div2">{{yesterdayData.jsy}}</div>
						</div>
					</div>
				</div>
				-->
				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总免单数</div>
							<div class="commission_box_div_div2">{{totalData.zmds}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日免单数</div>
							<div class="commission_box_div_div2">{{todayData.zmds}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日免单数</div>
							<div class="commission_box_div_div2">{{yesterdayData.zmds}}</div>
						</div>
					</div>
				</div>


				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总免单补贴</div>
							<div class="commission_box_div_div2">{{totalData.mdbt}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日免单补贴</div>
							<div class="commission_box_div_div2">{{todayData.mdbt}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日免单补贴</div>
							<div class="commission_box_div_div2">{{yesterdayData.mdbt}}</div>
						</div>
					</div>
				</div>

			</div>
		</div>

		<div class="detailData535" >
				<div class="detailDataTitle">
				收益统计
					<div :class="{ btn30: isSelect != '0' ,btn31: isSelect == '0'}" @click="selectMethod('0')">全部数据</div>
					<div :class="{ btn30: isSelect != '1' ,btn31: isSelect == '1'}" @click="selectMethod('1')">上月数据</div>
					<div :class="{ btn30: isSelect != '2' ,btn31: isSelect == '2'}" @click="selectMethod('2')">本月数据</div>
					<div :class="{ btn30: isSelect != '3' ,btn31: isSelect == '3'}" @click="selectMethod('3')">近30日数据</div>
					<div :class="{ btn30: isSelect != '4' ,btn31: isSelect == '4'}" @click="selectMethod('4')">近7日数据</div>
					<div :class="{ btn30: isSelect != '5' ,btn31: isSelect == '5'}" @click="selectMethod('5')">昨日数据</div>
					<div :class="{ btn30: isSelect != '6' ,btn31: isSelect == '6'}" @click="selectMethod('6')">今日数据</div>
				</div>
				<div class="detailDataBody">
						<div class="commission_box">
							<div class="commission_box_div" >
								<img class="commission_box_div_img" src="../../../assets/icon/佣金@2x.png" alt="">
								<div class="commission_box_div_div">
									<div class="commission_box_div_div1">联盟佣金</div>
									<div class="commission_box_div_div2">{{mydata.zyj}}</div>
								</div>
							</div>
							<div class="commission_box_div" >
								<img src="../../../assets/icon/佣金1@2x.png" class="commission_box_div_img" alt="">
								<div class="commission_box_div_div">
									<div class="commission_box_div_div1">净收益</div>
									<div class="commission_box_div_div2">{{mydata.jsy}}</div>
								</div>
							</div>
						</div>

						<div class="commission_box">
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">订单数</div>
									<div class="commission_box_div_div2">{{mydata.zdds}}</div>
								</div>
							</div>
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">无效订单数</div>
									<div class="commission_box_div_div2">{{mydata.wxdd}}</div>
								</div>
							</div>
						</div>

						<div class="commission_box">
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">任务补贴</div>
									<div class="commission_box_div_div2">{{mydata.zdds}}</div>
								</div>
							</div>
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">总提现</div>
									<div class="commission_box_div_div2">{{mydata.ztx}}</div>
								</div>
							</div>
						</div>

						<div class="commission_box">
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">免单数</div>
									<div class="commission_box_div_div2">{{mydata.zmds}}</div>
								</div>
							</div>
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">免单补贴</div>
									<div class="commission_box_div_div2">{{mydata.mdbt}}</div>
								</div>
							</div>
						</div>

						<div class="commission_box">
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">首单红包</div>
									<div class="commission_box_div_div2">{{mydata.sghb}}</div>
								</div>
							</div>
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">邀请红包</div>
									<div class="commission_box_div_div2">{{mydata.yqhb}}</div>
								</div>
							</div>
						</div>


						<div class="commission_box">
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">微信提现</div>
									<div class="commission_box_div_div2">{{mydata.wxtx}}</div>
								</div>
							</div>
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">支付宝提现</div>
									<div class="commission_box_div_div2">{{mydata.zfbtx}}</div>
								</div>
							</div>
						</div>


						<div class="commission_box">
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">注册数</div>
									<div class="commission_box_div_div2">{{mydata.zyh}}</div>
								</div>
							</div>
							<div class="commission_box_div" >
								<div class="commission_box_div_div535">
									<div class="commission_box_div_div1">今日单产</div>
									<div class="commission_box_div_div2">{{mydata.dc}}</div>
								</div>
							</div>
						</div>
				</div>
			 </div>


		<div class="detailData" >
			<div class="detailDataTitle">
				订单预览
			</div>
			<div class="detailDataBody">
				<div class="commission_box">
					<div class="commission_box_div" >
						<img class="commission_box_div_img" src="../../../assets/icon/new1/9.png" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1">总订单数</div>
							<div class="commission_box_div_div2">{{totalData.zdds}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new1/8.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1 secondLevel">今日订单数</div>
							<div class="commission_box_div_div2">{{todayData.zdds}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<img src="../../../assets/icon/new1/8.png" class="commission_box_div_img" alt="">
						<div class="commission_box_div_div">
							<div class="commission_box_div_div1 secondLevel">昨日订单数</div>
							<div class="commission_box_div_div2">{{yesterdayData.zdds}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总免单数</div>
							<div class="commission_box_div_div2">{{totalData.zmds}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1 secondLevel">今日免单数</div>
							<div class="commission_box_div_div2">{{todayData.zmds}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1 secondLevel">昨日免单数</div>
							<div class="commission_box_div_div2">{{yesterdayData.zmds}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总免单占比</div>
							<div class="commission_box_div_div2">{{totalData.zmdzb}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1 secondLevel">今日免单占比</div>
							<div class="commission_box_div_div2">{{todayData.zmdzb}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1 secondLevel">昨日免单占比</div>
							<div class="commission_box_div_div2">{{yesterdayData.zmdzb}}%</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总首单数</div>
							<div class="commission_box_div_div2">{{totalData.zsds}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1 secondLevel">今日首单数</div>
							<div class="commission_box_div_div2">{{todayData.zsds}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1 secondLevel">昨日首单数</div>
							<div class="commission_box_div_div2">{{yesterdayData.zsds}}</div>
						</div>
					</div>
				</div>

				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总首单占比</div>
							<div class="commission_box_div_div2">{{totalData.zsdzb}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1 secondLevel">今日首单占比</div>
							<div class="commission_box_div_div2">{{todayData.zsdzb}}%</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1 secondLevel">昨日首单占比</div>
							<div class="commission_box_div_div2">{{yesterdayData.zsdzb}}%</div>
						</div>
					</div>
				</div>


				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总下单人数</div>
							<div class="commission_box_div_div2">{{totalData.xdrs}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1 secondLevel"  >今日下单人数</div>
							<div class="commission_box_div_div2">{{todayData.xdrs}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1 secondLevel" >昨日下单人数</div>
							<div class="commission_box_div_div2">{{yesterdayData.xdrs}}</div>
						</div>
					</div>
				</div>


				<div class="commission_box">
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">总复购人数</div>
							<div class="commission_box_div_div2">{{totalData.zfgyh}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">今日下单人数</div>
							<div class="commission_box_div_div2">{{todayData.xdrs}}</div>
						</div>
					</div>
					<div class="commission_box_div" >
						<div class="commission_box_div_div535">
							<div class="commission_box_div_div1">昨日下单人数</div>
							<div class="commission_box_div_div2">{{yesterdayData.xdrs}}</div>
						</div>
					</div>
				</div>


			</div>
		</div>



		<div class="xie" >
			<div class="detailDataTitle535">
			商品模块产出
				<div :class="{ btn30: myModule != 3 ,btn31: myModule == 3}" @click="getData(3)">累计数据</div>
				<div :class="{ btn30: myModule != 2 ,btn31: myModule == 2}" @click="getData(2)">昨日数据</div>
				<div :class="{ btn30: myModule != 1 ,btn31: myModule == 1}" @click="getData(1)">今日数据</div>
			</div>
			<div class="detailDataBody" >
					<div class="table">
							 <el-table :data="tableData" border class="table" ref="multipleTable" >

							     <el-table-column prop="moduleName" label="模块">
							     </el-table-column>
							 	 <el-table-column prop="totalOrder" label="总笔数">
							 	</el-table-column>
							 	 <el-table-column prop="settlementOrder" label="已结算笔数">
							 	</el-table-column>
							     <el-table-column prop="totalCommission" label="预估佣金" >
							     </el-table-column>
							 	 <el-table-column prop="settlementCommission" label="已发放佣金" >
							 	</el-table-column>
							 	<el-table-column prop="customerCommission" label="客户佣金" >
							 	</el-table-column>
							 	<el-table-column prop="cusSettlementCommission" label="已发放客户佣金" >
							 	</el-table-column>
							 	<el-table-column prop="numberOrder" label="下单人数" >
							 	</el-table-column>
							 </el-table>
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
                totalData:'',
				myModule:1,
                yesterdayData:'',
                todayData:'',
				mydata:'',
				isSelect:'6',
				tableData: [],
                loading: false,
				moduleId:1,
            }
        },
        created() {
            //新的接口
            this.yesterdayMethod()
            this.todayMethod()
            this.totalMethod()
			this.getData(this.myModule)
        },
        computed: {

        },
        methods: {
            yesterdayMethod(){
                //昨日数据
                get("web/data/statistics/yesterdayData",{
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
            todayMethod(){
                //今日数据
                get("web/data/statistics/todayData",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.todayData = data.data.data
						this.mydata = data.data.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            totalMethod(){

                //总数据
                get("web/data/statistics/totalData",{
                    params: {

                    }
                })
                    .then( (data) => {
                        console.log(data)
                        this.totalData = data.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },


			//商品模块产出
			  // 获取数据
			getData(moduleId) {
				this.myModule = moduleId;
			    let vue = this
			    get("web/data/statistics/getGoodsModule",{
			        params: {
						moduleType: moduleId

			        }
			    })
			    .then(function (data) {
			        let arr = []
			        //一个数组用来接收加工后台传过来的数据

			        vue.tableData = data.data.data;

					// vue.page.pageSize = Number(data.data.data.size);
					//vue.page.pageNum =  Number(data.data.data.current);
					//vue.page.total =  Number(data.data.data.total)
			    })
			    .catch(function (error) {
			        console.log(error);
			    });
			},


            selectMethod(index){
                this.loading = true;
				this.isSelect = index;
                //根据条件查询数据
                get("web/data/statistics/selectData",{
                    params: {
						selectType:index
                    }
                }).then( (data) => {
                        this.mydata = data.data.data;
                    	 console.log("11111========" + JSON.stringify(this.mydata));
                        if(JSON.stringify(this.mydata) != "null" && JSON.stringify(this.mydata) != "{}" && this.mydata.hasOwnProperty("zyj")){
							 console.log("========");
                            console.log("========"+this.mydata.zyj);
						}
						this.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                        this.loading = false;
                    });
            }
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
		height: 250px;
		background-color: #FFF;
		border-radius: 10px;
	}
	.detailData535{
		width: calc(95% - 60px);
		margin: 30px auto;
		padding: 20px 10px;
		height: 160px;
		background-color: #FFF;
		border-radius: 10px;
	}
	.xie{
		width: calc(95% - 60px);
		margin: 30px auto;
		padding: 20px 10px;
		height: calc(95% - 60px);;
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
	.detailDataTitle535{
		width: 96%;
		height: 18%;
		font-weight: 600;
		margin: 0 auto;
		padding-bottom: 8px;
		padding-left: 10px;
		padding-right: 15px;
	}
	.detailDataBody{
		width: 96%;
		display: flex;
		margin-left: 10px;
	}
	.commission_box{
		width: 16.6%;
	}
	.commission_box535{
		width: 20%;
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

	.commission_box_div_div535{
		float: right;
		width: calc(100% - 10px);
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
		margin-right: 10px;
	}
	.btn31{
		float: right;
		width: 120px;
		background-color: #ff4500;
		color: #FFF;
		text-align: center;
		padding: 2px;
		border-radius:5px;
		cursor: pointer;
		margin-right: 10px;
	}
	.secondLevel{
		font-size: 14px;
		color: #9f9f9f;
	}
	.table{
	    width: 100%;
	    font-size: 14px;
	}
</style>
