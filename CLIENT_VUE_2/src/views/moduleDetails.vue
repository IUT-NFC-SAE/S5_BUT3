<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import MeasuresChart from "@/components/display/measuresChart.vue";

export default {
  components: {MeasuresChart},
  props:['id'],
  computed:{
    ...mapState('databaseModule',['modules','measures']),
    ...mapGetters('databaseModule',['getModuleCaps']),
    module(){
      return this.modules.filter(module => module._id === this.id)[0]
    }
  },
  data(){
    return{
      load: true
    }
  },
  methods:{
    ...mapMutations('databaseModule',['clearMeasures']),
    ...mapActions(['goTo']),
    ...mapActions('databaseModule',['getMeasures']),
  },
  async mounted() {
    await this.getMeasures({key: this.module.key})
    this.load = false
  }
}
</script>

<template>
  <div>
    <div class="container">
      <v-btn
          @click="goTo('/modules')"
          icon="mdi-arrow-left-thick"
          size="x-small"
          variant="text"
      />
      <h1>{{ module.name }}</h1>
    </div>
    <div
        v-if="!load"
        class="bg-surface chartContainer"
    >
      <MeasuresChart
          :data="measures"
          :types="getModuleCaps(module)"
      />
    </div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.chartContainer{
  border-radius: 20px;
  padding: 10px;
  height: auto;
  width: 92vw;
  margin-left: 4vw;
  margin-top: 20px;
}
@media screen and (min-width: 1000px) {
  .chartContainer{
    width: 70vw;
    margin-left: 15vw;
  }
}
</style>