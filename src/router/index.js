import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";

import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    props: true,
  },
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "DestinationDetails" */ "@/views/DestinationDetails"
      ),
    children: [
      {
        path: ":experienceSlug",
        name: "ExperienceDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "ExperienceDetails" */ "@/views/ExperienceDetails"
          ),
      },
    ],
    beforeEnter: (to, from, next) => {
      const exist = store.destinations.find(
        (destination) => destination.slug === to.params.slug
      );

      if (exist) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "User" */ "@/views/UserView"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/LoginView"),
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () =>
      import(/* webpackChunkName: "Invoices" */ "@/views/InvoicesView"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/404",
    alias: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "@/views/NotFound"),
  },
];

const router = createRouter({
  linkExactActiveClass: "vue-school-active-class",
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = { behavior: "smooth" };

      if (to.hash) {
        position.el = to.hash;

        if (to.hash === "#experience") {
          position.top = 140;
        }

        if (document.querySelector(to.hash)) {
          return position;
        }

        return false;
      }
    }
  },
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // need to login
    if (!store.user) {
      next({ name: "login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
