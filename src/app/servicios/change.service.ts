import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {

  private apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/changes/addchange';
  private token: string | null = localStorage.getItem('token');
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];

  constructor(private http: HttpClient) { }

  addChange(idOrder: number, changeDescription: string, replacedParts: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/2023.5.8',
      'x-access-token': this.castToken
    });

    const body = JSON.stringify({
      idOrder: idOrder,
      changeDescription: changeDescription,
      replacedParts: replacedParts
    });

    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }
}
