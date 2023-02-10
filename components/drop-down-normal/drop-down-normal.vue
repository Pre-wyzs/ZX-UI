<template>
	<!-- 一个普通的下拉框 

	-->
	<view class="dropdown flex justify-between align-center pr-10" @click="dropDownList"
		:style="{ width: boxWidth ,zIndex: zindex }">
		<!-- 显示框 -->
		<view class="content fs-16 fw-400" style="color: #2D2E32;">
			{{ cDropdownItem.name }}
		</view>
		<image src="@/static/farmMachine/dropdown.png" style="width:24rpx;height:12rpx;"
			:class="[{ 'dropdown-active-arrow': dropdownFlag }]"></image>
		<!-- 下拉列表 -->
		<view class="dropdown-list" v-show="dropdownFlag" :style="{ width: subWidth }">
			<view :class="[{ 'dropdown-active-item': item.name == cDropdownItem.name }]" v-for="(item, index) in list"
				:key="index" @click="selectedItem(item)">
				{{ item.name }}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 下拉列表
		list: {
			type: Array,
			default: () => {
				return [{
					name: '面议',
					value: 0,
				}, {
					name: '预设',
					value: 1
				}]
			},
			required: false
		},

		// 下拉框宽度
		boxWidth: {
			type: String,
			default: () => '470rpx',
			required: false
		},
		// 下拉框子框框宽度
		subWidth: {
			type: String,
			default: () => {
				return '40%'
			},
			required: false
		},
		//层级防止多个下拉列表使用的时候覆盖
		zindex: {
			type: Number,
			default: () => 0
		},
		// 双向绑定的选中项
		select: {
			type: Object,
			default: () => {
				return {
					name: '面议',
					value: 0
				}
			}
		},
		
	},
	computed: {
		cDropdownItem: {
			get() {
				if (!!this.select) {
					return this.select;
				} else {
					return {
						name: '',
						value: -1
					}
				}
			},
			set(val) {
				this.$emit('update:select', val)
			}
		}
	},
	data() {
		return {
			// 当前选中项（默认列表中的第一项作为初始值）
			// cDropdownItem: this.list[0],
			dropdownFlag: false
		}
	},
	methods: {
		dropDownList() {
			this.dropdownFlag = !this.dropdownFlag;
		},

		selectedItem(item) {
			if (this.cDropdownItem.name == item.name) {
				return;
			}
			this.cDropdownItem = item
			this.$emit('change')
		}
	}
}
</script>

<style lang="scss" scoped>
.dropdown {
	box-sizing: border-box;
	width: 100%;
	height: 64rpx;
	border-radius: 10rpx;
	border: 1px solid rgba(194, 194, 196, 1);
	padding-left: 24rpx;
	position: relative;

	&-list {
		padding: 10rpx 0rpx;
		position: absolute;
		// width: 40%;
		top: 100%;
		left: 0rpx;
		box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, .3);
		z-index: 1;
		background: #fff;

		view {
			padding: 6rpx 20rpx;
		}
	}

}

.dropdown-active-arrow {
	transform: rotate(180deg);
}

.dropdown-active-item {
	background: #F5F5F5;
}
</style>
