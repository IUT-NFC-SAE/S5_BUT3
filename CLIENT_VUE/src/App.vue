<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left rounded>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="font-weight: bold; padding: 10px">Meteo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn style="background-color: #275E35" text color="white" @click="showLoginModal = true">Login</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="(item, i) in menuItems" :key="i" :to="item.path" :exact="true" :router="true"
          @click="drawer = false">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      
      <!-- Use v-if to conditionally render LoginForm -->
      <LoginForm v-if="showLoginModal" @close="showLoginModal = false"></LoginForm>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import axios from 'axios';

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      authenticated: false,
      email: '',
      password: '',
      login: '',
      showLoginModal: false,
      showRegisterForm: true,
      drawer: false,
      menuItems: [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'Stats', path: '/stats' },
      ]
    };
  },
  methods: {
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    async authentication() {
      this.authenticated = await axios.post('http://localhost:4567/auth/signin', {
        login: this.login,
        password: this.password
      });
    },
  },
};
</script>
