import Vue from 'vue'
import { Line } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'

Vue.component('line-chart', {
  extends: Bar,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
});
