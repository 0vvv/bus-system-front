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
  {
    path: '/alltimetableofstation',
    name:'alltimetableofstation',
    component: () => import ("@/views/alltimetableofstation"),
  },
  {
    path: '/timetableforline',
    name:'timetableforline',
    component: () => import ("@/views/timetableforline"),
  },
  {
    path: '/DirectPathByRoute',
    name:'DirectPathByRoute',
    component: () => import ("@/views/DirectPathByRoute"),
  },
  {
    path: '/DirectRoute',
    name:'DirectRoute',
    component: () => import ("@/views/DirectRoute"),
  },
  {
    path: '/ManageLine',
    name:'ManageLine',
    component: () => import ("@/views/ManageLine"),
  },
  {
    path: '/notRepeating',
    name:'notRepeating',
    component: () => import ("@/views/notRepeating"),
  },
  {
    path: '/findonewaystation',
    name:'findonewaystation',
    component: () => import ("@/views/findonewaystation"),
  },
  {
    path: '/deleteline',
    name:'deleteline',
    component: () => import ("@/views/deleteline"),
  },
  {
    path: '/replaceline',
    name:'replaceline',
    component: () => import ("@/views/replaceline"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
