import { createRoute } from './create-matcher'
import { parsePath } from './util/normalizeLocation'

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

  transitionTo(location, onComplete) {
    // 使用match方法，获取将要更新的路由对象
    const route = this.router.match(location)
    // 更新当前路由
    this.updateRoute(route)
    // 更新浏览器的url
    onComplete && onComplete(route)
  }

  updateRoute(route) {
    this.current = route
    this.cb && this.cb(route)
  }
}

export class HTML5History extends BaseRouter {
  constructor (router) {
    // 参数传递给父类
    super(router)
    this.setupListeners()
  }

  // 添加对popstate事件的监听, replaceState，pushState不会触发popstate事件
  // go，back，或者点击前进后退的按钮，会触发popstate事件
  setupListeners () {
    window.addEventListener('popstate', e => {
      let href = window.location.href
      let { path } = parsePath(href)
      this.transitionTo(path)
    })
  }

  go (n) {
    window.history.go(n)
  }

  push(location) {
    // 路由切换成功的回调，我们需要手动的更新浏览器的url
    const complete = (route) => {
      pushState(route.path)
    }
    this.transitionTo(location, complete)
  }

  replace(location) {
    // 路由切换成功的回调，需要手动的更新浏览器的url
    const complete = (route) => {
      replaceState(route.path)
    }
    this.transitionTo(location, complete)
  }
}
