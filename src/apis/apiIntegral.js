import { request } from '@/utils/axios'

const integralApi = {
  // 获取实时积分
  getRealTimePoint: (param) => {
    return request({
      url: 'integral/realTimePoint',
      method: 'get',
      data: {
        page: param.page,
        pageSize: param.pageSize,
      },
    })
  },

  // 获取客服部推广排名
  getDepartmentRanking: (param) => {
    return request({
      url: 'integral/departmentRanking',
      method: 'get',
      data: {
        page: param.page,
        pageSize: param.pageSize,
      },
    })
  },

  // 获取客服部推广排名
  getBrandActivitiesRanking: (param) => {
    return request({
      url: 'integral/brandActivitiesRanking',
      method: 'get',
      data: {
        page: param.page,
        pageSize: param.pageSize,
      },
    })
  },
}

export default integralApi
