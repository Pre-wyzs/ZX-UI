<template>
	<view class="container">
		<zx-form-generator :formConfig="formConfig" :styleConfig="styleConfig" :requierd="true" :border="true"
			:info="info">
			<template #TEXTRight="{item}">
				<view style="padding:10px 0px 10px 5px;color:red;">{{item.value}}</view>
			</template>
			<template #INPUTRight="{item}">
				<view style="padding: 10px 0px 10px 5px;background-color: #fff;">
					<uni-easyinput v-model="item.value" placeholder="请输入内容" :styles="{borderColor: `#b3deff`}">
					</uni-easyinput>
				</view>
			</template>
			<template #INPUTBody="{item}">
				<div class="" style="padding-bottom: 15px;">
					<uni-easyinput v-model="item.value" placeholder="请输入内容" :styles="{borderColor: `#b3deff`}">
					</uni-easyinput>
				</div>
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
				info: {
					isShow: false,
					isSuccess: false,
					text: '提交失败!'
				},
				isInSubmit: false, // 是否在提交过程中
			}
		},
		methods: {
			styleConfig(formConfig) {
				formConfig.forEach(el => {
					if (el.title === '监测对象') {
						el.required = false
						el.border = true
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
				this.info.isShow = true
				setTimeout(() => {
					this.info.isShow = false
					this.isInSubmit = false
				}, 1200)
			}
		}
	}
</script>
<style lang="scss">
	.container {
		padding: 16px 16px;
		// box-sizing: border-box;
	}
</style>
