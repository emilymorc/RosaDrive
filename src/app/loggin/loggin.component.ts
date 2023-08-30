import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ServiceGeneralService} from "../service-general.service";

@Component({
  selector: 'app-login',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent {
  constructor(
    private route: Router,
    public service: ServiceGeneralService,
  ) {
  }

  async validateUser(): Promise<void> {
    try {
      const isValid = await this.service.getUserValidation2();
      if (isValid) {
        console.log("si");
        // this.toastr.success("Se creo la lista de compras con exito", "EXITOSO!");
      } else {
        console.log("no")
      }
    } catch (error) {
      //this.toastr.error("Ocurrio un error al iniciar sesion, intente de nuevo", "ERROR!");
    }
  }


}
