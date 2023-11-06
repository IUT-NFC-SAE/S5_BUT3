<template>
  <div style="background: red">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div>
        <UInput @change="email = $event.value" color="sky" variant="outline" name="input" placeholder="E-mail" />
      </div>
      <div>
        <UInput @change="email = $event.value" color="sky" variant="outline" name="input" placeholder="Mot de passe" />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Vous pouvez ajouter ici la logique d'authentification, par exemple, en utilisant une API
      console.log("Email:", this.email);
      console.log("Mot de passe:", this.password);
      // Réinitialisez les champs après la soumission du formulaire
      this.email = "";
      this.password = "";
    },
  },
};
</script>
