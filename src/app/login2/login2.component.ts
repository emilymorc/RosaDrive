import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css'],
  providers: [ToastrModule]
})
export class Login2Component implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  signIn() {
    console.log("entra")
    const url = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/auth/signIn';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.6'
    });

    const body = {
      email: 'alicesmith@example.com',
      password: 'admin'
    };

    this.http.post(url, body, {headers}).subscribe(
      (response) => {
        this.toastr.success("Inicio de sesion exitoso", "EXITO!!")
      },
      (error) => {
        // Maneja el error aquí
        console.error('Error:', error);
      }
    );
  }

  submitForm() {
    const url = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/auth/signIn';

    const body = {
      email: this.email,
      password: this.password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Your-User-Agent'
    });

    this.http.post(url, body, {headers}).subscribe(
      response => {
        this.toastr.success("Inicio de sesión exitoso", "EXITOSO!");
        this.router.navigate(['/dashboard/landing']);
      },
      error => {
        this.toastr.error("Ocurrio un error al iniciar sesion, intente de nuevo", "ERROR!");
      }
    );
  }

  ngOnInit(): void {
  }
}
