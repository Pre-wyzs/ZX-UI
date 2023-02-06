<template>
	<view>
		<view class="item" style="text-align: center;font-weight: bold;" @click="jumpTo('../zxFormGeneratorView/index')">
			表单生成组件
		</view>
		
		<view class="item" style="text-align: center;font-weight: bold;" @click="jumpTo('../zxMultipleSelectView/index')">
			下拉多选组件
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
					text: '你好'
				},
				isInSubmit: false, // 是否在提交过程中
			}
		},
		methods: {
			jumpTo(url) {
				uni.navigateTo({
					url,
					fail(error) {
						console.log(error);
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.contain {
		padding: 16px 10px;
		// box-sizing: border-box;
	}
	.item {
		border: 1px solid red;
		margin: 10px 5px;
	}
</style>
