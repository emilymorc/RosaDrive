import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {

  private apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/users/getUsers';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.apiUrl);
  }
}
