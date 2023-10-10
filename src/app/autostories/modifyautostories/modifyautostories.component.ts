import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, NgForm} from "@angular/forms";
import {AuthService} from "../../servicios/auth.service";
import {HistoryService} from "../../servicios/history.service";

@Component({
  selector: 'app-modifyautostories',
  templateUrl: './modifyautostories.component.html',
  styleUrls: ['./modifyautostories.component.css']
})
export class ModifyautostoriesComponent {

  selecteHistoy: any = {};
  idHitory: any;
  entryDate: any;
  currentOwner: string = '';
  contactOwner: string = '';
  additionalNotes: string = '';
  licensePlateNumber: string = '';
  brand: string = '';
  line: string = '';
  model: string = '';
  color: string = '';
  engineNumber: string = '';
  chassisNumber: string = '';
  vinNumber: string = '';
  displacement: number = 0;
  bodyType: string = '';
  totalPassengers: number = 0;
  grossVehicleWeight: number = 0;
  numberOfAxles: number = 0;
  soatPolicyNumber: string = '';
  issuingEntitySoat: string = '';
  inspectionType: string = '';
  vehicleState: string = '';
  serviceType: string = '';
  vehicleClass: string = '';
  hasEncumbrances: string = '';
  isEngineRetagged: string = '';
  isChassisRetagged:string = '';
  isSerialNumberRetagged: string = '';
  fuelType: string = '';
  dianValid:string = '';
  status: string = '';


  constructor(private router: Router, private historyService: HistoryService, private http: HttpClient,private toastr: ToastrService,private authService: AuthService ,private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.selecteHistoy = this.historyService.getSelectedHistory();
    this.idHitory = this.selecteHistoy.ID_STORY;
    this.entryDate = this.selecteHistoy.ENTRY_DATE;
    this.currentOwner = this.selecteHistoy.CURRENT_OWNER;
    this.contactOwner = this.selecteHistoy.OWNER_CONTACT;
    this.additionalNotes = this.selecteHistoy.ADDITIONAL_NOTES;
    this.licensePlateNumber = this.selecteHistoy.LICENSE_PLATE_NUMBER;
    this.brand = this.selecteHistoy.BRAND;
    this.line = this.selecteHistoy.LINE;
    this.model = this.selecteHistoy.MODEL;
    this.color = this.selecteHistoy.COLOR;
    this.engineNumber = this.selecteHistoy.ENGINE_NUMBER;
    this.chassisNumber = this.selecteHistoy.CHASSIS_NUMBER;
    this.vinNumber = this.selecteHistoy.VIN_NUMBER;
    this.displacement = this.selecteHistoy.DISPLACEMENT;
    this.bodyType = this.selecteHistoy.BODY_TYPE;
    this.totalPassengers = this.selecteHistoy.TOTAL_PASSENGERS;
    this.grossVehicleWeight = this.selecteHistoy.GROSS_VEHICLE_WEIGHT;
    this.numberOfAxles = this.selecteHistoy.NUMBER_OF_AXLES;
    this.soatPolicyNumber = this.selecteHistoy.SOAT_POLICY_NUMBER;
    this.issuingEntitySoat = this.selecteHistoy.ISSUING_ENTITY_SOAT;
    this.inspectionType = this.selecteHistoy.INSPECTION_TYPE;
    this.vehicleState = this.selecteHistoy.VEHICLE_STATE;
    this.serviceType = this.selecteHistoy.SERVICE_TYPE;
    this.vehicleClass = this.selecteHistoy.VEHICLE_CLASS;
    this.hasEncumbrances = this.selecteHistoy.HAS_ENCUMBRANCES === 0 ? 'false' : 'true';
    this.isEngineRetagged = this.selecteHistoy.IS_ENGINE_RETAGGED === 0 ? 'false' : 'true';
    this.isChassisRetagged = this.selecteHistoy.IS_CHASSIS_RETAGGED === 0 ? 'false' : 'true';
    this.isSerialNumberRetagged = this.selecteHistoy.IS_SERIAL_NUMBER_RETAGGED === 0 ? 'false' : 'true';
    this.fuelType = this.selecteHistoy.FUEL_TYPE;
    this.dianValid = this.selecteHistoy.DIAN_VALID === 0 ? 'false' : 'true';
    this.status = this.selecteHistoy.STATUS;
  }

  serviceDate: any;

  transitLicenseNumber: string = '';




  registrationDate: any;

  transitAgency: string = '';
  classification: string = '';




  classicAntiquity:  string = '';

  serviceCard: number = 0;

  stateOfSecurity:  string = '';


  soatIssueDate: any;
  soatEffectiveDate: any;
  soatExpirationDate: any;


  tariffType: number = 0;
  technicalInspection: string = '';

  issueDate: any;
  effectiveDate: string = '';
  cdaIssuer: string = '';
  isValid: string = '';
  certificateNumber: any;
  consistentInformation: string = '';

  transitAgency2 = ['Particular', 'Público', 'Oficial', 'Diplomático', 'Militar', 'Policía', 'Educación', 'Salud', 'Seguridad', 'Transporte escolar', 'Bomberos', 'Taxi', 'Transporte de carga', 'Transporte mixto', 'Transporte turístico', 'Otro'];
  vehicleState2 = ['En circulación', 'Fuera de circulación', 'Siniestrado', 'Chatarra', 'Robado o desaparecido', 'En proceso de importación o nacionalización'];
  combustible = ['Gasolina', 'Diésel', 'Gas Natural Vehicular (GNV)', 'Gas Licuado de Petróleo (GLP)', 'Eléctrico', 'Híbrido', 'Etanol', 'Hidrógeno'];
  showError = false; // Para mostrar u ocultar el error

  signUp(form: any){
    const apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/stories/updateStory';
    const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    const format = /[^A-Za-z0-9\-]/;

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

      idStory: this.idHitory,
      creationDate: this.convertirFecha(this.entryDate),
      entryDate: this.convertirFecha(this.entryDate),
      currentOwner: this.currentOwner,
      ownerContact: this.contactOwner,
      serviceDate:this.convertirFecha(this.entryDate),
      additionalNotes: this.additionalNotes,
      transitLicenseNumber: this.transitLicenseNumber,
      vehicleState: this.vehicleState,
      serviceType: this.serviceType,
      vehicleClass: this.vehicleClass,
      brand: this.brand,
      line: this.line,
      model: this.model,
      color: this.color,
      engineNumber: this.engineNumber,
      chassisNumber: this.chassisNumber,
      vinNumber: this.vinNumber,
      displacement: this.displacement,
      bodyType: this.bodyType,
      registrationDate: this.convertirFecha(this.entryDate),
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
      soatIssueDate: this.convertirFecha(this.entryDate),
      soatEffectiveDate: this.convertirFecha(this.entryDate),
      soatExpirationDate: this.convertirFecha(this.entryDate),
      issuingEntitySoat: this.issuingEntitySoat,
      status: this.status,
      tariffType: this.tariffType,
      technicalInspection: this.technicalInspection,
      inspectionType: this.inspectionType,
      issueDate: this.convertirFecha(this.entryDate),
      effectiveDate: this.convertirFecha(this.entryDate),
      cdaIssuer: this.cdaIssuer,
      isValid: this.stringToBoolean(this.isValid),
      certificateNumber: this.certificateNumber,
      consistentInformation: this.stringToBoolean(this.consistentInformation)
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
          this.toastr.success("Historial modificado con exito", "EXITOSO!");
          this.resetForm(form);
          this.router.navigate(['/dashboard/viewStories']);
        },
        (error) => {
          console.error('Sign up error:', error);
          this.toastr.error("Ocurrio un error al modificar historial , intente de nuevo", "ERROR!");
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
      return null;
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
