// 对路径进行拆分，区分出hash，path，以及query
// 只支持html5 history模式，所以不对"#"进行处理
function parsePath (path) {
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

// 对query查询字符串进行解析，这一段直接copy vue-router中的源码
function parseQuery(query) {
  const res = {}
  query = query.trim().replace(/^(\?|#|&)/, '')
  if (!query) {
    return res
  }
  query.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=')
    const key = decodeURIComponent(parts.shift())
    const val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null
    if (res[key] === undefined) {
      res[key] = val
    } else if (Array.isArray(res[key])) {
      res[key].push(val)
    } else {
      res[key] = [res[key], val]
    }
  })
  return res
}

// 将query字符串和query对象做出一个整合，形成一个query对象
function resolveQuery(query = '', extraQuery = {}) {
  let parsedQuery
  parsedQuery = parseQuery(query)
  for (const key in extraQuery) {
    parsedQuery[key] = extraQuery[key]
  }
  return parsedQuery
}

// 对字符串或者对象进行处理，处理为path，hash，query的格式
export default function rawnormalizeLocation (raw) {

  let next = null

  if (typeof raw === 'string') {
    // 如果raw是一个字符串路径进行处理
    next = { path: 'raw' }
  } else {
    next = raw
    if (next.name) {
      return { ...raw }
    }
  }

  const parsedPath = parsePath(next.path || '')
  const path = parsedPath.path
  const query = resolveQuery(parsedPath.query, next.query)
  const hash = next.hash || parsedPath.hash

  return {
    path,
    query,
    hash
  }
}
