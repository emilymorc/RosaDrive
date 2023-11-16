import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {

  private apiUrl = 'https://rosasdriveback.onrender.com/api/reports';
  private token: string | null = localStorage.getItem('token')
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];

  constructor(private http: HttpClient) {}

  getOrdersByTechnician(): Observable<any> {
    const headers = new HttpHeaders({
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': this.castToken,
    });

    return this.http.get(`${this.apiUrl}/ordersByTechnician`, { headers });
  }

  getValueOrdersDay(day: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': this.castToken,
    });

    const body = {
      date: day,
    };

    return this.http.post(`${this.apiUrl}/valueOrdersDate`, body, { headers });
  }

  getValueOrdersMonth(month: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': this.castToken,
    });

    const body = {
      date: month,
    };

    return this.http.post(`${this.apiUrl}/valueOrdersMonth`, body, { headers });
  }
}
