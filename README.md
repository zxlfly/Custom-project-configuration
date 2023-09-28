# 前端项目搭建流程

## 初始化

默认使用 vite`npm create vite@latest`  
默认选择 Vue + ts 开发  
后续可能考虑升级为 pnpm

## Vue 全家桶安装

### vur-router

## 开发代码规范配置

### [eslint](https://eslint.org/)、[prettier](https://prettier.io/docs/en/install.html)

除了安装 npm 包以外，还需要安装 vscode 对应的两个插件，这样开发的时候配合使用更
方便！

#### eslint配置
首先安装eslint  
`pnpm i eslint -D`
生成配置文件:.eslint.js  
`npx eslint --init`  
生成配置文件的一些选项，根据实际项目需求选择：  
√ How would you like to use ESLint? · problems    
√ What type of modules does your project use? · esm  
√ Which framework does your project use? · vue  
√ Does your project use TypeScript? · No / Yes  
√ Where does your code run? · browser  
√ What format do you want your config file to be in? · JavaScript  
The config that you've selected requires the following dependencies:  

eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest  
√ Would you like to install them now? · No / Yes  
√ Which package manager do you want to use? · pnpm  
```
module.exports = {
   //运行环境
    "env": { 
        "browser": true,//浏览器端
        "es2021": true,//es2021
    },
    //规则继承
    "extends": [ 
       //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档
       //比如:函数不能重名、对象不能出现重复key
        "eslint:recommended",
        //vue3语法规则
        "plugin:vue/vue3-essential",
        //ts语法规则
        "plugin:@typescript-eslint/recommended"
    ],
    //要为特定类型的文件指定处理器
    "overrides": [
    ],
    //指定解析器:解析器
    //Esprima 默认解析器
    //Babel-ESLint babel解析器
    //@typescript-eslint/parser ts解析器
    "parser": "@typescript-eslint/parser",
    //指定解析器选项
    "parserOptions": {
        "ecmaVersion": "latest",//校验ECMA最新版本
        "sourceType": "module"//设置为"script"（默认），或者"module"代码在ECMAScript模块中
    },
    //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
    //该eslint-plugin-前缀可以从插件名称被省略
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    //eslint规则
    "rules": {
    }
}
```
接着安装些vue3环境代码校验插件
`pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser`
- 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查  
    - "eslint-config-prettier" 
    - "eslint-plugin-import" 
    - "eslint-plugin-node"
- 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低  
    - "eslint-plugin-prettier"
- vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南  
    - "eslint-plugin-vue" 
- 该解析器允许使用Eslint校验所有babel code  
    - "@babel/eslint-parser" 

最终配置对象
```
// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /* 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /** 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint'],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/semi': 'off',

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
  },
}
```
添加.eslintignore忽略文件
```
dist
node_modules
```
添加运行脚本
```
"scripts": {
    "lint": "eslint src",
    "fix": "eslint src --fix",
}
```
#### prettier配置
安装
`pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier`
创建配置文件.prettierrc.json添加规则
```
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```
添加.prettierignore忽略文件
```
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```
#### 不适用prettier的配置方案

### [stylelint](https://stylelint.io/user-guide/get-started/)

用于检查 CSS 代码风格和错误的工具，也可以安装 vscode 插件配合使用

#### stylelint 初始化

`pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D`

#### 配置

添加.stylelintrc.cjs配置文件
```
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```
添加.stylelintignore忽略文件
```
/node_modules/*
/dist/*
/html/*
/public/*
```
添加运行脚本
```
"script":{
    "lint:css": "stylelint src/**/*.{vue,css,sass,scss} --cache --fix"
}
```
### [husky](https://typicode.github.io/husky/#/?id=manual)

提交或推送时，可以使用它来整理提交消息、运行测试、lint 代码等。Husky 支持所有
Git 钩子。

#### husky 初始化

-   `npm install husky -D`
    -   安装
-   `npx husky install`
    -   初始化
-   `npm pkg set scripts.prepare="husky install"`
    -   修改`package.json`
-   使用pnpm
    -   `pnpm install -D husky`
    -   `npx husky install`
    -   `pnpm pkg set scripts.prepare="husky install"`
#### 添加 hook

-   commit-msg
-   pre-commit
-   pre-push
-   如果将 husky 安装在另一个目录中，需要自定义目录可以手动添加，也可以使
    用`npx husky add .husky/pre-commit "npm test"`

### [commitlint](https://commitlint.js.org/#/)

提交约定

#### commitlint 初始化

`npm install -D @commitlint/cli @commitlint/config-conventional`  
`pnpm install -D @commitlint/cli @commitlint/config-conventional`  

#### 配置

需要配合 husky 使用，在 commit-msg 中配置
`echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`  
**需要注意的是如果 package.json 中设置"type": "module"，那么需要将后缀改为 cjs**
一般项目中，我们会自定义规则。在 commitlint.config.js 文件中配置

-   feat: 一项新功能
-   fix: 一个错误修复
-   docs: 仅文档更改
-   style: 不影响代码含义的更改（空白，格式，缺少分号等）
-   refactor: 既不修正错误也不增加功能的代码更改（重构）
-   perf: 改进性能的代码更改
-   test: 添加缺失或更正现有测试
-   build: 影响构建系统或外部依赖项的更改（gulp，npm 等）
-   ci: 对 CI 配置文件和脚本的更改
-   release：发布
-   chore: 更改构建过程或辅助工具和库，例如文档生成
-   revert: 回滚到上一个版本

```
const types = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'release', 'chore', 'revert'];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', types],
    'scope-case': [0, 'always'],
    'subject-empty': [2, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [2, 'always', 88],
  },
};
```

### [lint-staged](https://github.com/okonet/lint-staged)

针对暂存的 git 文件运行 linters，不要让 💩 进入你的代码库！
最后在husky的commit-msg钩子中添加`npx --no -- commitlint --edit $1`即可，也可以在scripts中增加commitlint的命令，这里使用`pnpm run commitlint`
#### lint-staged 初始化

`npm install --save-dev lint-staged`

#### 配置

```
// 需要配合husky使用，在pre-commit中配置

```

npx husky add .husky/pre-commit "npx lint-staged"

```
// package.json中添加配置
"lint-staged": {
  "src/**/{*.vue,*.js,*.ts,*.jsx,*.tsx}": "eslint --fix",
  "src/**/{*.scss,*.css}": "stylelint --fix"
}
```
### 关于限制使用包管理工具
如果需要可以限制项目的包管理工具，以pnpm为例  
在根目录创建scritps/preinstall.js文件
```
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
    ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
```
配置文件中scripts中添加声明周期命令  
当我们使用npm或者yarn来安装包的时候，就会报错了  
install的时候会触发preinstall（npm提供的生命周期钩子）  
```
"scripts": {
    "preinstall": "node ./scripts/preinstall.js"
}
```

### [环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html#modes)

一般常用的有三种

-   开发环境 dev
-   测试使用 预发环境，pre
    -   staging
-   生产环境，pro
    -   production

```
在package.json文件里面写上对应的脚本

"build:pre": "vue-tsc --noEmit && vite build --mode staging",
"build:pro": "vue-tsc --noEmit && vite build --mode production"

新建文件
.env
.env.development
.env.staging
.env.production

项目配置的内容
文件内容 VITE_BASE_URL = 'http://xxx-pre.xxx.com/api'
```

#### 开发工具 vscode 配置文件 settings.json

这个文件配置也可以抽离出来统一配置，根据实际情况选择，主要是针对于
eslint、stylelint、prettier 这些配置的统一

## 注意

需要注意规则冲突问题，例如 indent、@typescript-eslint/indent 和 vue/script-indent 之间的冲突，可能导致缩进反复横跳。  
还有就是如果安装了 vscode 的 vue 的官方插件，也可能存在冲突问题。  
可以选择使用不使用 prettier
