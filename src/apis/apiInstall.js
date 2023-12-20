// E福通可视化大屏api
import { request } from '@/utils/axios'

const installApi = {
  // 获取使用合格率
  getUsePassRateRanking: (param) => {
    return request({
      url: '/install/usePassRateRanking',
      method: 'get',
      data: {
        page: param.page,
        pageSize: param.pageSize,
      },
    })
  },

  // 获取安装客户数排名
  getInstallCustomerRankingData: (param) => {
    return request({
      url: '/install/installCustomerRanking',
      method: 'get',
      data: {
        page: param.page,
        pageSize: param.pageSize,
      },
    })
  },
  // 获取e福通使用合格率
  getUsePassRateData: () => {
    return request({
      url: '/install/usePassRate',
      method: 'get',
      data: {},
    })
  },

  // 获取e福通使用使用不合格明细
  getUseDisqualificationDetailData: (param) => {
    return request({
      url: '/install/useDisqualificationDetail',
      method: 'get',
      data: {
        page: param.page,
        pageSize: param.pageSize,
      },
    })
  },

  // 获取零售户经纬度
  getCustomerCoordinatesData: () => {
    return request({
      url: '/install/customerCoordinates',
      method: 'get',
      data: {},
    })
  },

  // 获取客服部经纬度和e福通客户数
  getDepartCoordinatesData: () => {
    return request({
      url: '/install/departCoordinates',
      method: 'get',
      data: {},
    })
  },
}

export default installApi
