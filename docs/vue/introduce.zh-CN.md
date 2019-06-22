
# Ant Design of Vue

这里是 Gov Design 的 Vue 实现，开发和服务于企业级后台产品。

<div class="pic-plus">
  <img width="150" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  <span>+</span>
  <img width="160" src="https://cn.vuejs.org/images/logo.png">
</div>

<style>
.pic-plus > * {
  display: inline-block !important;
  vertical-align: middle;
}
.pic-plus span {
  font-size: 30px;
  color: #aaa;
  margin: 0 20px;
}
</style>


## 特性

- 提炼自企业级中后台产品的交互语言和视觉风格。
- 开箱即用的高质量 Vue 组件。
- 共享[Ant Design of React](http://ant-design.gitee.io/docs/spec/introduce-cn)设计工具体系。

## 支持环境

* 现代浏览器和 IE9 及以上（需要 [polyfills](https://vue.ant.design/docs/vue/getting-started-cn/#兼容性)）。
* 支持服务端渲染。

## 版本

- 稳定版：[![npm package](https://img.shields.io/npm/v/gov-design-vue.svg?style=flat-square)](https://www.npmjs.org/package/gov-design-vue)

你可以订阅：https://github.com/yonyougov/gov-design-vue/releases.atom 来获得稳定版发布的通知。

## 安装

### 使用 npm 或 yarn 安装

**我们推荐使用 npm 或 yarn 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
$ npm install gov-design-vue --save
```

```bash
$ yarn add gov-design-vue
```

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

> **组件库使用了 vue 的新特性`slot-scope`(2.5.0新增), `provide / inject`(2.2.0新增)**

### 浏览器引入

在浏览器中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `antd`。

我们在 npm 发布包内的 `gov-design-vue/dist` 目录下提供了 `govd.js` `govd.css` 以及 `govd.min.js` `govd.min.css`。你也可以通过 [![jsdelivr](https://data.jsdelivr.com/v1/package/npm/gov-design-vue/badge)](https://www.jsdelivr.com/package/npm/ant-design-vue)
 或 [UNPKG](https://unpkg.com/gov-design-vue/dist/) 进行下载。

> **强烈不推荐使用已构建文件**，这样无法按需加载，而且难以获得底层依赖模块的 bug 快速修复支持。

> 注意：引入 govd.js 前你需要自行引入 [moment](http://momentjs.com/)。

## 示例

```jsx
import Vue from 'vue';
import { DatePicker } from 'gov-design-vue';
Vue.use(DatePicker);
```

引入样式：

```jsx
import 'gov-design-vue/dist/antd.css';  // or 'gov-design-vue/dist/antd.less'
```

### 按需加载

下面两种方式都可以只加载用到的组件。

- 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)（推荐）。

   ```js
   // .babelrc or babel-loader option
   {
     "plugins": [
       ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
     ]
   }
   ```

   > 注意：webpack 1 无需设置 `libraryDirectory`。

   然后只需从 gov-design-vue 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。

   ```jsx
   // babel-plugin-import 会帮助你加载 JS 和 CSS
   import { DatePicker } from 'gov-design-vue';
   ```

- 手动引入

   ```jsx
   import DatePicker from 'gov-design-vue/lib/date-picker';  // 加载 JS
   import 'gov-design-vue/lib/date-picker/style/css';        // 加载 CSS
   // import 'gov-design-vue/lib/date-picker/style';         // 加载 LESS
   ```

## 链接

- [首页](https://gov-design-vue.netlify.com/)
- [Ant Design React](https://ant.design/)
- [组件库](https://gov-design-vue.netlify.com/docs/vue/introduce-cn)
- [更新日志](/docs/vue/changelog-cn)
- [CodeSandbox 模板](https://codesandbox.io/s/2wpk21kzvr) for bug reports
- [定制主题](/docs/vue/customize-theme-cn)
- [常见问题](/docs/vue/faq-cn)
- [支持我们](/docs/vue/sponsor-cn)
- [Awesome Ant Design](https://github.com/vueComponent/ant-design-vue-awesome)

## 关于gov-design-vue

一个ant-design-vue的fork版本

## 特别感谢

[Ant Design Team](https://github.com/ant-design/ant-design/blob/master/AUTHORS.txt)

