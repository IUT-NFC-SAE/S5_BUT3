<script>
import appBar from "@/components/navigation/appBar.vue";
import { mapMutations, mapState } from "vuex";
import { useTheme } from "vuetify";
import LoginForm from "@/components/navigation/LoginForm.vue";

export default {
  components: {
    appBar,
    LoginForm,
  },
  beforeMount() {
    const theme = useTheme().global.current.value;
    this.setTheme(theme);
  },
  computed: {
    ...mapState('userModule', ['user'])
  },
  methods: {
    ...mapMutations(['setTheme']),
    toggleLoginForm() {
      this.$refs.loginForm.toggleLoginModal(); // Call the method in the LoginForm component
    }
  }
}
</script>

<template>
  <div id="app">
    <v-app>
      <appBar />
      <v-main>
        <router-view v-if="user" />
        <v-btn v-if="!user" @click="toggleLoginForm" text="Connexion" />
        <LoginForm ref="loginForm"  />
      </v-main>
      <v-footer>
        <v-row justify="center" no-gutters>
          2024 - IUTBM Informatique BUT3 S5 SAE
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<style scoped>
/* Add any styling if needed */
</style>
