<script>
import appBar from "@/components/navigation/appBar.vue";
import {mapMutations, mapState} from "vuex";
import {useTheme} from "vuetify";
export default {
  components:{
    appBar
  },
  beforeMount() {
    const theme = useTheme().global.current.value;
    this.setTheme(theme);
  },
  computed:{
    ...mapState(['currentTheme'])
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
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<style scoped>

</style>
