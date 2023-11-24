import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../servicios/order.service";
import {Router} from "@angular/router";
import {ChangeService} from "../../servicios/change.service";
import {ToastrService} from "ngx-toastr";
import {MailService} from "../../servicios/mail.service";
import {HistoryService} from "../../servicios/history.service";

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
  historySelected: any = {};

  constructor(private router: Router, private http: HttpClient, public service: OrderService, public changeService: ChangeService, public orderService: OrderService, private toastr: ToastrService, private mailService: MailService, private historyService: HistoryService) {
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
    this.getHistory();
  }

  getHistory() {
    this.historyService.getHistoryById(this.selectedOrder.ID_STORY).subscribe(
      response => {
        this.historySelected = response[0];
        //console.log(this.historySelected[0]);
      },
      error => {
        console.error('Error al obtener datos del Historial:', error);
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

  changeState(): void {
    this.orderService.updateOrderStatus(this.selectedOrder.ID_STORY, this.selectedOrder.ID_ORDER, "Finalizada").subscribe(
      response => {
        console.log('Respuesta de actualización de estado:', response);
        this.sendEmail(this.selectedOrder.ID_ORDER)
        this.toastr.success("Orden Finalizada", "EXITOSO!");
        this.router.navigate(['/dashboard/viewOrder']);
        // Haz algo con la respuesta aquí
      },
      error => {
        console.error('Error al actualizar el estado del pedido:', error);
      }
    );
  }

  sendEmail(id_order: any): void {
    const messageString = "\nActualizacion en la orden: " + id_order + " \nAsociada al automovil de placa: " + this.historySelected.LICENSE_PLATE_NUMBER + "^\nDescripción del cambio: La Orden se ha dado por finalizada su automovil esta listo";
    const emailData = {
      name: this.historySelected.CURRENT_OWNER +"",
      email: this.historySelected.OWNER_CONTACT +"",
      message: messageString
    };
    console.log(emailData)

    this.mailService.sendEmail(emailData).subscribe(
      response => {
        console.log('Respuesta:', response);
      },
      error => {
        console.error('Error al enviar el correo:', error);
      }
    );
  }

}
