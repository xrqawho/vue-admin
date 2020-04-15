<template>
	<div>
		<!-- <UnionSet ref="UnionSet"/> -->
		<div @click="add()">
			123111111111111111111111111111111111111111111111111111111111111
			11111111111111111111
		</div>
	</div>
</template>

<script>
	import { post,get,url } from '../../../api/index';
	// import  UnionSet  from './UnionSet'
	export default {
	    name: 'callback',
	    data() {
	        return {
	            obj:[],
	        }
	    },
		
	    created() {
			console.log(window.location)
			this.obj = this.urlParse();
			this.pushCallback();
	    },
	    computed: {
	
	    },
	    methods: {
			urlParse() {
			    let url = window.location
			    let obj = {}
			    let reg = /[#&][^#&]+=[^#&]+/g
			    let arr = url.match(reg)
			    // ['?id=12345','&a=b']
			    if (arr) {
			      arr.forEach((item) => {
			        let tempArr = item.substr(1).split('=')
			        let key = decodeURIComponent(tempArr[0])
			        let val = decodeURIComponent(tempArr[1])
			        obj[key] = val
			      })
			      console.log(obj)
			    }
			    return obj
			  },
			  // 请求java接口
			  pushCallback(){
					this.taobao_user_nick=this.obj['taobao_user_nick'];
					this.access_token=this.obj['access_token'];
					let state3 =this.obj['state'];
					let taobao_user_id2 =this.obj['taobao_user_id'];
					let taobao_open_uid =this.obj['taobao_open_uid'];
					console.log(this.obj)
					console.log(taobao_user_nick)
					console.log(access_token)
					console.log(state3)
					console.log(taobao_user_id2)
					console.log(taobao_open_uid)
					
					if (this.taobao_user_nick!=undefined&&this.access_token!=undefined){
					  //请求后台添加高拥账号
					 //  post("/app/taobao/auth",{
						// 'appSession':this.access_token,
						// 'taobaoName':this.taobao_user_nick,
						// 'taobao_user_id':taobao_user_id2,
						// 'taobaoOpenUid':taobao_open_uid,
						// 'state':state3
					 //  }).then((data)=>{
						//   console.log(res)
						//   this.res = JSON.stringify(res);
						//   console.log(this.obj)
						//   
					 //  })
					}
			  }
			
	    }
	}
	
</script>

<style>
</style>
