<script>

import {mapActions} from "vuex";
import MeasuresSynthese from "@/components/display/measuresSynthese.vue";

export default {
  components: {MeasuresSynthese},
  methods:{
    ...mapActions(['goTo'])
  }
}
</script>

<template>
  <div>
    <MeasuresSynthese/>
    <v-btn
        v-on:click="goTo('/modules')"
        text="Modules"
        color="primary"
        class="mt-2"
    />
  </div>
</template>

<style scoped>
div{
  text-align: center;
}
</style>