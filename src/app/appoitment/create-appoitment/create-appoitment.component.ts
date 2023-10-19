import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {HistoryService} from "../../servicios/history.service";
import {UserService} from "../../servicios/users.service";

@Component({
  selector: 'app-create-appoitment',
  templateUrl: './create-appoitment.component.html',
  styleUrls: ['./create-appoitment.component.css']
})
export class CreateAppoitmentComponent implements OnInit{

  description: string = '';
  id_user: string = '';
  status: boolean = true;
  responsible_technician: string = '';
  appoitment_date: any;
  inspection_type: string = '';
  total_cost: number = 0;
  id_story: number = 0;
  maxDate: string = '';
  issuing_location: string = '2';
  users: any[]= [];
  selectedLicensePlate: number = 0;
  showError = false; // Para mostrar u ocultar el error


  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, public service1: UserService) {
    const currentDate = new Date();
    this.maxDate = currentDate.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.service1.getUsers().subscribe(
      (data: any) => {
        this.users = data;
        console.log('usuarios'+data)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }



  resetForm(form: any) {
    form.form.reset();
  }

}
