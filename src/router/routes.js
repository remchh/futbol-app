
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: {
        KeepAlive: true // Need to be cached
      } },
      { path: '/about', component: () => import('pages/AboutPage.vue'), name: 'About' },
      { path: '/help', component: () => import('pages/HelpPage.vue'), name: 'Help' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
