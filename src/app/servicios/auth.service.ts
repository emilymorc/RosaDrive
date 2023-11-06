// auth.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private user: any;
  private authToken: string = '';
  private currentUser: any;
  private apiUrl = 'https://rosasdriveback.onrender.com/api/auth';
  private token: string | null = localStorage.getItem('token');
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];

  constructor(private http: HttpClient){
    this.isAuthenticated = !!localStorage.getItem('token');
    this.currentUser = null;
    console.log(this.isAuthenticated);
  }

  logear(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/signIn`, body);
  }

  addAccount(accountData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/2023.5.8',
      'x-access-token': this.castToken
    });

    return this.http.post(`${this.apiUrl}/signUp`, accountData, { headers });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Método para obtener el token de autenticación
  getToken(): string {
    return this.authToken;
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token')
    this.isAuthenticated = false;
    this.authToken = '';

  }

  // Método para establecer el estado de autenticación y el token
  setAuthentication(token: string): void {
    this.isAuthenticated = true;
    this.authToken = token;
    localStorage.setItem(this.authToken,token);
  }

  setCurrentUser(user: any): void {
    this.currentUser = user;
    this.user = user;
    localStorage.setItem('actualUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    this.currentUser = localStorage.getItem('actualUser');
    const userObject = JSON.parse(this.currentUser);
    return userObject;
  }

  isUserAdmin(): boolean {
    return this.getCurrentUser() && this.getCurrentUser().data.ROLE === 'Admin';
  }

}

