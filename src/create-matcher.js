import createRouteMap from './create-route-map'
import normalizeLocation from './util/normalizeLocation'

export default function createMatcher(routes, router) {
  const {
    pathList,
    pathMap,
    nameMap
  } = createRouteMap(routes)

  // match函数会根据raw参数, raw参数可以是字符串或者对象。返回对应的路由对象
  // 看源码的时候，个人认为这块是最复杂的，最难以理解的
  // 由于我们没有实现params动态路由，所以相对于VueRouter的源码简单很多
  function match(raw) {

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
        // 由于没有实现动态路由，所以我们直接对path进行比较
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

function createRoute (record, location) {
}
