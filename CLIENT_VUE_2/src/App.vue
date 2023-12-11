<script>
import appBar from "@/components/navigation/appBar.vue";
import {mapMutations, mapState} from "vuex";
import {useTheme} from "vuetify";
import Connexion from "@/components/navigation/connexion.vue";
export default {
  components:{
    Connexion,
    appBar
  },
  beforeMount() {
    const theme = useTheme().global.current.value;
    this.setTheme(theme);
  },
  computed:{
    ...mapState(['currentTheme','user'])
  },
  methods:{
    ...mapMutations(['setTheme'])
  }
}
</script>

<template>
  <div id="app">
    <v-app>
      <appBar/>
      <v-main>
        <router-view v-if="user"/>
        <connexion v-else/>
      </v-main>
      <v-footer>
        <v-row justify="center" no-gutters>
          2024 - IUTBM Informatique BUT3 S5 SAE
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<style scoped>

</style>
