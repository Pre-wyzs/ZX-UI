<template>

	<!-- 自定义的分页组件，主要用来解决之前不能进行下拉刷新的问题 -->
	<scroll-view scroll-y="true" :style="styles" refresher-enabled :refresher-triggered="triggered"
		@refresherrefresh="onRefresh()" @scrolltolower="loadMore()" :refresher-background="pulldownBackground">
		<!-- 中间内容 -->
		<slot name="items" :dataList="dataList"></slot>
		<view v-if="dataList[0] && loadStatus == 'noMore'" class="bg-gray">
			<nm-load-more :status="loadStatus" :contentText="{contentnomore:'没有更多了'}"></nm-load-more>
		</view>
		<view class="flex-col-center mt-100" v-if="!dataList[0] && loadStatus != 'loading'">
			<slot name="empty">
				<image src="https://frontend-dev.oss-cn-hangzhou.aliyuncs.com/modules/mall/common/ic-mall-empty.png"
					style="width: 152rpx; height: 128rpx;"></image>
				<text class="pt-16" style="color: #999;"><slot>暂无商品</slot></text>
			</slot>
		</view>
	</scroll-view>

</template>

<script>
	export default {
		props: {
			// 请求的get接口
			dataInterface: {
				type: String,
				default: '',
				required: true
			},
			// scroll样式，主要是用来设置高度的
			styles: {
				type: Object,
				default: {
					heigth: `100vh`
				},
				required: false
			},
			// 请求参数
			params: {
				type: Object,
				default: () => {
					return {
						pageNo:1,
						pageSize:10
					}
				},
				required: true
			},
			// 下拉背景色
			pulldownBackground: {
				type: String,
				default: `#F6F7F8`,
			}
		},
		data() {
			return {
				dataList: [], //数据列表
				triggered: false, // 下拉刷新
				loadStatus: 'loading'
			}
		},
		// onLoad() {  //在引用该组件时候，可以获取该组件实例，然后调用loadData方法完成数据的初始化
		// 	// 这里的请求参数可以根据过滤条件进行自定义
		// 	this.queryParams = {
		// 		pageNo: 1,
		// 		pageSize: 10,
		// 	}
		// 	console.log('内部钩子已经执行');
		// 	this.loadData()
		// },
		created() {
			this.loadData()
		},
		computed: {
			queryParams: {
				get() {
					return this.params
				},
				set(newValue) {
					this.$emit('update:params', newValue)
				}
			}
		},
		methods: {
			loadData() {
				this.$http.get(this.dataInterface, this.queryParams)
					.then(res => {
						if (this.queryParams.pageNo == 1) {
							this.dataList = res.result.records
						} else {
							this.dataList = this.dataList.concat(res.result.records)
						}

						if (res.result.pages <= this.queryParams.pageNo) {
							this.loadStatus = 'noMore'
						} else {
							this.loadStatus = 'more'
						}
						this.triggered = false
					})
			},
			onRefresh(isTreggered = true) {
				if (isTreggered) {  //默认触发，可以填入false让下拉刷新不触发
					this.triggered = true
				}
				
				this.queryParams.pageNo = 1
				this.loadData()
			},
			loadMore() {
				if (this.loadStatus == 'noMore') {
					return
				}
				this.queryParams.pageNo++
				this.loadData()
			},
		}
	}
</script>
<style></style>
