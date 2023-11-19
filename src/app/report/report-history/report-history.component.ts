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

  filter1: string = "";
  filter2: string = "";
  filter3: string = "";
  filter4: string = "";
  filter5: string = "";

  histories: any[] = [];
  historiesWhitFilter: any[] = [];
  filterCategories: any = {};

  constructor(private historyService: HistoryService , private router: Router) { }

  ngOnInit(): void {
    this.historyService.getHistories().subscribe(
      data => {
        this.histories = data;
        this.historiesWhitFilter = data;
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

    this.histories.sort((a, b) => {
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

  aplicarFiltros() {
    const historiasFiltradas = this.histories.filter((historia) => {
      return (
        (this.filter1 === '' || historia.BRAND === this.filter1) &&
        (this.filter2 === '' || historia.CURRENT_OWNER === this.filter2) &&
        (this.filter3 === '' || historia.MODEL === this.filter3) &&
        (this.filter4 === '' || historia.VEHICLE_STATE === this.filter4) &&
        (this.filter5 === '' || historia.SERVICE_TYPE === this.filter5)
      );
    });
    console.log(this.filter1)
    this.actualizarTabla(historiasFiltradas);
  }

  limpiarFiltros() {
    this.filter1 = '';
    this.filter2 = '';
    this.filter3 = '';
    this.filter4 = '';
    this.filter5 = '';

    // Restaurar la lista completa
    this.actualizarTabla(this.histories);
  }

  actualizarTabla(datos: any[]) {
    this.historiesWhitFilter = datos;
    console.log(this.histories)
  }
}
