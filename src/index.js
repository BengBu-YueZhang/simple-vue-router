import { HTML5History } from './history'
import { createMatcher } from './create-matcher'

class VueRouter {
  static install () {
  }

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

  init () {
  }
}

export default VueRouter
