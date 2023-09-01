import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  providers: [ToastrModule]
})
export class CreateAccountComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

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
          this.toastr.success("Usuario creado", "EXITO!!")
        },
        (error) => {
          console.error('Sign up error:', error);
        }
      );
  }

}
