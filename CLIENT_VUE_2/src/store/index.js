import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import popupModule from "@/store/modules/popup.module";
import databaseModule from "@/store/modules/database.module";

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

    },
    getters: {

    },
    modules: {
        popupModule,
        databaseModule
    },
    plugins: [createPersistedState()],
});

export default store;
