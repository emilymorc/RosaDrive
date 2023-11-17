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
  selector: 'app-report-icome-by-day',
  templateUrl: './report-icome-by-day.component.html',
  styleUrls: ['./report-icome-by-day.component.css']
})
export class ReportIcomeByDayComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    // Aquí debes proporcionar los datos reales de ingresos por día
    // y ajustar las opciones del gráfico según tus necesidades.
    this.chartOptions = {
      series: [
        {
          name: "Ingresos",
          data: [200, 300, 250, 400, 350, 450, 500]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Ingresos por hora"
      },
      xaxis: {
        categories: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"]
      }
    };
  }
}
