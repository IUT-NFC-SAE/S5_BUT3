import { createRouter, createWebHistory } from 'vue-router';
import home from "@/views/home.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: home,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
