import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {

  private changeApiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/changes/addchange';
  private apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/files/uploadImageOrder';
  private urlget = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/changes/getChangesByIdOrder';
  private urlImagen = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/files/getImagesIdOrder'
  private imagesApiUrl = 'https://api.imgbb.com/1/upload';
  private ImageChangeApiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/files/uploadImageChange';
  private token: string | null = localStorage.getItem('token');
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];

  constructor(private http: HttpClient) { }

  addChange(idOrder: number, changeDescription: string, replacedParts: number, referencedParts: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/2023.5.8',
      'x-access-token': this.castToken
    });

    const body = JSON.stringify({
      idOrder: idOrder,
      changeDescription: changeDescription,
      replacedParts: replacedParts,
      referencesParts: referencedParts
    });

    return this.http.post<any>(this.changeApiUrl, body, { headers: headers });
  }

  uploadChangeImage(idChange: number, displayUrl: string, filename: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/2023.5.8',
      'x-access-token': this.castToken
    });

    const requestBody = {
      idChange,
      displayUrl,
      filename
    };

    return this.http.post(this.ImageChangeApiUrl, requestBody, { headers });
  }

  uploadImage(imageBase64: string, apiKey: string): Observable<any> {
    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', imageBase64);

    return this.http.post(this.imagesApiUrl, formData);
  }

  getChanges(orderId: number): Observable<any> {
    const url = `${this.urlget}/${orderId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.castToken
    });
    return this.http.get(url, { headers });
  }

  getImages(orderId: number): Observable<any> {
    const url = `${this.urlImagen}/${orderId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.castToken
    });
    console.log(this.castToken);
    return this.http.get(url, { headers });
  }
}
