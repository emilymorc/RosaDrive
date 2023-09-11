import {Component, OnInit} from '@angular/core';
import {UserService} from "../servicios/users.service";

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit{
    currentPage: number = 1;
    itemsPerPage: number = 5;
    maxSize: number = 5;
    orderBy: string | null = null;
    isAsc: boolean = true;
    filtroApellido: string = '';

  users: any[] = [];

  constructor(private userService: UserService) { }

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
}
