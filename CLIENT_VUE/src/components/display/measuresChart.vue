<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
            type="datetime-local"
            id="after"
            label="Date début"
            v-model="afterDateTime"
            @change="updateChart"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
            type="datetime-local"
            id="until"
            label="Date fin"
            v-model="untilDateTime"
            @change="updateChart"
        />
      </v-col>
    </v-row>

    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Enregistrer les contrôleurs, les éléments et les échelles nécessaires
Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend);

export default {
  props: ['data', 'types'],
  watch: {
    data(){this.updateChart()}
  },
  data() {
    return {
      afterDateTime: '',
      untilDateTime: '',
      chart: null,
    };
  },
  mounted() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    this.afterDateTime = this.getIsoDate(now);
    now.setHours(23, 59, 0, 0);
    this.untilDateTime = this.getIsoDate(now);
    this.createChart();
  },
  methods: {
    getIsoDate(inputDate){
      const date = inputDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }).slice(0, 16);
      const parts = date.split(" ");
      if (parts.length === 2) {
        const [datePart, timePart] = parts;
        const [day, month, year] = datePart.split("/");
        const [hour, minute] = timePart.split(":");
        return `${year}-${month}-${day}T${hour}:${minute}`;
      }
      return null
    },
    generateRandomColor() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 1)`;
    },
    filterData() {
      let filteredData = this.data;
      if (this.afterDateTime) {
        const after = new Date(this.afterDateTime).getTime();
        filteredData = filteredData.filter(item => new Date(item.date).getTime() >= after);
      }
      if (this.untilDateTime) {
        const until = new Date(this.untilDateTime).getTime();
        filteredData = filteredData.filter(item => new Date(item.date).getTime() <= until);
      }
      return filteredData;
    },
    createChart() {
      const ctx = this.$refs.chart.getContext('2d');
      let datasets = []
      if(this.types){
        datasets = this.types.map((type) => {
          const color = this.generateRandomColor();
          return {
            label: type.name,
            data: this.filterData()
                .filter((item) => item.type === type.name)
                .map((item) => ({
                  x: new Date(item.date),
                  y: parseFloat(item.value),
                })),
            fill: false,
            borderColor: type.color || color, // Couleur de la ligne
            backgroundColor: type.color || color, // Couleur des points
          };
        });
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute', // Choisissez l'unité de temps appropriée pour votre jeu de données
                tooltipFormat: 'PPpp', // Format pour l'affichage des dates dans le tooltip
              }
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
          },
        },
      });
    },
    updateChart() {
      const afterInput = document.getElementById('after')
      afterInput.classList.remove('bg-error')
      const untilInput = document.getElementById('until')
      untilInput.classList.remove('bg-error')

      if (!this.isValidDate(this.afterDateTime)) {
        afterInput.classList.add('bg-error')
        return;
      }
      if(!this.isValidDate(this.untilDateTime)){
        untilInput.classList.add('bg-error')
        return;
      }
      if (this.chart) {
        this.chart.destroy();
      }
      this.createChart();
    },
    isValidDate(dateTimeString) {
      const date = new Date(dateTimeString);
      return !isNaN(date.getTime());
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
