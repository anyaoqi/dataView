// 引用 Mock
import Mock from 'mockjs'
import getProvinceCount from '@/mock/brand/getProvinceCount.json'
import getProfessionData from '@/mock/brand/getProfessionData.json'
import getUserTabData from '@/mock/brand/getUserTabData.json'
import getActivityAmountData from '@/mock/brand/getActivityAmountData.json'
import getSalesRankingData from '@/mock/brand/getSalesRankingData.json'
import getSalesTrendData from '@/mock/brand/getSalesTrendData.json'
import getMemberData7 from '@/mock/brand/getMemberData7.json'
import getMemberData14 from '@/mock/brand/getMemberData14.json'
import getMemberData30 from '@/mock/brand/getMemberData30.json'
import getNewMemberData from '@/mock/brand/getNewMemberData.json'
import getMemberRadarData from '@/mock/brand/getMemberRadarData.json'
import getMemberRadarAvgData from '@/mock/brand/getMemberRadarAvgData.json'

Mock.mock('/data/list', 'get', {
  list: [1, 2, 3],
})

Mock.mock('/brand/getProvinceCount', 'get', (option) => {
  JSON.parse(option.body)
  return {
    code: 200,
    data: getProvinceCount,
  }
})

/**
 * 职业分布、性别比、烟龄段、年龄段
 */
Mock.mock('/brand/getProfessionData', 'get', (option) => {
  JSON.parse(option.body)
  return {
    code: 200,
    data: getProfessionData,
  }
})

/**
 * 用户画像标签
 */
Mock.mock('/brand/getUserTabData', 'get', (option) => {
  JSON.parse(option.body)
  return {
    code: 200,
    data: getUserTabData,
  }
})
/**
 * 品牌活动金额/品牌培育数据
 */
Mock.mock('/brand/getActivityAmountData', 'get', (option) => {
  JSON.parse(option.body)
  return {
    code: 200,
    data: getActivityAmountData,
  }
})
/**
 * 品牌销售排行
 */
Mock.mock('/brand/getSalesRankingData', 'get', (option) => {
  JSON.parse(option.body)
  return {
    code: 200,
    data: getSalesRankingData,
  }
})
/**
 * 品牌销售趋势
 */
Mock.mock('/brand/getSalesTrendData', 'get', (option) => {
  JSON.parse(option.body)
  return {
    code: 200,
    data: getSalesTrendData,
  }
})
/**
 * 会员发展数据
 */
Mock.mock('/brand/getMemberData', 'get', (option) => {
  const data = JSON.parse(option.body)
  if (data.type.toString() === '7') {
    return {
      code: 200,
      data: getMemberData7,
    }
  }
  if (data.type.toString() === '15') {
    return {
      code: 200,
      data: getMemberData14,
    }
  }
  if (data.type.toString() === '30') {
    return {
      code: 200,
      data: getMemberData30,
    }
  }
})
/**
 * 近期新增会员列表
 */
Mock.mock('/brand/getNewMemberData', 'get', (option) => {
  JSON.parse(option.body)
  return {
    code: 200,
    data: getNewMemberData,
  }
})
/**
 * 会员雷达图
 */
Mock.mock('/brand/getMemberRadarData', 'get', (option) => {
  const param = JSON.parse(option.body)
  const keyword = param.keyword
  const data = getMemberRadarData.data
  let filterData = data
  if (keyword) {
    filterData = []
    let count = 0
    // 筛选的话返回最近的10条记录
    for (let i = 0; i < data.length && count < 1; i++) {
      if (data[i].nick_name === keyword) {
        filterData.push(data[i])
        count++
      }
    }
  }
  return {
    code: 200,
    data: {
      data:  filterData,
      code: 'success',
      msg: '查询成功！'
    },
  }
})
/**
 * 区域平均分
 */
Mock.mock('/brand/getMemberRadarAvgData', 'get', (option) => {
  JSON.parse(option.body)
  return {
    code: 200,
    data: getMemberRadarAvgData,
  }
})
