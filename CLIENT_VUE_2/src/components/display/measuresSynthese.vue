<script>
import {mapActions, mapGetters} from "vuex";

export default {
  async created() {
    this.meanTemperatue = await this.getMeanTemperature()
    setInterval(async () => {
      this.meanTemperatue = await this.getMeanTemperature()
    }, 60000);
    setInterval(() => {
      this.time = this.getTime();
    }, 1000);
  },
  computed:{
    ...mapGetters('toolsModule',['getCurrentDate']),
  },
  methods:{
    ...mapActions('databaseModule',['getMeanTemperature']),
    getTime(){
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  },
  data(){
    return{
      time: this.getTime(),
      meanTemperatue: "..."
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <h1 class="big">{{ meanTemperatue }}°</h1>
      <h1>Belfort</h1>
    </div>
    <div class="row">
      <h3>{{ getCurrentDate }},</h3>
      <h5>{{ time }}</h5>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-image: url("../../assets/images/nuages.jpg");
  background-size: cover;
  background-position: center;
  text-align: left;
  width: 90vw;
  height: 50vh;
  margin-left: 5vw;
  border-radius: 20px;
  padding: 20px;
}

.row{
  display: flex;
  justify-content: left;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 10px;
}
.big{
  font-size: xxx-large;
}
</style>
