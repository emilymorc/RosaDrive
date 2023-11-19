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

  applyFilters() {
    const filterHistories = this.histories.filter((history) => {
      return (
        (this.filter1 === '' || history.BRAND === this.filter1) &&
        (this.filter2 === '' || history.CURRENT_OWNER === this.filter2) &&
        (this.filter3 === '' || history.MODEL === this.filter3) &&
        (this.filter4 === '' || history.VEHICLE_STATE === this.filter4) &&
        (this.filter5 === '' || history.SERVICE_TYPE === this.filter5)
      );
    });
    console.log(this.filter1)
    this.updateTable(filterHistories);
  }

  cleanFilters() {
    this.filter1 = '';
    this.filter2 = '';
    this.filter3 = '';
    this.filter4 = '';
    this.filter5 = '';

    this.updateTable(this.histories);
  }

  updateTable(data: any[]) {
    this.historiesWhitFilter = data;
    console.log(this.histories)
  }
}
