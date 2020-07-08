import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import store from './store/store'
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import VueClipboard from 'vue-clipboard2'//复制插件

Vue.config.productionTip = false
Vue.use(VueI18n);
Vue.use(VueClipboard)
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;

const i18n = new VueI18n({
    locale: 'zh',
    messages
})

// console.log(axios)
let set_token = localStorage.getItem("set_token")
// console.log(set_token)
if (set_token != null) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + set_token
}

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    // console.log(to)
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 权限管理。如果权限不够，会直接转到403，暂时没有实现，后台需要实现接口返回
        
    } else {
        // 不是以上情况，正常进入相应路由
         next();
        
    }
})

function open6(msg) {
	Vue.prototype.$notify.error({
          title: '错误',
          message: msg 
    });
}
// http response 响应拦截器
axios.interceptors.response.use(response => {
	if (response.data.status == 500) {
		open6('服务器返回500，请排查所填请求参数是否正确');
	} else if(response.data.status == 505){
		open6('status = 505 ,身份验证失败');
		localStorage.removeItem('ms_username')
		this.$router.push('/login');
	}
 	return response;
},error => {
 	if (error.response) {
		
		switch (error.response.status) {
			// 500，
			case 500:
				console.log("失败")
				//向前台报错
				open6('接口请求出现异常');
				break

			case 401:
				localStorage.removeItem('set_token')
				router.push('/login')
				return
		}
		// 返回接口返回的错误信息
		return Promise.reject(error.response.data);
	}else{
		open6('前端请求未找到相应地址，请检查服务器是否正常，网络连接是否正常');
	}
});



new Vue({
    store,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')