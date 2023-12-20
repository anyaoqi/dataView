import { createApp } from 'vue'
import pinia from '@/store/index.js'
import App from './App.vue'
import router from './router'
import DataVVue3 from '@kjgl77/datav-vue3'
import VScaleScreen from 'v-scale-screen'
import VChart from 'vue-echarts'
import WrapperTitle from '@/components/WrapperTitle/WrapperTitle.vue'
import Header from '@/components/Header/Header.vue'
import ScrollRankingBoard from '@/components/ScrollRankingBoard/ScrollRankingBoard.vue'
import 'ant-design-vue/dist/reset.css'
import '@/assets/styles/main.scss'
import 'echarts' // 全局引入
import '@/mock/index'
import 'swiper/css'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(DataVVue3)
// 全局组件注册
app.component('VScaleScreen', VScaleScreen)
app.component('WrapperTitle', WrapperTitle)
app.component('ScrollRankingBoard', ScrollRankingBoard)
// eslint-disable-next-line vue/no-reserved-component-names
app.component('Header', Header)
app.component('VChart', VChart)

app.mount('#app')
