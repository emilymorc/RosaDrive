import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import {ReportsService} from "../../../servicios/reports.service";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-report-appoitmets-by-month',
  templateUrl: './report-appoitmets-by-month.component.html',
  styleUrls: ['./report-appoitmets-by-month.component.css']
})
export class ReportAppoitmetsByMonthComponent implements  OnInit{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>; // Cambio aquí
  public selectedMonth: string = ''; // Nuevo
  public months = [
    { label: 'Enero', value: '01' },
    { label: 'Febrero', value: '02' },
    { label: 'Marzo', value: '03' },
    { label: 'Abril', value: '04' },
    { label: 'Mayo', value: '05' },
    { label: 'Junio', value: '06' },
    { label: 'Julio', value: '07' },
    { label: 'Agosto', value: '08' },
    { label: 'Septiembre', value: '09' },
    { label: 'Octubre', value: '10' },
    { label: 'Noviembre', value: '11' },
    { label: 'Diciembre', value: '12' }
  ];

  constructor(private yourService: ReportsService) {}

  ngOnInit(): void {
    // Obtener el mes actual
    const currentMonth = new Date().toISOString().slice(0, 7);
    this.selectedMonth = currentMonth;
    this.updateChart(currentMonth);
  }

  updateChart(month: string): void {
    this.yourService.getApppoitmentsMonth(`${month}-01 00:00:00`).subscribe(
      (data: any) => {

        const formattedData = {
          name: "Numero de Citas",
          data: data.map((item: any) => item.TOTAL_VALUE)
        };

        this.chartOptions = {
          series: [formattedData],
          chart: {
            height: 350,
            type: "area"
          },
          title: {
            text: `Numero de citas mensual - ${month}`
          },
          xaxis: {
            categories: data.map((item: any) => item.DAY.toString())
          }
        };
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  onMonthChange(): void {
    this.updateChart(this.selectedMonth);
  }
}
