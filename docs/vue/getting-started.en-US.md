
# Getting Started

Gov Design Vue is dedicated to providing a **good development experience** for programmers. Make sure that you had installed [Node.js](https://nodejs.org/)(> v8.9) correctly.

> Before delving into Gov Design Vue, a good knowledge base of [Vue](https://cn.vuejs.org/) and [JavaScript ES2015](http://babeljs.io/docs/learn-es2015/) is needed.

## Use vue-cli@3
We provide an [Gov Design Vue](https://github.com/vueComponent/vue-cli-plugin-gov-design) plugin for vue-cli@3, which you can use to quickly build an Gov Design Vue-based project.

## Playground

The following CodeSandbox demo is the simplest use case, and it's also a good habit to fork this demo to provide a re-producible demo while reporting a bug.

- [![Vue Govd Template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2wpk21kzvr)

## Import gov-design-vue

### 1. Installation

[vue-cli](https://github.com/vuejs/vue-cli)

```bash
$ npm install -g @vue/cli
# OR
$ yarn global add @vue/cli
```

### 2. Create a New Project

A new project can be created using CLI tools.

```bash
$ vue create govd-demo
```

And, setup your vue project configuration.

### 3. Use govd's Components


```bash
$ npm i --save gov-design-vue
```
**Fully import**
```jsx
import Vue from 'vue'
import Govd from 'gov-design-vue'
import App from './App'
import 'gov-design-vue/dist/govd.css'
Vue.config.productionTip = false

Vue.use(Govd)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```
The above imports Govd entirely. Note that CSS file needs to be imported separately.

**Only import the components you need**
```jsx
import Vue from 'vue'
import { Button, message } from 'gov-design-vue'
import App from './App'

Vue.config.productionTip = false

/* v1.1.2 */
Vue.component(Button.name, Button)
Vue.component(Button.Group.name, Button.Group)

/* v1.1.3+ Automatically register components under Button, such as Button.Group */
Vue.use(Button)

Vue.prototype.$message = message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

> All the components in govd are listed in the sidebar.

### 4. Component list

[Component list](https://github.com/vueComponent/gov-design-vue/blob/master/site/components.js)

## Compatibility

Gov Design Vue supports all the modern browsers and IE9+.

You need to provide [es5-shim](https://github.com/es-shims/es5-shim) and [es6-shim](https://github.com/paulmillr/es6-shim) and other polyfills for IE browsers.

If you are using babel, we strongly recommend using [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) and [babel-plugin-transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/) instead of those two shims.

> Please avoid using both the babel and shim methods at the same time.


## Import on Demand

If you see logs like below screenshot, you might be importing all components by writing `import { Button } from 'gov-design-vue';`. This will affect your app's network performance.

```
You are using a whole package of govd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.
```

> ![](https://zos.alipayobjects.com/rmsportal/GHIRszVcmjccgZRakJDQ.png)

However, we can import individual components on demand:

```jsx
import Button from 'gov-design-vue/lib/button';
import 'gov-design-vue/lib/button/style'; // or gov-design-vue/lib/button/style/css for css format file
```

We strongly recommend using [babel-plugin-import](https://github.com/gov-design/babel-plugin-import), which can convert the following code to the 'govd/lib/xxx' way:

```jsx
import { Button } from 'gov-design-vue';
```

And this plugin can load styles too, read [usage](https://github.com/gov-design/babel-plugin-import#usage) for more details.

> FYI, babel-plugin-import's `style` option will importing some global reset styles, don't use it if you don't need those styles. You can import styles manually via `import 'gov-design-vue/dist/govd.css'` and override the global reset styles.

## Customization

- [Customize Theme](/docs/vue/customize-theme)
- [Local Iconfont](https://github.com/gov-design/govd-init/tree/master/examples/local-iconfont)

## Tips

- You can use any `npm` modules.
- Although Vue's official recommended template to write components, JSX is a better choice for complex components.

