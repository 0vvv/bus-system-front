import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/RouteBasicInfo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children : [
      {
        path: 'RouteBasicInfo',
        name:'RouteBasicInfo',
        component: () => import ("@/views/RouteBasicInfo"),
      }

    ]
  },
  {
    path: '/stationofline',
    name:'stationofline',
    component: () => import ("@/views/stationofline"),
  },
  {
    path: '/lineofstation',
    name:'lineofstation',
    component: () => import ("@/views/lineofstation"),
  },
  {
    path: '/findstations',
    name:'findstations',
    component: () => import ("@/views/findstations"),
  },
  {
    path: '/findlines',
    name:'findlines',
    component: () => import ("@/views/findlines"),
  },
  {
    path: '/duplicatestations',
    name:'duplicatestations',
    component: () => import ("@/views/duplicatestations"),
  },
  {
    path: '/transferline',
    name:'transferline',
    component: () => import ("@/views/transferline"),
  },
  {
    path: '/timetablewithrange',
    name:'timetablewithrange',
    component: () => import ("@/views/timetablewithrange"),
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
