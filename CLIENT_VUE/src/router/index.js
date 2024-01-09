import { createRouter, createWebHistory } from 'vue-router';
import home from "@/views/home.vue";
import moduleDetails from "@/views/moduleDetails.vue";
import modules from "@/views/modules.vue";
import authentication from "@/views/authentication.vue";
import store from '@/store';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: home,
    },
    {
        path: '/auth',
        name: 'Authentication',
        component: authentication,
    },
    {
        path: '/modules',
        name: 'Modules',
        component: modules,
        meta: { rights: ['admin'] }
    },
    {
        path: '/module/:id',
        name: 'ModuleDetails',
        component: moduleDetails,
        props: true,
        meta: { rights: ['admin'] }
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

router.beforeEach((to,from,next) => {
    const user = store.state.userModule.user

    // Check User Authentication
    if (to.path !== '/auth' && !user) {
        store.commit('popupModule/setError', "L'utilisateur n'est pas authentifié !")
        next('/auth');
    }
    if(to.path === '/auth' && user) next('/');

    // Check User Rights
    if(to.meta.rights){
        const hasAllRights = to.meta.rights.every(right => user.rights.includes(right));
        if(!hasAllRights) {
            store.commit('popupModule/setError', `Vous n'avez pas les droits requis [${to.meta.rights.toString()}]`)
            next('/')
        }
    }

    next()
});

export default router;
