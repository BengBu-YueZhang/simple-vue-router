export default {
  name: 'RouterView',

  functional: true,

  render(_, { parent, children }) {
    const h = parent.$createElement
    const route = parent.$route
    // 不支持嵌套路由，所以matched属性只有一层
    const matched = route.matched[0]
    const component = matched.component
    return h(component, children)
  }
}
