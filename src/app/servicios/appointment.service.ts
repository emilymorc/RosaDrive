import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/appointments';
  private token: string | null = localStorage.getItem('token');
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];

  constructor(private http: HttpClient) { }

  getAppointmentsByDate(date: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/2023.5.8',
      'x-access-token': this.castToken
    });

    const options = { headers: headers };
    const body = { date: date };

    return this.http.post(`${this.apiUrl}/getAppointmentByDate`, body, options);
  }

  addAppointment(appointmentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/2023.5.8',
      'x-access-token': this.castToken
    });

    return this.http.post(`${this.apiUrl}/addAppointment`, appointmentData, { headers });
  }
}
