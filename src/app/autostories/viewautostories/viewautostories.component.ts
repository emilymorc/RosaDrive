import { Component } from '@angular/core';
import {HistoryService} from "../../servicios/history.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-viewautostories',
  templateUrl: './viewautostories.component.html',
  styleUrls: ['./viewautostories.component.css']
})
export class ViewautostoriesComponent {

  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 10;
  orderBy: string | null = null;
  isAsc: boolean = true;
  filtroPorClase: string = '';

  users: any[] = [];
  vehicleBrands: string[] = [];

  constructor(private historyService: HistoryService , private router: Router) { }

  ngOnInit(): void {
    this.historyService.getHistories().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error al obtener historiales', error);
      }
    );
    this.getVehicleBrands();
  }

  getVehicleBrands() {
    this.historyService.getVehicleBrands().subscribe(
      (brands: string[]) => {
        this.vehicleBrands = brands;
      },
      (error) => {
        console.error('Error al obtener marcas de vehículos', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.page;
  }

  sortBy(column: string): void {
    if (this.orderBy === column) {
      this.isAsc = !this.isAsc;
    } else {
      this.orderBy = column;
      this.isAsc = true;
    }
  }

  sortDataByColumn(column: string): void {
    this.orderBy = column;
    this.isAsc = !this.isAsc;

    this.users.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        return this.isAsc ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
      } else {
        const aValueString = String(aValue).toLowerCase();
        const bValueString = String(bValue).toLowerCase();

        if (aValueString < bValueString) {
          return this.isAsc ? -1 : 1;
        } else if (aValueString > bValueString) {
          return this.isAsc ? 1 : -1;
        } else {
          return 0;
        }
      }
    });
  }

  filtrarPorClase(): any[] {
    if (this.filtroPorClase) {
      return this.users.filter(dato =>
        dato.VEHICLE_CLASS && dato.VEHICLE_CLASS.toLowerCase().includes(this.filtroPorClase.toLowerCase())
      );
    } else {
      return this.users;
    }
  }

  getHistories(dato: any){
    this.historyService.getHistoryById(dato.ID_USER).subscribe(
      response => {
        console.log(response.body);
        this.historyService.setSelectedHistory(dato);
        this.router.navigate(['/dashboard/detailsHistory']);
        console.log('Datos del Historial:', response);
      },
      error => {
        console.error('Error al obtener datos del Historial:', error);
      }
    );
  }

  modifyHistories(dato: any){
    this.historyService.getHistoryById(dato.ID_USER).subscribe(
      response => {
        console.log(response.body);
        this.historyService.setSelectedHistory(dato);
        this.router.navigate(['/dashboard/modifyHistory']);
        console.log('Datos del Historial:', response);
      },
      error => {
        console.error('Error al obtener datos del Historial:', error);
      }
    );
  }

}
