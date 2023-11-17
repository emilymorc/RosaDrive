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
  selector: 'app-report-order-by-day',
  templateUrl: './report-order-by-day.component.html',
  styleUrls: ['./report-order-by-day.component.css']
})
export class ReportOrderByDayComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    // Aquí debes proporcionar los datos reales de ganancias por día
    // y ajustar las opciones del gráfico según tus necesidades.
    this.chartOptions = {
      series: [
        {
          name: "Ganancias",
          data: [100, 250, 200, 350, 300, 400, 450, 500, 600]
        }
      ],
      chart: {
        height: 350,
        type: "line" // Puedes usar 'line' para un gráfico de líneas, o 'bar' para un gráfico de barras, según tu preferencia.
      },
      title: {
        text: "Ganancias por día"
      },
      xaxis: {
        categories: ["8 AM", "9 AM", "10 AM", "11 AM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"]
      }
    };
  }
}
