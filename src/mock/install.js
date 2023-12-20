// 引用 Mock
import Mock from 'mockjs'
import usePassRateRankingData from './install/UsePassRateRanking.json'
import installCustomerRankingData from './install/InstallCustomerRanking.json'
import usePassRate from './install/UsePassRate.json'
import useDisqualificationDetailData from './install/UseDisqualificationDetail.json'
import customerCoordinatesData from './install/customerCoordinates.json'
import departCoordinatesData from './install/departCoordinates.json'

// 获取使用合格率排名
Mock.mock('/install/usePassRateRanking', 'get', (option) => {
  const param = JSON.parse(option.body)
  const { page = 1, pageSize = 10 } = param
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const data = usePassRateRankingData.data.slice(start, end)
  return {
    code: 200,
    data: {
      total: usePassRateRankingData.data.length,
      data: data,
    },
  }
})

// 获取安装客户数排名
Mock.mock('/install/installCustomerRanking', 'get', (option) => {
  const param = JSON.parse(option.body)
  const { page = 1, pageSize = 10 } = param
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const data = installCustomerRankingData.data.slice(start, end)
  return {
    code: 200,
    data: {
      total: installCustomerRankingData.data.length,
      data: data,
    },
  }
})

// 获取e福通使用合格率
Mock.mock('/install/usePassRate', 'get', () => {
  return {
    code: 200,
    data: {
      total: usePassRate.data.length,
      data: usePassRate.data,
    },
  }
})

// 获取e福通使用使用不合格明细
Mock.mock('/install/useDisqualificationDetail', 'get', (option) => {
  const param = JSON.parse(option.body)
  const { page = 1, pageSize = 10 } = param
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const data = useDisqualificationDetailData.data.slice(start, end)
  return {
    code: 200,
    data: {
      total: useDisqualificationDetailData.data.length,
      data: data,
      page: page,
      pageSize: pageSize,
    },
  }
})

// 获取零售户经纬度
Mock.mock('/install/customerCoordinates', 'get', () => {
  return {
    code: 200,
    data: customerCoordinatesData,
  }
})

// 获取客服部经纬度和e福通客户数
Mock.mock('/install/departCoordinates', 'get', () => {
  return {
    code: 200,
    data: departCoordinatesData,
  }
})
