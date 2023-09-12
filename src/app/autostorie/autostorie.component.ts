import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../servicios/auth.service";

@Component({
  selector: 'app-autostorie',
  templateUrl: './autostorie.component.html',
  styleUrls: ['./autostorie.component.css']
})
export class AutostorieComponent {

  maxDate: string = '';
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, private authService: AuthService) {
    const currentDate = new Date();
    this.maxDate = currentDate.toISOString().slice(0, 16);
  }

  creationDate: any;
  entryDate: any;
  currentOwner: string = '';
  contactOwner: string = '';
  serviceDate: any;
  additionalNotes: string = '';
  transitLicenseNumber: string = '';
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
  displacement: number = 0;
  bodyType: string = '';
  registrationDate: any;
  hasEncumbrances: string = '';
  transitAgency: string = '';
  classification: string = '';
  isEngineRetagged: string = '';
  isChassisRetagged:string = '';

  isSerialNumberRetagged: string = '';
  classicAntiquity:  string = '';
  fuelType: string = '';
  serviceCard: number = 0;
  totalPassengers: number = 0;
  stateOfSecurity:  string = '';
  dianValid:string = '';
  licensePlateNumber: string = '';
  grossVehicleWeight: number = 0;
  numberOfAxles: number = 0;
  soatPolicyNumber: string = '';
  soatIssueDate: any;
  soatEffectiveDate: any;
  soatExpirationDate: any;
  issuingEntitySoat: string = '';
  status: string = '';
  tariffType: number = 0;
  technicalInspection: string = '';
  inspectionType: string = '';
  issueDate: any;
  effectiveDate: string = '';
  cdaIssuer: string = '';
  isValid: string = '';
  certificateNumber: any;
  consistentInformation: string = '';



  optionsBodyTipe = ['Automóvil', 'Campero', 'Camión', 'Volqueta', 'Bus', 'Microbús', 'Motocicleta', 'Tractocamión', 'Motocarro', 'Cuatrimoto', 'Remolque', 'Semirremolque', 'Vehículo especial', 'Chasis con cabina', 'Camión grúa', 'Ambulancia', 'Carro de bomberos', 'Cabezote', 'Furgoneta', 'Camión cisterna', 'Camión plataforma', 'Camión recolector', 'Vehículo de carga ligera', 'Vehículo eléctrico', 'Camión tanque', 'Camión blindado', 'Remolque de carga', 'Autobús de turismo', 'Autobús escolar', 'Camión de volteo', 'Motocicleta eléctrica', 'Triciclo motorizado', 'Bicicleta motorizada', 'Vehículo de ferrocarril', 'Tractor agrícola', 'Maquinaria de construcción', 'Camión frigorífico', 'Camión de reparto', 'Camión de carga peligrosa', 'Camión de basura', 'Camión de mudanza', 'Remolque de alimentos', 'Camión de bomberos aéreo', 'Vehículo de rescate', 'Caravana', 'Camión de pasajeros', 'Remolque de carga pesada', 'Vehículo todoterreno', 'Camión de reparto de gas', 'Remolque de ganado'];
  transitAgency2 = ['Particular', 'Público', 'Oficial', 'Diplomático', 'Militar', 'Policía', 'Educación', 'Salud', 'Seguridad', 'Transporte escolar', 'Bomberos', 'Taxi', 'Transporte de carga', 'Transporte mixto', 'Transporte turístico', 'Otro'];
  vehicleState2 = ['En circulación', 'Fuera de circulación', 'Siniestrado', 'Chatarra', 'Robado o desaparecido', 'En proceso de importación o nacionalización'];
  transitAgency1 = ['Ministerio de Transporte', 'Dirección General de Tránsito y Transporte Terrestre (DIGETT)', 'Secretarías de Tránsito y Transporte', 'Policía de Tránsito', 'Superintendencia de Transporte', 'Autoridades de Transporte Público', 'Instituto Nacional de Vías (INVIAS)', 'Agencias de Control de Tráfico', 'Entidades de Control Ambiental']
  combustible = ['Gasolina', 'Diésel', 'Gas Natural Vehicular (GNV)', 'Gas Licuado de Petróleo (GLP)', 'Eléctrico', 'Híbrido', 'Etanol', 'Hidrógeno'];


  showError = false; // Para mostrar u ocultar el error
  campoId = '';


  prueba(){
    console.log( "token" + localStorage.getItem('token'));
    const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    console.log( "tokenCasteo" + localStorage.getItem('token'));
    console.log("Fecha" + this.convertirFecha(this.creationDate))
  }
  signUp(form: any){
    const apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/stories/addStory';
    const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    const format =/[^A-Za-z0-9\-]/;

    if (this.currentOwner.trim() === '' || this.contactOwner.trim() === ''|| this.licensePlateNumber.trim() === ''|| this.transitLicenseNumber.trim() === ''
      || this.brand.trim() === ''|| this.line.trim() === ''|| this.model.trim() === ''|| this.color.trim() === ''
      || this.engineNumber.trim() === ''|| this.chassisNumber.trim() === ''|| this.vinNumber.trim() === ''|| this.soatPolicyNumber.trim() === ''
      || this.issuingEntitySoat.trim() === ''|| this.certificateNumber.trim() === ''
      || this.consistentInformation.trim() === '') {
      this.toastr.error("Por favor, complete todos los campos", "Campos Vacios");
      return;
    }

    if (format.test(form.value.licensePlateNumber) || format.test(form.value.currentOwner)|| format.test(form.value.transitLicenseNumber) || format.test(form.value.brand)|| format.test(form.value.line)
      || format.test(form.value.model) || format.test(form.value.color)){
      this.toastr.error("Existen campos con caracteres especiales", "¡Campos incorrectos!");
      this.showError = true;
      return;
    }


    const data = {

      creationDate: this.creationDate,
      entryDate: this.convertirFecha(this.entryDate),
      serviceDate:this.convertirFecha(this.serviceDate),
      registrationDate: this.convertirFecha(this.registrationDate),
      soatIssueDate: this.convertirFecha(this.soatIssueDate),
      soatEffectiveDate: this.convertirFecha(this.soatEffectiveDate),
      soatExpirationDate: this.convertirFecha(this.soatExpirationDate),
      issueDate: this.convertirFecha(this.issueDate),
      effectiveDate: this.convertirFecha(this.effectiveDate),

      brand: this.brand,
      color: this.color,
      currentOwner: this.currentOwner,
      contactOwner: this.contactOwner,
      additionalNotes: this.additionalNotes,
      transitLicenseNumber: this.transitLicenseNumber,
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
      transitAgency: this.transitAgency,
      classification: this.classification,
      isEngineRetagged: this.stringToBoolean(this.isEngineRetagged),
      isChassisRetagged: this.stringToBoolean(this.isChassisRetagged),

      isSerialNumberRetagged: this.stringToBoolean(this.isSerialNumberRetagged),
      classicAntiquity: this.stringToBoolean(this.classicAntiquity),
      fuelType: this.fuelType,
      serviceCard: this.serviceCard,
      totalPassengers: this.totalPassengers,
      stateOfSecurity: this.stringToBoolean(this.stateOfSecurity),
      dianValid: this.stringToBoolean(this.dianValid),
      licensePlateNumber: this.licensePlateNumber,
      grossVehicleWeight: this.grossVehicleWeight,
      numberOfAxles: this.numberOfAxles,
      soatPolicyNumber: this.soatPolicyNumber,

      issuingEntitySoat: this.issuingEntitySoat,
      status: this.status,
      tariffType: this.tariffType,
      technicalInspection: this.technicalInspection,
      inspectionType: this.inspectionType,

      cdaIssuer: this.cdaIssuer,
      isValid: this.stringToBoolean(this.isValid),
      certificateNumber: this.certificateNumber,
      consistentInformation: this.stringToBoolean(this.consistentInformation),

    };
    console.log("Data: " + this.entryDate)
    console.log("bool" + this.stringToBoolean(this.isValid) )

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': valorCasteado
    });

    console.log(this.authService.getToken())


    this.http.post(apiUrl, data, {headers: headers})
      .subscribe(
        (response) => {
          console.log('Sign up successful:', response);
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
