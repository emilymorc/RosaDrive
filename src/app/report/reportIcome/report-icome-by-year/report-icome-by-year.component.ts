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
  selector: 'app-report-icome-by-year',
  templateUrl: './report-icome-by-year.component.html',
  styleUrls: ['./report-icome-by-year.component.css']
})
export class ReportIcomeByYearComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    // Aquí debes proporcionar los datos reales de ingresos por año
    // y ajustar las opciones del gráfico según tus necesidades.
    this.chartOptions = {
      series: [
        {
          name: "Ingresos",
          data: [10000, 12000, 15000, 18000, 22000, 25000, 28000, 30000, 32000, 35000, 38000, 40000]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Ingresos anuales"
      },
      xaxis: {
        categories: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]
      }
    };
  }
}
