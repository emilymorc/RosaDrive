import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {HistoryService} from "../servicios/history.service";

@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
  styleUrls: ['./order-service.component.css']
})

/*@NgModule({
  imports: [
    // ...
    FormsModule, // Asegúrate de que FormsModule esté importado
  ],
  // ...
})*/
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



  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, public service1: HistoryService) {
    const currentDate = new Date();
    this.maxDate = currentDate.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.service1.getHistories().subscribe(
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
    const apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/orders/addOrder';
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

    if (this.description.trim() === '' || this.observations.trim() === '' || this.responsible_technician.trim() === ''
      || this.inspection_type.trim() === '' || this.total_cost.toString() === '') {
      this.toastr.error("Por favor, complete todos los campos", "Campos Vacios");
      return;
    }

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
