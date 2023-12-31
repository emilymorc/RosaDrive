import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private selectedAppoitment: any;
  private apiUrl = 'https://rosasdriveback.onrender.com/api/appointments';
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

  getAppointmentsByStatus(status: string): Observable<any> {
    const headers = new HttpHeaders({
      'User-Agent': 'insomnia/2023.5.8',
      'x-access-token': this.castToken
    });

    return this.http.get(`${this.apiUrl}/getAppointmentByStatus/${status}`, { headers });
  }

  getAppoitmentId(appoitmentId: number): Observable<any> {
    const url = `${this.apiUrl}/getAppointmentByAppointment/${appoitmentId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.castToken
    });
    return this.http.get(url, { headers });
  }

  setSelectedAppoitment(order: any) {
    this.selectedAppoitment = order;
  }

  getSelectedAppoitment() {
    return this.selectedAppoitment;
  }

  updateAppoitment(appoitmentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.6',
      'x-access-token': this.castToken
    });

    return this.http.post(`${this.apiUrl}/updateAppointment`, appoitmentData, { headers });
  }

  getAppointmentById(id: number): Observable<any> {
    const token = this.castToken;

    const headers = new HttpHeaders({
      'x-access-token': token
    });

    return this.http.get<any>( `${this.apiUrl}/getAppointmentByUser/${id}`, { headers });
  }

}
