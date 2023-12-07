<template>
  <div style="background: red">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      // Vous pouvez ajouter ici la logique d'authentification, par exemple, en utilisant une API
      console.log("Email:", this.login);
      console.log("Mot de passe:", this.password);
      // Réinitialisez les champs après la soumission du formulaire
      this.login = "";
      this.password = "";
    },
  },
};
</script>
