<template>
	<view class="generator">
		<view v-for="(item,i) in formConfig" :key="i">

			<block v-for="(type,j) in formTypes" :key="j">
				<view v-if="item.type === type" class="generator-item-area">
					<view class="generator-item-area-title">
						<view class="generator-item-area-title-left">
							<text class="is-required" v-if="isRequierdFunc(item)">*</text>
							<text>{{`${item.title}`}}</text>
						</view>
						<view class="generator-item-area-title-right">
							<slot :name="type + 'Right'" :item="item"></slot>
						</view>
					</view>
					<view class="generator-item-area-body">
						<slot :name="type + 'Body'" :item="item"></slot>
					</view>
					<view v-if="isBorderedFunc(item)" :class="['uni-list--border']"></view>
				</view>
			</block>
			<!-- 中继区 -->
			<!-- 		<slot></slot> -->

			<!-- 递归区 -->
			<view v-if="item.children">
				<zx-form-generator :formConfig="item.children" :styleConfig="styleConfig" :requierd="requierd"
					:border="border" :formTypes="formTypes">
					<!-- 右边的内容渲染 -->
					<template #[el.right]="{item}" v-for="el in formTypesLoc">
						<slot :name="el.right" :item="item">
						</slot>
					</template>
					<!-- body内容的渲染 -->
					<template #[el.body]="{item}" v-for="el in formTypesLoc">
						<slot :name="el.body" :item="item">
						</slot>
					</template>
				</zx-form-generator>
			</view>

			<!-- 信息提示 -->
			<transition enter-active-class="animate__animated animate__fadeInDown"
				leave-active-class="animate__animated animate__fadeOutDown">
				<view class="info-toast" v-if="infoLoc.isShow">
					<view class="icon">
						<uni-icons v-if="!infoLoc.isSuccess" type="close" size="36" color="#ff8080"></uni-icons>
						<uni-icons v-else type="checkbox" size="36" color="#79ff4d"></uni-icons>
					</view>
					<view class="text" :style="{color: infoLoc.isSuccess ? '#79ff4d' : '#ff8080'}">
						{{infoLoc.text}}
					</view>
				</view>
			</transition>
		</view>
	</view>
</template>

<script>
	// import zxFormGenerator from './zx-form-generator.vue'
	export default {
		name: 'zxFormGenerator',
		props: {
			formTypes: {
				type: Array,
				default: () => ['TEXT', 'INPUT']
			},
			formConfig: {
				type: Array,
				default: () => []
			},
			// 是否全部都是必要的
			requierd: {
				type: Boolean,
				default: true
			},
			// 是否全部都需要border
			border: {
				type: Boolean,
				default: true,
			},
			// 样式配置回调
			styleConfig: {
				type: Function,
				default: () => null
			},
			// 显示提交的信息
			info: {
				type: Object,
				default: () => ({
					isShow: false,
					isSuccess: false,
					text: ''
				})
			}
		},
		data() {
			return {
				flag: false,
			}
		},
		computed: {
			infoLoc: {
				get() {
					return this.info
				},
				set(val) {
					this.$emit('update:info', val)
				}
			},
			formTypesLoc() {
				return this.formTypes.map(el => {
					return {
						right: el + 'Right',
						body: el + 'Body'
					}
				})
			}


		},
		created() {
			// 如果传了样式配置函数就可以进行单独的样式配置了
			this.styleConfig && this.styleConfig(this.formConfig)
		},
		methods: {
			isRequierdFunc(item) {
				if (item.required == undefined) {
					return this.requierd
				} else {
					if (item.required === this.requierd) {
						return this.requierd
					} else {
						return item.required
					}
				}
			},
			isBorderedFunc(item) {
				if (item.border == undefined) {
					return this.border
				} else {
					if (item.border === this.border) {
						return this.border
					} else {
						return item.border
					}
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.generator {
		padding: 0 0px 0 10px;
	}

	.is-required {
		font-size: 16px;
		color: #f56c6c;
		margin-right: 5px;
	}

	.generator-item-area {
		position: relative;

		&-title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			&-left {
				display: flex;
				align-items: center;
			}

			&-right {}

		}

		&-body {
			// background: red;
		}
	}


	.generator-item-text {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 15px;
		position: relative;
		// &:hover {
		// 	animation-name: pulse;
		// 	animation-duration: 500ms;
		// }

	}

	.generator-item-input {
		padding: 12px 15px;
		position: relative;

		.label {
			margin-bottom: 10px;
		}
	}

	.generator-value {
		font-size: 16px;
		// font-weight: bolder;
	}

	// .border {
	// 	border-bottom: 1px solid rgba(0,0,0,0.1);
	// 	// border-bottom: 1px solid red;
	// }


	.uni-list--border {
		position: absolute;
		top: 0;
		// bottom: 0;
		right: 0;
		left: 0;
		/* #ifdef APP-NVUE */
		border-top-color: rgba(0, 0, 0, 0.1);
		border-top-style: solid;
		border-top-width: 0.5px;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.uni-list--border:after {
		position: absolute;
		top: 0;
		// bottom: 0;
		right: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: rgba(0, 0, 0, 0.1);
	}

	/* #endif */

	.info-toast {
		width: 60%;
		height: 100px;
		border-radius: 10px 10px;
		color: #fff;
		padding: 10px 8px;
		font-size: 16px;
		// background: rgba(255, 128, 128, .1);
		background: rgba(0, 0, 0, .1);

		// box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
		box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		z-index: 99;

		.icon {
			text-align: center;
		}

		.text {
			text-align: center;
			margin-top: 10px;
			color: #ff8080;
			font-size: 14px;
		}
	}
</style>
