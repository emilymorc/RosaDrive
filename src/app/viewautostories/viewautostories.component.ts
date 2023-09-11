import { Component } from '@angular/core';
import {HistoryService} from "../services/history.service";


@Component({
  selector: 'app-viewautostories',
  templateUrl: './viewautostories.component.html',
  styleUrls: ['./viewautostories.component.css']
})
export class ViewautostoriesComponent {

  currentPage: number = 1;
  itemsPerPage: number = 5;
  maxSize: number = 5;
  orderBy: string | null = null;
  isAsc: boolean = true;
  filtroPorClase: string = '';

  users: any[] = [];

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.historyService.getHistories().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error al obtener historiales', error);
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

      if (aValue < bValue) {
        return this.isAsc ? -1 : 1;
      } else if (aValue > bValue) {
        return this.isAsc ? 1 : -1;
      } else {
        return 0;
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

}
