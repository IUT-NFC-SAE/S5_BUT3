<script>
import {mapActions, mapMutations, mapState} from "vuex";
import MeasuresChart from "@/components/display/measuresChart.vue";

export default {
  components: {MeasuresChart},
  props:['id'],
  computed:{
    ...mapState('databaseModule',['modules','measures']),
    module(){
      return this.modules.filter(module => module._id === this.id)[0]
    }
  },
  methods:{
    ...mapMutations('databaseModule',['clearMeasures']),
    ...mapActions('databaseModule',['getMeasures']),
    moduleCaps(module){
      let caps = []
      module.chipsets.forEach(chipset => {
        chipset.caps.forEach(cap => {
          if(!caps.includes(cap)) caps.push(cap)
        })
      })
      return caps;
    },
  },
  mounted() {
    this.getMeasures({key: this.module.key})
  },
  beforeUnmount() {
    this.clearMeasures()
  }
}
</script>

<template>
  <div>
    <h1>{{ module.name }}</h1>
    <MeasuresChart :data="measures" :types="moduleCaps(module)"/>
  </div>
</template>

<style scoped>

</style>