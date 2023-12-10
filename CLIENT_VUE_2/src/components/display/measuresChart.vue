<template>
  <div>
    <canvas ref="chart" width="400" height="200"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: ['data','types'],
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.chart.getContext('2d');

      const datasets = []
      this.types.forEach(type => {
        let typeData = this.data.filter(item => item.type === type);
        datasets.push({
          label: type,
          data: typeData.map(item => parseFloat(item.value)),
          fill: false,
        })
      })
      const labels = this.data.map(item => item.date);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets,
        },
      });
    },
  },
};
</script>
