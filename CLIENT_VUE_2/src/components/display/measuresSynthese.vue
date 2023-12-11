<script>
import {mapGetters} from "vuex";

export default {
  computed:{
    ...mapGetters('toolsModule',['getCurrentDate'])
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <h1>Belfort</h1>,
      <h3>{{ getCurrentDate }}</h3>
    </div>
  </div>
</template>

<style scoped>
.container{
  background-image: url("../../assets/images/nuages.jpg");
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
</style>