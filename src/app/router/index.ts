import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from 'vue-router'
import { ROUTES } from '@/shared/constants'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/',
    component: () => import('@/app/layouts/MainLayout.vue'),
    children: [
      {
        path: 'login',
        name: ROUTES.LOGIN,
        component: () => import('@/pages/login'),
        meta: { hideHeader: true }
      },
      {
        path: 'catalog',
        name: ROUTES.CATALOG,
        component: () => import('@/pages/catalog')
      },
      {
        path: 'product/:id',
        name: ROUTES.PRODUCT,
        component: () => import('@/pages/product')
      },
      {
        path: 'cart',
        name: ROUTES.CART,
        component: () => import('@/pages/cart')
      },
      {
        path: 'checkout',
        name: ROUTES.CHECKOUT,
        component: () => import('@/pages/checkout')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
