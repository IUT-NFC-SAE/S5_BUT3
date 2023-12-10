import { createRouter, createWebHistory } from 'vue-router';
import home from "@/views/home.vue";
import moduleDetails from "@/views/moduleDetails.vue";
import modules from "@/views/modules.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: home,
    },
    {
        path: '/modules',
        name: 'Modules',
        component: modules,
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
