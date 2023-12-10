import { getRequest } from "@/services/axios.service";

export default {
    namespaced: true,
    state: {
        modules: []
    },
    mutations: {
        setModules(state, modules) {
            state.modules = modules;
        }
    },
    actions: {
        async getAllModules({ commit }) {
            const data = await getRequest("/module/get", "GET_MODULES");
            if(!data.error) commit('setModules', data.data);
        }
    }
}
