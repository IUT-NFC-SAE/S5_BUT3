<script>
import {mapActions, mapState} from "vuex";
import ModulesCards from "@/components/display/modulesCards.vue";

export default {
  components: {ModulesCards},
  computed:{
    ...mapState('databaseModule',['modules'])
  },
  methods:{
    ...mapActions('databaseModule',['getAllModules'])
  },
  mounted() {
    this.getAllModules();
  }
}
</script>

<template>
  <modulesCards :modules="modules"/>
</template>

<style scoped>

</style>