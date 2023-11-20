import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {HistoryService} from "../servicios/history.service";
import {OrderService} from "../servicios/order.service";
import {MailService} from "../servicios/mail.service";

@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
  styleUrls: ['./order-service.component.css']
})

export class OrderServiceComponent implements OnInit{

  service: string = '';
  issue_date: string = '';
  description: string = '';
  observations: string = '';
  responsible_technician: string = '';
  inspection_type: string = '';
  total_cost: number = 0;
  id_story: number = 0;
  maxDate: string = '';
  issuing_location: string = '2';
  histories: any[]= [];
  selectedLicensePlate: number = 0;
  showError = false; // Para mostrar u ocultar el error
  historySelected: any;


  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, public historyService: HistoryService, public serviceOrder: OrderService, public mailService: MailService) {
    const currentDate = new Date();
    this.maxDate = currentDate.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
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

  createOrder(form: any) {
    const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    const format = /[^A-Za-z0-9\- ]/;
    const data = {
      id_story: this.id_story,
      service: this.service,
      description: this.description,
      issuing_location: this.issuing_location,
      observations: this.observations,
      responsible_technician: this.responsible_technician,
      inspection_type: this.inspection_type,
      total_cost: this.total_cost,

    };

    if (this.total_cost.valueOf() < 0) {
      this.toastr.error("Existen campos negativos", "¡Campos incorrectos!");
      this.showError = true;
      return;
    }

    if (this.description.trim() === '' || this.service.trim() === '' || this.responsible_technician.trim() === ''
      || this.inspection_type.trim() === '' || this.total_cost === null) {
      this.toastr.error("Por favor, complete todos los campos", "Campos Vacios");
      return;
    }

    this.getIdHistory(this.id_story);

    this.serviceOrder.addOrder(data)
      .subscribe(
        (response) => {
          console.log('create order successful:', response);
          this.sendEmail(response.insertId);
          this.toastr.success("Orden de servicio creada con exito", "EXITOSO!");
          this.resetForm(form);
        },
        (error) => {
          console.error('create order error:', error);
          this.toastr.error("Ocurrio un error al crear la orden de servicio  , intente de nuevo", "ERROR!");
        }
      );
  }

  getIdHistory(id_story: number){
    this.historyService.getHistoryById(id_story).subscribe(
      response => {
        this.historySelected = response;
      },
      error => {
        console.error('Error al obtener datos del Historial:', error);
      }
    );
  }

  sendEmail(id_order: any ): void {

    const emailData = {
      name: this.historySelected[0].CURRENT_OWNER +"",
      email: this.historySelected[0].OWNER_CONTACT +"",
      message: "se creo la orden numero: " + id_order + " asociada al automovil de placa: " + this.historySelected[0].LICENSE_PLATE_NUMBER
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



  resetForm(form: any) {
    form.form.reset();
  }

}
