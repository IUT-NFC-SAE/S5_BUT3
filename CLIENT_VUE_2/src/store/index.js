import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import popupModule from "@/store/modules/popup.module";
import databaseModule from "@/store/modules/database.module";
import toolsModule from "@/store/modules/tools.module";
import userModule from "@/store/modules/user.module";
import router from "@/router";

const store = new Vuex.Store({
    state: {
        currentTheme: null,
        user: null
    },
    mutations: {
        setTheme(state, theme) {
            state.currentTheme = theme;
            localStorage.setItem('theme', theme.dark ? 'darkTheme' : 'lightTheme');
        },
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state){
            state.user = null;
        }
    },
    actions: {
        goTo(context, path) {
            router.push(path);
        },
    },
    getters: {

    },
    modules: {
        popupModule,
        databaseModule,
        toolsModule,
        userModule
    },
    plugins: [createPersistedState()],
});

export default store;
