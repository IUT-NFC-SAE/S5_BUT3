import { createRouter, createWebHistory } from 'vue-router';
import home from "@/views/home.vue";
import moduleDetails from "@/views/moduleDetails.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: home,
    },
    {
        path: '/module/:id',
        name: 'ModuleDetails',
        component: moduleDetails,
        props: true,
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
