import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../servicios/order.service";
import {HistoryService} from "../../servicios/history.service";
import {AppointmentService} from "../../servicios/appointment.service";
import {AuthService} from "../../servicios/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-view-apoiment',
  templateUrl: './view-apoiment.component.html',
  styleUrls: ['./view-apoiment.component.css']
})
export class ViewApoimentComponent {

  isAdmin: boolean;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 10;
  orderBy: string | null = null;
  isAsc: boolean = false;
  filtroServicio: string = '';

  availableCategories: string[] = ['Descripción', 'Estado'];
  availableCategoriesMap: Map<string, string> = new Map([
    ['Descripción', 'DESCRIPTION'],
    ['Estado', 'STATUS']
  ]);
  selectedCategory: string = '';
  orders: any[] = [];
  histories: any[] = [];

  constructor(private router: Router,
              private appointmentService: AppointmentService,
              private authService: AuthService,
              private toastr: ToastrService) {
    this.isAdmin = this.authService.isUserAdmin();
  }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.appointmentService.getAppointmentsByStatus('All').subscribe(
        data => {
          this.orders = data;
        },
        error => {
          console.error('Error al obtener usuarios:', error);
        }
      );
    } else {
      this.appointmentService.getAppointmentById(this.authService.getCurrentUser().data.ID_USER).subscribe(
        data => {
          this.orders = data;
        },
        error => {
          console.error('Error al obtener usuario:', error);
        }
      );
    }
    this.sortDataByColumn('APPOINTMENTS_DATE');
  }

  convertISOtoCustomFormat(date: string) {
    const isoDate = new Date(date);
    const year = isoDate.getFullYear();
    const month = String(isoDate.getMonth() + 1).padStart(2, '0');
    const day = String(isoDate.getDate()).padStart(2, '0');
    const hours = String(isoDate.getHours()).padStart(2, '0');
    const minutes = String(isoDate.getMinutes()).padStart(2, '0');
    const seconds = String(isoDate.getSeconds()).padStart(2, '0');

    const customFormatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return customFormatDate;
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

  getStatusAppoitment(id: any): boolean {
    const appointment = this.findByID(id);
    return appointment.STATUS !== 'Activa' && appointment.STATUS !== 'En Curso';
  }

//STATUS_ORDER


  findByID(id: number): any {
    return this.orders.find(order => order.ID_APPOINTMENT === id);
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

  cancelApoiment(dato: any): void {
    const appointmentData = {
      idUser: dato.ID_USER,
      idAppointment: dato.ID_APPOINTMENT,
      appointmentDate: this.convertISOtoCustomFormat(dato.APPOINTMENTS_DATE),
      description: dato.DESCRIPTION,
      status: 'Cancelada'
    };
    this.appointmentService.updateAppoitment(appointmentData).subscribe(
      (response) => {
        console.log('Éxito: ', response);
        this.toastr.success("Cita cancelada con exito", "EXITOSO!");
        this.getApoitments();
      },
      (error) => {
        console.error('Error: ', error);
        this.toastr.error("Error al cancelar la cita", "Error");
      }
    );
  }

  getApoitments(): void {
    if (this.isAdmin) {
      this.appointmentService.getAppointmentsByStatus('All').subscribe(
        data => {
          this.orders = data;
        },
        error => {
          //console.error('Error al obtener usuarios:', error);
        }
      );
    } else {
      this.appointmentService.getAppointmentById(this.authService.getCurrentUser().data.ID_USER).subscribe(
        data => {
          this.orders = data;
        },
        error => {
          //console.error('Error al obtener usuario:', error);
        }
      );
    }
  }

}
