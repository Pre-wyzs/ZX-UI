<template>
	

	<!-- TODO: 弹窗式日期时间选择器组件开发中... 2023/04/08 -->
	
	<picker mode="date" :value="item.value" :start="`2000-1`" :end="`2099-12`"
	     @change="e => item.value = e.detail.value" fields="month">
	     <view style="padding: 10px 0px 10px 5px;background-color: #fff;width: 448rpx;">
	      <!-- <uni-easyinput v-model="item.value" placeholder="请选择"></uni-easyinput> -->
	      <view class="global__input-box flex align-center fs-12 justify-between ">
	       <text v-if="!!!item.value" style="color: #999;">请选择</text> <!--这是默认的pleaceholder-->
	       <text v-else>{{item.value}}</text> 
	       <view class="icon" @click.stop="clearHandler(item)" v-if="!!item.value">
	        <uni-icons type="clear" color="#c0c4cc" size="24"></uni-icons>
	       </view>
	       
	      </view>
	     </view>
	    </picker>
			
			
</template>

<script>
	
	
</script>

<style>
</style>