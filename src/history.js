import { createRoute } from './create-matcher'

export function pushState(url, replace) {
  if (replace) {
    // 如果是replace的情况
    window.history.replaceState(null, null, url)
  } else {
    // 如果不是replace的情况
    window.history.pushState(null, null, url)
  }
}

export function replaceState(url) {
  pushState(url, true)
}

class BaseRouter {
  constructor (router) {
    // vuerouter的实例
    this.router = router
    // 路由的过渡的状态
    this.pending = null
    // 当前的路由
    this.current = createRoute(null, {
      path: '/'
    })
  }

  listen(cb) {
    this.cb = cb
  }

  transitionTo(location, onComplete, onAbort) {
  }

  confirmTransition () {
  }

  updateRoute () {
  }
}

export class HTML5History extends BaseRouter {
  constructor (router) {
    // 参数传递给父类
    super(router)
    this.setupListeners()
  }

  // 添加对popstate事件的监听
  setupListeners () {
    window.addEventListener('popstate', e => {
    })
  }

  go (n) {
    window.history.go(n)
  }

  push(location) {
    // 路由切换成功的回调
    const complete = (route) => {
      pushState(route.fullPath)
    }
    // 路由切换中止的回调
    const abort = (route) => {}
    this.transitionTo(location, complete, abort)
  }

  replace(location) {
    // 路由切换成功的回调
    const complete = (route) => {
      replaceState(route.fullPath)
    }
    // 路由切换中止的回调
    const abort = (route) => {}
    this.transitionTo(location, complete, abort)
  }
}
