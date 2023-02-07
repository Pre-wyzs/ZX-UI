<template>
	<view class="container">
		<zx-combox :candidates="candidates" placeholder="请选择所在城市" v-model="city"></zx-combox>
		<view class="result-box">
			<text>所选城市为：{{city}}</text>
		</view>
	</view>
</template>


<script>
	export default {
		components: {},
		data() {
			return {
				candidates: ['北京', '南京', '东京', '武汉', '天津', '上海', '海口'],
				city: ''
			}
		}
	}
</script>



<style lang="scss" scoped>
	.container {
		padding: 10px 16px;
	}
</style>
