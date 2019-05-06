import createRouteMap from '../src/create-route-map'
const expect = require('chai').expect

describe('测试createRouteMap函数', function () {

  const routes = [
    {
      path: '/1',
      name: '1',
      component: {
        name: '1'
      }
    },
    {
      path: '/2',
      name: '2',
      component: {
        name: '2'
      }
    }
  ]

  it('createRouteMap返回结果测试', function () {
    const {
      pathList,
      pathMap,
      nameMap
    } = createRouteMap(routes)
    expect(pathList).to.deep.equal(['/1', '/2'])
    expect(pathMap).to.deep.equal({
      '/1': {
        path: '/1',
        name: '1',
        component: {
          name: '1'
        },
        beforeEnter: undefined
      },
      '/2': {
        path: '/2',
        name: '2',
        component: {
          name: '2'
        },
        beforeEnter: undefined
      }
    })
    expect(nameMap).to.deep.equal({
      1: {
        path: '/1',
        name: '1',
        component: {
          name: '1'
        },
        beforeEnter: undefined
      },
      2: {
        path: '/2',
        name: '2',
        component: {
          name: '2'
        },
        beforeEnter: undefined
      }
    })
  })
})