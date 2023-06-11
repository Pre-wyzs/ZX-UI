<template>
	<picker mode="date" :value="dateValue" :start="start" :end="end" @change="changeDate"
		:fields="fields" @cancel="cancel" :disabled="disabled">
			<view class="zx-picker-date" :style="containerStyle" @click="pickerOn = true" :class="[{'zx-picker-date__picker-on': pickerOn}]">
				<text v-if="!dateValue" class="zx-picker-date__placeholder" :style="{ color: placeholderColor }">
					{{placeholderText}}
				</text> <!--这是默认的pleaceholder-->
				<text v-else>{{dateValue}}</text>
				<view class="icon" @click.stop="clearHandler()" v-if="dateValue && !disabled"> <!--有值并且不是disabled的时候-->
					<uni-icons v-if="pickerOn" type="clear" color="#ff0000" size="24"></uni-icons>
					<uni-icons v-else type="clear" color="#c0c4cc" size="24"></uni-icons>
				</view>
			</view>
	</picker>
</template>

<script>
	export default {
		/**
		 * 属性如下
		 * 自定义事件：cancel
		 * 
		 * */
		props:{
			/** 首先是日期picker的原封不动的封装*/
			fields:{
				type: String,
				default: 'month',  // 选择粒度：year，month，day
				required: false
			},
			start: {
				type: String,
				default: '1999-10',
				required: false
			},
			end: {
				type: String,
				default: '2104-12',
				required: false
			},
			// 日期时间
			value: {
				type: String,
				default: () => '',
				required: true
			},
			// 默认文字
			placeholderText:{
				type: String,
				default: '请选择',
				required: false
			},
			// 默认文字样式
			placeholderColor:{
				type: String,
				default: '#ccc',
				required: false
			},
			// 容器的样式，主要是用来调整日期选择器的宽度的
			containerStyle:{
				type: Object,
				default: ()=> ({
					width: '440rpx',  
				}),
				requierd: false
			},
			disabled: {
				type: Boolean,
				default: false,
				required: false
			}
		},
		data () {
			return {
				pickerOn: false,  // 默认是不打开的
			}
		},
		computed:{
			dateValue:	{
				get() {
					return this.value
				},
				set(val) {
					this.$emit('input',val)
				}
			}
		},
		methods: {
			clearHandler() {
				this.dateValue = ''
			},
			changeDate(e) {
				this.dateValue = e.detail.value
				this.pickerOn = false
			},
			cancel(e) {
				/**事件外传的思路*/
				this.$emit('cancel', e)
				this.pickerOn = false
			} 
		}
	}
</script>
<style lang="scss">
	@import "styles/zx-picker-date";
</style>