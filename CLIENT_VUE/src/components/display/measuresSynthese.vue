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
    ...mapActions(['goTo']),
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
  <div>
    <div class="container bg-cloud">
      <div class="row">
        <h1 class="big">{{ meanTemperatue }}°</h1>
        <h1>Belfort</h1>
      </div>
      <div class="row">
        <h3>{{ getCurrentDate }},</h3>
        <h5>{{ time }}</h5>
      </div>
      <div class="info bg-surface"></div>
      <div class="info bg-surface"></div>
    </div>

    <br/>

    <h1>Prévisions météo</h1>
    <div class="loader">
      <v-skeleton-loader :elevation="24" type="card"/>
      <v-skeleton-loader :elevation="24" type="card"/>
    </div>

    <br/>
  </div>
</template>

<style scoped>
.container {
  text-align: left;
  width: 90vw;
  height: 50vh;
  margin-left: 5vw;
  border-radius: 20px;
  padding: 20px;
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
  height: 30%;
  border-radius: 20px;
  padding: 10px;
  opacity: 80%;
  margin-top: 10px;
}
.loader{
  display: flex;
  justify-content: left;
  gap: 10px;
  padding: 20px;
  width: 90vw;
  margin-left: 5vw;
}
.loader > * {
  width: 50%;
}
.big{
  font-size: xxx-large;
}
@media screen and (max-width: 700px)  {
  .loader{
    display: block;
  }
  .loader > * {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
