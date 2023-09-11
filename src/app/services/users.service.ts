import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/users/getUsers';
    private valor: string | null = localStorage.getItem('token')
    private valorCasteado: string | number | (string | number)[] = this.valor as string | number | (string | number)[];


    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        const headers = new HttpHeaders({
            'User-Agent': 'Insomnia/2023.5.5',
            'x-access-token': this.valorCasteado
        });

        return this.http.get(this.apiUrl, { headers });
    }
}
