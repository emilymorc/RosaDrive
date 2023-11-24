import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../servicios/order.service";
import {Router} from "@angular/router";
import {ChangeService} from "../../servicios/change.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {
  responseData: any;
  public selectedOrder: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 10;
  orderBy: string | null = null;
  isAsc: boolean = true;
  filtro: string = '';
  public changes: any[] = [];
  public images: any = [];

  constructor(private router: Router, private http: HttpClient, public service: OrderService, public changeService: ChangeService, public orderService:OrderService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.selectedOrder = this.service.getSelectedOrder();
    this.changeService.getImages(this.selectedOrder.ID_ORDER).subscribe(
      data => {
        this.images = data;
      },
      error => {
        console.error('Error al obtener ordenes:', error);
      }
    );
    this.changeService.getChanges(this.selectedOrder.ID_ORDER).subscribe(
      data => {
        this.changes = data;
      },
      error => {
        console.error('Error al obtener ordenes:', error);
      }
    );

  }

  onPageChange(event: any): void {
    this.currentPage = event.page;
  }


  filtrar(): any[] {
    if (this.filtro) {
      return this.changes.filter(dato =>
        dato.SERVICE && dato.SERVICE.toLowerCase().includes(this.filtro.toLowerCase())
      );
    } else {
      return this.changes;
    }
  }


  sortDataByColumn(column: string): void {
    this.orderBy = column;
    this.isAsc = !this.isAsc;

    this.changes.sort((a, b) => {
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

  protected readonly length = length;

  addChange(): void {
    console.log("se presiono");
    this.router.navigate(['/dashboard/changeOrder']);
  }


  changeState():void{
    this.orderService.updateOrderStatus(this.selectedOrder.ID_STORY, this.selectedOrder.ID_ORDER, "Finalizada").subscribe(
      response => {
        console.log('Respuesta de actualización de estado:', response);
        this.toastr.success("Orden Finalizada", "EXITOSO!");
        this.router.navigate(['/dashboard/viewOrder']);
        // Haz algo con la respuesta aquí
      },
      error => {
        console.error('Error al actualizar el estado del pedido:', error);
      }
    );
  }

}
