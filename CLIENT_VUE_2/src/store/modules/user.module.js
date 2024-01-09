import axios from 'axios';

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
        clearUser(state) {
            console.log("Clear user");
            state.user = null
        }
    },
    getters: {
        processedAuthToken: (state) => {
            // Perform any processing or transformation here
            return state.authToken;
        },
        getUser: (state) => {
            return state.user;
        }
    },
    actions: {
        async loginUser({ commit }, user) {
            console.log("test ");
            try {
                const response = await axios.post('http://localhost:4567/weatherapi/auth/signin', {
                login: user.login,
                password: user.password,
                });
                const token_res = response.data.data.token;
                const user_res = response.data.data.user;
                console.log(response);
                commit('setAuthToken', token_res);
                commit('setUser', user_res)
                return token_res; // Return the token for potential further use
            } catch (error) {
                console.error('Login failed:', error);
                throw error; // Re-throw the error for the component to handle
            }
        },
    }
}
