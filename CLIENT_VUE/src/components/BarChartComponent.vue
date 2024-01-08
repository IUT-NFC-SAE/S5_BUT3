<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, TimeScale  } from 'chart.js'
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, TimeScale)

export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Temperature',
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                        data: [],
                    },
                    {
                        label: 'Humidity',
                        backgroundColor: 'rgba(255,99,132,0.4)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        data: [],
                    },
                    {
                        label: 'Pressure',
                        backgroundColor: 'rgba(255,206,86,0.4)',
                        borderColor: 'rgba(255,206,86,1)',
                        borderWidth: 1,
                        data: [],
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'date', // or 'hour', 'day', etc.
                        },
                        title: {
                            display: true,
                            text: 'Time',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Value',
                        },
                    },
                },
            },
        };
    },
    created() {
        this.fetchMeasureData();
    },
    methods: {
        async fetchMeasureData() {
            try {
                const response = await axios.get('http://localhost:4567/weatherapi/measure/get');
                const measures = response.data.data;

                measures.forEach(measure => {
                    const date = new Date(measure.date);
                    this.chartData.labels.push(date);
                    switch (measure.type) {
                        case 'temperature':
                            this.chartData.datasets[0].data.push(parseFloat(measure.value));
                            break;
                        case 'humidity':
                            this.chartData.datasets[1].data.push(parseFloat(measure.value));
                            break;
                        case 'pressure':
                            this.chartData.datasets[2].data.push(parseFloat(measure.value));
                            break;
                        // Add more cases if you have other types of measures
                    }
                });
            } catch (error) {
                console.error('Failed to fetch measure data:', error);
            }
        },
    },
};
</script>
