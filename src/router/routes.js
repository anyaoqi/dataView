const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/member',
    component: () => import('../views/home/home.vue'),
  },
  // 会员推广
  {
    path: '/member',
    name: 'member',
    component: () => import('../views/member/member.vue'),
  },
  // 积分情况
  {
    path: '/integral',
    name: 'integral',
    component: () => import('../views/integral/integral.vue'),
  },
  // 品牌培育
  {
    path: '/brand',
    name: 'brand',
    component: () => import('../views/brand/brand.vue'),
  },
  // 安装情况
  {
    path: '/install',
    name: 'install',
    component: () => import('../views/install/install.vue'),
  },
]

export default routes
