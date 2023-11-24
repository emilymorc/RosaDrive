import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getTechnicians(): Observable<string[]> {
    return this.getOrdersByTechnician().pipe(
      map(data => data.map((item: { RESPONSIBLE_TECHNICIAN: string }) => item.RESPONSIBLE_TECHNICIAN))
    );
  }

  getTecicsMonth(month: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': this.castToken,
    });

    const body = {
      date: month,
    };

    return this.http.post(`${this.apiUrl}/ordersByTechnicianMonth`, body, { headers });
  }

  getOrdersComplete(): Observable<number[]> {
    return this.getOrdersByTechnician().pipe(
      map(data => data.map((item: { ORDERS_COMPLETE: number }) => item.ORDERS_COMPLETE))
    );
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

    return this.http.post(`${this.apiUrl}/valueOrdersDate`, body, { headers });
  }

  getApppoitmentsMonth(month: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': this.castToken,
    });

    const body = {
      date: month,
    };

    return this.http.post(`${this.apiUrl}/numberAppointmentsMonth`, body, { headers });
  }


  getValueOrdersYear(year: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': this.castToken,
    });

    const body = {
      date: year,
    };

    return this.http.post(`${this.apiUrl}/valueOrdersYear`, body, { headers });
  }

  getAppoitmentsYear(year: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': this.castToken,
    });

    const body = {
      date: year,
    };

    return this.http.post(`${this.apiUrl}/numberAppointmentsYear`, body, { headers });
  }
}
