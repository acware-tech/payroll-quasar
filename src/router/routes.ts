import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'tokens',
        name: 'Tokens',
        component: () => import('pages/UserSettingsPage.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/sigin',
    name: 'Signin',
    component: () => import('src/pages/SigninPage.vue'),
    meta: {
      requiresGuest: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
