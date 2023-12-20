import { request } from '@/utils/axios'

export const getTableData = () => {
  return request({
    url: '/data/list',
    method: 'get',
  })
}

/**
 * 会员属性分析
 */
export const getProvinceCount = () => {
  return request({
    url: '/brand/getProvinceCount',
    method: 'get',
  })
}

/**
 * 职业分布、性别比、烟龄段、年龄段
 */
export const getProfessionData = () => {
  return request({
    url: '/brand/getProfessionData',
    method: 'get',
  })
}

/**
 * 用户画像标签
 */
export const getUserTabData = () => {
  return request({
    url: '/brand/getUserTabData',
    method: 'get',
  })
}
/**
 *
 */
export const getActivityAmountData = () => {
  return request({
    url: '/brand/getActivityAmountData',
    method: 'get',
  })
}
/**
 * 品牌销售排行
 */
export const getSalesRankingData = () => {
  return request({
    url: '/brand/getSalesRankingData',
    method: 'get',
  })
}
/**
 * 品牌销售趋势
 */
export const getSalesTrendData = () => {
  return request({
    url: '/brand/getSalesTrendData',
    method: 'get',
  })
}
/**
 * 会员发展数据
 * 参数传type=7 , 14 ,30
 */
export const getMemberData = (param) => {
  return request({
    url: '/brand/getMemberData',
    method: 'get',
    data :param,
  })
}
/**
 * 近期新增会员列表
 */
export const getNewMemberData = () => {
  return request({
    url: '/brand/getNewMemberData',
    method: 'get',
  })
}
/**
 * 会员雷达图
 * 参数 keyword 过滤昵称，返回匹配的前10条
 */
export const getMemberRadarData = (param) => {
  return request({
    url: '/brand/getMemberRadarData',
    method: 'get',
    data: param,
  })
}
/**
 * 区域平均分
 */
export const getMemberRadarAvgData = () => {
  return request({
    url: '/brand/getMemberRadarAvgData',
    method: 'get',
  })
}
