export default function createRouteMap(routes) {

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
  const { path, name } = route

  const record = {
    name,
    path,
    component: route.component,
    beforeEnter: route.beforeEnter
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path)
    pathMap[record.path] = record
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record
    }
  }
}
