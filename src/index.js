import { HTML5History } from './history'
import { createMatcher } from './create-matcher'
import install from './install'

class VueRouter {
  constructor(options = {}) {
    this.app = null
    this.options = options
    this.matcher = createMatcher(options.routes || [], this)
    // 不支持hash模式, 默认history模式
    this.mode = 'history'
    this.history = new HTML5History(this)
  }

  match (raw) {
    return this.matcher.match(raw)
  }

  // app为vue的实例
  init (app) {
    this.app = app
    const history = this.history
    history.transitionTo(history.getCurrentLocation())
    history.listen(route => {
      // 更新实例上的_route属性
      this.app._route = route
    })
  }

  push(location) {
    this.history.push(location)
  }

  replace(location) {
    this.history.replace(location)
  }
  
  go (n) {
    this.history.go(n)
  }

  back () {
    this.go(-1)
  }

  forward () {
    this.go(1)
  }
}

VueRouter.install = install

export default VueRouter
