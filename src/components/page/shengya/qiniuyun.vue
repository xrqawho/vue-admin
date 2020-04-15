<template>
    <div class="push">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 七牛云配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>


        <el-alert
            title="温馨提示："
            type="info"
            effect="dark"
            
            :closable="false">
        </el-alert>

       <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="七牛云AK">
            <el-input v-model="form.name" placeholder="请输入七牛云AK"></el-input>
        </el-form-item>
        
        
        <el-form-item label="七牛云SK">
            <el-input  v-model="form.content" placeholder="请输入七牛云SK"></el-input>
        </el-form-item>

        <el-form-item label="储存空间">
            <el-input v-model="form.url" placeholder="链接请以http://或者https://开头的"></el-input>
        </el-form-item>
        
        <el-form-item label="七牛云域名" label-width="90px">
            <el-input v-model="form.url" placeholder="链接请以http://或者https://开头的"></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>验证七牛云配置</el-button>
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
    .el-alert--info.is-dark{
        margin: 0 0 18px 0;
    }
    form{
        width: 750px;
        margin: 0 auto;
    }
</style>
