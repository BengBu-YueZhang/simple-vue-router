function extend(a, b) {
  for (const key in b) {
    a[key] = b[key]
  }
  return a
}

export default function rawnormalizeLocation (raw) {

  let next = null

  // 如果raw是一个字符串路径进行处理
  if (typeof raw === 'string') {
    next = { path: 'raw' }
  } else {
    if (next._normalized) {
      return next
    } else if (next.name) {
      return extend({}, raw)
    }
  }

  return {
    _normalized: true
  }
}
