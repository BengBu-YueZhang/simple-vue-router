import createRouteMap from './create-route-map'
import normalizeLocation from './util/normalizeLocation'

export function createMatcher (routes, router) {
  const {
    pathList,
    pathMap,
    nameMap
  } = createRouteMap(routes)
  // match函数会根据raw参数, raw参数可以是字符串或者对象。返回对应的路由对象
  // 我们主要使用match方法，在更新路由的时候，对VueRoute对象上的
  // 看源码的时候，个人认为这块是最复杂的，最难以理解的
  // 由于我们没有实现params动态路由，所以相对于VueRouter的源码简单很多
  function match(raw) {

    // 对raw进行解析，如果raw是path字符串会解析为对象
    // 同时对path中的query，或者query字段进行解析
    const location = normalizeLocation(raw)
    const { name } = location

    if (name) {
      const record = nameMap[name]
      if (!record) {
        createRoute(null, location)
      } else {
        createRoute(record, location)
      }
    } else if (location.path) {
      for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i]
        const record = pathMap[path]
        // 由于没有实现动态路由，所以我们直接对path进行比较，不用考虑动态路由的情况
        if (record.path === location.path) {
          return createRoute(record, location)
        }
      }
    }
    return createRoute(null, location)
  }
  return {
    match
  }
}

export function createRoute (record, location) {
  let query = location.query
  const route = {
    name: location.name || (record && record.name),
    path: location.path || '/',
    hash: location.hash || '',
    query,
    // 不支持嵌套路由所以这里对matched属性的处理简单很多
    // 在vuerouter的源码中，matched需要通过迭代的方式向上查找父级
    matched: [record]
  }
  return Object.freeze(route)
}
