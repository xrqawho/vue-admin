<template>
    <div class="invitePoster">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 邀请海报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        
        <el-card class="box-card">
            <div  class="text item">
              温馨提示：
             </div>
        </el-card>
       
       <el-card class="box-card">
            <div  class="text item">
              海报列表：
             </div>
        </el-card>

        <div class="box-card">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>

        <el-button class="btn" type="primary">保存</el-button>
        
    </div>
</template>

<script>
    import { post,get } from '../../../api/index';
    export default {
        name: 'invitePoster',
        data() {
            return {
                form: {
                    name: '',
                    company: '',

                    user: '',
                    content: '',
                    url:'',
                }
            }
        },
        created() {
            
        },
        computed: {
            data() {
                
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }

</script>

<style scoped>
    .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 80%;
    margin: 0 auto;
    margin-top: 15px;
    
  }
  .btn{
      float: right;
      margin-right: 10%;
  }
</style>
