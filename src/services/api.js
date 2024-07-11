import { http_get, http_post } from './index'

const api = process.env.NODE_ENV === 'production' ? 'http://sicilymarmot.top/vue2_test/routeList.json' : 'http://localhost:8888/routeList.json'

class ajax {
  async getRouter(params) {
    const result = await http_get({ api, params })
    return result.data
  }
  async getX(params) {
    const result = await http_post({ api: './getRouteList', params })
    return result.data
  }
}
export default new ajax()
