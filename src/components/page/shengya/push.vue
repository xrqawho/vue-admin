<template>
    <div class="push">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 推送</el-breadcrumb-item>
            </el-breadcrumb>
        </div>


       <el-form ref="form" :model="form" label-width="100px">

		<el-form-item label="推送类型">
		    <el-select v-model="jumpType" placeholder="请选择">
				<el-option key="1" label="纯消息推送" :value="4001"></el-option>
				<el-option key="2" label="html推送" :value="4002"></el-option>
				<el-option key="3" label="消息界面推送" :value="4003"></el-option>
				<el-option key="4" label="任务" :value="4004"></el-option>
				<el-option key="5" label="免单" :value="4005"></el-option>
				<el-option key="6" label="邀请" :value="4006"></el-option>
				<el-option key="7" label="商品详情" :value="4007"></el-option>
				<el-option key="8" label="饿了么弹窗" :value="5001"></el-option>
				<el-option key="9" label="复制淘宝链接红包弹窗" :value="5002"></el-option>
				<el-option key="10" label="首单红包弹窗" :value="5003"></el-option>
				<el-option key="11" label="跳转首页" :value="5004"></el-option>

		    </el-select>
		</el-form-item>

		<el-form-item label="推送时间类型">
		    <div>推送时间分为立即推送和定时推送两种情况，定时推送需要选择时间。</div>
			<el-radio-group v-model="pushTimeType">
				<el-radio :label="2">定时推送</el-radio>
				<el-radio :label="1">立即推送</el-radio>
		    </el-radio-group>
		</el-form-item>
		<el-form-item label="定时推送时间" v-if="pushTimeType == 2" >
		    <el-date-picker
		          v-model="date"
		          type="datetime"

				  :picker-options="pickerOptionsStop"
		          placeholder="选择日期"
				  :default-time="new Date().getHours()+1+':'+'00:00'">
		    </el-date-picker>
			(定时推送只能选择当前时间以后的时间)
			<!-- <el-time-select
			  v-model="time"
			  @focus = "timePickerFocus"
			  :picker-options="currentTime"
			  placeholder="选择时间">
			</el-time-select> -->
		</el-form-item>

        <el-form-item label="推送标题">
            <el-input v-model="form.title" placeholder="请输入推送标题"></el-input>
        </el-form-item>


        <el-form-item label="内容推送">
            <el-input type="textarea" v-model="form.content" placeholder="请输入内容推送"></el-input>
        </el-form-item>


        <el-form-item label="跳转链接" v-if="jumpType == 4002">
            <el-input v-model="form.jumpLink" placeholder="链接请以http://或者https://开头的"></el-input>
        </el-form-item>

		<el-form-item label="跳转链接方式" v-if="jumpType == 4002">
		    <el-input v-model="form.jumpTaobao" placeholder="1:是跳淘宝 2:是跳外部"></el-input>
		</el-form-item>

		<el-form-item label="商品id" v-if="jumpType == 4007">
		    <el-input v-model="form.jumpLink" placeholder="商品id,推送跳转到那个商品"></el-input>
		</el-form-item>

        <el-form-item label="公司">
            <el-select v-model="form.companyId" placeholder="请选择">
				<el-option :key="0" label="全部" :value="0">全部</el-option>
				<el-option v-for="itme in list" :key="itme.companyId" :label="itme.compayName" :value="itme.companyId">{{itme.compayName}}</el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="推送对象">
            <div>目标人群（全部用户包括已下单和未下单的用户）</div>
            <el-radio-group v-model="form.type " @change="userIdsShow">
                <el-radio :label="1">已下单</el-radio>
                <el-radio :label="2">未下单</el-radio>
                <el-radio :label="3">全部用户</el-radio>
				<el-radio :label="4">指定用户</el-radio>
            </el-radio-group>
        </el-form-item>

		 <el-form-item label="指定用户ID" v-show="form.myuserIds">
		    <el-input type="textarea" v-model="form.userIds" placeholder="请输入要推送用户id多个,分隔"></el-input>
		</el-form-item>

        <el-form-item>
            <el-button type="primary" @click="pushAdd">立即提交</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { post,get } from '../../../api/index';
    export default {
        name: 'push',
        data() {
            return {
                form: {
                    companyId: null,
					content: "",
					create_time: "",
					jumpLink: "",
					title: "",
					type: 3,
					pushTime: '',
					userIds:'',
					myuserIds:false,
					jumpTaobao:'',
                },
				date:'',
				time:'',
				list:[],
				jumpType: 4001,
				pickerOptionsStop: {//截止时间的校验
					disabledDate(time) {
					     return time.getTime() < Date.now()-8.64e7;
					}
				},
				// currentTime:{
				// 	start: new Date().getHours()+':00',
				// 	step: '01:00',
				// 	end: '23:00',
				// },
				pushTimeType:1,
            }
        },
        created() {
            this.getCompanyData()
			console.log(this)
        },
        computed: {
            data() {

            }
        },
        methods: {
			userIdsShow(){
				if(this.form.type==4){
					this.form.myuserIds = true;
				}else{
					this.form.myuserIds = false;
				}
			},
            onSubmit() {
                console.log('submit!');
            },
			getCompanyData(){
				get("web/find/commpany/list",{
					params:{
						currentPage: 1,
						pageSize: 1000,
					}
				})
				.then( (data) => {
					console.log(data.data.data.list)
					this.list =	data.data.data.list
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			pushAdd(){
				if(!this.jumpType > 0){
					console.log("禁止通过")
					this.$message.error('禁止通行，未选择推送类型');
					return
				}
				if(this.pushTimeType == 2){
					if(this.date.getTime() != ''){
						if (this.date.getTime() > Date.now()) {
							console.log("通过")
						} else{
							console.log("禁止通过")
							this.$message.error('禁止通行，输入时间应在当前时间之后');
							return
						}
					}else{
						this.$message.error('禁止通行，时间为空');
						return
					}
				}else if(this.pushTimeType == 1){
					this.date = ''
				}

				if(this.form.title == null){
						this.$message.error('禁止通行，标题为空');
						console.log("禁止通过")
						return

				}

				if(this.form.content == null){
						this.$message.error('禁止通行，内容为空');
						console.log("禁止通过")
						return
				}

				if(this.form.companyId == null){
						this.$message.error('禁止通行，公司选择为空');
						console.log("禁止通过")
						return
				}

				console.log(this.form)
				post("web/message/push/add",{
					companyId: this.form.companyId,
					content: this.form.content,
					// create_time: new Date().getTime(),
					jumpLink: this.form.jumpLink,
					title: this.form.title,
					type: this.form.type,
					userIds:this.form.userIds,
					jumpType: this.jumpType,
					pushTime: this.date,
					timeType: this.pushTimeType,
					jumpTaobao: Number(this.form.jumpTaobao),
				})
				.then( (data) => {
				    if (data.data.status == 200) {
				    	this.$message.success("推送成功");
						this.reset()

				    } else{
				    	this.$message.error("推送失败");
				    }

				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			reset(){
				this.form.companyId = null;
				this.form.content = null;
				this.form.jumpLink = null;
				this.form.title = null;
				this.form.type = 3;
				this.form.userIds = null;
				this.jumpType = null;
				this.form.date = null;
				this.pushTimeType = 1;
				this.form.jumpTaobao = null;
				this.form.myuserIds = false;
			}
        },

    }

</script>

<style scoped>

</style>

<style>

</style>
