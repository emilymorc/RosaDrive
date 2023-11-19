import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../servicios/order.service";
import {HistoryService} from "../../servicios/history.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.css']
})
export class ReportHistoryComponent {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 10;
  orderBy: string | null = null;
  isAsc: boolean = true;
  filtroPorClase: string = '';

  filter1: string = "";
  filter2: string = "";
  filter3: string = "";
  filter4: string = "";
  filter5: string = "";

  users: any[] = [];
  owners: string[] = [];
  vehicleBrands: string[] = [];
  filterCategories: any = {};

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
    this.getFilters();
  }

  getFilters() {
    this.historyService.getFilterCategories().subscribe(
      (categories: any[]) => {
        this.filterCategories = categories;
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
