import HTML5History from './history'
import createMatcher from './create-matcher'

class VueRouter {
  static install () {
  }

  constructor(options = {}) {
    this.app = null
    this.options = options
    // 不支持hash模式, 默认history模式
    this.mode = 'history'
    this.matcher = createMatcher(options.routes || [], this)
    this.history = new HTML5History(this, options.base)
  }
}

export default VueRouter
