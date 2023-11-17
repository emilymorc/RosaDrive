import {Component, OnInit, ViewChild} from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import {ReportsService} from "../../../servicios/reports.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportAppoitmetsByDayComponent {
  optionsYear = ['2023', '2024', '2025', '2026'];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private service: ReportsService) {

    this.chartOptions = {
      series: [
        {
          name: "Citas Programadas",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 150]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "11 de nobriembre de 2023"
      },
      xaxis: {
        categories: ["8 AM", "9 AM", "10 AM", "11 AM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"]
      }
    };
  }
}



