import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from "../servicios/auth.service";
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
        const role = response.data.ROLE
        this.authService.setAuthentication(token);
        this.authService.setCurrentUser(response);
        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'))

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



  ngOnInit(): void {
  }
}
