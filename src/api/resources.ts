import request from '@/axios'

const Resources = (url: string, actions: object = {}) => {
  const resources = {
    get: (id: string) => request.get(`${url}/${id}`),
    post: (params: object) => request.post(url, params),
    put: (params: object) => request.put(url, params),
    delete: (id: string) => request.delete(`${url}/${id}`),
    queryAll: (params: object) => request.get(`${url}/query`, { params }),
    queryPager: (params: object) => request.get(`${url}/query/pager`, { params })
  }
  return Object.assign(resources, actions)
}
export default Resources
