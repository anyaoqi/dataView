/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/multi-word-component-names': 'off', // 关闭要求 Vue 组件名使用多个单词
    'keyword-spacing': 'error', // 强制关键字后的空格使用规则
    'no-console': 'off', // 警告使用 console
    'no-unused-vars': 'warn', // 警告未使用的变量
    'indent': ['error', 2, { SwitchCase: 1 }], // 强制缩进为2个空格
    'quotes': ['error', 'single'], // 强制单引号
    'semi': ['error', 'never'], // 不要求分号
    'comma-dangle': ['error', 'only-multiline'], // 多行对象/数组末尾添加逗号
    'no-multiple-empty-lines': ['error', { max: 2 }], // 最多允许两行空行
    'no-trailing-spaces': 'error', // 不允许行尾空格
    'space-before-function-paren': 'off', // 函数名和括号之间不允许空格
    'object-curly-spacing': 'off', // 对象字面量大括号内强制间距
    'array-bracket-spacing': 'off', // 数组括号内强制间距
    'eqeqeq': 'error', // 要求使用严格相等 === 或 !==
    'no-extra-parens': 'off', // 禁止不必要的括号
    'arrow-spacing': 'error', // 箭头函数的箭头前后要有空格
    'no-var': 'error', // 禁止使用 var 声明变量
    'prefer-const': 'error', // 鼓励使用 const 声明不会被修改的变量
    'curly': 'error', // if 语句必须使用花括号
    'no-const-assign': 'error', // 禁止对 const 声明的变量重新赋值
    'vue/valid-template-root': 'off', // 检查template中是否有根节点
    'quote-props': 'off',
  },
}
