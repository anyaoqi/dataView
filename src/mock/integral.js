// 引用 Mock
import Mock from 'mockjs'
import realTimePointData from './integral/realTimePoint.json'
import departmentRankingData from './integral/departmentRanking.json'
import brandActivitiesRankingData from './integral/brandActivitiesRanking.json'

Mock.mock('/integral/realTimePoint', 'get', (option) => {
  const param = JSON.parse(option.body)
  const { page = 1, pageSize = 10 } = param
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const data = realTimePointData.data.slice(start, end)
  return {
    code: 200,
    data: {
      total: realTimePointData.data.length,
      data: data,
    },
  }
})

Mock.mock('/integral/departmentRanking', 'get', () => {
  return {
    code: 200,
    data: departmentRankingData.data,
  }
})

// 获取会员累计积分排名
Mock.mock('/integral/brandActivitiesRanking', 'get', (option) => {
  const param = JSON.parse(option.body)
  const { page = 1, pageSize = 10 } = param
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const data = brandActivitiesRankingData.data.slice(start, end)
  return {
    code: 200,
    data: {
      total: brandActivitiesRankingData.data.length,
      data: data,
      page: page,
      pageSize: pageSize,
    },
  }
})
