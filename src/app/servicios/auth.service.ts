// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private authToken: string = '';

  constructor(private http: HttpClient){
    this.isAuthenticated = !!localStorage.getItem('token');

    console.log(this.isAuthenticated);
  }

  logear(email: string, password: string) {
    const body = { email, password };
    return this.http.post('https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/auth/signIn', body);
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
}

