import { http_get, http_post, axios } from './index'

export function getTest() {
  return axios({
    url: '/localhost/test',
    method: 'post',
  })
}
