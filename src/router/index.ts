
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
{
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
{
        path: '/login',
        name: 'login',
        component: () => import('@/pages/LoginPage.vue')
    },

    {
        path: '/catalog',
        name: 'catalog',
        component: () => import('@/pages/CatalogPage.vue')
    },

    {
        path: '/product',
        name: 'product',
        component: () => import('@/pages/ProductPage.vue')
    },

    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/pages/CartPage.vue')
    },

    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('@/pages/CheckoutPage.vue')
    },
    ]}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})