import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: null,
  },
  getters: {
    processedAuthToken: (state) => {
    // Perform any processing or transformation here
      return state.authToken;
    },
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
  },
  actions: {
    async login({ commit }, user) {
      console.log("test ");
      try {
        const response = await axios.post('your_api_endpoint', {
          email: user.email,
          password: user.password,
        });
        const token = response.data.token;
        commit('setAuthToken', token);
        return token; // Return the token for potential further use
      } catch (error) {
        console.error('Login failed:', error);
        throw error; // Re-throw the error for the component to handle
      }
    },
  },
  modules: {
  }
})
