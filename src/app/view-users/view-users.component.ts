import {Component, OnInit} from '@angular/core';
import {UserService} from "../servicios/users.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit{
    currentPage: number = 1;
    itemsPerPage: number = 10;
    maxSize: number = 10;
    orderBy: string | null = null;
    isAsc: boolean = true;
    filtroApellido: string = '';

  users: any[] = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.error('Error al obtener usuarios:', error);
        }
    );
  }
    onPageChange(event: any): void {
        this.currentPage = event.page;
    }

    sortBy(column: string): void {
        if (this.orderBy === column) {
            this.isAsc = !this.isAsc;
        } else {
            this.orderBy = column;
            this.isAsc = true;
        }
    }

    sortDataByColumn(column: string): void {
        this.orderBy = column;
        this.isAsc = !this.isAsc;

        this.users.sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];

            if (aValue < bValue) {
                return this.isAsc ? -1 : 1;
            } else if (aValue > bValue) {
                return this.isAsc ? 1 : -1;
            } else {
                return 0;
            }
        });
    }

    filtrarPorApellido(): any[] {
        if (this.filtroApellido) {
            return this.users.filter(dato =>
                dato.LAST_NAME && dato.LAST_NAME.toLowerCase().includes(this.filtroApellido.toLowerCase())
            );
        } else {
            return this.users;
        }
    }

  modificarUsuario(dato: any): void {
    this.userService.getUserById(dato.ID_USER).subscribe(
      response => {
        console.log(response.body);
        this.userService.setSelectedUser(dato);
        this.router.navigate(['/dashboard/modifyAccount']);
        console.log('Datos del usuario:', response);
      },
      error => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  eliminarUsuario(userId: number): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este usuario?');

    if (confirmation) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          console.log('Usuario eliminado:', response);
          // Actualizar la lista de usuarios después de la eliminación
          this.users = this.users.filter(user => user.ID_USER !== userId);
        },
        (error) => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
    }
  }
}
