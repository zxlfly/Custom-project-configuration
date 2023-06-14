# 前端项目搭建流程

## 初始化

默认使用 vite`npm create vite@latest`  
默认选择 Vue + ts 开发  
后续可能考虑升级为 pnpm

## Vue 全家桶安装

### vur-router

###

## 开发代码规范配置

### [eslint](https://eslint.org/)、[prettier](https://prettier.io/docs/en/install.html)

除了安装 npm 包以外，还需要安装 vscode 对应的两个插件，这样开发的时候配合使用更
方便！

#### 初始化

`npm i eslint eslint-plugin-vue eslint-config-prettier prettier eslint-plugin-import eslint-plugin-prettier eslint-config-airbnb-base -D`

-   eslint: ESLint 的核心库
-   prettier: prettier 格式化代码的核心库
-   eslint-config-airbnb-base airbnb 的代码规范（依赖 plugin-import）
-   eslint-config-prettier eslint 结合 prettier 的格式化
-   eslint-plugin-vue eslint 在 vue 里的代码规范
-   eslint-plugin-import 项目里面支持 eslint
-   eslint-plugin-prettier 将 prettier 结合进去 eslint 的插件

#### 配置

```
// package.json中添加配置
"script":{
  "lint:create":"eslint --init",
  "lint": "eslint \"src/**/*.{js,vue,ts}\" --fix"
}
```

执行`npm run lint:create`会自动创建一个.eslintrc.cjs 文件;安装完成后，后面的启动
项目还缺少一些依赖，提前按需安装好  
`npm i typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-alias @types/eslint @types/node -D`

```
You can also run this command directly using 'npm init @eslint/config'.
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser, node
√ What format do you want your config file to be in? · JavaScript
The config that you've selected requires the following dependencies:

eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
```

-   @typescript-eslint/parser eslint 解析器，解析 typescript，检查规范
    typescript 代码
-   @typescript-eslint/eslint-plugin eslint 插件，包含了各类定义好的检测
    typescript 代码的规范
-   eslint-import-resolver-alias 让我们可以用 import 的时候使用@别名

上面这些配置只有基本功能已经实现了，还可以使用`vite-plugin-eslint`来进一步优化开
发体验  
`npm i vite-plugin-eslint -D`  
vite 的一个插件，让项目可以方便的得到 eslint 支持，完成 eslint 配置后，可以快速
的将其集成进 vite 之中，便于在代码不符合 eslint 规范的第一时间看到提示

##### 添加剩余的常见配置文件，优化体验

`.eslintrcignore、.prettierrc.cjs、.prettierignore`

### [stylelint](https://stylelint.io/user-guide/get-started/)

用于检查 CSS 代码风格和错误的工具，也可以安装 vscode 插件配合使用

#### stylelint 初始化

`npm i install stylelint stylelint-config-standard -D`

#### 配置

```
// package.json中添加配置
"script":{
    "lint:css": "stylelint src/**/*.{vue,css,sass,scss} --fix"
}
```

根目录下建立 .stylelintrc.cjs  
stylelint-config-standard 是一个标准样式库，也可以自动添加一些样式规则在
stylelintrc.cjs 文件里面  
增加 vue 里面的样式支持（附带 less 和 scss 的支持）  
对 less 的支持  
`npm install stylelint-less stylelint-config-recommended-less -D`

对 scss 的支持  
`npm install stylelint-scss stylelint-config-recommended-scss postcss -D`

对 vue 里面样式的支持，vue 的样式需要依赖前面这个库  
`npm install postcss-html stylelint-config-standard-scss stylelint-config-recommended-vue postcss -D`  
Vite 也同时提供了对 .scss .sass .less .styl .stylus 文件的内置支持，不需要再安装
特定插件和预处理器  
给 vite 添加插件  
`npm install vite-plugin-stylelint -D`  
修改 vite.config.js 文件

```
import stylelitPlugin from 'vite-plugin-stylelint';
plugins: [... stylelitPlugin()],
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
@commitlint/config-conventional 可以不安装

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
-   chore: 更改构建过程或辅助工具和库，例如文档生成

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
