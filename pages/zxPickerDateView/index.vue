<template>
	<view class="global">
		<zx-picker-date v-model="dateValue" :container-style="{ width: '440rpx'}" :disabled="false" @cancel="cancel"></zx-picker-date>
		<button @click="changeDate"style="width: 440rpx;margin-top: 40rpx;">改变日期</button>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				dateValue: '2023-06'
			}
		},
		methods: {
			changeDate() {
				this.dateValue = '2023-09'
			},
			cancel(e) {
				console.log('19', e);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.global {
		margin:20rpx 0 0 40rpx;
	}
</style>