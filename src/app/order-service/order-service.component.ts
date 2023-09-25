import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
  styleUrls: ['./order-service.component.css']
})
export class OrderServiceComponent {

  service: string = '';
  issue_date: string = '';
  description: string = '';
  observations: string = '';
  responsible_technician: string = '';
  inspection_type: string = '';
  total_cost: number = 0;
  issuing_location: string = '';
  id_story: number = 0;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {
  }

  createOrder(form: any) {
    const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    const apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/orders/addOrder';
    const data = {
      service: this.service,
      description: this.description,
      issuing_location: this.issuing_location,
      observations: this.observations,
      responsible_technician: this.responsible_technician,
      inspection_type: this.inspection_type,
      total_cost: this.total_cost,

    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': valorCasteado
    });
    console.log('Token from localStorage:', valorCasteado);
    this.http.post(apiUrl, data, {headers: headers})
      .subscribe(
        (response) => {
          console.log('create order successful:', response);
          this.toastr.success("Orden de servicio creada con exito", "EXITOSO!");
          this.resetForm(form);
        },
        (error) => {
          console.error('create order error:', error);
          this.toastr.error("Ocurrio un error al crear la orden de servicio  , intente de nuevo", "ERROR!");
        }
      );
  }

  resetForm(form: any) {
    form.form.reset();
  }

  convertirFecha(inputFecha: string): string {
    // Parsea la fecha de entrada en formato ISO 8601
    const fechaEntrada = new Date(inputFecha);

    // Verifica si la fecha de entrada es válida
    if (!isNaN(fechaEntrada.getTime())) {
      // Obtiene los componentes de la fecha y hora
      const anio = fechaEntrada.getFullYear();
      const mes = ('0' + (fechaEntrada.getMonth() + 1)).slice(-2); // Agrega cero inicial si es necesario
      const dia = ('0' + fechaEntrada.getDate()).slice(-2); // Agrega cero inicial si es necesario
      const hora = ('0' + fechaEntrada.getHours()).slice(-2); // Agrega cero inicial si es necesario
      const minutos = ('0' + fechaEntrada.getMinutes()).slice(-2); // Agrega cero inicial si es necesario

      // Construye la cadena de fecha en el formato deseado
      const fechaFormateada = `${anio}-${mes}-${dia} ${hora}:${minutos}:00`;

      return fechaFormateada;
    } else {
      // La fecha de entrada no es válida
      return 'Fecha no válida';
    }
  }

}
