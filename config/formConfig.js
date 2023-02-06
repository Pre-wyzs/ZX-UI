// const formItems = [
// 	`上报人`,`联系电话`,`所属乡镇`,
// 	`定点地址`,`处理状态`,`病害类型`,
// 	`病害类型图鉴选择`,`危害面积`,`反馈照片`,
// 	`反馈详情`,`病害分布情况`,`环境类型（多选）`
// ]


// 该键值对的作用是对应项目名和项目的结构
export const formConfig = [
	{
		title: '监测对象',
		key: '',
		value: 0,
		type: 'TEXT',
		prop: 'monitorObject', //后端的对应的键名
		dics: [
			{
				text: '柑橘黄龙病（9-12个月，一个月调查一次）',
				value: 0
			},
			{
				text: '柑橘木虱（3-11月，一个月调查一次）',
				value: 1
			},
			{
				text: '柑橘溃疡病（9-10月，一个月调查一次）',
				value: 2
			},
			{
				text: '黄瓜绿斑驳花叶病毒（3-10月，一个月调查一次）',
				value: 3
			},
			{
				text: '葡萄根瘤蚜（4-10月，一个月调查一次）',
				value: 4
			},
			{
				text: '瓜类果斑病（3-10月，一个月调查一次）',
				value: 5
			},
			{
				text: '番薯茎腐病（甘薯生长期内，一个月调查一次）',
				value: 6
			},
			{
				text: '梨树疫病（3-6月，半个月调查一次）',
				value: 7
			}
		]
	},
	{
		title: '调查时间',
		key: '',
		type: 'DATETIME',
		prop: 'researchTime', //后端的对应的键名
	},
	{
		title: '天气',
		key: '',
		value: '',
		type: 'SELECT',
		prop: 'weather', //后端的对应的键名
		dics: [
			// {
			// 	text: '多云',
			// 	value: 0
			// },
			// {
			// 	text: '晴',
			// 	value: 1
			// },
			// {
			// 	text: '雨',
			// 	value: 2
			// },
		]
	},
	{
		title: '地址位置',
		key: '',
		value: '',
		type: 'POSITION',
		prop: 'coord', //后端的对应的键名
	},
	{
		title: '调查面积（亩）',
		key: '',
		value: '',
		type: 'INPUT',
		prop: 'researchArea', //后端的对应的键名
	},
	{
		title: '发病面积（亩）',
		key: '',
		value: '',
		type: 'INPUT',
		prop: 'attackArea', //后端的对应的键名
		children: [
			{
				title: '7897',
				key: '',
				value: '',
				type: 'INPUT',
				children: [
					{
						title: '你好急',
						key: '',
						value: [],
						type: 'IMAGE',
						prop: 'scenePhoto', //后端的对应的键名
					},
					{
						title: '冲冲冲',
						key: '',
						value: [],
						type: 'IMAGE',
						prop: 'scenePhoto', //后端的对应的键名
					},
					{
						title: '古今',
						key: '',
						value: [],
						type: 'IMAGE',
						prop: 'scenePhoto', //后端的对应的键名
					},
					
				],
				prop: 'attackCount', //后端的对应的键名
			},
			{
				title: 'fdsfdsf',
				key: '',
				value: [],
				type: 'IMAGE',
				prop: 'scenePhoto', //后端的对应的键名
			},
		]
	},
	{
		title: '发病株数（株）',
		key: '',
		value: '',
		type: 'INPUT',
		prop: 'attackCount', //后端的对应的键名
	},
	{
		title: '现场调查照片',
		key: '',
		value: [],
		type: 'IMAGE',
		prop: 'scenePhoto', //后端的对应的键名
	},
	{
		title: '有无处置',
		key: '',
		value: 0,
		type: 'RADIO',
		prop: 'isHandle', //后端的对应的键名
		dics: [{
				text: '是',
				value: 0
			},
			{
				text: '否',
				value: 1
			},
		]
	},
	{
		title: '处置情况',
		key: '',
		value: '',
		type: 'INPUT',
		prop: 'handleDetail', //后端的对应的键名
	},
	{
		title: '现场处置照片',
		key: '',
		value: [],
		type: 'IMAGE',
		prop: 'handlePhoto', //后端的对应的键名
	},
	{
		title: '是否送检',
		key: '',
		value: 0,
		type: 'RADIO',
		prop: 'isDetection', //后端的对应的键名
		dics: [{
				text: '是',
				value: 0
			},
			{
				text: '否',
				value: 1
			},
		]
	},
	{
		title: '填报人联系方式',
		key: '',
		value: '',
		type: 'INPUT',
		prop: 'phone', //后端的对应的键名
	},
	{
		title: '填报人签名',
		key: '',
		value: '',
		type: 'INPUT',
		prop: 'informer', //后端的对应的键名
	}
]


// 深拷贝内容
export function deepCopy(obj, appeard = new Map()) {
	if (!(obj instanceof Object)) return obj; // 如果是原始数据类型
	if (appeard.has(obj)) return appeard.get(obj); // 如果已经出现过
	const result = Array.isArray(obj) ? [] : {};
	appeard.set(obj, result); // 将新对象放入map
	// 遍历所有属性进行递归拷贝
	[...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)]
	.forEach(key => {
		result[key] = deepCopy(obj[key], appeard);
	});
	return result;
}
