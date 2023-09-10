import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
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

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService,private authService: AuthService) {
  }

  onSubmit() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      this.toastr.error("Por favor, complete todos los campos", "Campos Vacios");
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.toastr.error("Por favor, ingrese un correo valido", "Correo Invalido");
      return;
    }
    this.authService.logear(this.email, this.password)
      .subscribe((response:any) => {
        const token = response.data.TOKEN;
        this.authService.setAuthentication(token);
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard/landing']);
        this.toastr.success("Inicio de sesión exitoso", "EXITOSO!");
      },
      (error) => {
        this.toastr.error("Ocurrio un error al iniciar sesion, intente de nuevo", "ERROR!");
        console.error('Error al iniciar sesión', error);
      }
    );
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  logout(){
    this.authService.logout();
  }

  // signIn() {
  //   console.log("entra")
  //   const url = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/auth/signIn';
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'User-Agent': 'Insomnia/2023.5.6'
  //   });
  //
  //   const body = {
  //     email: 'alicesmith@example.com',
  //     password: 'admin'
  //   };
  //
  //   this.http.post(url, body, {headers}).subscribe(
  //     (response) => {
  //       this.toastr.success("Inicio de sesion exitoso", "EXITO!!")
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }
  //
  // submitForm() {
  //   const url = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/auth/signIn';
  //
  //   const body = {
  //     email: this.email,
  //     password: this.password
  //   };
  //
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'User-Agent': 'Your-User-Agent'
  //   });
  //
  //   this.http.post(url, body, {headers}).subscribe(
  //     response => {
  //       this.toastr.success("Inicio de sesión exitoso", "EXITOSO!");
  //       this.router.navigate(['/dashboard/landing']);
  //     },
  //     error => {
  //       this.toastr.error("Ocurrio un error al iniciar sesion, intente de nuevo", "ERROR!");
  //     }
  //   );
  // }

  ngOnInit(): void {
  }
}
