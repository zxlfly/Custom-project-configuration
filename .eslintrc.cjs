module.exports = {
	root: true,
	// eslint 会对我们的代码进行检验
	// parser的作用是将我们写的代码转换为ESTree（AST）
	// ESLint会对ESTree进行校验
	parser: 'vue-eslint-parser',
	// 解析器的配置项
	parserOptions: {
		// es的版本号，或者年份都可以
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		// 源码类型 默认是script，es模块用module
		sourceType: 'module',
		// 额外的语言类型
		ecmaFeatures: {
			tsx: true,
			jsx: true,
		},
	},
	// 环境:
	env: {
		// 浏览器
		browser: true,
		// 最新es语法
		es2021: true,
		// node环境
		node: true,
	},
	// 插件
	// 前缀 eslint-plugin-, 可省略
	// vue官方提供了一个ESLint插件 eslint-plugin-vue，它提供了parser和rules
	// parser为 vue-eslint-parser，放在上面的parsr字段，rules放在extends字段里，选择合适的规则
	plugins: ['vue', '@typescript-eslint'],
	// 扩展的eslint规范语法，可以被继承的规则
	// 字符串数组：每个配置继承它前面的配置
	// 分别是：
	// eslint-plugin-vue提供的
	// eslint-config-airbnb-base提供的
	// eslint-config-prettier提供的
	// 前缀 eslint-config-, 可省略
	extends: [
		'plugin:@typescript-eslint/recommended',
		// 'plugin:vue/vue3-strongly-recommended',
		// 'airbnb-base',
		'plugin:vue/vue3-recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier',
	],
	// 全局自定义的宏，这样在源文件中使用全局变量就不会报错或者警告
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefault: 'readonly',
	},

	settings: {
		// 设置项目内的别名
		'import/reslover': {
			alias: {
				map: [['@', 'src']],
				extensions: ['.js', '.ts', '.vue', '.json'],
			},
		},
		// 允许的扩展名
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
	},
	// 自定义规则，覆盖上面extends继承的第三方库的规则，根据组内成员灵活定义
	rules: {
		semi: 'off',
		'import/no-extraneous-dependencies': 0,
		'no-param-reassing': 0,
		'vue/multi-word-commponent-names': 0,
		'vue/attribute-hyphenation': 0,
		'vue/v-on-event-hyphenation': 0,

		'vue/require-prop-types': 'error',
		'vue/prop-name-casing': ['error', 'camelCase'],
		'vue/one-component-per-file': 'error',
		'vue/custom-event-name-casing': ['error', 'camelCase'],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: {
					max: 1,
				},
				multiline: {
					max: 1,
				},
			},
		],
		'vue/multiline-html-element-content-newline': [
			'error',
			{
				ignoreWhenEmpty: true,
				ignores: ['pre', 'textarea'],
				allowEmptyLines: false,
			},
		],
		'vue/padding-line-between-tags': ['error', [{ blankLine: 'always', prev: '*', next: '*' }]],
		'no-multiple-empty-lines': 'error',
		'no-shadow': 'off',
		'no-trailing-spaces': 'error',
		'no-unused-labels': 'error',
		'no-use-before-define': 'off',
		'no-var': 'error',
		'prefer-const': 'error',
		'space-in-parens': ['error', 'never'],
		'spaced-comment': ['error', 'always'],
		'@typescript-eslint/dot-notation': 'off',
		'@typescript-eslint/indent': 'off',
		indent: 'off',
		// indent: ['error', 'tab'],
		// '@typescript-eslint/indent': [
		// 	'error',
		// 	'tab',
		// 	{
		// 		FunctionDeclaration: { parameters: 'first' },
		// 		FunctionExpression: { parameters: 'first' },
		// 	},
		// ],
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-non-null-assertion': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/type-annotation-spacing': 'error',
		'@typescript-eslint/unified-signatures': 'error',
		'@typescript-eslint/no-shadow': 'error',
		'prefer-promise-reject-errors': 'off',
		'max-nested-callbacks': ['error', 6],
		'@typescript-eslint/no-this-alias': 'off',
		'accessor-pairs': 'off',
		'@typescript-eslint/member-ordering': 'off',
		'array-callback-return': 'off',
		// 定义为使用的
		'no-unused-vars': 'off',
		// 引入
		// 'import/extensions': ['error', 'always', { ignorePackages: false }],
		'vue/multi-word-component-names': 'off',
		'import/extensions': 'off',
		'vue/script-indent': 'off',
		// 'vue/script-indent': ['error', 4, { baseIndent: 1 }],
		// TOD
		'no-useless-constructor': 'off',
		'no-useless-concat': 'off',
		'max-params': 'off',
		'@typescript-eslint/no-useless-constructor': 'off',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		complexity: [
			'error',
			{
				max: 40,
			},
		],
		curly: 'error',
		'eol-last': 'error',
		eqeqeq: ['error', 'smart'],
		'max-len': ['warn', { code: 140 }],
		'no-console': [
			'error',
			{
				allow: [
					'log',
					'warn',
					'dir',
					'timeLog',
					'assert',
					'clear',
					'count',
					'countReset',
					'group',
					'groupEnd',
					'table',
					'dirxml',
					'error',
					'groupCollapsed',
					'Console',
					'profile',
					'profileEnd',
					'timeStamp',
					'context',
				],
			},
		],
		'@typescript-eslint/member-delimiter-style': [
			'off',
			{
				multiline: {
					delimiter: 'semi',
					requireLast: false,
				},
				singleline: {
					delimiter: 'semi',
					requireLast: false,
				},
			},
		],
		'@typescript-eslint/semi': ['error', 'never'],
		'max-depth': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
	overrides: [
		{
			files: ['*.vue'],
			rules: {
				indent: 'off',
			},
		},
	],
	settings: {
		'import/resolver': {
			alias: {
				map: [['@', './src']],
				extensions: ['.js', '.ts', '.vue', '.json'],
			},
		},
	},
}
