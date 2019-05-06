export default function createRouteMap(params) {

  // pathList, pathMap, nameMap分别是路径的列表, 路径与路由对象的映射, 路由名称与路由对象的映射
  
  const pathList = []
  const pathMap = Object.create(null)
  const nameMap = Object.create(null)

  routes.forEach(route => {
    addRouteRecord(pathList, pathMap, nameMap, route)
  })

  return {
    pathList,
    pathMap,
    nameMap
  }
}

function addRouteRecord(pathList, pathMap, nameMap, route) {
  
}
