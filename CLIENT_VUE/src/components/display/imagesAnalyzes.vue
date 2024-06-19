<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'imagesAnalyzes',
  computed:{
    ...mapState('databaseModule',['analyzes']),
    sortedAnalyzes(){
      return this.analyzes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  methods:{
    ...mapActions('databaseModule',['getAllAnalyzes']),
    formatDate(dateString) {
      let date = new Date(dateString);
      date.setHours(date.getHours() - 2);
      let options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Europe/Paris'
      };
      return date.toLocaleString('fr-FR', options);
    }
  },
  beforeMount() {
    this.getAllAnalyzes()
  }
}
</script>

<template>
  <div class="container">
    <div
        v-if="analyzes.length > 0"
        class="cards-container"
    >
      <v-hover
          v-for="analysis in sortedAnalyzes"
      >
          <template v-slot:default="{ isHovering, props }">
            <v-card
                v-bind="props"
                :color="undefined"
            >
              <v-img
                  height="200px"
                  :src="analysis.image"
                  cover
              ></v-img>
              <v-card-title>{{formatDate(analysis.date)}}</v-card-title>
              <v-card-subtitle>
                {{analysis.value}}
                <v-chip density="compact" color="secondary">{{ analysis.percent }} %</v-chip>
              </v-card-subtitle>
            </v-card>
          </template>
        </v-hover>
    </div>

    <h3 v-else>Aucune image n'as encore été analysée.</h3>
  </div>
</template>

<style scoped>
.container{
  width: 90%;
  margin-left: 5%;
}
.cards-container{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 30px;
}
</style>