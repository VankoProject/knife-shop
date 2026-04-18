import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/',
    component: () => import('@/app/layouts/MainLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/login/ui/LoginPage.vue'),
      },
      {
        path: 'catalog',
        name: 'catalog',
        component: () => import('@/pages/catalog/ui/CatalogPage.vue'),
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('@/pages/product/ui/ProductPage.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/pages/cart/ui/CartPage.vue'),
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import('@/pages/checkout/ui/CheckoutPage.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})