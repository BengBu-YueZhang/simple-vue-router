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
      components: Home,
      name: 'Home'
    },
    {
      path: '/other',
      components: Other,
      name: 'Other'
    }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
