<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: ['modules'],
  computed:{
    ...mapGetters('databaseModule',['getAllCaps','getModuleCaps','getCapIcon']),
    filteredModules(){
      return this.modules.filter(module => {
        return this.selectedCaps.every(item => this.getModuleCaps(module).includes(item));
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
    ...mapActions(['goTo'])
  },
  created() {
    this.allCaps = this.getAllCaps();
  },
}
</script>

<template>
  <div>
    <div class="container">
      <v-btn
          @click="goTo('/')"
          icon="mdi-arrow-left-thick"
          size="x-small"
          variant="text"
      />
      <h1>Modules</h1>
      <v-btn
          @click="showFilter = !showFilter;"
          :icon="showFilter ? 'mdi-filter-off' : 'mdi-filter-menu'"
          size="x-small"
          color="primary"
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
              v-for="cap in getModuleCaps(module)"
              size="small"
              rounded
              variant="text"
          >
            <v-icon
                :icon="getCapIcon(cap).name"
                :color="getCapIcon(cap).color"
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
