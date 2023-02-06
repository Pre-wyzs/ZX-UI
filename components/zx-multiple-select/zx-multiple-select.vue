<template>
	<view>
		<view class="uni-select-cy" :style="{'z-index':zindex}">
			<view class="uni-select-cy-select" :class="{ active: active,'uni_select_isselect': active  }"
				@click.stop="handleSelect">
				<!-- 禁用mask -->
				<view class="uni-disabled" v-if="disabled"></view>
				<!-- 清空 -->
				<view class="close-icon close-postion"
					v-if="changevalue.length && !active && !disabled && showClearIcon">
					<text @click.stop="handleRemove(null)"></text>
				</view>
				<!-- 显示框 -->
				<view class="uni-select-multiple">
					<template v-if="changevalue.length">
						<view class="uni-select-multiple-item" v-for="(item, index) in changevalue" :key="index">
							<view class="uni-select-multiple-item-row">
								{{ item[slabel] }}
							</view>
							<view class="close-icon" v-if="showValueClear"><text
									@click.stop="handleRemove(index)"></text>
							</view>
						</view>
					</template>

					<!-- 搜索框 -->
					<view class="uni-select-search ">
						<input type="text" :placeholder="changevalue.length>0?'':placeholder"
							:placeholder-style="`font-size:12px;`" @blur="onBlur" v-model="searchKey" />
					</view>
				</view>
				<!-- 为空时的显示文案 -->
				<!-- <view v-if="changevalue.length == 0&&showplaceholder" style="margin-top: 18rpx;">{{ placeholder }}</view> -->
				<!-- 禁用图标 -->
				<view class="uni-select-cy-icon" :class="{ disabled: disabled }"><text></text></view>
			</view>
			<!-- 下拉选项 -->
			<transition enter-active-class="animate__animated animate__bounceIn"
				leave-active-class="animate__animated animate__bounceOut">
				<scroll-view class="uni-select-cy-options" :scroll-y="true" v-show="active"
					@scrolltolower="scrolltolower">
					<template>
						<template v-if="localOptions.length > 0">
							<view class="uni-select-cy-item"
								:class="{ active: include(changevalue, item, slabel) > -1 }"
								v-for="(item, index) in localOptions" :key="index" @click.stop="handleChange(item)">
								{{ item[slabel] }}
							</view>
						</template>
						<template v-else>
							<view class="uni-select-search-noresult">
								没有结果...
							</view>
						</template>
						<view class="uni-select-cy-item"
							style="color:#409eff;display: flex;justify-content: space-between;align-items: center;"
							@click.stop="addNewItem">
							{{ isAddNew? '取消新增':'新增选项'}}<text v-show="isAddNew" style="color: #3aff00;"
								@click.stop="insureAdd">确认</text>
						</view>
						<view class="" v-show="isAddNew" style="padding: 0 20rpx;" @click.stop="''">
							<!--这个click是为了防止点击输入框触发收起列表的操作！请不要随便删除!-->
							<uni-easyinput v-model="newItemName" placeholder="请输入新的选项" focus />
						</view>
					</template>
				</scroll-view>


			</transition>

		</view>
		<!-- 点击非组件区域自动关闭组件 -->
		<view class="uni-mask" v-show="active" @click="close" :style="{'z-index': zindex - 1}"></view>
	</view>
</template>

<script>
	export default {
		name: 'zxMultipleSelect',
		props: {
			//是否显示全部清空按钮
			showClearIcon: {
				type: Boolean,
				default: false
			},
			//是否显示单个删除
			showValueClear: {
				type: Boolean,
				default: true
			},
			zindex: {
				type: Number,
				default: 999
			},
			//禁用组件
			disabled: {
				type: Boolean,
				default: false
			},
			options: {
				type: Array,
				default () {
					return [];
				}
			},
			placeholder: {
				type: String,
				default: '请选择'
			},
			showplaceholder: {
				type: Boolean,
				default: true
			},
			slabel: {
				type: String,
				default: 'label'
			},
			svalue: {
				type: String,
				default: 'value'
			},
			// 是否开启分页
			isPaging: {
				type: Boolean,
				default: false
			},
			datalist: { // 默认需要它的双向绑定
				type: Array,
				default: () => [],
				required: true
			}
		},
		data() {
			return {
				active: false, //组件是否激活，
				// changevalue: [], //搜索框同步
				realValue: [],

				// 新增选项
				isAddNew: false,
				newItemName: '',
				// 搜索的关键字
				searchKey: '',
				optionsCache: [], // 原options字典缓存
				isCached: false,
			};
		},
		computed: {
			localOptions: { //本地列表
				get() {
					return this.options;
				},
				set(val) {
					this.$emit('update:options', val)
				}
			},
			changevalue: { //本地选中的数据
				get() {
					return this.datalist;
				},
				set(val) {
					this.$emit('update:datalist', val)
				}
			}
		},
		watch: {
			searchKey(val, oldVal) {
				if (!/^\s*$/.test(val)) {
					console.log('缓存', this.optionsCache);
					this.localOptions = this.optionsCache.filter(el => el[this.slabel].includes(val))
					
					// this.localOptions = tmp
					// console.log('listing', this.localOptions);  ?? watch中computed中的属性拿不到变化的吗？
				} else {
					this.localOptions = this.optionsCache // 恢复缓存
				}
			}
		},
		created() {
			if (this.changevalue.length > 0) { //说明有初始的数据的
				this.realValue = this.changevalue.map(el => el[this.svalue])
			}
			this.optionsCache = this.options
		},
		methods: {
			close() {
				this.active = false
			},
			scrolltolower() {
				if (this.isPaging) {
					this.$emit('scrolltolower')
				}
			},
			//点击展示选项
			handleSelect() {
				if (this.disabled) return;
				this.active = true;
			},
			//移除数据
			handleRemove(index) {
				if (index === null) {
					this.realValue = [];
					this.changevalue = [];
				} else {
					this.realValue.splice(index, 1);
					this.changevalue.splice(index, 1);
					this.$emit('del', index)
				}
				this.$emit('change', this.changevalue, this.realValue);
			},
			//点击组件列
			handleChange(item) {
				let arrIndex = this.realValue.indexOf(item[this.svalue]);
				// console.log('arrIndex',arrIndex);
				if (arrIndex > -1) {
					this.changevalue.splice(arrIndex, 1);
					this.realValue.splice(arrIndex, 1);
					this.$emit('del', arrIndex)
				} else {
					this.changevalue.push(item);
					this.realValue.push(item[this.svalue]);
					this.$emit('add', item[this.svalue])
				}
				// console.log(this.realValue, 'this.realValue')
				this.$emit('change', this.changevalue, this.realValue);
			},
			// 新增选项
			addNewItem() {
				this.isAddNew = !this.isAddNew;
			},
			insureAdd() {
				if (this.newItemName != '') {
					const newItem = {
						[this.slabel]: this.newItemName,
						[this.svalue]: this.newItemName
					}
					this.localOptions.push(newItem)
					this.newItemName = ''
					this.isAddNew = false // reset
					return;
				}
				// this.$toast.showError('新选项不能为空')
			},
			// 判断展示框中是否包含这一项数据
			include(changevalue, item, property) {
				if (changevalue instanceof Array && changevalue.length > 0) {
					return changevalue.findIndex(el => {
						return el[property] === item[property]
					});
				} else {
					return -1
				}
			},
			onBlur(evt) {
				// this.searchKey = ''
				// this.localOptions = this.optionsCache 
				// 处理有搜索结果的情况
				if (!/^\s*$/.test(this.searchKey) && this.localOptions.length > 0) {
					setTimeout(() => {
						this.searchKey = ''
					}, 10)
				} else {
					this.searchKey = ''
				}
			},


		}
	};
</script>

<style lang="scss" scoped>
	.uni-select-cy {
		position: relative;
		z-index: 999;

		.uni-select-mask {
			width: 100%;
			height: 100%;
		}

		/* 删除按钮样式*/
		.close-icon {
			height: 100%;
			width: 15px;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 3;
			cursor: pointer;

			text {
				position: relative;
				background: #fff;
				width: 13px;
				height: 13px;
				border-radius: 50%;
				border: 1px solid #bbb;

				&::before,
				&::after {
					content: "";
					position: absolute;
					left: 20%;
					top: 50%;
					height: 1px;
					width: 60%;
					transform: rotate(45deg);
					background-color: #bbb;
				}

				&::after {
					transform: rotate(-45deg);
				}

			}
		}

		//所有清空的定位
		.close-postion {
			position: absolute;
			right: 35px;
			top: 0;
			height: 100%;
			width: 15px;
		}

		/* 多选盒子 */
		.uni-select-multiple {
			max-width: 90%;
			display: flex;
			flex: 1;
			width: 0;
			flex-wrap: wrap;

			.uni-select-multiple-item {
				margin-top: 16rpx;
				margin-right: 10rpx;
				background: #bbb;
				padding: 2rpx 4rpx;
				border-radius: 4rpx;
				color: #fff;
				display: flex;
				flex: 0 0 140rpx;

				.uni-select-multiple-item-row {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		// select部分
		.uni-select-cy-select {
			user-select: none;
			position: relative;
			z-index: 3;
			transition: .3s;
			// height: 36px;
			padding: 0px 30px 8px 10px;
			box-sizing: border-box;
			border-radius: 4px;
			border: 1px solid rgb(229, 229, 229);
			display: flex;
			align-items: center;
			font-size: 14px;
			color: #999;
			flex-wrap: nowrap;

			.uni-disabled {
				position: absolute;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 19;
				cursor: no-drop;
				background: rgba(255, 255, 255, .5);
			}


			.uni-select-cy-input {
				font-size: 14px;
				color: #999;
				display: block;
				width: 96%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				line-height: 30px;
				box-sizing: border-box;

				&.active {
					color: #333;
				}

			}

			.uni-select-cy-icon {
				cursor: pointer;
				position: absolute;
				right: 0;
				top: 0;
				height: 100%;
				width: 30px;
				display: flex;
				align-items: center;
				justify-content: center;

				// &::before {
				// 	content: "";
				// 	width: 1px;
				// 	height: 100%;
				// 	position: absolute;
				// 	left: 0;
				// 	top: 0;
				// 	background-color: #e5e5e5;
				// }

				text {
					display: block;
					width: 0;
					height: 0;
					border-width: 12rpx 12rpx 0;
					border-style: solid;
					border-color: #bbb transparent transparent;
					transition: .3s;
				}

				&.disabled {
					cursor: no-drop;

					text {
						width: 20rpx;
						height: 20rpx;
						border: 2px solid #ff0000;
						border-radius: 50%;
						transition: .3s;
						position: relative;
						z-index: 999;

						&::after {
							content: "";
							position: absolute;
							top: 50%;
							left: 0;
							width: 100%;
							height: 2px;
							margin-top: -1px;
							background-color: #ff0000;
							transform: rotate(45deg);

						}
					}
				}
			}

			&.active .uni-select-cy-icon {
				text {
					transform: rotate(180deg);
				}
			}
		}

		// options部分
		.uni-select-cy-options {
			user-select: none;
			position: absolute;
			top: calc(100% + 5px);
			left: 0;
			width: 100%;
			height: 500rpx;
			border-radius: 4px;
			border: 1px solid rgb(229, 229, 229);
			background: #fff;
			padding: 5px 0;
			box-sizing: border-box;
			z-index: 9;
			box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

			.uni-select-cy-item {

				padding: 0 10px;
				box-sizing: border-box;
				cursor: pointer;
				line-height: 2.5;
				transition: .3s;
				font-size: 14px;

				&.active {
					color: #409eff;

					background-color: #f5f7fa // &:hover {
					// 	color: #409eff;
					// 	background-color: #f5f7fa
					// }
				}

				// &:hover {
				// 	background-color: #f5f5f5;
				// }
			}
		}
	}

	.uni-select-search {
		margin-top: 16rpx;
		flex: 1;
	}

	.uni-select-search-noresult {
		padding: 0 10px;
		font-size: 14px;
		color: #999;
	}

	// ::v-deep .uni-input-placeholder .input-placeholder {
	// 	font-size: 12px;
	// }

	//
	// 是否出在选择状态
	.uni_select_isselect {
		border: 1px solid #409eff !important;
		box-shadow: 0 3px 3px rgba(64, 158, 255, .1) !important;
	}

	.uni-mask {
		width: 100vw;
		height: 100vh;
		background: transparent;
		// background: red;
	}
</style>
