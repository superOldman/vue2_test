import { http_get, http_post} from './index';



class ajax {
    async getRouter(params) {
        const result = await http_get({ api: 'http://localhost:8081/routeList.json', params });
        return result.data
    }
    async getX(params) {
        const result = await http_post({ api: './getRouteList', params });
        return result.data
    }
}
export default new ajax();