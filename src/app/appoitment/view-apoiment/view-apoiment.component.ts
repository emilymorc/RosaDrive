import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../servicios/order.service";
import {HistoryService} from "../../servicios/history.service";
import {AppointmentService} from "../../servicios/appointment.service";

@Component({
  selector: 'app-view-apoiment',
  templateUrl: './view-apoiment.component.html',
  styleUrls: ['./view-apoiment.component.css']
})
export class ViewApoimentComponent {

  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 10;
  orderBy: string | null = null;
  isAsc: boolean = true;
  filtroServicio: string = '';

  availableCategories: string[] = ['Descripción', 'Estado'];
  availableCategoriesMap: Map<string, string> = new Map([
    ['Descripción', 'DESCRIPTION'],
    ['Estado', 'STATUS']
  ]);
  selectedCategory: string = '';
  orders: any[] = [];
  histories: any[] = [];

  constructor(private router: Router, private appointmentService :AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentsByStatus('All').subscribe(
      data => {
        this.orders = data;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  onPageChange(event: any): void {
    this.currentPage = event.page;
  }

  sortDataByColumn(column: string): void {
    this.orderBy = column;
    this.isAsc = !this.isAsc;

    this.orders.sort((a, b) => {
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
  assignSelectedCategory(category: string): void {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
  }

  filterByCategory(): any[] {
    const filtro = this.availableCategoriesMap.get(this.selectedCategory);
    if (filtro) {
      return this.orders.filter(dato =>
        dato[filtro] && dato[filtro].toLowerCase().includes(this.filtroServicio.toLowerCase())
      );
    } else {
      return this.orders;
    }
  }

  viewOrder(dato: any): void {
    /*this.orderService.getOrdersHistory(dato.ID_STORY).subscribe(
      response => {
        console.log(response.body);
        this.orderService.setSelectedOrder(dato);
        this.router.navigate(['/dashboard/detailsOrder']);
        console.log('Datos del la orden:', response);
      },
      error => {
        console.error('Error al obtener datos de la orden:', error);
        this.router.navigate(['/dashboard/detailsOrder']);
      }
    );*/
  }

  modifyAppoitement(dato: any): void {
    this.appointmentService.getAppoitmentId(dato.ID_APPOINTMENT).subscribe(
      response => {
        console.log(response.body);
        this.appointmentService.setSelectedAppoitment(dato);
        this.router.navigate(['/dashboard/modifyAppoitment']);
        console.log('Datos de la cita', response);
      },
      error => {
        console.error('Error al obtener datos de la cita:', error);
        this.router.navigate(['/dashboard/modifyAppoitment']);
      }
    );
  }
}