import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../servicios/users.service";
import {OrderService} from "../../servicios/order.service";
import {HistoryService} from "../../servicios/history.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit{
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 10;
  orderBy: string | null = null;
  isAsc: boolean = true;
  filtroServicio: string = '';

  availableCategories: string[] = ['Servico', 'Tecnico Responsable'];
  availableCategoriesMap: Map<string, string> = new Map([
    ['Servico', 'SERVICE'],
    ['Tecnico Responsable', 'RESPONSIBLE_TECHNICIAN']
  ]);
  selectedCategory: string = '';
  orders: any[] = [];
  histories: any[] = [];

  constructor(private router: Router, private orderService :OrderService, private historyService:HistoryService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      data => {
        this.orders = data;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );

    this.historyService.getHistories().subscribe(
      (data: any) => {
        this.histories = data;
        console.log(data)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getPlateByHistory(id: number): string | null {
    for (const objeto of this.histories) {
      //console.log(objeto.ID_STORY)
      if (objeto.ID_STORY == id) {
        //console.log(objeto.LICENSE_PLATE_NUMBER)
        return objeto.LICENSE_PLATE_NUMBER;
      }
    }
    return null;
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
    this.orderService.getOrdersHistory(dato.ID_STORY).subscribe(
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
    );
  }

}
