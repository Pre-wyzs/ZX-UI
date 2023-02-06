<!-- TODO：行列排布问题 -->
<template>
	<view class="form-container">
		<view v-for="(item,index) in formConfig" :key="index">
			<view v-if="item.type === 'TEXT'" class="generator-item-text">
				<view style="display: flex;">
					<text class="is-required" v-if="isRequierdFunc(item)">*</text>
					<text>{{item.title}}</text>
				</view>
				<view class="generator-value" style="max-width: 260rpx;">
					{{item.value}}
				</view>
				<!-- 边框线 -->
				<view v-if="isBorderedFunc(item)" :class="['uni-list--border']"></view>
			</view>
			<!-- 输入框项目 -->
			<view v-if="item.type === 'INPUT'" class="generator-item-input">
				<view style="display: flex;">
					<text class="is-required" v-if="isRequierdFunc(item)">*</text>
					<view class="label">{{item.title}}</view>
				</view>
				<view class="generator-value">
					<slot name="input" :item="item"></slot>
				</view>
				<!-- 边框线 -->
				<view v-if="isBorderedFunc(item)" :class="['uni-list--border']"></view>
			</view>
			<!-- 时间项目 -->
			<view v-if="item.type === 'DATETIME'" class="generator-item-input">
				<view style="display: flex;">
					<text class="is-required" v-if="isRequierdFunc(item)">*</text>
					<view class="label">{{item.title}}</view>
				</view>
				<view class="generator-value">
					<slot name="datetime" :item="item"></slot>
				</view>
				<!-- 边框线 -->
				<view v-if="isBorderedFunc(item)" :class="['uni-list--border']"></view>
			</view>

			<view v-if="item.type === 'RADIO'" class="generator-item-input">
				<view style="display: flex;">
					<text class="is-required" v-if="isRequierdFunc(item)">*</text>
					<view class="label">{{item.title}}</view>
				</view>
				<view class="generator-value">
					<slot name="radio" :item="item"></slot>
				</view>
				<!-- 边框线 -->
				<view v-if="isBorderedFunc(item)" :class="['uni-list--border']"></view>
			</view>
			<view v-if="item.type === 'SELECT'" class="generator-item-input">
				<view style="display: flex;">
					<text class="is-required" v-if="isRequierdFunc(item)">*</text>
					<view class="label">{{item.title}}</view>
				</view>
				<view class="generator-value">
					<slot name="select" :item="item"></slot>
				</view>
				<!-- 边框线 -->
				<view v-if="isBorderedFunc(item)" :class="['uni-list--border']"></view>
			</view>
			<!-- RADIO,SELECT,IMAGE,IMAGESTATIC,CHECKBOX -->
			<view v-if="item.type === 'IMAGE'" class="generator-item-input">
				<view style="display: flex;">
					<text class="is-required" v-if="isRequierdFunc(item)">*</text>
					<view class="label">{{item.title}}</view>
				</view>
				<view class="generator-value">
					<slot name="image" :item="item"></slot>
				</view>
				<!-- 边框线 -->
				<view v-if="isBorderedFunc(item)" :class="['uni-list--border']"></view>
			</view>
			<view v-if="item.type === 'IMAGESTATIC'" class="generator-item-input">
				<view style="display: flex;">
					<text class="is-required" v-if="isRequierdFunc(item)">*</text>
					<view class="label">{{item.title}}</view>
				</view>
				<view class="generator-value">
					<slot name="imagestatic" :item="item"></slot>
				</view>
				<!-- 边框线 -->
				<view v-if="isBorderedFunc(item)" :class="['uni-list--border']"></view>
			</view>
			<view v-if="item.type === 'CHECKBOX'" class="generator-item-input">
				<view style="display: flex;">
					<text class="is-required" v-if="isRequierdFunc(item)">*</text>
					<view class="label">{{item.title}}</view>
				</view>
				<view class="generator-value">
					<slot name="checktbox" :item="item"></slot>
				</view>
				<!-- 边框线 -->
				<view v-if="isBorderedFunc(item)" :class="['uni-list--border']"></view>
			</view>

			<!-- 递归区 -->
			<view v-if="item.children">
				<zx-form-generator :formConfig="item.children" :styleConfig="styleConfig" :requierd="requierd"
					:border="border">
					<template #input="{item}">
						<slot name="input" :item="item"></slot>
					</template>
					<template #datetime="{item}">
						<slot name="datetime" :item="item"></slot>
					</template>
					<template #radio="{item}">
						<slot name="radio" :item="item"></slot>
					</template>
					<template #select="{item}">
						<slot name="select" :item="item"></slot>
					</template>
					<template #image="{item}">
						<slot name="image" :item="item"></slot>
					</template>
					<template #imagestatic="{item}">
						<slot name="imagestatic" :item="item"></slot>
					</template>
					<template #checkbox="{item}">
						<slot name="checktbox" :item="item"></slot>
					</template>
				</zx-form-generator>
			</view>

			<!-- 错误提示 -->
			<transition enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutDown">
				<view class="error-toast" v-if="errorLoc.isShow">
					<view class="icon">
						<uni-icons v-if="!errorLoc.isSuccess" type="close" size="36" color="#ff8080"></uni-icons>
						<uni-icons v-else type="checkbox" size="36" color="#79ff4d"></uni-icons>
					</view>
					<view class="text" :style="{color: errorLoc.isSuccess ? '#79ff4d' : '#ff8080'}">
						{{errorLoc.text}}
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
			// 是否显示错误信息
			error: {
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
			errorLoc: {
				get() {
					return this.error
				},
				set(val) {
					this.$emit('update:error', val)
				}
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
	.form-container {
		padding: 0 10px;
	}

	.is-required {
		font-size: 16px;
		color: #f56c6c;
		margin-right: 5px;
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
		// top: 0;
		bottom: 0;
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
		// top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: rgba(0, 0, 0, 0.1);
	}

	/* #endif */

	.error-toast {
		width: 60%;
		height: 100px;
		border-radius: 10px 10px;
		color: #fff;
		padding: 10px 8px;
		font-size: 16px;
		// background: rgba(255, 128, 128, .1);
		background: rgba(0,0,0,.1);
		
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
