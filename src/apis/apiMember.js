import { request } from '@/utils/axios'

// 零售户会员培育情况
export const getCultivate = () => {
  return request({
    url: '/member/getCultivate',
    method: 'get',
  })
}

// 会员分布情况
export const getDistribution = () => {
  return request({
    url: '/member/getDistribution',
    method: 'get',
  })
}

// 会员消费品类销售占比
export const getSalesRatio = () => {
  return request({
    url: '/member/getSalesRatio',
    method: 'get',
  })
}

// 会员新增走势
export const getAddTrend = () => {
  return request({
    url: '/member/getAddTrend',
    method: 'get',
  })
}

// 零售户拓展会员数排名
export const getSranking = () => {
  return request({
    url: '/member/getSranking',
    method: 'get',
  })
}

// 零售户总数  会员总数
export const getRetailMember = () => {
  return request({
    url: '/member/getRetailMember',
    method: 'get',
  })
}
