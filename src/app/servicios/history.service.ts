import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiUrl = 'https://rosasdriveback.onrender.com/api/stories';
  private token: string | null = localStorage.getItem('token');
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];

  private selectedHistory: any;
  constructor(private http: HttpClient) { }

  addAutoStorie(AutoStorieData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/2023.5.8',
      'x-access-token': this.castToken
    });

    return this.http.post(`${this.apiUrl}/addStory`, AutoStorieData, { headers });
  }

  updateStorie(storieData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.6',
      'x-access-token': this.castToken
    });

    return this.http.post(`${this.apiUrl}/updateStory`, storieData, { headers });
  }

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

    return this.http.get(`${this.apiUrl}getStories/`, { headers });
  }

  getHistoryById(id: number): Observable<any> {
    const token = this.castToken;

    const headers = new HttpHeaders({
      'x-access-token': token
    });

    return this.http.get<any>(`https://rosasdriveback.onrender.com/api/stories/getStoryById/${id}`, { headers });
  }

  setSelectedHistory(history: any) {
    this.selectedHistory = history;
  }
  getSelectedHistory() {
    return this.selectedHistory;
    //return this.http.get(url, { headers });
  }
}
