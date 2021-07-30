import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../pages/Home.vue"),
        props: {},
    },
    {
        path: "/shop",
        name: "Shop",
        component: () => import("../pages/Shop.vue"),
        props: {},
    },
    {
        path: "/shop/detail/:id",
        name: "Shop Detail",
        component: () => import("../pages/ShopDetail.vue"),
        props: {},
    },
    {
        path: "/dorayaki",
        name: "Dorayaki",
        component: () => import("../pages/Dorayaki.vue"),
        props: {},
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    mode: "history",
    routes,
});

export default router;
