module.exports = {
  // 一行最多多少字符
  printWidth: 80,
  // 使用2个空格缩进
  tabWidth: 4,
  // 使用tab缩进，不使用空格
  useTabs: true,
  // 行尾需要分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的key仅在必要时使用引号
  quoteProps: 'as-needed',
  // jsx不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 尾随逗号
  trailingComma: 'es5',
  // 大括号内的收尾需要空格
  bracketSpacing: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的@prettier
  requirePragma: false,
  // 不需要自动在文件开头插入@prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'always',
  // 根据显示样式决定html要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用lf
  endOfLine: 'lf',
  // JSX标签的尖括号是否与标签的最后一个属性在同一行
  jsxBracketSameLine: true,
  rules: {
    filename: [
      {
        match: "^[a-zA-Z0-9_-]+.js$",
        name: "customFormat",
        args: ["$1"],
        errorMessage: "Filename should have lowercase letters, digits, hyphens and underscores"
      }
    ],
    directory: {
      maxDepth: 2,
      extensions: ["*"],
      requiredEndingSlash: false,
      ignoredFiles: ["**/node_modules/**"],
      visitor: {
        file: function(file) {
          if (file.isDirectory()) {
            file.path = path.join(file.path, "index.js");
          } else if (file.isBlockCommented() && file.content.startsWith("#")) {
            return;
          }
        }
      }
    }
  }
}