<template>
	<view class="content" @click="handleClick">
			<view class="item">示例：</view>

			<zx-multiple-select placeholder="请选择项目" 
				:options.sync="options" 
				:datalist.sync="datalist" 
				@change="change" 
				:showClearIcon="true"
				
				ref="selectCyRef"
			></zx-multiple-select>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//字典列表
				options: [{
					label: 'label1',
					value: '可靠么1'
				},
				{
					label: 'label2',
					value: '可靠么2'
				},
				{
					label: 'label3',
					value: '可靠么3'
				},
				{
					label: 'label4',
					value: '可靠么4'
				},
				{
					label: 'label5',
					value: '可靠么5'
				},
				{
					label: 'label6',
					value: '可靠么6'
				},
				{
					label: 'label7',
					value: '可靠么7'
				},
				{
					label: 'label8',
					value: '可靠么8'
				},
				{
					label: 'label9',
					value: '可靠么9'
				},],
				//双向绑定数据,
				datalist: [{
					label: 'label1',
					value: '可靠么1'
				},
				{
					label: 'label2',
					value: '可靠么2'
				}]
			};
		},
		// onReady() {
		// 	this.options = [{
		// 			label: 'label1',
		// 			value: '可靠么1'
		// 		},
		// 		{
		// 			label: 'label2',
		// 			value: '可靠么2'
		// 		},
		// 		{
		// 			label: 'label3',
		// 			value: '可靠么3'
		// 		},
		// 		{
		// 			label: 'label4',
		// 			value: '可靠么4'
		// 		},
		// 		{
		// 			label: 'label5',
		// 			value: '可靠么5'
		// 		},
		// 		{
		// 			label: 'label6',
		// 			value: '可靠么6'
		// 		},
		// 		{
		// 			label: 'label7',
		// 			value: '可靠么7'
		// 		},
		// 		{
		// 			label: 'label8',
		// 			value: '可靠么8'
		// 		},
		// 		{
		// 			label: 'label9',
		// 			value: '可靠么9'
		// 		},
				
		// 	];
		// },
		methods: {
			handleClick(){
				this.$refs.selectCyRef.close()
			},
			formSubmit(e) {
				console.log(this.tval, '提交参数');
			},
			change(item, value) {
                //datalist已经实现双向绑定了，请不要在这个回调中尝试去改变this.datalist!
			},
			scrolltolower(){
				console.log('触发分页~这里改变传入的value')
				this.options.push(...[{
					label: 'label10',
					value: '可靠么10'
				},{
					label: 'label11',
					value: '可靠么11'
				},{
					label: 'label12',
					value: '可靠么12'
				}])
			}
		}
	};
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.content {
		width: 100%;
		height: 100%;
		padding: 20px 16px;
		box-sizing: border-box;
		margin: 0 auto;

		.item {
			margin-bottom: 10px;
		}

		.btn {
			margin-top: 20px;
		}
	}
</style>
