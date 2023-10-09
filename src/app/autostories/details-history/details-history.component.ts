import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../servicios/history.service";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {OrderService} from "../../servicios/order.service";

@Component({
  selector: 'app-details-history',
  templateUrl: './details-history.component.html',
  styleUrls: ['./details-history.component.css'],
  providers: [ToastrModule]
})
export class DetailsHistoryComponent implements OnInit{

  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 10;
  orderBy: string | null = null;
  isAsc: boolean = true;
  filtroServicio: string = '';

  orders: any[] = [];
  histories: any[] = [];

  selecteHistoy: any = {};
  constructor(private router: Router, private historyService: HistoryService, private http: HttpClient,private toastr: ToastrService, private orderService :OrderService) {
}

  ngOnInit(): void {
    this.selecteHistoy = this.historyService.getSelectedHistory();
    this.orderService.getOrdersHistory(this.selecteHistoy.ID_STORY).subscribe(
      data => {
        this.orders = data;
      },
      error => {
        console.error('Error al obtener ordenes:', error);
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

  seeHistory(historyDataForm: NgForm):void{

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


  filtrarPorServicio(): any[] {
    if (this.filtroServicio) {
      return this.orders.filter(dato =>
        dato.SERVICE && dato.SERVICE.toLowerCase().includes(this.filtroServicio.toLowerCase())
      );
    } else {
      return this.orders;
    }
  }

  //filtrarPor

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

  modifyOrder(dato: any): void {
    this.orderService.getOrdersHistory(dato.ID_STORY).subscribe(
      response => {
        console.log(response.body);
        this.orderService.setSelectedOrder(dato);
        this.router.navigate(['/dashboard/modifyOrder']);
        console.log('Datos del la orden:', response);
      },
      error => {
        console.error('Error al obtener datos de la orden:', error);
        this.router.navigate(['/dashboard/modifyOrder']);
      }
    );
  }
}
