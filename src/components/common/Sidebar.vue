<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in dataList">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item style="padding-left:70px;" v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item  :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
	import { post,get } from '../../api/index';
    export default {
        data() {
            return {
                collapse: false,
				dataList:[],
                items: [
                    // {
                    //     icon: 'el-icon-lx-home',
                    //     index: 'dashboard',
                    //     title: '系统首页'
                    // },
					{
					    icon: 'el-icon-data-line',
					    index: 'dataStatistics',
					    title: '数据统计'
					},
					{
						icon: 'el-icon-user',
						index: 'userManagement',
						title: '用户管理'
					},
					{
					    icon: 'el-icon-document',
					    index: 'orderManagement',
					    title: '订单管理'
					},
					{
					    icon: 'el-icon-coin',
					    index: '12',
					    title: '提现管理',
					    subs: [
					        {
					            index: 'cashManagement',
					            title: '支付宝提现'
					        },

					        {
					            index: 'weixinCash',
					            title: '微信提现'
					        },

					    ]
					},

					{
					    icon: 'el-icon-box',
					    index: '11',
					    title: '商品设置',
					    subs: [
							{

							    index: 'goods',
							    title: '商品管理'
							},
					        {
					            index: 'goodsTop',
					            title: '商品置顶',
					        	id: 1,
					        },
							{
							    index: 'freeCharge',
							    title: '免单'
							},
							{

								index: 'goodsClassify',
								title: '商品分类'
							},
                            {

                                index: 'taobao',
                                title: '兑换码'
                            },
                            {

                                index: 'goodsRecommend',
                                title: '好物推荐'
                            }
					    ]
					},

					{
					    icon: 'el-icon-office-building',
					    index: 'company',
					    title: '公司设置'
					},
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '活动管理',
                        subs: [


                            {
                                index: 'push',
                                title: '推送'
                            },

                        ]
                    },
                    // {
                    //     icon: 'el-icon-lx-calendar',
                    //     index: '4',
                    //     title: '微信',
                    //     subs: [
                    //         {
                    //             index: 'invitePoster',
                    //             title: '邀请海报'
                    //         },
                    //
                    //     ]
                    // },
                    {
                        icon: 'el-icon-setting',
                        index: '5',
                        title: '系统设置',
                        subs: [
                            {
                                index: 'FrozenCapital',
                                title: '佣金冻结设置'
                            },
                            {
                                index: 'CentCommission',
                                title: '分佣设置'
                            },
                            {
                                index: 'UnionSet',
                                title: '联盟设置'
                            },
                            // {
                            //     index: 'GreenHands',
                            //     title: '新手模式'
                            // },
                            {
                                index: 'ImageHosting',
                                title: '图片空间'
                            },
                            {
                                index: 'qiniuyun',
                                title: '七牛云'
                            },
                            {
                                index: 'AcquaintanceSet',
                                title: '杀熟设置'
                            },
							{
							    index: 'appPage',
							    title: 'app开关管理'
							},

                        ]
                    },
					{
					    icon: 'el-icon-chat-dot-square',
					    index: '10',
					    title: '消息管理',
					    subs: [
					        {
					            index: 'msgModule',
					            title: '消息模块'
					        },
					        {
					            index: 'versionUpdating',
					            title: '版本更新'
					        },
					    ]
					},
					{
					    icon: 'el-icon-alarm-clock',
					    index: 'seckill',
					    title: '限时秒杀'
					},

					{
						icon: 'el-icon-lx-copy',
						index: 'feedback',
						title: '意见反馈'
					},



					{
					    icon: 'el-icon-s-operation',
					    index: 'drag',
					    title: 'app首页模块化管理'
					},

					//{
					//		icon: 'el-icon-lx-copy',
					//		index: 'InviteUserRewards',
					//		title: '邀请用户奖励'
					//},



					// {
					//     icon: 'el-icon-lx-copy',
					//     index: 'taskManagement',
					//     title: '任务管理'
					// },

					// {
					//     icon: 'el-icon-lx-copy',
					//     index: 'pageSwitch',
					//     title: '页面管理'
					// },
					{
					    icon: 'el-icon-paperclip',
					    index: '8',
					    title: '渠道关系管理',
					    subs: [
					        {
					            index: 'channelRelationship',
					            title: '渠道关系'
					        },
					        {
					            index: 'channelRelationshipList',
					            title: '渠道关系列表'
					        },
                            {
                                index: 'channelCount',
                                title: '渠道统计列表'
                            },

					    ]
					},
                    // {
                    //     icon: 'el-icon-lx-redpacket_fill',
                    //     index: 'RedPacket',
                    //     title: '红包'
                    // },
                    {
                        icon: 'el-icon-s-custom',
                        index: '9',
                        title: '账号管理',
                        subs: [
                            {
                                index: 'bypassAccount',
                                title: '子账号'
                            },
                            {
                                index: 'role',
                                title: '角色'
                            },


                        ]
					},
					// {
					//     icon: 'el-icon-lx-calendar',
					//     index: 'ceshi测试',
					//     title: '测试',
					//
					// },
                ]
            }
        },
        computed:{
            onRoutes(){

                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
			this.getData();
        },
		methods: {
			getData(){
				//获取数据
				console.log(this.items)
				get("server-admin/user/menuNew",{
					params:{

					}
				})
				.then( (data) => {

					let dataList = data.data.data[0].children.map(msg => {
						//加工数据
						let json
						// console.log(eval('(' + msg.menuUrl + ')'))
						if (eval('(' + msg.menuUrl + ')').hasOwnProperty("children")) {
							// console.log("有")

							json = {
								index: eval('(' + msg.menuUrl + ')').id,
								title:eval('(' + msg.menuUrl + ')').text,
								icon:this.iconList(eval('(' + msg.menuUrl + ')').id),
								subs:this.disposeData(eval('(' + msg.menuUrl + ')').children)
							}
							// console.log(json)
						} else{
							// console.log("没有")
							json = {
								index:this.cutOutString(eval('(' + msg.menuUrl + ')').link),
								title:eval('(' + msg.menuUrl + ')').text,
								icon:this.iconList(eval('(' + msg.menuUrl + ')').id),

							}
						}
						return json
					}
					);
					// console.log(dataList)
					this.dataList = dataList
					// this.disposeData(dataList)
					// let dataList =
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			disposeData(data){
				//遍历子集
				let list =	data.map(msg => {
					return 	{
						index: this.cutOutString(msg.link),
						title: msg.text,
					}
				})
				// console.log(list)
				return list
			},
			// 截取字符串
			cutOutString(str){
				return	str.substr(1,str.length)
			},
			iconList(id){
				//给一级菜单，加icon
				switch(Number(id) ) {
					case 24:
						return "el-icon-office-building";
					case 26:
						return "el-icon-lx-calendar";
					case 29:
					   return "el-icon-setting";
					case 30:
					   return "el-icon-chat-dot-square";
					case 31:
					   return "el-icon-coin";
					case 32:
					   return 'el-icon-document';
					case 33:
					   return 'el-icon-user';
					case 63:
					   return "el-icon-lx-copy";
					case 67:
					   return "el-icon-data-line";
					case 68:
					   return "el-icon-box";
					case 69:
					   return "el-icon-s-operation";
					case 70:
					   return "el-icon-paperclip";
					case 71:
						return "el-icon-s-custom";
					case 72:
					    return "el-icon-alarm-clock";
				     default:
				        return "el-icon-edit-outline";
				}
			},
		}
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
	.el-submenu .el-menu-item{
		padding-left: 60px;
	}
</style>
