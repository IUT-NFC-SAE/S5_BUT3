import './assets/styles/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import store from "@/store";
import VueCookies from "vue-cookies";

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(store);
app.use(VueCookies);

store.commit('setTheme', vuetify.theme.global.current.value);

app.mount('#app');