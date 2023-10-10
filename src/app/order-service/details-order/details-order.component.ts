import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../servicios/order.service";
import {Router} from "@angular/router";
import {ChangeService} from "../../servicios/change.service";

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit{
  responseData: any;
  public selectedOrder: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 10;
  orderBy: string | null = null;
  isAsc: boolean = true;
  filtro: string = '';
  public changes: any[] = [];
  public images: any = [] ;

  constructor(private router: Router, private http: HttpClient, public service: OrderService, public changeService: ChangeService) { }

  ngOnInit(): void {
    this.selectedOrder = this.service.getSelectedOrder();
    this.images = this.changeService.getImages(this.selectedOrder.ID_ORDER);
    this.changeService.getChanges(this.selectedOrder.ID_ORDER).subscribe(
      data => {
        this.changes = data;
      },
      error => {
        console.error('Error al obtener ordenes:', error);
      }
    );
    //this.changes = this.changeService.getChanges(this.selectedOrder.ID_ORDER)

    /*const valor: string | null = localStorage.getItem('token')
    const valorCasteado: string | number | (string | number)[] = valor as string | number | (string | number)[];
    const apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/orders/getOrdersHistory/3';
    // Realiza la solicitud GET
    this.http.get('https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/orders/getOrdersHistory/3', {
      headers: {
        'User-Agent': 'Insomnia/2023.5.5',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjk1NjkxNTg5LCJleHAiOjE2OTU3Nzc5ODl9.USdqABs6ekvyVAunf8VcB0o5FQsFDV9b1kenWcn3uIY'
      }
    }).subscribe((data) => {
      this.responseData = data;
      console.log(this.responseData[0])
    });*/
  }
  onPageChange(event: any): void {
    this.currentPage = event.page;
  }



  filtrar(): any[] {
    if (this.filtro) {
      return this.changes.filter(dato =>
        dato.SERVICE && dato.SERVICE.toLowerCase().includes(this.filtro.toLowerCase())
      );
    } else {
      return this.changes;
    }
  }

/*  filtrarImages(): any[] {
    if (this.filtro) {
      return this.images.filter(dato1 =>
        dato1.SERVICE && dato1.SERVICE.toLowerCase().includes(this.filtro.toLowerCase())
      );
    } else {
      return this.changes;
    }
  }*/


  sortDataByColumn(column: string): void {
    this.orderBy = column;
    this.isAsc = !this.isAsc;

    this.changes.sort((a, b) => {
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

  protected readonly length = length;
    addChange(): void{
    console.log("se presiono");
      this.router.navigate(['/dashboard/changeOrder']);
    }


}
