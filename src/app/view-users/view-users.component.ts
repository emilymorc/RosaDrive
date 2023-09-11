import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/users.service";

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

  users: any[] = [
      {
          "ID_USER": 1,
          "FIRST_NAME": "John",
          "LAST_NAME": "Doe",
          "PASSWORD": "$2a$10$VxNTUNM9Hq9qIztn3fZTGOPmXZKL8XwIGarxHUcAl9PfeKm0iOIpu",
          "REGISTRATION_DATE": "2023-09-09T13:40:53.000Z",
          "IDENTIFICATION_TYPE": "cc",
          "IDENTIFICATION_NUMBER": "123456789",
          "EMAIL": "johndoe@example.com"
      },
      {
          "ID_USER": 2,
          "FIRST_NAME": "Jane",
          "LAST_NAME": "Smith",
          "PASSWORD": "$2a$10$btDwo3ievjsCnJeGvlGVl.2y8FSH3WDKoiY5CyhHnntYz7dn9pQxG",
          "REGISTRATION_DATE": "2023-09-10T18:21:54.000Z",
          "IDENTIFICATION_TYPE": null,
          "IDENTIFICATION_NUMBER": null,
          "EMAIL": "janesmith@hotmail.com"
      },
      {
          "ID_USER": 3,
          "FIRST_NAME": "Michael",
          "LAST_NAME": "Johnson",
          "PASSWORD": "$2a$10$iIBGn7HZ2bG6A3BULsPKh.1LkOuVwW3IMp4muScmN82Zp5DKLZ4ou",
          "REGISTRATION_DATE": "2023-09-10T18:35:49.000Z",
          "IDENTIFICATION_TYPE": null,
          "IDENTIFICATION_NUMBER": null,
          "EMAIL": "michael.johnson@gmail.com"
      },
      {
          "ID_USER": 4,
          "FIRST_NAME": "Emily",
          "LAST_NAME": "Brown",
          "PASSWORD": "$2a$10$M8y9tlwmZbWGnUlTS62MHuT2DQoBXVOJoWu66YAUkCuJ4bZu13dS.",
          "REGISTRATION_DATE": "2023-09-10T20:05:00.000Z",
          "IDENTIFICATION_TYPE": null,
          "IDENTIFICATION_NUMBER": null,
          "EMAIL": "emily.brown@hotmail.com"
      },
      {
          "ID_USER": 5,
          "FIRST_NAME": "David",
          "LAST_NAME": "Davis",
          "PASSWORD": "$2a$10$DNDM8zt6Vbq3P7sBCY/bzu6ib9XyxB2DeL4ybd.QJ9RAKWjICxOHu",
          "REGISTRATION_DATE": "2023-09-10T20:17:43.000Z",
          "IDENTIFICATION_TYPE": null,
          "IDENTIFICATION_NUMBER": null,
          "EMAIL": "david.davis@gmail.com"
      }
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    /*this.userService.getUsers().subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.error('Error al obtener usuarios:', error);
        }
    );*/
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



}
