import { Injectable } from '@angular/core';

import {CreateAccountComponent} from "./account/create-account/create-account.component";
// import {UserModel} from "./loggin/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {

  readonly APIUrl = "";
  // formDataUser: UserModel = new UserModel();

  constructor(private http: HttpClient) { }

  // getUserValidation2(): Promise<boolean> {
  //   const key = this.formDataUser.email;
  //   const value = this.formDataUser.password;
  //   const url = `${this.APIUrl}/Users/Login?email=${key}&password=${value}`;
  //
  //   return new Promise<boolean>((resolve, reject) => {
  //     this.http.get<any>(url).subscribe(
  //       response => {
  //         const validacion = response.validacion;
  //         console.log(validacion);
  //         resolve(validacion);
  //       },
  //       error => {
  //         reject(error);
  //       }
  //     );
  //   });
  // }
}
