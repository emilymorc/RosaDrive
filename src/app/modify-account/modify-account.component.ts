import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../servicios/users.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './modify-account.component.html',
  styleUrls: ['./modify-account.component.css']
})
export class ModifyAccountComponet implements OnInit{

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  selectedUser: any = {};

  constructor(private http: HttpClient,private userService: UserService) { }

  signUp() {
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.http.post('https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/auth/signUp', userData)
      .subscribe(
        (response) => {
          console.log('Sign up successful:', response);
        },
        (error) => {
          console.error('Sign up error:', error);
        }
      );
  }

  ngOnInit() {
    this.selectedUser = this.userService.getSelectedUser();
  }

}
