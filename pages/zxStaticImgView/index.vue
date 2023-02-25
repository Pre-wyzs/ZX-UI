<template>
	
<!-- 	<div>图片组件
		<zx-static-img :images="images"></zx-static-img>
	</div -->
	
	<view>
		<view class="" style="background: red;">
			<zx-static-img :images="images" rowSpace="0rpx" colSpace="8rpx"></zx-static-img>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images: [
					'http://frontend-dev.oss-cn-hangzhou.aliyuncs.com/projects/dendrobium-officinale/pest/pestControl/map1.png',
					'http://frontend-dev.oss-cn-hangzhou.aliyuncs.com/projects/dendrobium-officinale/pest/pestControl/map1.png',
					
				],
				photo: 'http://frontend-dev.oss-cn-hangzhou.aliyuncs.com/projects/dendrobium-officinale/pest/pestControl/map1.png'
			}
		}
	}
</script>

<style>
	.flex-row {
		display: flex;
		align-items: center;
	}
	
	.right {
		background: red;
/* 		width: 200rpx;
		height: 100rpx; */
	}
</style>