// 引用 Mock
import Mock from 'mockjs'
import data from './data/data.json5'
import expandMember from './data/expandMember.json'
import cigaData from './data/salesRatio.json5'

const { cultivate, distribution, salesRatio, addTrend, retailMember } = data

// 零售户会员培育情况
Mock.mock('/member/getCultivate', 'get', {
  data: cultivate,
  code: 200,
  message: '请求成功',
})

// 会员分布情况
Mock.mock('/member/getDistribution', 'get', {
  data: distribution,
  code: 200,
  message: '请求成功',
})

// 会员消费品类销售占比
Mock.mock('/member/getSalesRatio', 'get', {
  cigaData: cigaData,
  data: salesRatio,
  code: 200,
  message: '请求成功',
})

// 会员新增走势
Mock.mock('/member/getAddTrend', 'get', {
  data: addTrend,
  code: 200,
  message: '请求成功',
})

// 零售户拓展会员数排名
Mock.mock('/member/getSranking', 'get', {
  data: {
    list: expandMember,
    column: ['许可证号', '零售户名称', '总拓展会员数', '当月活跃会员数'],
  },
  code: 200,
  message: '请求成功',
})

// 零售户总数 会员总数
Mock.mock('/member/getRetailMember', 'get', {
  data: retailMember,
  code: 200,
  message: '请求成功',
})
