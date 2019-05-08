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
