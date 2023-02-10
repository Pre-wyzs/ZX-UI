<template>
	<view class="container">
		<view class="form">
			<view class="form-item ">
				<view class="title fs-16 fw-400" style="color: rgba(45, 46, 50, 1);">服务描述</view>
				<view>
					<input class="input" name="input" placeholder="请输入" v-model="insureForm.serviceDetail" />
				</view>
			</view>
			<view class="form-item ">
				<view class="title fs-16 fw-400" style="color: rgba(45, 46, 50, 1);">发布人</view>
				<view>
					<input class="input" name="input" placeholder="请输入" v-model="name" disabled/>
				</view>
			</view>
			<view class="form-item ">
				<view class="title fs-16 fw-400" style="color: rgba(45, 46, 50, 1);">联系方式</view>
				<view>
					<input class="input" name="input" placeholder="请输入" v-model="insureForm.phone" />
				</view>
			</view>
			<view class="form-item " :style="cDropdownItem1.name == `预设`? { borderBottom: 'none'}: {}">
				<view class="title fs-16 fw-400" style="color: rgba(45, 46, 50, 1);">价格</view>
				<view>
					<!-- 封装的下拉列表组件 -->
					<drop-down-normal 
						:select.sync="cDropdownItem1"
						:list="dropdownList1" :zindex="2"
					></drop-down-normal>
					
				</view>
			</view>
			<!-- hidden form-item -->
			<view class="form-item flex justify-between"  v-if="cDropdownItem1.name == `预设`" 
						style="align-items: flex-start;"
			>
				<view style="width: 1px;"></view>
				<view style="width: 470rpx;" class="flex align-center">
					<input class="input" name="input" placeholder="请输入" v-model="insureForm.price" style="width: 58%;"/>
					<view class="fs-16 fw-400 pr-8 pl-8" style="color: rgba(45, 46, 50, 1);">
						元/
					</view>
					<view class="unit" style="width: 16rpx;">
						<drop-down-normal
							:select.sync="cDropdownItem2"
							:list="dropdownList2"
							:subWidth="`100%`"
							:boxWidth="`120rpx`"
							:zindex="1"
						></drop-down-normal>
					</view>
				</view>
				
			</view>
			
			<view class="" style="height: 204rpx;margin-bottom: 80rpx;">
				<view class="title fs-16 fw-400" style="padding-top: 30rpx;color: rgba(45, 46, 50, 1);">
					农机图片上传
				</view>
				<view style="margin-top:20rpx;">
					<nm-img-upload :limit="3" @change="imgs => insureForm.imgUrlList
					 = imgs" :value="insureForm.imgUrlList" :defaultIcon="iconPath"></nm-img-upload>
				</view>
			</view>

		</view>
		<view class="form-item-1">
			<view class="floor-1">
				<view class="form-item ">
					<view class="title fs-16 fw-400" style="color: rgba(45, 46, 50, 1);">设备位置</view>
					<view @click="changeAddress">
						<input class="input" name="input" placeholder="位置信息" v-model="insureForm.workPosition" />
<!-- 						<view class="input" style="overflow-x:scroll;">
							{{insureForm.workPositionComputed}}
						</view> -->
					</view>
				</view>
			</view>
			<view class="floor-2"></view>
		</view>

		<view class="form-item-1 pb-20">
			<view class="title pt-16 mb-18">
				备注
			</view>
			<view class="remarks">
				<textarea v-model="insureForm.remarks" placeholder="请输入设备详细信息" class="pt-10 pl-10"
					style="width: 100%;height: 236rpx;" />
			</view>

		</view>
		
		
		
		<!-- 垫片 -->
		<view class="" style="height: 220rpx;">
			
		</view>

		<view class="release flex justify-center">
			<view class="release-btn mt-24" @click="submitService">
				发布
			</view>
		</view>


	</view>
</template>

<script>
	//图片上传组件默认图片
	const iconPath = 'https://frontend-dev.oss-cn-hangzhou.aliyuncs.com/projects/dendrobium-officinale/deafult_upload.png'
	const dropdownList1 = [
		{
			name: '面议',
			value: 0
		},{
			name: '预设',
			value: 1
		}
	]

	const dropdownList2 = [
		// {
		// 	name: '次',
		// 	value: 0
		// },
		{
			name: '天',
			value: 1
		}
	]
	import apis from '@/api/interfaces.js'
	import {publicShared} from '../minePages/mixin.js'
	export default {
		data() {
			return {
				hookForceLogin: false,
				dropdownList1,
				dropdownList2,
				// 价格下拉列表
				cDropdownItem1: {},
				//单位下拉列表
				cDropdownItem2: {},
				insureForm: {
					id: '', //登录用户唯一标识
					longitude: 0,
					dimension: 0,
					remarks: '',
					imgUrlList: [],
					workPosition: '',
					serviceDetail: '',
					releaseId: '',
					phone: '',
					price: '', // 预设价格
				},
				name: '',
				iconPath,

			}
		},
		onLoad() {

		},
		onReady() {
			const userInfo = uni.getStorageSync('userInfo')
			this.insureForm.releaseId = userInfo.id;
			this.name = userInfo.username;
			this.insureForm.phone = userInfo.phone;
		},
		mixins: [publicShared],
		computed: {
		},
		methods: {
			// 选择地图地址
			changeAddress() {
				// console.log("999");
				let self = this;
				uni.chooseLocation({
					success(res) {
						// console.log(res);
						self.insureForm.longitude = res.longitude;
						self.insureForm.dimension = res.latitude;
						self.insureForm.workPosition = res.address;
					},
				});
			},
			// 发布服务
			async submitService() {
				if(this.checkForm()) {
					const res = await this.$http.post(apis.postFarmMachineService,this.insureForm)
					if (res.success) {
						// this.goToAndRefreshPage('refreshData','发布成功', '/pages/minePages/serviceHistory')
						this.goRedirectAndRefreshPage('refreshData','发布成功', '/pages/minePages/serviceHistory')
					}
				}
			},
			checkForm() {
				if (this.insureForm.serviceDetail == '') {
					this.$toast.showError('描述为空')
					return false;
				}
				if (this.insureForm.price=='' && this.cDropdownItem1.value == 1) {
					this.$toast.showError('价格为空')
					return false;
				}
				if (this.insureForm.imgUrlList.length == 0) {
					this.$toast.showError('图片为空')
					return false;
				}
				if (this.insureForm.workPosition == '') {
					this.$toast.showError('位置为空')
					return false;
				}
				if (this.insureForm.remarks == '') {
					this.$toast.showError('备注为空')
					return false;
				}
				return true;
			},
			jumpTo(url) {
				// uni.navigateTo({
				// 	url: url
				// })
				uni.redirectTo({
					url: url
				});
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0rpx 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		background: #fff;
		heihgt: 100vh;
		overflow-y: scroll;

		.form-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			min-height: 108rpx;
			border-bottom: 0.5px solid rgba(226, 227, 230, 1);

			.input,
			.dropdown {
				box-sizing: border-box;
				width: 470rpx;
				height: 64rpx;
				border-radius: 10rpx;
				border: 1px solid rgba(194, 194, 196, 1);
				padding-left: 24rpx;
				position: relative;
				&-list {
					padding: 10rpx 0rpx;
					position: absolute;
					width: 40%;
					top: 100%;
					left: 0rpx;
					box-shadow: 3px 3px 10px 0px rgba(0,0,0,.3);
					z-index: 1;
					background: #fff;
					
					view {
						padding: 6rpx 20rpx;
					}
				}
				
			}
			


		}

		.form-item-1 {
			.remarks {
				overflow: hidden;
				width: 100%;
				height: 236rpx;
				border-radius: 10rpx;
				border: 1px solid rgba(194, 194, 196, 1);
			}

			textarea {
				box-sizing: border-box;
			}
		}


		.release {
			background: #fff;
			position: fixed;
			width: 100%;
			height: 220rpx;
			bottom: 0;
			left: 0;

			&-btn {
				width: 686rpx;
				height: 88rpx;
				background: linear-gradient(97deg, #50ADFF 0%, #0084FF 100%);
				border-radius: 44rpx;
				line-height: 88rpx;
				text-align: center;
				font-size: 18px;
				font-family: AlibabaPuHuiTiR;
				color: #FFFFFF;
			}
		}
	}
	
</style>
