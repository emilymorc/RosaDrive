import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {

  private apiUrl = 'https://rosasdriveback.onrender.com/api/reports/logs';
  private token: string | null = localStorage.getItem('token')
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];

  constructor(private http: HttpClient) {}

  getLogs(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': this.castToken,
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
