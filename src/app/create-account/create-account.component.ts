import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  providers: [ToastrModule]
})
export class CreateAccountComponent {

  optionsTypeIdentificastionNumber = ['Cédula de identidad', 'Pasaporte', 'Tarjeta de identificación', 'Cedula de Extrangeria'];
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  identification_type: string = '';
  identification_number: string = '';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {
  }


  signUp(form: any) {
    const userData = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      identification_type: this.identification_type,
      identification_number: this.identification_number
    };

    if (this.first_name.trim() === '' || this.last_name.trim() === ''|| this.password.trim() === '') {
      this.toastr.error("Por favor, complete todos los campos", "Campos Vacios");
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.toastr.error("Por favor, ingrese un correo valido", "Correo Invalido");
      return;
    }

    this.http.post('https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/auth/signUp', userData)
      .subscribe(
        (response) => {
          console.log('Sign up successful:', response);
          this.toastr.success("Usuario creado con exito", "EXITOSO!");
          this.resetForm(form);
        },
        (error) => {
          console.error('Sign up error:', error);
          this.toastr.error("Ocurrio un error al crear usuario, intente de nuevo", "ERROR!");
        }
      );
  }

  onDocumentInfoInput() {
    switch (this.identification_type) {
      case 'Cédula de identidad':
      case 'Tarjeta de identificación':
        this.identification_number = this.identification_number.replace(/[^0-9]/g, '').substr(0, 10);
        break;

      case 'Pasaporte':
        this.identification_number = this.identification_number.replace(/[^a-zA-Z0-9]/g, '').substr(0, 50);
        break;

      case 'Cedula de Extrangeria':
        this.identification_number = this.identification_number.replace(/[^a-zA-Z0-9]/g, '').substr(0, 7);
        break;
    }
  }

  validateDocument() {
    switch (this.identification_type) {
      case 'Cédula de identidad':
        if (/^\d{7,10}$/.test(this.identification_number)) {
          return true;
        }
        break;
      case 'Pasaporte':
        if (/^[a-zA-Z0-9]{1,50}$/.test(this.identification_number)) {
          return true;
    }
        break;
      case 'Tarjeta de identificación':
        if (/^\d{7,10}$/.test(this.identification_number)) {
          return true;
        }
        break;
      case 'Cedula de Extrangeria':
        if (/^[a-zA-Z0-9]{1,7}$/.test(this.identification_number)) {
          return true;
        }
        break;
      default:
    }
    this.toastr.error("Por favor, ingrese un documento valido para el tipo de documento seleccionado", "Documento Invalido");
    return false;
  }
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  resetForm(form: any) {
    form.form.reset();
  }

}
