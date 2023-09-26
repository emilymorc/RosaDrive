import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../servicios/users.service";
import {OrderService} from "../../servicios/order.service";

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit{
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 10;
  orderBy: string | null = null;
  isAsc: boolean = true;
  filtroServicio: string = '';

  orders: any[] = [];

  constructor(private router: Router, private orderService :OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      data => {
        this.orders = data;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  onPageChange(event: any): void {
    this.currentPage = event.page;
  }

  sortDataByColumn(column: string): void {
    this.orderBy = column;
    this.isAsc = !this.isAsc;

    this.orders.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        return this.isAsc ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
      } else {
        const aValueString = String(aValue).toLowerCase();
        const bValueString = String(bValue).toLowerCase();

        if (aValueString < bValueString) {
          return this.isAsc ? -1 : 1;
        } else if (aValueString > bValueString) {
          return this.isAsc ? 1 : -1;
        } else {
          return 0;
        }
      }
    });
  }


  filtrarPorServicio(): any[] {
    if (this.filtroServicio) {
      return this.orders.filter(dato =>
        dato.SERVICE && dato.SERVICE.toLowerCase().includes(this.filtroServicio.toLowerCase())
      );
    } else {
      return this.orders;
    }
  }

  viewOrder(dato: any): void {
    this.orderService.getOrdersHistory(dato.ID_STORY).subscribe(
      response => {
        console.log(response.body);
        this.orderService.setSelectedOrder(dato);
        this.router.navigate(['/dashboard/detailsOrder']);
        console.log('Datos del la orden:', response);
      },
      error => {
        console.error('Error al obtener datos de la orden:', error);
        this.router.navigate(['/dashboard/detailsOrder']);
      }
    );
  }

  /*modificarUsuario(dato: any): void {
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
  }*/

  /*deleteOrder(userId: number): void {
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
  }*/

}
