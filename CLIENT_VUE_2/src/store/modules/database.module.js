import { getRequest } from "@/services/axios.service";

export default {
    namespaced: true,
    state: {
        modules: [],
        measures: []
    },
    mutations: {
        setModules(state, modules) {
            state.modules = modules;
        },
        setMeasures(state, measures) {
            state.measures = measures;
        },
        clearMeasures(state){
            state.measures = [];
        }
    },
    actions: {
        async getAllModules({ commit }) {
            const data = await getRequest("/module/get", "GET_MODULES");
            if(!data.error) commit('setModules', data.data);
        },
        async getMeasures({ commit }, {key,type,after,until}) {
            if(!key) commit('clearMeasures');
            else {
                let path = `/measure/get?key=${key}`
                if(type) path += `&type=${type}`
                if(after) path += `&after=${after}`
                if(until) path += `&until=${until}`
                const data = await getRequest(path, "GET_MEASURES")
                if(!data.error) commit('setMeasures', data.data);
            }
        }
    }
}
