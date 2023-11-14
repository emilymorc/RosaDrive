import { Component, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];

};
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportAppoitmentWeek {
  optionsYear = ['2023', '2024', '2025', '2026'];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Citas Programadas",
          data: [20, 41, 35, 51, 49, 62]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Semana del 5 al 11 de Noviembre"
      },
      xaxis: {
        categories: ["Lunes", "Martes",  "Miercoles",  "Jueves",  "Viernes",  "Sabado", ]
      },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
    };
  }
}
