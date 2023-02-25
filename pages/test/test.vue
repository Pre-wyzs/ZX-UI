<template>
	<view>
<!-- 		<image src="https://tip-base-dev-file.netmi.com.cn/temp///IMG20230128202059_20230207095606054.jpg" mode=""
		@click="imagePreview"
		></image> -->
		<view class="" v-for="([key,val],i) in arrData" :key="i">
			{{`${key}-${val}-${i}`}}
		</view>
	</view>
</template>
<script>
	export default {
		name: 'test',
		data() {
			return {
				mapData: null,
				obj: null,
				arrData: ['许洁','洛天依','章子唯']
			}
		},
		created() {
			this.mapData = new Map()
			this.mapData.set('a',1)
			this.mapData.set('b',2)
			this.mapData.set('c',3)
			this.mapData.set('d',4)
			
			this.obj = {
				a: 2,
				b: 4,
				c: 6,
				d: 8,
				e: 10
			}
		},
		methods: {
			imagePreview() {
						// 预览图片
						const urls = [
							`https://tip-base-dev-file.netmi.com.cn/temp///IMG20230128202059_20230207095606054.jpg`,
							`https://tip-base-dev-file.netmi.com.cn/temp///pestDisaster2_20230203102856607.jpeg`,
							`https://tip-base-dev-file.netmi.com.cn/temp///pestDisaster1_20230203102853546.jpg`
						]
						
						
						uni.previewImage({
							urls,
							longPressActions: {
								itemList: ['发送给朋友', '保存图片', '收藏'],
								success: function(data) {
									console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
								},
								fail: function(err) {
									console.log(err.errMsg);
								}
							},
							indicator: 'number',
							loop: true,
						});
			}
		}
	}
	
</script>