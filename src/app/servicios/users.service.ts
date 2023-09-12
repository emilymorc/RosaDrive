import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/users/';
    //private apiUrlG = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/users/';
    private valor: string | null = localStorage.getItem('token')
    private valorCasteado: string | number | (string | number)[] = this.valor as string | number | (string | number)[];

    private selectedUser: any;


    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        const headers = new HttpHeaders({
            'User-Agent': 'Insomnia/2023.5.5',
            'x-access-token': this.valorCasteado
        });

        return this.http.get(`${this.apiUrl}getUsers/`, { headers });
    }

  getUserById(id: number): Observable<any> {
    const token = this.valorCasteado;

    const headers = new HttpHeaders({
      'x-access-token': token
    });

    return this.http.get<any>(`${this.apiUrl}getUserById/${id}`, { headers });
  }

  updateUserData(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.6',
      'x-access-token': this.valorCasteado
    });

    return this.http.post(`${this.apiUrl}/updateUser`, userData, { headers });
  }

  setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  getSelectedUser() {
    return this.selectedUser;
  }

}
