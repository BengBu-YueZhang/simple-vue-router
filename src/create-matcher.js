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
  function match(raw) {
    const location = normalizeLocation(raw)
    const { name } = location
    
    if (name) {
    } else {
    }
  }

  return {
    match
  }
}

function _createRoute (params) {
}


