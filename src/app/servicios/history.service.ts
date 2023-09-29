import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/stories/';
  private token: string | null = localStorage.getItem('token')
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];

  private selectedHistory: any;
  constructor(private http: HttpClient) { }


  getHistories(): Observable<any> {
    const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    const headers = new HttpHeaders({
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token':valorCasteado
    });

    return this.http.get(`${this.apiUrl}getStories/`, { headers });
  }

  getHistoryById(id: number): Observable<any> {
    const token = this.castToken;

    const headers = new HttpHeaders({
      'x-access-token': token
    });

    return this.http.get<any>(`https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/stories/getStoryById/${id}`, { headers });
  }

  setSelectedHistory(history: any) {
    this.selectedHistory = history;
  }
  getSelectedHistory() {
    return this.selectedHistory;
  }
}
