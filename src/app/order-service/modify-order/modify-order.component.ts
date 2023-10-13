import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, NgForm} from "@angular/forms";
import {HistoryService} from "../../servicios/history.service";
import {OrderService} from "../../servicios/order.service";

@Component({
  selector: 'app-modify-order',
  templateUrl: './modify-order.component.html',
  styleUrls: ['./modify-order.component.css']
})
export class ModifyOrderComponent implements OnInit{

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
  selectedOrder: any = {};
  showError = false; // Para mostrar u ocultar el error

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, public service1: HistoryService, public orderService: OrderService) {
    const currentDate = new Date();
    this.maxDate = currentDate.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    /*this.service1.getHistories().subscribe(
      (data: any) => {
        this.histories = data;
        console.log(data)
      },
      (error: any) => {
        console.error(error);
      }
    );*/
    this.selectedOrder = this.orderService.getSelectedOrder();
  }

  createOrder(form: any) {
    const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    const apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/orders/addOrder';
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

    if (this.description.trim() === '' || this.service.trim() === '' || this.responsible_technician.trim() === ''
      || this.inspection_type.trim() === '' || this.total_cost.toString() === '') {
      this.toastr.error("Por favor, complete todos los campos", "Campos Vacios");
      return;
    }

    if (format.test(form.value.description) || format.test(form.value.service) ||format.test(form.value.responsible_technician) || format.test(form.value.inspection_type)) {
      this.toastr.error("Existen campos con caracteres especiales", "¡Campos incorrectos!");
      this.showError = true;
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
   updateOrder2(orderData: any, userDataForm: NgForm ): void{
     const format = /[^A-Za-z0-9\- ]/;
     if (orderData.description.trim() === '' || orderData.service.trim() === '' || orderData.responsible_technician.trim() === '' || orderData.inspection_type.trim() === '' || orderData.total_cost === null) {
       this.toastr.error("Por favor, complete todos los campos", "Campos Vacios");
       return;
     }

     if (format.test(userDataForm.value.description) || format.test(userDataForm.value.service) ||format.test(userDataForm.value.responsible_technician) || format.test(userDataForm.value.inspection_type)) {
       this.toastr.error("Existen campos con caracteres especiales", "¡Campos incorrectos!");
       this.showError = true;
       return;
     }

     this.orderService.updateOrderData(orderData).subscribe(
       (response) => {
         console.log('Orden actualizada:', response);
        this.toastr.success("Orden modificada con exito", "EXITOSO!");
        this.resetForm(userDataForm);
         this.router.navigate(['/dashboard/viewOrder']);
       },
       (error) => {
         console.error('Error al actualizar la Orden:', error);
      }
     );
  }


  updateOrder(orderDataForm: NgForm) {

    const orderData = {
      id_story: this.selectedOrder.ID_STORY,
      id_order: this.selectedOrder.ID_ORDER,
      service: orderDataForm.value.service,
      description: orderDataForm.value.description,
      issuing_location: this.issuing_location,
      observations: orderDataForm.value.observations,
      responsible_technician: orderDataForm.value.responsible_technician,
      inspection_type: orderDataForm.value.inspection_type,
      total_cost: orderDataForm.value.total_cost,
    };

    this.updateOrder2(orderData,orderDataForm)
  }
}
