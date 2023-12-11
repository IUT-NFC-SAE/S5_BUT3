<script>
import {mapMutations, mapState} from "vuex";

export default {
  methods:{
    ...mapMutations(['setUser'])
  }
}
</script>

<template>
  <div>
    <v-btn
        v-on:click="setUser({name: 'Username', role:'user'})"
        text="Connexion"
    />
  </div>
</template>

<style scoped>
div{
  text-align: center;
}
</style>