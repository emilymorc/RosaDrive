import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/stories/getStories';
  private accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjk0MzgxNjEwLCJleHAiOjE2OTQ0NjgwMTB9.avJWxnQ-Nom5ICE4tMB1vEWptsDf_MP5SI1qjzP_xuM';

  constructor(private http: HttpClient) { }

  getHistories(): Observable<any> {
    const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    const headers = new HttpHeaders({
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token':valorCasteado
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
