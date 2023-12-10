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
    getters: {
        getAllCaps: (state) => () => {
            const caps = new Set();
            state.modules.forEach(module => {
                module.chipsets.forEach(chipset => {
                    chipset.caps.forEach(cap => {
                        caps.add(cap);
                    });
                });
            });
            return Array.from(caps);
        },
        getModuleCaps: (state) => (module) => {
            let caps = [];
            module.chipsets.forEach(chipset => {
                chipset.caps.forEach(cap => {
                    if (!caps.includes(cap)) caps.push(cap);
                });
            });
            return caps;
        },
        getCapIcon: (state) => (cap) => {
            let icon = {name: 'mdi-help', color: 'grey'}
            if(cap === "humidity") icon = {name: 'mdi-water-percent', color: 'blue'}
            else if(cap === "temperature") icon = {name: 'mdi-thermometer', color: 'red'}
            else if(cap === "pressure") icon = {name: 'mdi-car-brake-low-pressure', color: 'green'}
            else if(cap === "brightness") icon = {name: 'mdi-lightbulb-on-outline', color: 'yellow'}
            return icon
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
