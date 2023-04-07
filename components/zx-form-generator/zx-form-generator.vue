<!-- 表单生成器 -->
<!-- 
 TODO：
 1、动态表单的样式配置函数执行问题？
 2、uni-icon图标字体的显示问题
 
 -->
<template>
	<view class="zx-form-generator">
		<view v-for="(item,i) in formConfig" :key="i">
			<block v-for="(type,j) in formTypes" :key="j">
				<view v-if="item.type === type" class="zx-form-generator__item" 
				:style="item.style || {background: '#fff'}"> <!-- $新增功能，可以给可以配置每一项的背景颜色 -->
					<view class="zx-form-generator__item-title">
						<view class="zx-form-generator__item-title-left">
							<text class="zx-form-generator__item-title-left-required" v-if="itemRequired(item)">*</text>
							<slot :name="type + 'Left'" :item="item">
								<text>{{`${item.title}`}}</text>
							</slot>
						</view>
						<view class="zx-form-generator__item-title-right">
							<slot :name="type + 'Right'" :item="item"></slot>
						</view>
					</view>
					<view class="zx-form-generator__item-body">
						<slot :name="type + 'Body'" :item="item"></slot>
					</view>
					<view v-if="itemBorder(item)" class="zx-form-generator__item-border"></view>
				</view>
			</block>

			<!-- 递归区 -->
			<view v-if="item.children">
				<zx-form-generator :formConfig="item.children" :styleConfig="styleConfig" :requierd="requierd"
					:border="border" :formTypes="formTypes">
					<template #[el.left]="{item}" v-for="el in formTypesLoc">
						<slot :name="el.left" :item="item"></slot>
					</template>
					<!-- 右边的内容渲染 -->
					<template #[el.right]="{item}" v-for="el in formTypesLoc">
						<slot :name="el.right" :item="item"></slot>
					</template>
					<!-- body内容的渲染 -->
					<template #[el.body]="{item}" v-for="el in formTypesLoc">
						<slot :name="el.body" :item="item"></slot>
					</template>
				</zx-form-generator>
			</view>
		</view>
		<!-- 信息提示 -->
		<transition enter-active-class="animate__animated animate__fadeInDown"
			leave-active-class="animate__animated animate__fadeOutDown">
			<view class="zx-form-generator__info" v-if="info.isShow">
				<view class="zx-form-generator__info-icon">
					<!-- TODO：图标显示的问题待优化!（有时候当弹出信息框的时候，图标不会第一时间就出现，而是会等一会才出现，这就很难搞...） -->
					<uni-icons v-if="info.isSuccess" type="checkbox" size="36" color="#79ff4d"></uni-icons>
					<uni-icons v-else type="close" size="36" color="#ff8080"></uni-icons>
				</view>
				<view class="zx-form-generator__info-text" :style="{color: info.isSuccess ? '#79ff4d' : '#ff8080'}">
					{{info.text}}
				</view>
			</view>
		</transition>
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
			return {}
		},
		computed: {
			formTypesLoc() {
				return this.formTypes.map(el => ({
					left: el + 'Left',
					right: el + 'Right',
					body: el + 'Body'
				}))
			}
		},
		created() {
			// 如果传了样式配置函数就可以进行单独的样式配置了
			this.styleConfig && this.styleConfig(this.formConfig)
		},
		methods: {
			itemRequired(item) {
				// 一种覆盖的思路，如果item.required有值的话，就返回它本身，否则返回??后面默认的值
				return item.required ?? this.requierd
			},
			itemBorder(item) {
				return item.border ?? this.border
			},

		}
	}
</script>

<style lang="scss">
	@import "styles/zx-form-generator.scss";
</style>
