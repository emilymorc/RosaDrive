import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../servicios/users.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-account',
  templateUrl: './modify-account.component.html',
  styleUrls: ['./modify-account.component.css'],
  providers: [ToastrModule]
})
export class ModifyAccountComponet implements OnInit{

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  selectedUser: any = {};

  constructor(private http: HttpClient,private userService: UserService,private router: Router, private toastr: ToastrService) { }

  signUp() {
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };



    this.http.post('https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/auth/signUp', userData)
      .subscribe(
        (response) => {
          console.log('Sign up successful:', response);
        },
        (error) => {
          console.error('Sign up error:', error);
        }
      );
  }

  ngOnInit() {
    this.selectedUser = this.userService.getSelectedUser();
  }

  actualizarUsuario(userDataForm: NgForm) {
    const userData = {
      key: this.selectedUser.ID_USER,
      firstName: userDataForm.value.firstName,
      lastName: userDataForm.value.lastName,
      email: userDataForm.value.email,
      password: this.selectedUser.PASSWORD,
      identification_type: this.selectedUser.IDENTIFICATION_TYPE,
      identification_number: this.selectedUser.IDENTIFICATION_NUMBER
    };

    const format =/[^A-Za-z0-9\-]/;

    if (this.firstName.trim() === '' || this.lastName.trim() === ''|| this.email.trim() === ''){
      this.toastr.error("Por favor, complete todos los campos", "¡Campos incompletos!");
      return;
    }

    if (format.test(userDataForm.value.firstName) || format.test(userDataForm.value.lastName)){
      this.toastr.error("Existen campos con caracteres especiales", "¡Campos incorrectos!");
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.toastr.error("Por favor, ingrese un correo valido", "Correo Invalido");
      return;
    }

    this.userService.updateUserData(userData).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        this.toastr.success("Usuario modificado con exito", "EXITOSO!");
        this.resetForm(userDataForm);
        this.router.navigate(['/dashboard/view-users']);
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  resetForm(form: any) {
    form.form.reset();
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

}
