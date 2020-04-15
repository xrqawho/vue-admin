<template>
    <div class="seckill">
		<el-date-picker
		      v-model="periodGoodsTime"
		      type="date"
			  format="yyyy-MM-dd"
			  value-format="yyyy-MM-dd"
		      placeholder="选择日期">
		</el-date-picker>
		
		<el-button @click="timeQuantumShow = true" style="margin-left:50px;" type="primary">添加时间段</el-button>
		
		<div class="time">
			<div class="slide" @click="rightSlide = false"><i class="el-icon-arrow-left"></i></div>
			<ul class="tab">
				<li v-for="itme in timeList"
					:key="itme.tableId"
					@click="listClick(itme.periodTime,itme.tableId,itme.systemDate)"
					:class="{rightSlide:rightSlide,tabRed:itme.periodTime == periodTime,tabList:true,}">
					<div class="delIcon" @click="delTimeQuantum(itme.tableId,itme.periodTime)">
						<i class="el-icon-delete" ></i>
					</div>
					
					<div class="editIcon" @click="clickDeitTimeQuantum(itme.tableId)">
						<i class="el-icon-edit-outline"></i>
					</div>
					
					{{itme.periodTime}} <br> {{thinkTime(itme.systemDate,itme.periodTime)}}
					
				</li>
			</ul>
			<div class="slide" @click="rightSlide = true"><i class="el-icon-arrow-right"></i></div>
		</div>
		<div class="goodsBody">
			<div v-for="itme in goodsList" :key="itme.tableId" class="goodsItme">
				<i class="el-icon-delete" @click="delGoods(itme.tableId)" id="icon_delete" title="删除该商品"></i>
				<img :src="itme.itemPic" class="goodsItme_img" alt="">
				<div class="goodsItme_detail">
					<div>商品 ID :{{itme.itemid}}</div>
					<div>短标题: {{itme.itemshorttitle}} </div>
					<div>标签:{{itme.itemResonOne}}{{itme.itemResonTwo}}{{itme.itemResonThree}}</div>
					<div class="goodsItme_botton_border"></div>
				</div>
				
				<div class="goodsItme_data">
					<div class="goodsItme_data_right_border">
						<div style="color: #E74D88;font-size: 16px;">￥{{itme.itemendprice}}</div>
						<div class="goodsItme_data_title">劵后价</div>
					</div>
					<div class="goodsItme_data_right_border">
						<div style="color: #407FA9;font-size: 16px;" >￥{{itme.couponmoney}}</div>
						<div class="goodsItme_data_title">优惠券</div>
					</div>
					<div class="goodsItme_data_right_border">
						<div style="color: #FB862D;font-size: 16px;" >{{itme.goodsCommission}}</div>
						<div class="goodsItme_data_title">佣金</div>
					</div>
					<div >
						<div style="color: #407FA9;font-size: 16px;" >{{itme.tkrates}}%</div>
						<div class="goodsItme_data_title">佣金比例</div>
					</div>
				</div>
				
				<div class="goodsItme_footer">
					总销量：<span style="color: #E21918;">{{itme.itemsale}} </span>
					<el-button size="mini" @click="sortGoods(itme.tableId)">置顶</el-button>
					{{ timeTransition(itme.starttime)}}
				</div>
				<!-- <el-button v-if="" plain>上架</el-button>
				<el-button plain>下架</el-button> -->
				<!-- {{itme}} -->
			</div>
		</div>
		
		<el-button v-if="whetherStart" style="margin-left: 90%;margin-top: 40px;" @click="dialogVisible = true">新增</el-button>
		
		<div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="page.total" :page-size = "page.pageSize" :current-page="page.pageNum">
                </el-pagination>
		</div>
		
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  
			<span>商品ID</span>
			<el-input v-model="addGoodsId" placeholder="请输入内容"></el-input>
			
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addGoods()">新增</el-button>
		  </span>
		</el-dialog>
		
		
		<el-dialog
		  title="新增时间段"
		  :visible.sync="timeQuantumShow"
		  width="30%">
		  
				<el-time-select
				  v-model="addtime"
				  :picker-options="{
				    start: '00:00',
				    step: '01:00',
				    end: '23:59'
				  }"
				  placeholder="选择时间">
				</el-time-select>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="timeQuantumShow = false">取 消</el-button>
		    <el-button type="primary" @click="addTimeQuantum()">确 定</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="新增时间段"
		  :visible.sync="deitTimeQuantumShow"
		  width="30%">
		  
				<el-time-select
				  v-model="addtime"
				  :picker-options="{
				    start: '00:00',
				    step: '01:00',
				    end: '23:59'
				  }"
				  placeholder="选择时间">
				</el-time-select>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="deitTimeQuantumShow = false">取 消</el-button>
		    <el-button type="primary" @click="deitTimeQuantum()">确 定</el-button>
		  </span>
		</el-dialog>
		
    </div>
</template>

<script>
    import { post,get } from '../../../api/index';
    export default {
        name: 'company',
        data() {
            return {
				timeList:["08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00","24:00",],
				leftSlide:false,
				rightSlide:false,
				periodTime:"08:00",
				goodsList:[],
				page:{
					pageSize:10,
					pageNum: 1,
					total: 0,
				},
				tableId:1,
				periodGoodsTime:null,
				dialogVisible: false,
				addGoodsId: "",
				whetherStart: "",
				timeQuantumShow: false,
				deitTimeQuantumShow: false,
				addtime:"08:00",
				timeQuantumId:"",
            }
        },
        created() {
          this.getTimeList();
		  this.getGoodsList(1);
		  setInterval( () => {
			  let time = new Date()
			  // console.log(time)
			  if (time.getMinutes()==0 && time.getSeconds()==0){   //myDate.getHours();    //获取当前小时数(0-23) 
				   // console.log('当前是',new Date().getMinutes())
				  // clearInterval(id)
				  this.getGoodsList(this.page.pageNum)
			  } else{
				  // console.log('当前是',new Date().getMinutes())
				  // console.log('时间未到')
			  }
		  },500)
		 
        },
        computed: {
           
        },
		watch:{
			periodGoodsTime:{
				handler(newName, oldName) {
					console.log(Number(new Date(newName)))
					this.getGoodsList(this.page.pageNum)
					if(newName == null){
						if (this.periodTime.split(":")[0] > new Date().getHours()) {
							this.whetherStart = true;
						} else{
							this.whetherStart = false;
						}
					}else{
						if(Number(new Date(newName)) > Number(new Date())){
							this.whetherStart = true;
							
						}else{
							this.whetherStart = false;
						}
					}
					this.getTimeList()
					
				},
			}
			
		},
        methods: {
			handleCurrentChange(val) {
				this.getGoodsList(val);
			},
			getTimeList(){
				get("web/syTimePeriod/list",{
					
				})
				.then( (data) => {
					this.timeList = data.data.data.records;
					this.tableId = data.data.data.records[0].tableId
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			getGoodsList(pageNum){
				get("web/syTimePeriodGoods/list",{
					params:{
						pageNum:pageNum,
						pageSize:this.page.pageSize,
						tableId:this.tableId,
						periodGoodsTime: this.getYMD(this.periodGoodsTime),
					}
				})
				.then( (data) => {
					console.log(data)
					this.goodsList = data.data.data.syTimePeriodGoodsList;
					this.page.pageNum = data.data.data.current;
					this.page.total = data.data.data.total;
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			listClick(periodTime,tableId,systemDate){
				this.periodTime = periodTime;
				this.tableId = tableId;
				this.getGoodsList()
				console.log(new Date(this.periodGoodsTime))
				if(Number(new Date(this.periodGoodsTime)) > Number(new Date())){
					this.whetherStart = true;
					
				}else{
					if (systemDate) {
						
						if (periodTime.split(":")[0] > new Date(systemDate).getHours()) {
							this.whetherStart = true;
						} else{
							this.whetherStart = false;
						}
					}
				}
				
				
				
				
			},
			thinkTime(systemDate , periodTime){
				// console.log(this.periodGoodsTime)
				// if(this.periodGoodsTime){
				// 	
				// }
				if(Number(new Date(this.periodGoodsTime)) > Number(new Date())){
					return "即将开始"
				}
				if (systemDate) {
					// console.log(new Date(systemDate).getHours())
					// console.log(periodTime.split(":")[0])
					if (periodTime.split(":")[0] > new Date(systemDate).getHours()) {
						return "即将开始"
					} else{
						return "进行中"
					}
				} else{
					return ""
				}
				
			},
			timeTransition(beginTime){
				//转换时间
				if (beginTime == null) {
					return	'';
				} else if(beginTime == ''){
					return	'';
				}
				let d = new Date( Number(beginTime) );    //根据时间戳生成的时间对象
				let date = (d.getFullYear()) + "-" + 
						   (d.getMonth() + 1) + "-" +
						   (d.getDate()) + " " + 
						   (d.getHours()) + ":" + 
						   (d.getMinutes()) + ":" + 
						   (d.getSeconds());
				return	date;
			},
			getYMD(data){
				//获取年月日
				return data
				// console.log(data.getFullYear())
				// console.log(data.getMonth()+1)
				// console.log(data.getDate())
				// if (data) {
				// 	return data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDate();
				// } else {
				// 	return ""
				// }
			},
			delGoods(tableId){
				console.log(tableId)
				this.$confirm('删除该商品, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							  post("web/syTimePeriodGoods/save",{
									tableId:tableId,
									deleted:1,
								
							  })
							  .then( (data) => {
								if (data.data.status == 200) {
									console.log(data.data.data)
									this.$message.success(String(data.data.msg));
									this.getGoodsList()
								} else{
									this.$message.error(String(data.data.msg));
								}
							  })
							  .catch( (error) => {
								this.$message.error("接口请求错误");
								console.log(error);
							  });
						  
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          });
						});
			},
			sortGoods(tableId){
				console.log(tableId)
				  post("web/syTimePeriodGoods/save",{
						tableId:tableId,
						topSerialNum:1,
					
				  })
				  .then( (data) => {
					if (data.data.status == 200) {
						console.log(data.data.data)
						this.$message.success(String(data.data.msg));
						this.getGoodsList()
					} else{
						this.$message.error(String(data.data.msg));
					}
				  })
				  .catch( (error) => {
					this.$message.error("接口请求错误");
					console.log(error);
				  });
					
			},
			addGoods(){
				this.dialogVisible = false
			
				  post("web/syTimePeriodGoods/save",{
						periodId:this.tableId,
						itemId:this.addGoodsId,
						periodGoodsTime: this.getYMD(this.periodGoodsTime)
				  })
				  .then( (data) => {
					if (data.data.status == 200) {
						console.log(data.data.data)
						this.$message.success(String(data.data.msg));
						this.getGoodsList()
					} else{
						this.$message.error(String(data.data.msg));
					}
				  })
				  .catch( (error) => {
					this.$message.error("接口请求错误");
					console.log(error);
				  });
					
			},
			addTimeQuantum(){
				//新增时间段
				console.log(this.addtime)
				post("web/syTimePeriod/saveNew",{
					periodTime:this.addtime,
					periodName:"秒杀_"+this.addtime,
					
				})
				.then( (data) => {
					if (data.data.status == 200) {
						
						this.$message.success(String(data.data.msg));
						this.getTimeList()
						this.timeQuantumShow = false
					} else{
						this.$message.error(String(data.data.msg));
						this.timeQuantumShow = false
					}
				})
				.catch( (error) => {
					this.$message.error("接口请求错误");
					this.timeQuantumShow = false			
				});
			},
			delTimeQuantum(id,periodTime){
				//删除时间段
				console.log(id)
				console.log(this.addtime)
				post("web/syTimePeriod/delete",{
					tableId:id,
					
				})
				.then( (data) => {
					if (data.data.status == 200) {
						
						this.$message.success(String(data.data.msg));
						this.getTimeList()
					} else{
						this.$message.error(String(data.data.msg));
					}
				})
				.catch( (error) => {
					this.$message.error("接口请求错误");
								
				});
			},
			clickDeitTimeQuantum(id){
				//点击时间段编辑icon
				//打开dialog
				//参数 id = 时间段id
				this.deitTimeQuantumShow = true;
				this.timeQuantumId = id
			},
			deitTimeQuantum(){
				//编辑时间段
				post("web/syTimePeriod/saveNew",{
					tableId:this.timeQuantumId,
					periodTime:this.addtime,
					
				})
				.then( (data) => {
					if (data.data.status == 200) {
						
						this.$message.success(String(data.data.msg));
						this.deitTimeQuantumShow = false
						this.getTimeList()
					} else{
						this.$message.error(String(data.data.msg));
						this.deitTimeQuantumShow = false
					}
				})
				.catch( (error) => {
					this.$message.error("接口请求错误");
					this.deitTimeQuantumShow = false
				});
			},
			
			
		
		}
	}

</script>

<style scoped>
	.slide{
		width: 40px;
		color: #FFF;
		line-height: 40px;
		background-color: #6D6D6D;
		cursor: pointer;
	}
	
	.time{
		width: 100%;
		background-color: #333;
		display: flex;
		text-align: center;
		justify-content: center;
	}
	.tab{
		width: 65%;
		height: 40px;
		display: flex;
		/* background-color: #333; */
		/* color: #FFF; */
		/* margin: 0 auto; */
		overflow-x: scroll;
		overflow-y:  hidden;
		
	}
	.tab::-webkit-scrollbar {
		display: none;
	}
	.tab li{
		width: 20%;
		min-width: 20%;
		/* flex-direction:column; */
		list-style: none;
		text-align: center;
		color: #FFF;
		line-height:20px;
		font-size: 12px;
		/* padding: 7px 0; */
		cursor: pointer;
		transition:  0.5s;
		/* transform: translate(100%); */
	}
	.tab li:hover{
		background-color: red;
	}
	.tab li:hover > .delIcon{
		display: block;
	}
	.tab li:hover > .editIcon{
		display: block;
	}
	.tabRed{
		background-color: red;
	}
	.rightSlide{
		transform: translate(-400%);
		
	}
	.goodsBody{
		width: calc(100% - 20px);
		display: flex;
		flex-wrap: wrap;
		background-color: #FFF;
		padding: 10px;
	}
	.goodsItme{
		width: 16.7%;
		border: 2px solid #ECEFF4;
		margin: 10px 20px;
		position: relative;
	}
	#icon_delete{
		float: right;
		cursor: pointer;
	}
	.goodsItme_img{
		width: 95%;
		/* height: 11vw; */
		margin: 5px 2.5%;
	} 
	.goodsItme_detail{
		width: 86%;
		margin: 0 7%;
		/* text-align: center; */
		font-size: 13px;
	}
	.goodsItme_detail div{
		line-height:18px;
	}
	.goodsItme_botton_border{
		background-color: #7EBEE5;
		margin: 5px 0 15px 0;
		height: 2.5px;
	}
	.goodsItme_data{
		width: 82%;
		height: 50px;
		margin: 0 auto;
		display: flex;
		font-size: 12px;
	}
	.goodsItme_data>div{
		width: 25%;
		text-align: center;
		height: 35px;
	}
	.goodsItme_data_title{
		color: #C3C3B4;
	}
	.goodsItme_data_right_border{
		border-right: 1px #c3c3B4 solid;
	}
	.goodsItme_footer{
		font-size: 12px;
		text-align: center;
	}
	.tabList{
		position: relative;
	}
	.delIcon{
		position: absolute;
		right: 5px;
		display: none;
	}
	.editIcon{
		position: absolute;
		left: 5px;
		display: none;
	}
</style>

<style>
	.seckill .el-date-editor.el-input{
		margin: 15px 0;
	}
</style>

