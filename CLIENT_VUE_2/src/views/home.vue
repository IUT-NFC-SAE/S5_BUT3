<script>

import {mapActions} from "vuex";

export default {
  methods:{
    ...mapActions(['goTo'])
  }
}
</script>

<template>
  <div>
    <v-btn
        v-on:click="goTo('/modules')"
        text="Modules"
        color="primary"
    />
  </div>
</template>

<style scoped>
div{
  text-align: center;
}
</style>