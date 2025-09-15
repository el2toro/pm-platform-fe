import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-wave-chart',
  templateUrl: './wave-chart.component.html',
  styleUrls: ['./wave-chart.component.scss'],
  imports: [BaseChartDirective],
  standalone: true
})
export class WaveChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: Array.from({ length: 20 }, (_, i) => i),
    datasets: [
      {
        data: [4, 6, 5, 8, 7, 9, 6, 5, 7, 6, 8, 7],
        borderColor: '#50CD89',  // green
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        
        fill: false
      }
    ]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      line: { borderJoinStyle: 'round' }
    }
  };
}
