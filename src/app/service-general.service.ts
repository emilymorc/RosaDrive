import { Injectable } from '@angular/core';

import {CreateAccountComponent} from "./account/create-account/create-account.component";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {

  readonly APIUrl = "";

  constructor(private http: HttpClient) { }

}
