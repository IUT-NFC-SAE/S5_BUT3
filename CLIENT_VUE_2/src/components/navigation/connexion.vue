<script>
import {mapMutations, mapState} from "vuex";
import loginForm from "./LoginForm.vue";
export default {
  methods:{
    ...mapMutations(['setUser'])
  },
  data: {
    showLogin
  }
}
</script>

<template>
  <div>
    <v-btn
        v-on:click=""
        text="Connexion"
    />
  </div>
</template>

<style scoped>
div{
  text-align: center;
}
</style>