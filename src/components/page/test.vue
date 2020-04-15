<template>
    <div>
       四创客管理系统
    </div>
</template>

<script>
	import { post,get,url } from '../../api/index';
    export default {
		name: 'greet',
        data(){
            return {
                
            }
        },
        methods: {
            getData(){
				get('/server-admin/user/authen', {
				    
					
				}).then((response) => {
                  console.log(response)
				  if (response.data.data != null) {
				  	this.$alert(response.data.data, response.data.msg, {
				  	  confirmButtonText: '确定',
				  	  callback: action => {
				  		
				  	  }
				  	});
				  }
                })
                .catch(function (error) {
					
                });
			}
        },
		created() {
			//this.getData()
		},
    }
	/* ease-in-out infinite   循环播放*/
</script>

<style scoped>
		div{
			width: 100%;
			height: 80vh;
			text-align: center;
			line-height: 80vh;
			font-size: 70px;
			/* animation: magnify 2s ; */
			
		}
		/* @keyframes magnify {
			0%{
				
				opacity: 0;
				font-size: 10px;
				
			}
			
			100%{
				
				opacity: 1;
				font-size: 70px;
			}
		} */
		
</style>