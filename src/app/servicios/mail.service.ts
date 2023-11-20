import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailService {

  private apiUrl = 'https://rosasdriveback.onrender.com/api/mail/sendMail';

  constructor(private http: HttpClient) {}

  sendEmail(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/2023.5.8',
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
