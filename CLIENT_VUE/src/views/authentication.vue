<script>
import {mapActions} from "vuex";

export default {
    data(){
      return{
        login: null,
        password: null,
        requiredRule: v => !!v || 'Ce champ est requis.',
      }
    },
    methods: {
      ...mapActions('userModule',['signIn']),
      submitSignInForm(){
        if(this.login && this.password)
          this.signIn({login:this.login,password:this.password})
      },
      register(){
        console.log("register")
      }
    }
}
</script>

<template>
  <v-card style="width: 50%; margin-left: 25%">
    <v-toolbar
        color="primary"
        title="Connexion"
        class="text-center"
    />
    <v-card-text>
      <v-form @submit.prevent="submitSignInForm">
        <v-text-field
            v-model="login"
            type="text"
            placeholder="Identifiant"
            :rules="[requiredRule]"
        />
        <v-text-field
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            :rules="[requiredRule]"
        />

        <v-btn type="submit" color="secondary">se connecter</v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center">
      <p>
        Vous n'avez pas encore de compte ?
        <v-btn
            v-on:click="register"
            text
            color="secondary"
        >
          Créer un compte
        </v-btn>
      </p>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>