<!-- 加载多个静态图片的组件 -->
<template>
	<view class="zx-static-img" :style="containerStyles">
		<template v-if="!isEmptyImg">
			<view class="zx-static-img__container"
				:style="{'margin-right': colSpace,'margin-bottom': rowSpace,width:imageStyle.width,height:imageStyle.height,}"
				v-for="(item,index) in imageList" :key="index" @click.stop="imgZoom(item)">
				<view class="zx-static-img__container-onload" v-if="!item.loaded" :style="{
					width:imageStyle.width,
					height:imageStyle.height,
					'border-radius':imageStyle['border-radius'],
					'line-height':imageStyle.height}">
					<uni-icons type="spinner-cycle" size="30" color="rgba(255,255,255,1)"
						class="zx-static-img__container-onload-spinner">
					</uni-icons>
				</view>
				<view class="zx-static-img__container-error" v-if="item.error" :style="{
					width:imageStyle.width,
					height:imageStyle.height,
					'border-radius':imageStyle['border-radius'],
					'line-height':imageStyle.height}">
					加载失败...
				</view>
				<image :src="item.src"
					:style="{width:imageStyle.width,height:imageStyle.height,'border-radius':imageStyle['border-radius']}"
					@load="load(item)" @error="error(item)"></image>
			</view>
		</template>
		<!-- 传入的图片为空的时候 -->
		<template v-else>
			<view class="zx-static-img__container" :style="{width:imageStyle.width,height:imageStyle.height}">
				<view class="zx-static-img__container-empty"
					:style="{width:imageStyle.width,height:imageStyle.height,'border-radius':imageStyle['border-radius'],'line-height':imageStyle.height}">
					<uni-icons type="image" size="30" color="rgba(255,255,255,1)">
					</uni-icons>
				</view>
			</view>
		</template>
	</view>
</template>
<script>
	export default {
		name: 'zxStaticImg',
		props: {
			images: {
				// type: [Array, String], // 类型可以传Array, String, 这个有个问题就是null和undefined传了会报错的
				default: () => [], // 示例['https://...img1.png','https://...img2.png']
				required: true,
				validator: function(value) { // 类型校验
					// 可以传undefined 或 null 或 字符串 或 Array
					return value == undefined || typeof value == 'string' || value instanceof Array
				}
			},
			// 容器的样式
			containerStyles: {
				type: Object,
				default: () => ({})
			},
			// 行间距
			rowSpace: {
				type: String,
				default:`0rpx`
			},
			// 列间距
			colSpace: {
				type: String,
				default: `0rpx`
			},
			// imageStyle
			imageStyle: {
				type: Object,
				default: () => ({
					width: `200rpx`,
					height: `200rpx`,
					'border-radius': `5px`
				})
			}
		},
		data() {
			return {
				imageList: []
			}
		},
		computed: {
			// 校验图片是否为空
			isEmptyImg() {
				return this.images == undefined ||
					(this.images instanceof Array && this.images.length == 0) ||
					new RegExp('^\\s*$').test(this.images)
			}
		},
		watch: {
			'images': {
				handler(val) {
					if (!this.isEmptyImg)
						this.imageList = this.imageListFunc() // 不是空的图片才有加载的意义，不然没有必要加载的
				},
				immediate: true // 在created钩子函数之前就执行了
			},
			'imageStyle': {
				handler(val) {
					if (val.width.includes('%'))
						this.containerStyles.width = val.width
					if (val.height.includes('%'))
						this.containerStyles.height = val.height
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			imgZoom(item) {
				uni.previewImage({
					current: item.src,
					urls: this.imageList.map(el => el.src),
					indicator: 'number', // 这两个属性只在app_plus平台下有用
					loop: true
				})
			},
			imageListFunc() { // 优美的代码
				let images = this.images
				// 这个组件对于加载base64的图片是问题的，这个还需要解决
				if (typeof this.images === 'string')
					images = this.images.split(',') // 覆盖操作

				// if (typeof this.images === 'string' && !this.images.includes('data:img/'))
				// 	images = this.images.split(',')

				return images.map(el => ({
					src: el,
					loaded: false,
					error: false
				}))
			},
			// 模拟延迟加载
			load(item) {
				item.loaded = true
			},
			error(item) {
				item.error = true
			}
		}
	}
</script>

<style lang="scss">
	@import "styles/zx-static-img";

	image {
		vertical-align: middle;
	}
</style>
