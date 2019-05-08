// 对路径进行拆分，区分出hash，path，以及query
// 只支持html5 history模式，所以不对"#"进行处理
export function parsePath (path) {
  let hash = ''
  let query = ''
  const queryIndex = path.indexOf('?')
  if (queryIndex > 0) {
    query = path.slice(queryIndex + 1)
    path = path.slice(0, queryIndex)
  }
  return {
    hash,
    query,
    path
  }
}

// 对字符串或者对象进行处理，处理为path，hash，query的格式
export function rawnormalizeLocation (raw) {
  let next = null
  if (typeof raw === 'string') {
    // 如果raw是一个字符串路径进行处理
    next = { path: raw }
  } else {
    next = raw
    // 如果包含name直接返回
    if (next.name) {
      return { ...raw }
    }
  }
  const parsedPath = parsePath(next.path || '')
  const path = parsedPath.path
  const hash = next.hash || parsedPath.hash
  return {
    path,
    query: next.query,
    hash
  }
}
