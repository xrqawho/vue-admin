<!--
 - infor 通用上传组件
 - path  @/components/common/Uploader.vue
 - user  CC
 - date  2020-06-16 19:43:10
 -->


<template>
	<el-upload
			action=""
			list-type="picture-card"
			:limit="1"
			:multiple="false"
			:show-file-list="false"
			accept=".png,.bmp,.jpg,.gif,"
			:http-request="httpRequest"
		>
			<img v-if="internalValue" style="width:146px;height: 146px;display: inline-block;" :src="internalValue">
			<i class="el-icon-plus" v-else></i>
	</el-upload>
</template>

<script>
	import { uploadFile } from '@/api/OssUpload'
	export default {
		name: 'Uploader',
		data () {
			return {
				lazyValue: this.value,
			}
		},
		props: {
			// 传入的值
			value: {
				required: false,
			},

			// 是否禁用
			disabled: {
				type: Boolean,
				default: false,
			},

			// 上传文件所在目录
			dir: {
				type: String,
				default: '',
			}
		},

		computed: {
			// 绑定输入事件
			internalValue: {
				get () {
					return this.lazyValue
				},
				set (val) {
					this.lazyValue = val
					// 绑定到model中
					this.$emit((this.$options.model && this.$options.model.event) || 'input', val)
					this.$emit('change', val)
				},
			},
		},

		methods: {
			httpRequest (options) {
				uploadFile(this.dir, options.file).then(result => {
					if (result.success) {
						this.internalValue = result.data.url
						this.$emit('upload-success', result.data)
					}
				})
			},
		},
		
		watch: {
			value (newVal, oldVal) {
				this.lazyValue = this.value
			}
		}
	}
</script>

<style lang="scss">

</style>