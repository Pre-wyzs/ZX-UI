<template>
	<!-- 简单的单选按钮列表 -->
	<view class="flex align-center" >
		<view class="flex align-center" v-for="(item,index) in list" :key="index" @click="change(item)" :style="{ flexShrink:0 ,marginRight: gap}">
			<image src="@/static/circle.png" mode="" style="width: 28rpx;height: 28rpx;" v-show="item.label != cSelect"></image>
			<image src="@/static/circle-active.png" mode="" style="width: 28rpx;height: 28rpx;" v-show="item.label == cSelect"></image>
			<text class="ml-4 fs-14 fw-400">{{item.label}}</text>
		</view>
	</view>
	
</template>

<script>
	export default {
		props:{
			list: {
				type: Array,
				default: ()=>[
					{
						label: '一级',
						value: 0
					},
					{
						label: '二级',
						value: 1
					},
					{
						label: '三级',
						value: 2
					},
					{
						label: '四级',
						value: 3
					},
				]
			},
			value: {
				type: String,
				default: '一级'
			},
			// valueModel: {
			// 	type: String,
			// 	default: '一级'
			// },
			// radios的间距
			gap: {
				type: String,
				default: '10rpx'
			},
			//每一项的宽度
			itemWidth: {
				type: String,
				default: null
			}
			
		},
		data() {
			return {
				// cSelect: this.valueModel
			}
		},
		computed: {
			cSelect: {
				get() {return this.value},
				set(val){this.$emit('input', val)}
			}
		},
		methods: {
			change(item) {
				if (item.label == this.cSelect) {
					return;
				}
				this.cSelect = item.label;
				// this.$emit('input', this.cSelect)
				// this.$emit('update:valueModel', this.cSelect)
				this.$emit('change')  // 发送change事件
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
</style>