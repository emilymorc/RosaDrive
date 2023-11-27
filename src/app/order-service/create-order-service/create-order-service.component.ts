import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {HistoryService} from "../../servicios/history.service";

@Component({
  selector: 'app-create-order-service',
  templateUrl: './create-order-service.component.html',
  styleUrls: ['./create-order-service.component.css']
})
export class CreateOrderServiceComponent implements OnInit{

  description: string = '';
  id_user: string = '';
  status: boolean = true;
  responsible_technician: string = '';
  inspection_type: string = '';
  total_cost: number = 0;
  id_story: number = 0;
  maxDate: string = '';
  issuing_location: string = '2';
  histories: any[]= [];
  selectedLicensePlate: number = 0;
  showError = false; // Para mostrar u ocultar el error


  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, public service1: HistoryService) {
    const currentDate = new Date();
    this.maxDate = currentDate.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.service1.getHistories().subscribe(
      (data: any) => {
        this.histories = data;
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
