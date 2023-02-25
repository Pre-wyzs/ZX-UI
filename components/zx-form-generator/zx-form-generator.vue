<!-- 表单生成器 -->
<template>
	<view class="zx-form-generator">
		<view v-for="(item,i) in formConfig" :key="i">
			<block v-for="(type,j) in formTypes" :key="j">
				<view v-if="item.type === type" class="zx-form-generator__item">
					<view class="zx-form-generator__item-title">
						<view class="zx-form-generator__item-title-left">
							<text class="zx-form-generator__item-title-left-required" v-if="isRequierdFunc(item)">*</text>
							<text>{{`${item.title}`}}</text>
						</view>
						<view class="zx-form-generator__item-title-right">
							<slot :name="type + 'Right'" :item="item"></slot>
						</view>
					</view>
					<view class="zx-form-generator__item-body">
						<slot :name="type + 'Body'" :item="item"></slot>
					</view>
					<view v-if="isBorderedFunc(item)" :class="['zx-form-generator__item-border']"></view>
				</view>
			</block>

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
				<view class="zx-form-generator__info" v-if="infoLoc.isShow">
					<view class="zx-form-generator__info-icon">
						<uni-icons v-if="!infoLoc.isSuccess" type="close" size="36" color="#ff8080"></uni-icons>
						<uni-icons v-else type="checkbox" size="36" color="#79ff4d"></uni-icons>
					</view>
					<view class="zx-form-generator__info-text" :style="{color: infoLoc.isSuccess ? '#79ff4d' : '#ff8080'}">
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
					if (item.required === this.requierd) return this.requierd
					return item.required
				}
			},
			isBorderedFunc(item) {
				if (item.border == undefined) {
					return this.border
				} else {
					if (item.border === this.border) return this.border
					return item.border
				}
			},

		}
	}
</script>

<style lang="scss">
@import "styles/zx-form-generator.scss";
</style>
