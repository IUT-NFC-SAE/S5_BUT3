<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'imagesAnalyzes',
  computed:{
    ...mapState('databaseModule',['analyzes'])
  },
  methods:{
    ...mapActions('databaseModule',['getAllAnalyzes'])
  },
  beforeMount() {
    this.getAllAnalyzes()
  }
}
</script>

<template>
  <div>
    <v-card
        v-if="analyzes.length > 0"
        v-for="analysis in analyzes"
        width="200px"
    >
      <v-card-title>{{analysis.value}}</v-card-title>
      <v-card-subtitle>{{analysis.percent}}%</v-card-subtitle>
      <v-img :src="analysis.image" width="200px"></v-img>
    </v-card>
    <h1 v-else class="text-error">No image analyses</h1>
  </div>
</template>

<style scoped>

</style>