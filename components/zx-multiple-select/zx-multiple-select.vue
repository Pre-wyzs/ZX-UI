<!-- 下拉多选框 -->
<template>
	<view class="zx-multiple-select" :style="{...c3vars,'z-index':zindex}" v-out-click="() => active = false"> <!--$这个地方注意一下，不能直接写active = false，因为自定义指令没有支持这个功能-->
		<view class="zx-multiple-select__container" :class="{ active: active,'zx-multiple-select__containerselect': active  }"
			@click.stop="handleSelect">
			<view class="zx-multiple-select__container-disabled" v-if="disabled"></view>
			<!-- 清空 -->
			<view class="zx-multiple-select__container-clear"
				v-if="changevalue.length && !active && !disabled && showClearIcon">
				<text @click.stop="handleRemove(null)"></text>
			</view>
			<!-- 显示框 -->
			<view class="zx-multiple-select__container-show">
				<template v-if="changevalue.length">
					<view class="zx-multiple-select__container-show-item" v-for="(item, index) in changevalue"
						:key="index">
						<view class="zx-multiple-select__container-show-item-label">
							{{ item[slabel] }}
						</view>
						<view class="zx-multiple-select__container-show-item-icon" v-if="showValueClear"><text
								@click.stop="handleRemove(index)"></text>
						</view>
					</view>
				</template>
				<!-- 搜索框 -->
				<view class="zx-multiple-select__container-show-search">
					<input type="text" :placeholder="changevalue.length>0?'':placeholder"
						:placeholder-style="`font-size:12px;`" @blur="onBlur" v-model="searchKey" />
				</view>
			</view>
			<!-- 图标(禁用/下拉) -->
			<view class="zx-multiple-select__container-icon" :class="{ disabled: disabled }" @click.stop="handleToggle"><text></text></view>
		</view>
		<!-- 下拉选项 -->
		<transition enter-active-class="animate__animated animate__bounceIn"
			leave-active-class="animate__animated animate__bounceOut">
			<scroll-view class="zx-multiple-select__options" :scroll-y="true" v-show="active"
				@scrolltolower="scrolltolower">
					<view class="zx-multiple-select__options-addnew" @click.stop="''"> <!--这个click是为了防止点击输入框触发收起列表的操作！请不要随便删除!-->
						<input class="zx-multiple-select__options-addnew-input" placeholder="请输入新的选项" v-model="newItemName" />
						<uni-icons type="checkmarkempty" size="20" :color="newItemName.length>0?`#45b984`:`#fff`"
							@click="newItemName.length>0?insureAdd():''"></uni-icons>
					</view>
					<template v-if="optionsLoc.length > 0">
						<view class="zx-multiple-select__options-item"
							:class="{ active: include(changevalue, item, slabel) > -1 }"
							v-for="(item, index) in optionsLoc" :key="index" @click.stop="handleChange(item)">
							{{ item[slabel] }}
						</view>
					</template>
					<template v-else>
						<view class="zx-multiple-select__options-noresult">
							没有结果...
						</view>
					</template>
			</scroll-view>
		</transition>
	</view>
</template>

<script>
	import c3vars from '../../themes/var.js'
	const outClick = {
		// 初始化绑定指令
		bind(el, binding, vnode) {
			function clickHandler(e) {
				if (el.contains(e.target)) return
				if (binding.expression) binding.value(e)
			}

			el.__vueOutClick__ = clickHandler
			document.addEventListener('click', clickHandler)
		},
		// 解绑指令，组件销毁时用到
		unbind(el, binding) {
			document.removeEventListener('click', el.__vueOutClick__)
			delete el.__vueOutClick__
		}
	}

	export default {
		name: 'zxMultipleSelect',
		// 自定义指令-局部
		directives: {
			outClick
		},
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
					return []
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
				c3vars,
				active: false, //组件是否激活，
				realValue: [],
				newItemName: '',
				searchKey: '',
				optionsLoc: [], // 原options字典缓存
			}
		},
		computed: {
			changevalue: { //本地选中的数据
				get() {
					return this.datalist
				},
				set(val) {
					this.$emit('update:datalist', val)
				}
			}
		},
		watch: {
			options: {
				handler(val) {
					this.optionsLoc = val
				},
				immediate: true
			},
			searchKey(val) {
				// 优美的代码，这里如果val是 ''的话，那么所有的选项中都包含''，所以所有的列表都会展示出来的。根本就不需要什么缓存。。。
				this.optionsLoc = this.options.filter(el => el[this.slabel].includes(val))
			}
		},
		created() {
			if (this.changevalue.length > 0)  //说明有初始的数据的
				this.realValue = this.changevalue.map(el => el[this.svalue])
		},
		methods: {
			scrolltolower() {
				if (this.isPaging) {
					this.$emit('scrolltolower')
				}
			},
			//点击展示选项
			handleSelect() {
				if (this.disabled) return
				this.active = true
			},
			handleToggle() {
				if (this.disabled) return
				this.active = !this.active
			},
			//移除数据
			handleRemove(index) {
				if (index === null) {
					this.realValue = []
					this.changevalue = []
				} else {
					this.realValue.splice(index, 1)
					this.changevalue.splice(index, 1)
					this.$emit('del', index)
				}
				this.$emit('change', this.changevalue, this.realValue)
			},
			//点击组件列
			handleChange(item) {
				let arrIndex = this.realValue.indexOf(item[this.svalue])
				// console.log('arrIndex',arrIndex)
				if (arrIndex > -1) {
					this.changevalue.splice(arrIndex, 1)
					this.realValue.splice(arrIndex, 1)
					this.$emit('del', arrIndex)
				} else {
					this.changevalue.push(item)
					this.realValue.push(item[this.svalue])
					this.$emit('add', item[this.svalue])
				}
				// console.log(this.realValue, 'this.realValue')
				this.$emit('change', this.changevalue, this.realValue)
			},
			// 新增选项
			insureAdd() {
				try {
					if (this.isExist(this.newItemName)) {
						this.newItemName = ''
						throw new Error('新增项已存在!')
					}
					this.optionsLoc.unshift({ // 向数组头部添加元素
						[this.slabel]: this.newItemName,
						[this.svalue]: this.newItemName
					})
					this.newItemName = ''
				} catch (e) {
					console.log('Error!', e.message, this.newItemName)
				}
			},
			// 判断新增的选项在原来的options中是否已存在
			isExist(newitemName) {
				return this.optionsLoc.some(el => el[this.slabel] == newitemName)
			},
			// 判断展示框中是否包含这一项数据
			include(changevalue, item, property) {
				if (changevalue instanceof Array && changevalue.length > 0)
					return changevalue.findIndex(el => el[property] === item[property])
				return -1
			},
			onBlur(e) {
				this.searchKey = ''
			}
		}
	}
</script>
<style lang="scss">
@import "styles/zx-multiple-select";
</style>
