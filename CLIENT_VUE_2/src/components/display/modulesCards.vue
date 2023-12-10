<script>
import router from "@/router";

export default {
  props: ['modules'],
  computed:{
    filteredModules(){
      return this.modules.filter(module => {
        return this.selectedCaps.every(item => this.moduleCaps(module).includes(item));
      })
    },
  },
  data(){
    return{
      allCaps: [],
      selectedCaps: [],
      showFilter: false
    }
  },
  methods: {
    goTo(path) {
      window.location.href = path;
    },
    moduleCaps(module){
      let caps = []
      module.chipsets.forEach(chipset => {
        chipset.caps.forEach(cap => {
          if(!caps.includes(cap)) caps.push(cap)
          if(!this.allCaps.includes(cap)) this.allCaps.push(cap)
        })
      })
      return caps;
    },
    capIcon(cap){
      let icon = {name: 'mdi-help', color: 'grey'}
      if(cap === "humidity") icon = {name: 'mdi-water-percent', color: 'blue'}
      else if(cap === "temperature") icon = {name: 'mdi-thermometer', color: 'red'}
      else if(cap === "pressure") icon = {name: 'mdi-car-brake-low-pressure', color: 'green'}
      else if(cap === "brightness") icon = {name: 'mdi-lightbulb-on-outline', color: 'yellow'}
      return icon
    }
  }
}
</script>

<template>
  <div>
    <div class="container">
      <h1>Modules</h1>
      <v-btn
          @click="showFilter = !showFilter;"
          :icon="showFilter ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          size="x-small"
      />
    </div>
    <div class="filters" v-if="showFilter">
      <v-select
          v-model="selectedCaps"
          :items="allCaps"
          label="Type de capteurs"
          variant="outlined"
          multiple
          chips
          clearable
      />
    </div>
    <div class="cards-container">
      <v-card
          v-for="module in filteredModules"
          :key="module.key"
          class="card"
          v-on:click="goTo('/module/'+module._id)"
      >
        <v-card-title>{{ module.name }}</v-card-title>
        <v-card-subtitle>{{ module.uc }}</v-card-subtitle>
        <v-card-subtitle>{{ module.key }}</v-card-subtitle>
        <v-card-item>
          <v-avatar
              v-for="chipset in module.chipsets"
              :key="chipset._id"
              :image="chipset.image"
              v-on:click="goTo(chipset.links[0])"
              class="mr-2"
          />
        </v-card-item>
        <v-card-text>
          <v-btn
              v-for="cap in moduleCaps(module)"
              size="small"
              rounded
              variant="text"
          >
            <v-icon
                :icon="capIcon(cap).name"
                :color="capIcon(cap).color"
            />
            <v-tooltip
                activator="parent"
                location="bottom"
                :text="cap"
            />
          </v-btn>
        </v-card-text>
      </v-card>
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
.filters{
  width: 90vw;
  margin-left: 5vw;
}
</style>
