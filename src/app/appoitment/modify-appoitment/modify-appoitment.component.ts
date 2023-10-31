import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, NgForm} from "@angular/forms";
import {UserService} from "../../servicios/users.service";
import {AppointmentService} from "../../servicios/appointment.service";
import {AuthService} from "../../servicios/auth.service";

@Component({
  selector: 'app-modify-appoitment',
  templateUrl: './modify-appoitment.component.html',
  styleUrls: ['./modify-appoitment.component.css']
})
export class ModifyAppoitmentComponent implements OnInit{
  usersData: any[] = [];
  userNamesAndIds: any[] = [];
  userNamesAndLastNames: string[] = [];
  description: string = '';
  id_user: number = 0;
  status: string = '';
  responsible_technician: string = '';
  appoitment_date: string = '';
  fecha_hora: string = '';
  inspection_type: string = '';
  total_cost: number = 0;
  id_story: number = 0;
  minDate: string = '';
  issuing_location: string = '2';
  users: any[] = [];
  horasOcupadas: any[] = [];
  fecha: string= '';
  hora: string= '';

  horasDisponibles: string[] = [];

  selectedHour: string = '';
  selectedAppoitment: any = {};
  selecteUser: any = {};



  constructor( private http: HttpClient, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, public service1: UserService, private appointmentService: AppointmentService, private authService: AuthService) {
    this.minDate = this.obtenerFechaManana();
    // console.log('HORA FORMATEADA'+this.formatHourToHHMMSS('12 AM'))
  }

  appoitmentState= ['Activa', 'Completada', 'Cancelada'];
  obtenerFechaManana() {
    const hoy = new Date(); // Obtiene la fecha actual
    const mañana = new Date(hoy); // Crea una copia de la fecha actual
    mañana.setDate(hoy.getDate() + 1); // Suma un día a la copia para obtener la fecha de mañana

    // Obtiene el año, mes y día en el formato "YYYY-MM-DD"
    const año = mañana.getFullYear();
    const mes = String(mañana.getMonth() + 1).padStart(2, '0'); // Agrega 1 al mes porque los meses comienzan desde 0
    const dia = String(mañana.getDate()).padStart(2, '0');

    const fechaManana = `${año}-${mes}-${dia}`; // Formatea la fecha en "YYYY-MM-DD"
    return fechaManana;
  }
  ngOnInit(): void {
    if (!this.authService.isUserAdmin()){
      this.appoitmentState= ['Activa','Cancelada'];
    }

    /*this.service1.getUsers().subscribe((data: any[]) => {
      this.usersData = data;
      this.userNamesAndLastNames = this.concatNamesAndLastNames(data);
      this.userNamesAndIds = this.concatNamesAndIds(this.usersData);
      this.selectedAppoitment = this.appointmentService.getSelectedAppoitment();
      this.fecha_hora = this.selectedAppoitment.APPOINTMENTS_DATE;
      this.id_user = this.selectedAppoitment.ID_USER;
      this.status == this.selectedAppoitment.STAATUS;

      this.fecha = this.fecha_hora.split('T')[0]; // Obtenemos la parte de la fecha
      this.hora= this.obtenerHoraFormateada(this.fecha_hora)

    });*/
    this.userNamesAndIds = this.concatNamesAndIds(this.usersData);
    this.selectedAppoitment = this.appointmentService.getSelectedAppoitment();
    this.fecha_hora = this.selectedAppoitment.APPOINTMENTS_DATE;
    this.id_user = this.selectedAppoitment.ID_USER;
    this.status == this.selectedAppoitment.STAATUS;

    this.fecha = this.fecha_hora.split('T')[0]; // Obtenemos la parte de la fecha
    this.hora= this.obtenerHoraFormateada(this.fecha_hora)
  }

  obtenerHoraFormateada(fecha1: string) {
    const fecha = new Date(fecha1);
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const ampm = horas >= 12 ? 'PM' : 'AM';

    // Formatear las horas y los minutos
    const horasFormateadas = (horas % 12) || 12; // Convertir 0 a 12
    const minutosFormateados = minutos < 10 ? '0' + minutos : minutos;

    return `${horasFormateadas}:${minutosFormateados} ${ampm}`;
  }


  resetForm(form: any) {
    form.form.reset();
  }

  concatNamesAndLastNames(users: any[]): string[] {
    return users.map(user => `${user.FIRST_NAME} ${user.LAST_NAME}`);
  }

  concatNamesAndIds(users: any[]): any[] {
    return users.map(user => ({
      id: user.ID_USER, // Cambia "ID" por el nombre del campo real en tus datos
      name: `${user.FIRST_NAME} ${user.LAST_NAME}`
    }));
  }


  onDateChange(form: NgForm){
    this.horasDisponibles = [];
    console.log(this.appoitment_date );
    console.log(this.selectedHour + "hora seleccionada");
    this.getBusyHours(form.value.entryDate + " 12:00:00");
  }

  getBusyHours(date: string) {
    this.appointmentService.getAppointmentsByDate(date).subscribe(
      (data: any[]) => {
        this.horasOcupadas = data
          .filter(appointment => appointment.STATUS === 'Activa')
          .map(appointment => {
            const fechaHora = new Date(appointment.APPOINTMENTS_DATE);
            const horaUTC = fechaHora.getUTCHours();
            const minutosUTC = fechaHora.getUTCMinutes();

            //"AM" o "PM"
            const periodo = horaUTC >= 12 ? 'PM' : 'AM';
            const hora12h = horaUTC % 12 || 12; // Convertir a formato de 12 horas

            // Formatea la hora y los minutos en un string HH:mm AM/PM en UTC
            return `${hora12h < 10 ? '0' : ''}${hora12h}:${minutosUTC < 10 ? '0' : ''}${minutosUTC} ${periodo}`;
          });

        console.log(this.horasOcupadas[0]);
        this.generarHorasDisponibles();
      },
      (error) => {
        console.error(error);
      }
    );
  }



  generarHorasDisponibles() {
    this.horasDisponibles = [];

    // Generar horas de la mañana (8:00 AM - 12:00 PM)
    for (let hora = 8; hora <= 12; hora++) {
      for (let minutos = 0; minutos < 60; minutos += 30) {
        const horaFormato12h = `${hora % 12 === 0 ? 12 : hora % 12}:${minutos === 0 ? '00' : minutos} ${hora < 12 ? 'AM' : 'PM'}`;
        this.horasDisponibles.push(horaFormato12h);
      }
    }

    // Generar horas de la tarde (2:00 PM - 4:30 PM)
    for (let hora = 14; hora <= 16; hora++) {
      for (let minutos = 0; minutos < 60; minutos += 30) {
        const horaFormato12h = `${hora % 12}:${minutos === 0 ? '00' : minutos} ${hora < 12 ? 'AM' : 'PM'}`;
        this.horasDisponibles.push(horaFormato12h);
      }
    }

    this.horasDisponibles = this.horasDisponibles.filter(horaDisponible =>
      !this.horasOcupadas.includes(horaDisponible)
    );
  }

  updateAppoitment(form: NgForm){
    const appointmentData = {
      idUser: this.selectedAppoitment.ID_USER,
      idAppointment: this.selectedAppoitment.ID_APPOINTMENT,
      appointmentDate: form.value.entryDate+ ' ' + this.formatHourToHHMMSS(form.value.selectedHour),
      //appointmentDate: form.value.appoitment_date + ' ' + this.formatHourToHHMMSS(this.selectedHour),
      description: form.value.description,
      status: form.value.status

    };
    console.log('fecha'+form.value.entryDate)

    this.appointmentService.updateAppoitment(appointmentData).subscribe(
      (response) => {
        console.log('Éxito: ', response);
        this.toastr.success("Cita modificada con exito", "EXITOSO!");
        this.router.navigate(['/dashboard/viewApoimentComponent']);
      },
      (error) => {
        console.error('Error: ', error);
        this.toastr.error("Error al modificar cita", "Error");
      }
    );
  }

  formatHourToHHMMSS(time12H: string): string {
    // Divide la cadena en horas y período (AM o PM).
    const [hourStr, period] = time12H.split(' ');

    // Divide la cadena de horas en partes (horas y minutos).
    const [hour, minutes] = hourStr.split(':').map(Number);

    // Convierte las horas al formato de 24 horas.
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour === 12) {
      hour24 = 0;
    }

    // Formatea la hora en el formato "hh:mm:ss".
    const hourStr24 = hour24.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');

    return `${hourStr24}:${minutesStr}:00`;
  }


}
