import axios from 'axios';

export default {
    namespaced: true,
    state: {

    },
    mutations: {

    },
    getters: {
        
    },
    actions: {
        async loginUser({ commit }, user) {
            console.log("test ");
            try {
                const response = await axios.post('http://localhost:4567/weatherapi/auth/signin', {
                login: user.login,
                password: user.password,
                });
                const token = response.data.data.token;
                console.log(response);
                commit('setAuthToken', token);
                return token; // Return the token for potential further use
            } catch (error) {
                console.error('Login failed:', error);
                throw error; // Re-throw the error for the component to handle
            }
        },
    }
}
