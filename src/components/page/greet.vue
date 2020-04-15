<template>
    <div>
       欢迎您
    </div>
</template>

<script>
    export default {
		name: 'greet',
        data(){
            return {
                
            }
        },
        methods: {
            
        }
    }
</script>

<style scoped>
		div{
			width: 100%;
			height: 80vh;
			text-align: center;
			line-height: 80vh;
			font-size: 70px;
			animation: picDrawjc42 2s ;
			/* ease-in-out infinite   循环播放*/
		}
		@keyframes picDrawjc42 {
			0%{
				
				opacity: 0;
				font-size: 10px;
				
			}
			
			100%{
				
				opacity: 1;
				font-size: 70px;
			}
		}
		
</style>