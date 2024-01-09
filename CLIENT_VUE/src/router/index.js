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

const checkUser = (to,from,next) => {
    if (to.path !== '/auth' && !store.state.userModule.user) {
        store.commit('popupModule/setError', "L'utilisateur n'est pas authentifié !")
        next('/auth');
    } else if(to.path === '/auth' && store.state.userModule.user) {
        next('/');
    } else {
        next();
    }
}

router.beforeEach(checkUser);

export default router;
