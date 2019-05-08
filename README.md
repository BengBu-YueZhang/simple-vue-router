# very-simple-router

very-simple-router是我在学习vue-router的源码后，参照(抄🤦‍)vue-router的源码，实现的最简单的版本，实现了VueRouter的最基本核心功能，组件的切换更新Vue组件。

虽然不能用于生产环境，但是对于学习了解VueRouter原理还是有一定帮助的。目前插件只支持history模式。暂不支持嵌套路由(router-view嵌套)，动态添加路由, 动态路由，滚动行为，以及keep-live等复杂功能。请大家见谅。

由于不支持嵌套路由，以及动态路由。所以少了很多对params的处理，以及路由树的处理。整体源码的可读性上，非常容易理解。

## 使用方法

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import VueRouter from '../../../src'
import Home from './components/Home'
import Other from './components/Other'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      name: 'Home'
    },
    {
      path: '/other',
      component: Other,
      name: 'Other'
    }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

```

```js
// App.vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  created () {
    console.log(this.$route)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

```js

// home.vue
<template>
  <div>
    <h1>Home</h1>
    <button @click="handleClick">去other</button>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route)
  },

  methods: {
    handleClick () {
      this.$router.push('/other')
    }
  }
}
</script>

```

```js
// other.vue
<template>
  <div>
    <h1>Other</h1>
    <button @click="handleClick">去other</button>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route)
  },

  methods: {
    handleClick () {
      this.$router.push({
        path: '/home',
        query: {
          home: 1
        }
      })
    }
  }
}
</script>

```

推荐看下我的博客，[VueRouter源码分析](https://juejin.im/post/5cb2c1656fb9a0688360fb2c#heading-29)
