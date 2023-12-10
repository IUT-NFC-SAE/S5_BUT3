<template>
  <div>
    <canvas ref="chart" />
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: ['data', 'types'],
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.chart.getContext('2d');

      const datasets = this.types.map((type) => ({
        label: type,
        data: this.data
            .filter((item) => item.type === type)
            .map((item) => ({
              x: new Date(item.date),
              y: parseFloat(item.value),
            })),
        fill: false,
      }));

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...new Set(this.data.map((item) => item.date))],
          datasets: datasets,
        },
        options: {
          scales: {
            x: [
              {type: 'time'}
            ],
          },
        },
      });
    },
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
