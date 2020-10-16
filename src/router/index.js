import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            // redirect: '/greet',
            redirect: '/test',
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: {title: '系统首页'}
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: {title: '自定义图标'}
                },
                {
                    path: '/company',
                    component: resolve => require(['../components/page/Company.vue'], resolve),
                    meta: {title: '公司设置'}
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: {title: 'tab选项卡'}
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: {title: '基本表单'}
                },
                {
                    path: '/goodsTop',
                    component: resolve => require(['../components/page/shengya/GoodsTop.vue'], resolve),
                    meta: {title: '商品置顶'}
                },
                {
                    path: '/freeCharge',
                    component: resolve => require(['../components/page/shengya/FreeCharge.vue'], resolve),
                    meta: {title: '免单'}
                },
                {
                    path: '/push',
                    component: resolve => require(['../components/page/shengya/push.vue'], resolve),
                    meta: {title: '推送'}
                },
				{
				    path: '/pushList',
				    component: resolve => require(['../components/page/shengya/pushList.vue'], resolve),
				    meta: {title: '推送列表'}
				},
                {
                    path: '/invitePoster',
                    component: resolve => require(['../components/page/shengya/InvitePoster.vue'], resolve),
                    meta: {title: '邀请海报'}
                },
                {
                    path: '/frozenCapital',
                    component: resolve => require(['../components/page/shengya/FrozenCapital.vue'], resolve),
                    meta: {title: '冻结佣金设置'}
                },
                {
                    path: '/centCommission',
                    component: resolve => require(['../components/page/shengya/CentCommission.vue'], resolve),
                    meta: {title: '分佣设置'}
                },
                {
                    path: '/UnionSet',
                    component: resolve => require(['../components/page/shengya/UnionSet.vue'], resolve),
                    meta: {title: '联盟设置'}
                },
                {
                    path: '/GreenHands',
                    component: resolve => require(['../components/page/shengya/GreenHands.vue'], resolve),
                    meta: {title: '新手模式'}
                },
                {
                    path: '/ImageHosting',
                    component: resolve => require(['../components/page/shengya/ImageHosting.vue'], resolve),
                    meta: {title: '图片空间'}
                },
				{
				    path: '/userRedPackage',
				    component: resolve => require(['../components/page/shengya/userRedPackage.vue'], resolve),
				    meta: {title: '兑换红包列表'}
				},
				{
				    path: '/userRedPackageList',
				    component: resolve => require(['../components/page/shengya/userRedPackageList.vue'], resolve),
				    meta: {title: '用户红包'}
				},
				 {
				    path: '/appNotice',
				    component: resolve => require(['../components/page/shengya/appNotice.vue'], resolve),
				    meta: { title: 'app首页公告' }
				},
				 {
				    path: '/appBanner',
				    component: resolve => require(['../components/page/shengya/appBanner.vue'], resolve),
				    meta: { title: 'app首页Banner' }
				},
				{
				    path: '/appPopupAndFloating',
				    component: resolve => require(['../components/page/shengya/appPopupAndFloating.vue'], resolve),
				    meta: { title: 'app首页弹窗和浮窗' }
				},
				{
				    path: '/orderTask',
				    component: resolve => require(['../components/page/shengya/orderTask.vue'], resolve),
				    meta: { title: '订单任务' }
				},
                {
                    path: '/appLabel',
                    component: resolve => require(['../components/page/shengya/appLabel.vue'], resolve),
                    meta: {title: '首页5眼'}
                },
				{
				    path: '/appSwitch',
				    component: resolve => require(['../components/page/shengya/appSwitch.vue'], resolve),
				    meta: {title: 'app配置'}
				},
                {
                    path: '/AcquaintanceSet',
                    component: resolve => require(['../components/page/shengya/AcquaintanceSet.vue'], resolve),
                    meta: {title: '杀熟设置'}
                },
                {
                    path: '/goods',
                    component: resolve => require(['../components/page/shengya/goods.vue'], resolve),
                    meta: {title: '商品管理'}
                },
                {
                    path: '/taobao',
                    component: resolve => require(['../components/page/shengya/taoBaoGift.vue'], resolve),
                    meta: {title: '兑换码'}
                },
                {
                    path: '/goodsRecommend',
                    component: resolve => require(['../components/page/shengya/goodsRecommend.vue'], resolve),
                    meta: {title: '好物推荐'}
                },
                {
                    path: '/sqTljList',
                    component: resolve => require(['../components/page/shengya/taoBaoGift.vue'], resolve),
                    meta: {title: '社群淘礼金'}
                },
                {
                    path: '/cashManagement',
                    component: resolve => require(['../components/page/shengya/cashManagement.vue'], resolve),
                    meta: {title: '提现明细'}
                },
                {
                    path: '/weixinCash',
                    component: resolve => require(['../components/page/shengya/weixinCash.vue'], resolve),
                    meta: {title: '微信提现'}
                },
                {
                    path: '/orderManagement',
                    component: resolve => require(['../components/page/shengya/orderManagement.vue'], resolve),
                    meta: {title: '订单管理'}
                },
                {
                    path: '/userManagement',
                    component: resolve => require(['../components/page/shengya/UserManagement.vue'], resolve),
                    meta: {title: '用户管理'}
                },
                {
                    path: '/goodsClassify',
                    component: resolve => require(['../components/page/shengya/goodsClassify.vue'], resolve),
                    meta: {title: '商品分类'}
                },
                {
                    path: '/feedback',
                    component: resolve => require(['../components/page/shengya/feedback.vue'], resolve),
                    meta: {title: '意见反馈'}
                },

                {
                    path: '/InviteUserRewards',
                    component: resolve => require(['../components/page/shengya/InviteUserRewards.vue'], resolve),
                    meta: {title: '邀请用户奖励'}
                },
                {
                    path: '/taskManagement',
                    component: resolve => require(['../components/page/shengya/taskManagement.vue'], resolve),
                    meta: {title: '任务管理'}
                },
                {
                    path: '/pageSwitch',
                    component: resolve => require(['../components/page/shengya/pageSwitch.vue'], resolve),
                    meta: {title: '页面管理'}
                },
                {
                    path: '/channelRelationship',
                    component: resolve => require(['../components/page/shengya/channelRelationship.vue'], resolve),
                    meta: {title: '渠道关系'}
                },
                {
                    path: '/channelRelationshipList',
                    component: resolve => require(['../components/page/shengya/channelRelationshipList.vue'], resolve),
                    meta: {title: '渠道关系列表'}
                },
                {
                    path: '/channelCount',
                    component: resolve => require(['../components/page/shengya/channelCount.vue'], resolve),
                    meta: {title: '渠道统计列表'}
                },
                {
                    path: '/userDetails',
                    component: resolve => require(['../components/page/shengya/userDetails.vue'], resolve),
                    meta: {title: '用户详情'}
                },
                {
                    path: '/callback',
                    component: resolve => require(['../components/page/shengya/callback.vue'], resolve),
                    meta: {title: '授权回调'}
                },
                {
                    path: '/bypassAccount',
                    component: resolve => require(['../components/page/shengya/bypassAccount.vue'], resolve),
                    meta: {title: '子账号'}
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/shengya/role.vue'], resolve),
                    meta: {title: '角色'}
                },
                {
                    path: '/msgModule',
                    component: resolve => require(['../components/page/shengya/msgModule.vue'], resolve),
                    meta: {title: '消息模板'}
                },
				{
				    path: '/activityMessage',
				    component: resolve => require(['../components/page/shengya/activityMessage.vue'], resolve),
				    meta: {title: '活动消息'}
				},
                {
                    path: '/versionUpdating',
                    component: resolve => require(['../components/page/shengya/versionUpdating.vue'], resolve),
                    meta: {title: '版本更新'}
                },
                {
                    path: '/dataStatistics',
                    component: resolve => require(['../components/page/shengya/dataStatistics.vue'], resolve),
                    meta: {title: '数据统计'}
                },
				{
				    path: '/dataStatisticsNew',
				    component: resolve => require(['../components/page/shengya/dataStatisticsNew.vue'], resolve),
				    meta: {title: '数据统计(新)'}
				},
                {
                    path: '/versionUpdating',
                    component: resolve => require(['../components/page/shengya/versionUpdating.vue'], resolve),
                    meta: {title: '版本更新'}
                },
                {
                    path: '/appPage',
                    component: resolve => require(['../components/page/shengya/appPage.vue'], resolve),
                    meta: {title: 'app页面管理'}
                },
                {
                    path: '/channelRelationshipDetails',
                    component: resolve => require(['../components/page/shengya/channelRelationshipDetails.vue'], resolve),
                    meta: {title: '渠道关系详情'}
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: {title: '富文本编辑器'}
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: {title: 'markdown编辑器'}
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: {title: '文件上传'}
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: {title: 'schart图表'}
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: {title: '拖拽列表'}
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: {title: '拖拽弹框'}
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: resolve => require(['../components/page/I18n.vue'], resolve),
                    meta: {title: '国际化'}
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: {title: '权限测试', permission: true}
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: {title: '404'}
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: {title: '403'}
                },
                {
                    path: '/test',
                    component: resolve => require(['../components/page/test.vue'], resolve),
                    meta: {title: '科海拓欢迎您'}
                },
                {
                    path: '/seckill',
                    component: resolve => require(['../components/page//shengya/seckill.vue'], resolve),
                    meta: {title: '限时秒杀'}
                },
				 {
				    path: '/appUserSignSetup',
				    component: resolve => require(['../components/page//shengya/appUserSignSetup.vue'], resolve),
				    meta: {title: '签到设置'}
				},
                {
                    path: '/greet',
                    component: resolve => require(['../components/page/greet.vue'], resolve),
                    meta: {title: '科海拓欢迎您'}
                },
                {
                    path: '/aloneCommodityCentCommission',
                    component: resolve => require(['../components/page/shengya/aloneCommodityCentCommission.vue'], resolve),
                    meta: {title: '单个商品高佣配置'}
                },
                {
                    path: '/userBalanceRecord',
                    component: resolve => require(['../components/page/shengya/userBalanceRecord.vue'], resolve),
                    meta: {title: '用户余额日志'}
                },

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
