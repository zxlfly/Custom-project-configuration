# 前端项目搭建流程

## 初始化
默认使用vite``npm create vite@latest``  
默认选择Vue + ts 开发  
后续可能考虑升级为pnpm

## 开发代码规范配置
### [husky](https://typicode.github.io/husky/#/?id=manual)
提交或推送时，可以使用它来整理提交消息、运行测试、lint 代码等。Husky 支持所有 Git 钩子。
#### husky初始化
- ``npm install husky -D``
  - 安装
- ``npx husky install``
  - 初始化
- ``npm pkg set scripts.prepare="husky install"``
  - 修改``package.json``
#### 添加hook
- commit-msg
- pre-commit
- pre-push
- 如果将 husky 安装在另一个目录中，需要自定义目录
可以手动添加，也可以使用``npx husky add .husky/pre-commit "npm test"``

### [commitlint](https://commitlint.js.org/#/)
提交约定
#### commitlint初始化
``npm install -D @commitlint/cli @commitlint/config-conventional``  
@commitlint/config-conventional可以不安装
#### 配置
需要配合husky使用，在commit-msg中配置
``echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js``  
**需要注意的是如果package.json中设置"type": "module"，那么需要将后缀改为cjs**
一般项目中，我们会自定义规则。在commitlint.config.js文件中配置  
- feat: 一项新功能
- fix: 一个错误修复
- docs: 仅文档更改
- style: 不影响代码含义的更改（空白，格式，缺少分号等）
- refactor: 既不修正错误也不增加功能的代码更改（重构）
- perf: 改进性能的代码更改
- test: 添加缺失或更正现有测试
- build: 影响构建系统或外部依赖项的更改（gulp，npm等）
- ci: 对CI配置文件和脚本的更改
- chore: 更改构建过程或辅助工具和库，例如文档生成
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
针对暂存的 git 文件运行 linters，不要让💩进入你的代码库！
#### lint-staged初始化
``npm install --save-dev lint-staged``
#### 配置

```
// 需要配合husky使用，在pre-commit中配置  

```

```
// package.json中添加配置
"lint-staged": {
  "src/**/{*.vue,*.js,*.ts,*.jsx,*.tsx}": "eslint --fix",
  "src/**/{*.scss,*.css}": "stylelint --fix"
}
```