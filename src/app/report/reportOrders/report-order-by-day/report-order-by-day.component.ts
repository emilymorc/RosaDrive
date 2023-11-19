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
  colors: string[];

};

@Component({
  selector: 'app-report-order-by-day',
  templateUrl: './report-order-by-day.component.html',
  styleUrls: ['./report-order-by-day.component.css']
})
export class ReportOrderByDayComponent implements OnInit{

  technicians: string[]= [];
  orders: number[]= [];
  optionsYear = ['2023', '2024', '2025', '2026'];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(public service: ReportsService) {
    this.chartOptions = {
      series: [
        {
          name: "Ordenes completadas por Mecanicos",
          data: this.orders
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Mecanicos"
      },
      xaxis: {
        categories: this.technicians
      },
    };
  }

  private updateChartOptions() {
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: "Ordenes completadas por Mecanicos",
          data: this.orders
        }
      ],
      xaxis: {
        categories: this.technicians
      },
    };
  }

  ngOnInit(): void {
    this.service.getTechnicians().subscribe(
      (data: string[]) => {
        this.technicians = data;
        this.updateChartOptions();
        console.log('Técnicos:', this.technicians);
      },
      error => {
        console.error('Error al obtener técnicos:', error);
      }
    );

    this.service.getOrdersComplete().subscribe(
      (data: number[]) => {
        this.orders = data;
        this.updateChartOptions();
        console.log('Ordenes:', this.orders);
      },
      error => {
        console.error('Error al obtener ordenes:', error);
      }
    );
  }
}
