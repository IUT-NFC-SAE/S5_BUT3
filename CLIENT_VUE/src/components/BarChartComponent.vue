<template>
    <div class="module_arch">
        <h2>Module Architecture</h2>
        <svg></svg>
        <svg v-if="items" ref="svg" viewBox="0 0 600 400">
            <g :transform="`translate(${margin.left},${margin.top})`">
            <g>
                <rect
                v-for="(item, index) in items"
                :key="index"
                class="bar"
                :x="scaleX(item.date)"
                :y="scaleY(item.total_deaths)"
                :width="scaleX.bandwidth()"
                :height="height - scaleY(item.total_deaths)"
                @mouseover="selectedItem = item"
                />
            </g>
            <g v-if="items" ref="xAxis" :transform="`translate(0,${height})`">
            </g>
            <g v-if="items" ref="yAxis">
            </g>
            </g>
        </svg>

    </div>
</template>

<script>
import * as d3 from 'd3'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    mounted(){
        const data = [{ date: "24-Apr-07", amount: 93.24 },
        { date: "25-Apr-07", amount: 95.35 },
        { date: "26-Apr-07", amount: 98.84 },
        { date: "27-Apr-07", amount: 99.92 },
        { date: "30-Apr-07", amount: 99.8 },
        { date: "1-May-07", amount: 99.47 },
        { date: "2-May-07", amount: 100.39 },
        { date: "3-May-07", amount: 100.4 },
        { date: "4-May-07", amount: 100.81 },
        { date: "7-May-07", amount: 103.92 },
        { date: "8-May-07", amount: 105.06 },
        { date: "9-May-07", amount: 106.88 },
        { date: "10-May-07", amount: 107.34 },]
        const width = 800;
        const height = 500;
        const svg = d3.select("svg").attr("width", width).attr("height", height);
        const g = svg.append("g");
        const parseTime = d3.timeParse("%d-%b-%y");
        const x = d3
            .scaleTime()
            .domain(
                d3.extent(data, function (d) {
                    return parseTime(d.date);
                })
            )
            .rangeRound([0, width]);

        const y = d3
            .scaleLinear()
            .domain(
                d3.extent(data, function (d) {
                    return d.amount;
                })
            )
            .rangeRound([height, 0]);

            g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}</style>
