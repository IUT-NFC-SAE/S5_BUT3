import {postRequest} from "@/services/axios.service";
import router from "@/router";

export default {
    namespaced: true,
    state: {
        user: null,
        authToken: null,
    },
    mutations: {
        setAuthToken(state, token) {
            state.authToken = token;
        },
        setUser(state, user) {
            state.user = user
        },
        signOut(state) {
            state.user = null
            router.push("/auth");
        }
    },
    actions: {
        async signIn({ state, commit }, {login,password}) {
            const response = await postRequest('/auth/signin', {
                login,
                password,
            });
            const user = response.data.user
            const token = response.data.token;
            commit('setUser', user)
            commit('setAuthToken', token);
            router.push("/");
        },
    }
}
