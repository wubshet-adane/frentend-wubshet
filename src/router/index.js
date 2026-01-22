import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/slug',
      name: 'slug',
      component: () => import('../views/SlugView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu-items',
      name: 'menuItems',
      component: () => import('@/views/MenuItemsView.vue'),
      meta: { requiresAuth: true },
    },
    {
  path: '/menu/:serviceProviderSlug',
  name: 'PublicMenu',
  component: () => import('@/views/PublicMenu.vue')
}
  ],
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  const requiresAuth = to.matched.some(record => record.meta && record.meta.requiresAuth)
  const token = localStorage.getItem('auth_token')

  if (requiresAuth && !token) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if ((to.name === 'login' || to.name === 'register') && token) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
