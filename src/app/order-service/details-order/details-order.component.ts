import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../servicios/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit{
  responseData: any;
  selectedOrder: any = {};

  constructor(private router: Router, private http: HttpClient, public service: OrderService) { }

  ngOnInit(): void {
    this.selectedOrder = this.service.getSelectedOrder();

    const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    const apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/orders/getOrdersHistory/3';
    // Realiza la solicitud GET
    this.http.get('https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/orders/getOrdersHistory/3', {
      headers: {
        'User-Agent': 'Insomnia/2023.5.5',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjk1NjkxNTg5LCJleHAiOjE2OTU3Nzc5ODl9.USdqABs6ekvyVAunf8VcB0o5FQsFDV9b1kenWcn3uIY'
      }
    }).subscribe((data) => {
      this.responseData = data; // Almacena los datos en la variable responseData
      console.log(this.responseData[0])
    });
  }

    addChange(): void{
    console.log("se presiono");
      this.router.navigate(['/dashboard/changeOrder']);
    }

}
