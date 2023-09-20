import { Component } from '@angular/core';

@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
  styleUrls: ['./order-service.component.css']
})
export class OrderServiceComponent {

  service: string = '';
  issue_date: string = '';
  description: string = '';
  observations: string = '';
  responsible_technician: string = '';
  inspection_type: string = '';
  total_cost: string = '';

}
