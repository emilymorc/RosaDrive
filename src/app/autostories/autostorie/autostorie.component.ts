import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../servicios/auth.service";
import {HistoryService} from "../../servicios/history.service";

@Component({
  selector: 'app-autostorie',
  templateUrl: './autostorie.component.html',
  styleUrls: ['./autostorie.component.css']
})
export class AutostorieComponent {

  maxDate: string = '';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, private service: HistoryService) {
    const currentDate = new Date();
    this.maxDate = currentDate.toISOString().slice(0, 16);
  }

  entryDate: any;
  currentOwner: string = '';
  contactOwner: string = '';
  additionalNotes: string = '';
  vehicleState: string = '';
  serviceType: string = '';
  vehicleClass: string = '';
  brand: string = '';
  line: string = '';
  model: string = '';
  color: string = '';
  engineNumber: string = '';
  chassisNumber: string = '';
  vinNumber: string = '';
  displacement: number = 1.0;
  bodyType: string = '';

  hasEncumbrances: string = '';

  isEngineRetagged: string = '';
  isChassisRetagged: string = '';

  isSerialNumberRetagged: string = '';
  fuelType: string = '';
  serviceCard: number = 0;
  totalPassengers: number = 1;
  totalPassengersSit: number = 1;

  dianValid: string = '';
  licensePlateNumber: string = '';
  grossVehicleWeight: number = 1;
  numberOfAxles: number = 1;
  soatPolicyNumber: string = '';

  issuingEntitySoat: string = '';
  status: string = '';

  technicalInspection: string = '';
  inspectionType: string = '';


  optionsBodyTipe = ['Automóvil', 'Campero', 'Camión', 'Volqueta', 'Bus', 'Microbús', 'Motocicleta', 'Tractocamión', 'Motocarro', 'Cuatrimoto', 'Remolque', 'Semirremolque', 'Vehículo especial', 'Chasis con cabina', 'Camión grúa', 'Ambulancia', 'Carro de bomberos', 'Cabezote', 'Furgoneta', 'Camión cisterna', 'Camión plataforma', 'Camión recolector', 'Vehículo de carga ligera', 'Vehículo eléctrico', 'Camión tanque', 'Camión blindado', 'Remolque de carga', 'Autobús de turismo', 'Autobús escolar', 'Camión de volteo', 'Motocicleta eléctrica', 'Triciclo motorizado', 'Bicicleta motorizada', 'Vehículo de ferrocarril', 'Tractor agrícola', 'Maquinaria de construcción', 'Camión frigorífico', 'Camión de reparto', 'Camión de carga peligrosa', 'Camión de basura', 'Camión de mudanza', 'Remolque de alimentos', 'Camión de bomberos aéreo', 'Vehículo de rescate', 'Caravana', 'Camión de pasajeros', 'Remolque de carga pesada', 'Vehículo todoterreno', 'Camión de reparto de gas', 'Remolque de ganado'];
  transitAgency2 = ['Particular', 'Público', 'Oficial', 'Diplomático', 'Militar', 'Policía', 'Educación', 'Salud', 'Seguridad', 'Transporte escolar', 'Bomberos', 'Taxi', 'Transporte de carga', 'Transporte mixto', 'Transporte turístico', 'Otro'];
  vehicleState2 = ['En circulación', 'Fuera de circulación', 'Siniestrado', 'Chatarra', 'Robado o desaparecido', 'En proceso de importación o nacionalización'];
  transitAgency1 = ['Ministerio de Transporte', 'Dirección General de Tránsito y Transporte Terrestre (DIGETT)', 'Secretarías de Tránsito y Transporte', 'Policía de Tránsito', 'Superintendencia de Transporte', 'Autoridades de Transporte Público', 'Instituto Nacional de Vías (INVIAS)', 'Agencias de Control de Tráfico', 'Entidades de Control Ambiental']
  combustible = ['Gasolina', 'Diésel', 'Gas Natural Vehicular (GNV)', 'Gas Licuado de Petróleo (GLP)', 'Eléctrico', 'Híbrido', 'Etanol', 'Hidrógeno'];


  showError = false; // Para mostrar u ocultar el error
  campoId = '';


  signUp(form: any) {

    const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    const format = /[^A-Za-z0-9\-]/;

    if (parseInt(this.engineNumber) < 0 || parseInt(this.chassisNumber) <0 || parseInt(this.vinNumber) < 0 || this.displacement < 0 || this.numberOfAxles < 0 ||
      parseInt(this.soatPolicyNumber) <0 || this.grossVehicleWeight < 0 || this.totalPassengers <0 || this.totalPassengersSit < 0) {
      this.toastr.error("Existen campos negativos", "¡Campos incorrectos!");
      this.showError = true;
      return;
    }

    if (this.currentOwner.trim() === '' || this.contactOwner.trim() === '' || this.licensePlateNumber.trim() === ''
      || this.brand.trim() === '' || this.line.trim() === '' || this.model.trim() === '' || this.color.trim() === ''
      || this.engineNumber.trim() === '' || this.chassisNumber.trim() === '' || this.vinNumber.trim() === '' || this.soatPolicyNumber.trim() === ''
      || this.issuingEntitySoat.trim() === '') {
      this.toastr.error("Por favor, complete todos los campos", "Campos Vacios");
      return;
    }

    if (this.vehicleState.trim() === '' || this.serviceType.trim() === '' || this.vehicleClass.trim() === ''
      || this.bodyType.trim() === '' || this.hasEncumbrances.trim() === ''
      || this.isEngineRetagged.trim() === '' || this.isChassisRetagged.trim() === '' || this.isSerialNumberRetagged.trim() === ''
      || this.fuelType.trim() === ''
      || this.dianValid.trim() === '' || this.status.trim() === '') {
      this.toastr.error("Por favor, complete todos los campos", "Campos Vacios");
      return;
    }

    if (format.test(form.value.licensePlateNumber) || format.test(form.value.currentOwner) || format.test(form.value.transitLicenseNumber) || format.test(form.value.brand) || format.test(form.value.line)
      || format.test(form.value.model) || format.test(form.value.color)) {
      this.toastr.error("Existen campos con caracteres especiales", "¡Campos incorrectos!");
      this.showError = true;
      return;
    }


    const data = {

      entryDate: this.convertirFecha(this.entryDate),
      brand: this.brand,
      color: this.color,
      currentOwner: this.currentOwner,
      contactOwner: this.contactOwner,
      additionalNotes: this.additionalNotes,
      vehicleState: this.vehicleState,
      serviceType: this.serviceType,
      vehicleClass: this.vehicleClass,
      line: this.line,
      model: this.model,
      engineNumber: this.engineNumber,
      chassisNumber: this.chassisNumber,
      vinNumber: this.vinNumber,
      displacement: this.displacement,
      bodyType: this.bodyType,

      hasEncumbrances: this.stringToBoolean(this.hasEncumbrances),

      isEngineRetagged: this.stringToBoolean(this.isEngineRetagged),
      isChassisRetagged: this.stringToBoolean(this.isChassisRetagged),

      isSerialNumberRetagged: this.stringToBoolean(this.isSerialNumberRetagged),

      fuelType: this.fuelType,
      serviceCard: this.serviceCard,
      totalPassengers: this.totalPassengers,

      dianValid: this.stringToBoolean(this.dianValid),
      licensePlateNumber: this.licensePlateNumber,
      grossVehicleWeight: this.grossVehicleWeight,
      numberOfAxles: this.numberOfAxles,
      soatPolicyNumber: this.soatPolicyNumber,

      issuingEntitySoat: this.issuingEntitySoat,
      status: this.status,

      technicalInspection: this.technicalInspection,
      inspectionType: this.inspectionType,


    };

    this.service.addAutoStorie(data)
      .subscribe(
        (response) => {
          this.toastr.success("Historial creado con exito", "EXITOSO!");
          this.resetForm(form);
        },
        (error) => {
          console.error('Sign up error:', error);
          this.toastr.error("Ocurrio un error al crear historial , intente de nuevo", "ERROR!");
        }
      );
  }


  resetForm(form: any) {
    form.form.reset();
  }

  stringToBoolean(value: string): boolean | null {
    if (value.toLowerCase() === 'true') {
      return true;
    } else if (value.toLowerCase() === 'false') {
      return false;
    } else {
      return null; // Valor no reconocido, puedes manejarlo de acuerdo a tus necesidades
    }
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
