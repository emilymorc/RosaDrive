import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/stories';
  private token: string | null = localStorage.getItem('token');
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];

  constructor(private http: HttpClient) { }

  getHistories(): Observable<any> {
    const headers = new HttpHeaders({
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token':this.castToken
    });

    return this.http.get(`${this.apiUrl}/getStories`, { headers });
  }

  getStoryById(id: number): Observable<any> {
    const url = `${this.apiUrl}/getStoryById/${id}`;
    const headers = new HttpHeaders({
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token':this.castToken
    });
    return this.http.get(url, { headers });
  }
}
