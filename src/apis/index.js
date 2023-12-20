import { request } from '@/utils/axios'

export const getTableData = () => {
  return request({
    url: '/brand/data',
    method: 'get',
  })
}
