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
    /*async getMeasure({commit}, ){
      console.log("getMeasure")
      try {
        const response = await axios.get('http://localhost:4567/weatherapi/measure/get', {

        })
        const measures = response.data.measures;

      } catch (error) {
        console.error('Get Measure failed:', error);
        throw error; // Re-throw the error for the component to handle
      }
    },*/
  },
  modules: {
  }
})
