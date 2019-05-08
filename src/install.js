import View from './components/router-view'

export default function install (Vue) {

  
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        // 劫持Vue实例的_route(属性)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 实例的_routerRoot属性指向vue实例
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
    }
  })

  // 添加$router属性
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    }
  })

  // 添加$route属性
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    }
  })

  // 注册全局组件
  Vue.component('RouterView', View)
}
