<script>
import {mapActions, mapGetters, mapState} from "vuex";
import MeasuresChart from "./measuresChart.vue";

export default {
  components: {MeasuresChart},
  async created() {
    await this.getAllModules();
    this.meanTemperatue = await this.getMeanValue('temperature')
    this.meanHumidity = await this.getMeanValue('humidity')
    this.meanPressure = await this.getMeanValue('pressure')
    this.meanBrightness = await this.getMeanValue('brightness')
    this.infos = [
      {title: 'Température', text:'Température moyenne actuelle', value:`${this.meanTemperatue}°C`, icon:'mdi-thermometer'},
      {title: 'Humidité', text:'Humidité moyenne actuelle', value:`${this.meanHumidity}%`, icon:'mdi-water-percent'},
      {title: 'Pression', text:'Pression atmosphérique moyenne actuelle', value:`${this.meanPressure.toFixed(1)}`, icon:'mdi-car-brake-low-pressure'},
      {title: 'Luminosité', text:'Luminosité moyenne actuelle', value:`${this.meanBrightness.toFixed(1)}`, icon:'mdi-lightbulb-on-10'},
    ]
    this.selectedModuleKey = this.modules[0].key
    setInterval(() => {
      this.time = this.getTime();
    }, 1000);
  },
  computed:{
    ...mapState('databaseModule',['modules','measures']),
    ...mapGetters('databaseModule',['getModuleCaps']),
    ...mapGetters('toolsModule',['getCurrentDate']),
    selectedModule(){
      return this.selectedModuleKey ? this.modules.find(module => module.key === this.selectedModuleKey) : null;
    }
  },
  methods:{
    ...mapActions(['goTo']),
    ...mapActions('databaseModule',['getAllModules','getMeasures','getMeanValue']),
    getTime(){
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    async fetchMeasuresSelectedModule(){
      this.loadSelectedModuleMeasure = true
      this.getMeasures({key:this.selectedModuleKey})
      this.loadSelectedModuleMeasure = false
    }
  },
  data(){
    return{
      time: this.getTime(),
      meanTemperatue: "...",
      meanHumidity: "...",
      meanPressure: "...",
      meanBrightness: "...",
      selectedModuleKey: null,
      loadSelectedModuleMeasure: true,
      infos:[]
    }
  },
  watch:{
    selectedModuleKey(){
      this.fetchMeasuresSelectedModule()
    }
  }
}
</script>

<template>
  <div>
    <div class="flex-container">
      <div class="container bg-cloud">
        <div class="row">
          <h1 class="big">{{ meanTemperatue }}°</h1>
          <h1>Belfort</h1>
        </div>
        <div class="row">
          <h3>{{ getCurrentDate }},</h3>
          <h5>{{ time }}</h5>
        </div>
        <v-virtual-scroll
            :height="auto"
            :items="infos"
        >
          <template v-slot:default="{ item }">
            <v-list-item
                :title="item.title"
                :subtitle="item.text"
                class="bg-surface info"
            >
              <template v-slot:prepend>
                <v-avatar color="primary" size="x-large">{{item.value}}</v-avatar>
              </template>
              <template v-slot:append>
                <v-icon>{{item.icon}}</v-icon>
              </template>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </div>

      <br/>

      <div class="container bg-surface">
        <h2 class="bg-primary">Données météorologiques</h2>
        <v-select
            v-model="selectedModuleKey"
            :items="modules"
            item-title="name"
            item-value="key"
            label="Module"
            variant="outlined"
        />
        <div v-if="selectedModuleKey && !loadSelectedModuleMeasure">
          <MeasuresChart
              :data="measures"
              :types="getModuleCaps(selectedModule)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.padding{
  width: 90vw;
  margin-left: 5vw;
}
h2{
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 10px;
}
.container {
  text-align: left;
  border-radius: 20px;
  padding: 20px;
}
.flex-container{
  width: 90vw;
  margin-left: 5vw;
  gap: 10px;
}
.bg-cloud{
  background-image: url("../../assets/images/nuages.jpg");
  background-size: cover;
  background-position: center;
}
.row{
  display: flex;
  justify-content: left;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 10px;
  color: white;
}
.info{
  width: 90%;
  max-width: 1000px;
  height: 10vh;
  border-radius: 20px;
  opacity: 80%;
  margin-top: 10px;
  gap: 10px;
}
.big{
  font-size: xxx-large;
}
@media screen and (max-width: 700px)  {
  .loader > * {
    margin-top: 10px;
    width: 100%;
  }
}
@media screen and (min-width: 1000px)  {
  .flex-container{
    display: flex;
  }
  .flex-container > * {
    width: 50%;
  }
}
</style>
