import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../servicios/users.service";
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
  oldPassword: string = '';
  newPassword: string = '';

  constructor(private http: HttpClient,private userService: UserService,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.selectedUser = this.userService.getSelectedUser();
  }

  updateUser(userDataForm: NgForm, passwordDataForm: NgForm) {
    const userData = {
      key: this.selectedUser.ID_USER,
      firstName: userDataForm.value.firstName,
      lastName: userDataForm.value.lastName,
      email: userDataForm.value.email,
      password: this.selectedUser.PASSWORD,
      identification_type: this.selectedUser.IDENTIFICATION_TYPE,
      identification_number: this.selectedUser.IDENTIFICATION_NUMBER
    };

    const passwordData = {
      email: userDataForm.value.email,
      oldPassword: passwordDataForm.value.oldPassword,
      newPassword: passwordDataForm.value.newPassword
    }

    const format =/[^A-Za-z0-9\-]/;

    if (userDataForm.value.firstName.trim() === '' || userDataForm.value.lastName.trim() === ''|| userDataForm.value.email.trim() === ''){
      this.toastr.error("Por favor, complete todos los campos", "¡Campos incompletos!");
      return;
    }

    if (format.test(userDataForm.value.firstName) || format.test(userDataForm.value.lastName)){
      this.toastr.error("Existen campos con caracteres especiales", "¡Campos incorrectos!");
      return;
    }

    if (!this.validateEmail(userDataForm.value.email)) {
      this.toastr.error("Por favor, ingrese un correo valido", "Correo Invalido");
      return;
    }

    const oldPassword = passwordDataForm.value.oldPassword;
    const newPassword = passwordDataForm.value.newPassword;

    if ((!oldPassword ||oldPassword.trim() === '') && (!newPassword || newPassword.trim() === '')){
      this.updateOnlyDataUser(userData, userDataForm);
    }else {
      if(!oldPassword || oldPassword.trim() === ''){
        this.toastr.error("Por favor, complete todos los campos", "¡Campos incompletos!");
        return;
      }

      if(!newPassword || newPassword.trim() === ''){
        this.toastr.error("Por favor, complete todos los campos", "¡Campos incompletos!");
        return;
      }
      this.updatePassword(passwordDataForm);
      this.updateOnlyDataUser(userData, userDataForm);
    }
  }

  updateOnlyDataUser(userData: any, userDataForm: NgForm ): void{
    this.userService.updateUserData(userData).subscribe(
      (response) => {
        this.toastr.success("Usuario modificado con exito", "EXITOSO!");
        this.resetForm(userDataForm);
        this.router.navigate(['/dashboard/view-users']);
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  updatePassword(passwordDataForm: NgForm): void {
    this.userService.updatePassword(passwordDataForm.value.email, passwordDataForm.value.oldPassword, passwordDataForm.value.newPassword).subscribe(
      (response) => {
        this.toastr.success("contraseña modificado con exito", "EXITOSO!");
        this.resetForm(passwordDataForm);
      },
      (error) => {
        console.error('Error al modificar la contraseña:', error);
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
