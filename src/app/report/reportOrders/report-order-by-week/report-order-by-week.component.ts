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
  selector: 'app-report-order-by-week',
  templateUrl: './report-order-by-week.component.html',
  styleUrls: ['./report-order-by-week.component.css']
})
export class ReportOrderByWeekComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    // Aquí debes proporcionar los datos reales de ganancias por semana
    // y ajustar las opciones del gráfico según tus necesidades.
    this.chartOptions = {
      series: [
        {
          name: "Ganancias",
          data: [500, 700, 600, 800, 750, 900, 1000]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      title: {
        text: "Ganancias por semana"
      },
      xaxis: {
        categories: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6", "Semana 7"]
      }
    };
  }
}
