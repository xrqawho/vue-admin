<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 意见反馈 </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">

				<el-button type="primary" @click="compileShop(0,null,2)">+ 新增</el-button>

			</div>
			<el-table :data="data" border class="table" v-loading="loading" ref="multipleTable">

				<el-table-column prop="itemId" label="商品id">
				</el-table-column>

				<el-table-column prop="itemshorttitle" label="商品标题">
				</el-table-column>

				<el-table-column prop="contentFeedback" label="图片" width="100">
					<template slot-scope="scope">
						<img :src="scope.row.itempic" alt="">
					</template>
				</el-table-column>

				<el-table-column prop="channelNameList" label="支持渠道">
					<!-- cr -->
					<!-- <template slot-scope="scope">
					    <div v-for="channelName in channelNameList" :key="channelName">
							{{channelName}}
						</div>
					</template> -->
				</el-table-column>

				<el-table-column prop="generalSchemeName" label="分佣方案">
				</el-table-column>


				<el-table-column prop="manageStatus" label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="compileShop(scope.$index,scope,1)">编辑</el-button>
						<el-button type="text" @click="deleteShop(scope.row.itemId)">删除</el-button>
					</template>
				</el-table-column>


			</el-table>
			<div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="page.total"
				 :page-size="page.pageSize" :current-page="page.pageNum">
				</el-pagination>
			</div>

		</div>

		<el-dialog title="新增/编辑" :visible.sync="editVisible" width="70%">

			<el-form ref="form" :model="form" label-width="82px">
				<el-form-item label="商品id">
					<!-- /^[1-9]d*$/ -->
					<el-input v-model.number="form.shopid" placeholder="shopid" maxlength="17"></el-input>
				</el-form-item>

				<el-form-item label="渠道">
					<div class="channelList">
					<div  v-for="item in form.channelNameList">
						<el-checkbox v-model="item.whether">{{item.channelName}}</el-checkbox>
					</div>
					</div>
				</el-form-item>

				<el-form-item label="分佣方案">
					<el-select v-model="form.solutionId" placeholder="请选择">
						<el-option v-for="item in form.solutionType" :label="item.schemeName" :value="item.generalFeeSchemeId"></el-option>
					</el-select>
				</el-form-item>
			</el-form>


			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="changeScheme">确 定</el-button>
				<!-- solution -->
			</span>
		</el-dialog>

		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>

	</div>
</template>

<script>
	import {
		post,
		get
	} from '../../../api/index';
	export default {
		name: 'goodsTop',
		data() {

			return {
				tableData: [],

				page: {
					pageSize: 5,
					pageNum: 1,
					total: 0,
				},
				form: {
					manageWay: "",
					shopid: null,
					// 全部渠道列表数据
					channelNameList: [],
					// 分佣方案种类
					solutionType: [],
					// 分佣方案id
					solutionId: null,
					generalSchemeName: "",
					determineScheme: "",
					// 提交渠道id
					overchannel: [],
					// 渠道id字符串形式
					channelstr: "",
					oldshopid: null
				},
				loading: false,
				// id: null,
				tableId: "",
				dialogVisible: false,
				editVisible: false,
				dialogImageUrl: "",
				code: 1,
				text: "",
			}
		},
		created() {
			this.getData(1);
			this.solutionType()
		},
		computed: {
			data() {

				return this.tableData.filter((d) => {
					let is_del = false;
					return d
				})
			}
		},
		watch: {
			form: {
				handler(newName, oldName) {
					// 						console.log(oldName.shopid)
					// console.log(newName.shopid)
					this.updataShopId(newName.shopid)
				},
				deep: true
			}

		},
		methods: {
			updataShopId(shopid) {
				// console.log(shopid)
				let reg = /^[1-9][0-9]{10,15}\d*$/

				// console.log(Number.isInteger(shopid))
				if (!Number.isInteger(shopid)) {
					this.form.shopid = null
				}
			},
			// 分页导航
			handleCurrentChange(val) {

				this.getData(val);
			},
			// 获取数据
			getData(pageNum) {

				let vue = this
				this.loading = true
				get("web/syChannelGoods/selectSyChannelGoods", {
						params: {
							pageNum: pageNum,
							pageSize: vue.page.pageSize,
							total: vue.page.total,
						}
					})
					.then(function(data) {
						vue.loading = false
						let arr = []
						//一个数组用来接收加工后台传过来的数据
						// console.log(data.data.data.list)
						console.log(data)
						if (data.data.status == 200) {
							vue.tableData = data.data.data.list;
							vue.page.pageNum = data.data.data.pageNum;
							vue.page.total = Number(data.data.data.total)
						} else if (data.data.status == 400) {
							vue.tableData = []
							vue.page.pageNum = data.data.data.pageNum;
							vue.page.total = Number(data.data.data.total)
						}
						// vue.page.pageSize = data.data.data.pageSize;
					})
					// 					.catch(function(error) {
					// 						vue.loading = false
					// 						console.log(error);
					// 					});
					.catch((error) => {
						console.log(error)
					})




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

			solutionType() {
				// 分佣方案
				let vue = this
				get("web/appGeneralfeescheme/findGeneralfeeschemeAll", {
						params: {

						}
					}).then(function(data) {
						// console.log(data.data.data.list)
						// 分佣方案
						let solutionType = []
						for (let i = 0; i < data.data.data.list.length; i++) {
							solutionType.push(data.data.data.list[i])
							vue.form.solutionType = solutionType
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			// 新增、编辑
			compileShop(index, scope, code) {
				console.log(code)
				let vue = this
				this.editVisible = true;
				// 编辑
				if (code == 1) {
					this.code = 1
					// 商品id
					this.form.solutionId = Number(scope.row.generalFeeScheme)
					this.form.shopid = Number(scope.row.itemId)
					this.form.oldshopid = scope.row.itemId
					// 渠道
					get("web/channel/syChannelListNew", {

						})
						.then((data) => {
							console.log(data)
							//获取全部数据
							let channelNameList = []
							for (let i = 0; i < data.data.data.length; i++) {
								data.data.data[i].whether = false
								channelNameList.push(data.data.data[i])
							}
							//给全部数据附上是否选中的值
							let channelList = scope.row.channelIdList.split(",")
							// console.log(scope.row.channelIdList.split(","))
							for (let i = 0; i < channelNameList.length; i++) {
								// console.log(channelNameList[i].tableId)
								for (let y = 0; y < channelList.length; y++) {
									// 									console.log(channelNameList[i].tableId)
									// 									console.log(channelList[y])
									// 判断是否自动选中
									if (channelNameList[i].tableId == channelList[y]) {
										channelNameList[i].whether = true
									}
								}
							}
							this.form.channelNameList = channelNameList
							// console.log(this.form.channelNameList)
							// this.form.tableId = this.form.channelNameList.tableId
						})
						.catch(function(error) {
							console.log(error);
						});


				} else if (code == 2) {
					this.code = 2
					// 新增
					this.form.solutionId = null
					this.form.shopid = null
					this.form.channelstr = ""

					// 渠道
					get("web/channel/syChannelListNew", {})
						.then((data) => {
							console.log(data.data.data)
							//获取全部数据
							let channelNameList = []
							for (let i = 0; i < data.data.data.length; i++) {
								// 默认选择第一个
								// data.data.data[0].whether = true
								data.data.data[i].whether = false
								channelNameList.push(data.data.data[i])
							}
							//给全部数据附上是否选中的值

							this.form.channelNameList = channelNameList
							// console.log(this.form.channelNameList)
							// this.form.tableId = this.form.channelNameList.tableId
						})
						.catch(function(error) {
							console.log(error);
						});


				}

			},

			// 确定更改
			changeScheme() {

				if (this.code == 1) {
					let str = ""
					let overchannel = []
					for (let i = 0; i < this.form.channelNameList.length; i++) {
						if (this.form.channelNameList[i].whether) {
							overchannel.push(this.form.channelNameList[i].tableId)
							str += this.form.channelNameList[i].tableId + ","
						}
					}
					this.form.channelstr = str.substring(0, str.length - 1)
					// this.form.overchannel = overchannel
					// 编辑点击确定
					// console.log(this.form)
					if (this.form.shopid == null || this.form.channelstr == "" || this.form.channelstr == undefined || this.form.solutionId ==
						null) {
						this.$message.warning("编辑时请填写完整商品属性！")
						return
					}
					post("web/syChannelGoods/updateSyChannelGoods", {
							// 新商品id
							itemIdNew: this.form.shopid,
							// 旧商品id
							itemId: this.form.oldshopid,
							// 渠道id集合
							channelIdList: this.form.channelstr,
							// 方案id
							generalFeeScheme: this.form.solutionId
						})
						.then((data) => {
							// console.log(data)
							// 							console.log(this.form.shopid)
							// 							console.log(666)
							if (data.data.status == 200) {
								this.$message.success(data.data.msg)
							} else {
								this.$message.error(data.data.msg)
							}

							this.getData(this.page.pageNum)
						}).catch(function(error) {

							console.log(error);
						});


				} else if (this.code == 2) {

					let str = ""
					let overchannel = []
					for (let i = 0; i < this.form.channelNameList.length; i++) {
						if (this.form.channelNameList[i].whether) {
							overchannel.push(this.form.channelNameList[i].tableId)
							str += this.form.channelNameList[i].tableId + ","
						}
					}
					this.form.channelstr = str.substring(0, str.length - 1)
					// 					console.log(this.form.shopid)
					// 					console.log(this.form.channelstr)
					// 					console.log(this.form.solutionId)
					// 新增点击确定


					if (this.form.shopid == null || this.form.channelstr == undefined || this.form.solutionId == null || this.form.channelstr ==
						"") {
						this.$message.warning("修改请填写完整商品属性！")
						return
					}
					post("web/syChannelGoods/addSyChannelGoods", {
							// 商品id
							itemId: this.form.shopid,
							// 渠道id集合
							channelIdList: this.form.channelstr,
							// 方案id
							generalFeeScheme: this.form.solutionId
						})
						.then((data) => {
							this.getData(this.page.pageNum)
							console.log(data)
							console.log(this.form.shopid)
							if (data.data.status == 200) {
								this.$message({
									type: 'success',
									message: data.data.msg
								});
							} else {
								this.$message({
									type: 'error',
									message: data.data.msg
								});
							}
						}).catch(function(error) {

							console.log(error);
						});


				}

				this.editVisible = false


			},

			// 删除商品
			deleteShop(itemID) {

				this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					get("web/syChannelGoods/delectSyChannelGoods", {
						params: {
							itemId: itemID
						}
					})
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.getData(this.page.pageNum)
					console.log(this.page.pageNum)
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '已取消删除'
					});
				});

				// console.log(itemID)

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
		width: 170px;
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

	.feedbackImg {
		width: 30px;
		cursor: pointer;
	}

	.cell img {
		width: 100%;
	}

	.channelList{
		display: flex;
		width: 70%;
		flex-flow:row wrap;
	}
	.channelList div{
		margin: 0 10px;
	}
</style>
