import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import { CALPIS_SIGN } from '@/utils/storage';
import store from '@/store';

const baseURL =
  process.env.NODE_ENV === 'production' ? '/calpishappykid2022/' : '/';

export const routes = [
  {
    path: baseURL,
    name: 'home',
    component: Home,
  },
  {
    path: baseURL + 'register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: baseURL + 'serial-number',
    name: 'serial-number',
    component: () => import('@/views/SerialNumber'),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: baseURL + 'exchange',
    name: 'exchange',
    component: () => import('@/views/Exchange'),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: baseURL + 'winning',
    name: 'winning',
    component: () => import('@/views/Winning'),
  },
  {
    path: baseURL + 'activity',
    name: 'activity',
    component: () => import('@/views/Activity'),
  },
  {
    path: baseURL + 'where-to-buy',
    name: 'where-to-buy',
    component: () => import('@/views/WhereToBuy'),
  },
  {
    path: baseURL + 'coming-soon',
    name: 'coming-soon',
    component: () => import('@/views/ComingSoon'),
  },
  {
    path: baseURL + ':pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to) => {
  if (store.state.auth.user) {
    localStorage.setItem(CALPIS_SIGN, true);
    sessionStorage.setItem(CALPIS_SIGN, true);
  }

  // 頁面需登入後才能顯示
  if (to.meta.requestAuth && !localStorage.getItem(CALPIS_SIGN)) {
    if (sessionStorage.getItem(CALPIS_SIGN)) {
      return localStorage.setItem(CALPIS_SIGN, true);
    }
    // 未登入,引導到首頁
    return {
      name: 'home',
      // 帶入redirect參數,以利使用者登入後引導至欲前往頁面
      // query: { redirect: to.fullPath },
    };
  }
});

router.afterEach(() => {
  window.gtag('js', new Date());
  // 客戶GA
  window.gtag('config', 'G-L03T8C697X');
});

export default router;
