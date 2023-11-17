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
};

@Component({
  selector: 'app-report-order-by-month',
  templateUrl: './report-order-by-month.component.html',
  styleUrls: ['./report-order-by-month.component.css']
})
export class ReportOrderByMonthComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    // Aquí debes proporcionar los datos reales de ganancias por mes
    // y ajustar las opciones del gráfico según tus necesidades.
    this.chartOptions = {
      series: [
        {
          name: "Ganancias",
          data: [1500, 2000, 1800, 2500, 2200, 2800, 3000, 3200, 3500, 3800, 4000, 4200]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Ganancias por mes"
      },
      xaxis: {
        categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      }
    };
  }
}
