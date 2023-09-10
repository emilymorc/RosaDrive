import {Component, OnInit} from '@angular/core';
import {ServiceUserService} from "../servicios/service-user.service";

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit{
  data = [
    { id: 'Andres', nombre: 'Cardenas', edad: 'andres.cardenas@gmail.com' },
    { id: 'Lorena', nombre: 'Manrrique', edad: 'lorena.manrrique@gmail.com' },
    { id: 'Carlos', nombre: 'Lopez', edad:  'carlos.lopez@gmail.com'}
  ];
  users: any[] = [];

  constructor(private service: ServiceUserService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe((data: any) => {
      this.users = data; // Almacena los datos en la variable 'users'
    });
  }
}
