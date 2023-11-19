import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';

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

  getFilterCategories(): Observable<any> {
    return this.getHistories().pipe(
      map((response: any[]) => {
        return {
          filter1: this.extractUniqueValues(response, 'BRAND'),
          filter2: this.extractUniqueValues(response, 'CURRENT_OWNER'),
          filter3: this.extractUniqueValues(response,'MODEL'),
          filter4: this.extractUniqueValues(response,'VEHICLE_STATE'),
          filter5: this.extractUniqueValues(response,'SERVICE_TYPE')
        };
      })
    );
  }

  private extractUniqueValues(data: any[], property: string): string[] {
    return Array.from(new Set(data.map(item => item[property])));
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
