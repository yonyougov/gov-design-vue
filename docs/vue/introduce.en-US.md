
# Gov Design of Vue

Following the Gov Design specification, we developed a Vue UI library `govd` that contains a set of high quality components and demos for building rich, interactive user interfaces.

<div class="pic-plus">
  <img width="150" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  <span>+</span>
  <img width="160" src="https://cn.vuejs.org/images/logo.png">
</div>


<style>
.pic-plus > * {
  display: inline-block !importgov;
  vertical-align: middle;
}
.pic-plus span {
  font-size: 30px;
  color: #aaa;
  margin: 0 20px;
}
</style>


## Features

- An enterprise-class UI design language for web applications.
- A set of high-quality Vue components out of the box.
- Shared [Gov Design of React](https://gov.design/docs/spec/introduce) design resources.

## Environment Support

* Modern browsers and Internet Explorer 9+ (with [polyfills](https://vue.gov.design/docs/vue/getting-started/#Compatibility))
* Server-side Rendering

## Version

- Stable: [![npm package](https://img.shields.io/npm/v/gov-design-vue.svg?style=flat-square)](https://www.npmjs.org/package/gov-design-vue)

You can subscribe to this feed for new version notifications: https://github.com/vueComponent/gov-design-vue/releases.atom

## Installation

### Using npm or yarn

**We recommend using npm or yarn to install**，it not only makes development easier，but also allow you to take advgovage of the rich ecosystem of Javascript packages and tooling.

```bash
$ npm install gov-design-vue --save
```

```bash
$ yarn add gov-design-vue
```

If you are in a bad network environment，you can try other registries and tools like [cnpm](https://github.com/cnpm/cnpm).

> **Using the new features of vue, like `slot-scope`(2.5.0+), `provide / inject`(2.2.0+)**

### Import in Browser

Add `script` and `link` tags in your browser and use the global variable `govd`.

We provide `govd.js` `govd.css` and `govd.min.js` `govd.min.css` under `gov-design-vue/dist` in govd's npm package. You can also download these files directly from [![jsdelivr](https://data.jsdelivr.com/v1/package/npm/gov-design-vue/badge)](https://www.jsdelivr.com/package/npm/gov-design-vue) or [unpkg](https://unpkg.com/gov-design-vue/dist/).

> **We strongly discourage loading the entire files** this will add bloat to your application and make it more difficult to receive bugfixes and updates. Govd is intended to be used in conjunction with a build tool, such as [webpack](https://webpack.github.io/), which will make it easy to import only the parts of govd that you are using.

> Note: you should import moment before using govd.js.

## Usage

```jsx
import Vue from 'vue';
import { DatePicker } from 'gov-design-vue';
Vue.use(DatePicker);
```

And import stylesheets manually:

```jsx
import 'gov-design-vue/dist/govd.css';  // or 'gov-design-vue/dist/govd.less'
```

### Use modularized govd

- Use [babel-plugin-import](https://github.com/gov-design/babel-plugin-import) (Recommended)

   ```js
   // .babelrc or babel-loader option
   {
     "plugins": [
       ["import", { "libraryName": "gov-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` for less
     ]
   }
   ```

   > Note: Don't set `libraryDirectory` if you are using webpack 1.

   This allows you to import components from govd without having to manually import the corresponding stylesheet. The govd babel plugin will automatically import stylesheets.

   ```jsx
   // import js and css modularly, parsed by babel-plugin-import
   import { DatePicker } from 'gov-design-vue';
   ```

- Manually import

   ```jsx
   import DatePicker from 'gov-design-vue/lib/date-picker';  // for js
   import 'gov-design-vue/lib/date-picker/style/css';        // for css
   // import 'gov-design-vue/lib/date-picker/style';         // that will import less
   ```


## Links

- [Home Page](https://vue.gov.design/)
- [Gov Design React](https://gov.design/)
- [Components](https://vue.gov.design/docs/vue/introduce)
- [Change Log](/docs/vue/changelog)
- [CodeSandbox template](https://codesandbox.io/s/2wpk21kzvr) for bug reports
- [Customize Theme](/docs/vue/customize-theme)
- [FAQ](/docs/vue/faq)
- [Support US](/docs/vue/sponsor)
- [Awesome Gov Design](https://github.com/vueComponent/gov-design-vue-awesome)

## Contributing


If you'd like to help us improve govd, just create a [Pull Request](https://github.com/vueComponent/gov-design-vue/pulls). Feel free to report bugs and issues [here](https://vuecomponent.github.io/issue-helper/).

> If you're new to posting issues, we ask that you read [*How To Ask Questions The Smart Way*](http://www.catb.org/~esr/faqs/smart-questions.html) and [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!

## THANK YOU

[Gov Design Team](https://github.com/gov-design/gov-design/blob/master/AUTHORS.txt)
