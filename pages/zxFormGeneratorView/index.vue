<template>
	<view>
		<zx-form-generator :formConfig="formConfig" :styleConfig="styleConfig" 
		:requierd="true" :border="true" :error.sync="error">
			<template #input="{item}">
				<uni-easyinput v-model="item.value" placeholder="请输入内容" :styles="{borderColor: `#b3deff`}"></uni-easyinput>
			</template>
			<template #datetime="{item}">
				<uni-datetime-picker v-model="item.value" type="datetime"></uni-datetime-picker>
			</template>

		</zx-form-generator>
		<view class="" style="text-align: center;font-weight: bold;" @click="submit">
			提交
		</view>
	</view>
</template>
<script>
	import {
		formConfig,
		deepCopy
	} from '../../config/formConfig.js'
	export default {
		data() {
			return {
				candidates: ['北京', '南京', '东京', '武汉', '天津', '上海', '海口'],
				city: '东京',
				formConfig: deepCopy(formConfig),
				error: {
					isShow: false,
					isSuccess: true,
					text: '提交成功!'
				},
				isInSubmit: false, // 是否在提交过程中
			}
		},
		methods: {
			styleConfig(formConfig) {
				formConfig.forEach(el => {
					if (el.title === '详细条目') {
						el.required = true
						el.border = false
					}
				})
			},
			submit() {
				if (this.isInSubmit) {
					console.log('提交进行中,请勿重复提交!')
					return 
				}
				console.log('提交数据', this.formConfig)
				this.isInSubmit = true
				this.error.isShow = true
				setTimeout(() => {
					this.error.isShow = false
					this.isInSubmit = false
				},1200)
			}
		}
	}
</script>
<style lang="scss">
	.contain {
		padding: 16px 10px;
		// box-sizing: border-box;
	}
</style>
