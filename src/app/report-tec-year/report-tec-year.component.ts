import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import {ReportsService} from "../servicios/reports.service";
import {colors} from "@angular/cli/src/utilities/color";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-report-tec-year',
  templateUrl: './report-tec-year.component.html',
  styleUrls: ['./report-tec-year.component.css']
})
export class ReportTecYearComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>; // Cambio aquí
  public selectedYear: number = 0;
  public years: number[] = [];
  private monthNames: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]; // Nuevo
  private startYear: number = 2010;

  constructor(private yourService: ReportsService) {}

  ngOnInit(): void {
    this.initializeYears();
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    this.updateChart(currentYear);
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = this.startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  updateChart(year: number): void {
    this.yourService.getTecsOrdersYear(`${year}-01-01 00:00:00`).subscribe(
      (data: any) => {
        const formattedData = {
          name: "Número de ordenes",
          data: data.map((item: any) => item.ORDERS_COMPLETE)
        };
        //const monthNames = data.map((item: any) => this.monthNames[item.RESPONSIBLE_TECHNICIAN - 1]);

        this.chartOptions = {
          series: [formattedData],
          chart: {
            height: 350,
            type: "bar"
          },
          title: {
            text: `Número de ordenes anuales - ${year}`
          },
          xaxis: {
            categories: data.map((item: any) => item.RESPONSIBLE_TECHNICIAN.toString())
          },

        };

      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }





  onYearChange(): void {
    this.updateChart(this.selectedYear);
  }


}
