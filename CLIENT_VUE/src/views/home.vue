<script>

import MeasuresSynthese from "@/components/display/measuresSynthese.vue";
import ImagesAnalyzes from "@/components/display/imagesAnalyzes.vue";

export default {
  components: {ImagesAnalyzes, MeasuresSynthese}
}
</script>

<template>
  <div>
    <MeasuresSynthese/>
    <images-analyzes/>
    <div class="offset"></div>
  </div>
</template>

<style scoped>
.offset{
  margin-bottom: 50vh;
}
</style>