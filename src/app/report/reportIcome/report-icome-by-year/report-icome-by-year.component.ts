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
  selector: 'app-report-icome-by-year',
  templateUrl: './report-icome-by-year.component.html',
  styleUrls: ['./report-icome-by-year.component.css']
})
export class ReportIcomeByYearComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>; // Cambio aquí
  public selectedYear: number = 0; // Nuevo
  public years: number[] = []; // Nuevo
  private monthNames: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]; // Nuevo
  private startYear: number = 2010; // Puedes ajustar según tus necesidades

  constructor(private yourService: ReportsService) {}

  ngOnInit(): void {
    this.initializeYears();
    // Obtener el año actual
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
    this.yourService.getValueOrdersYear(`${year}-01-01 00:00:00`).subscribe(
      (data: any) => {
        // Formatear los datos para que coincidan con la estructura del gráfico
        const formattedData = {
          name: "Ingresos",
          data: data.map((item: any) => item.TOTAL_VALUE)
        };

        // Obtener los nombres de los meses directamente de los datos del servicio
        const monthNames = data.map((item: any) => this.monthNames[item.MONTH - 1]);

        this.chartOptions = {
          series: [formattedData],
          chart: {
            height: 350,
            type: "area"
          },
          title: {
            text: `Ingresos anuales - ${year}`
          },
          xaxis: {
            categories: monthNames
          }
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
