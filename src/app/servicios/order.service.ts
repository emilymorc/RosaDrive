import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class OrderService{
  private apiUrl = 'https://app-e988bfc5-a6ee-41bb-a6af-e418a4b27735.cleverapps.io/api/orders';
  private token: string | null = localStorage.getItem('token')
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];
  private selectedOrder: any;
  constructor(private http: HttpClient) { }

  getOrdersHistory(historyId: number): Observable<any> {
    const url = `${this.apiUrl}/getOrdersById/${historyId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.castToken
    });
    return this.http.get(url, { headers });
  }

  getAllOrders(): Observable<any> {
    const url = `${this.apiUrl}/getOrdersHistory`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.castToken
    });
    return this.http.get(url, { headers });
  }

  deleteOrder(historyId: number, orderId: number): Observable<any> {
    const url = `${this.apiUrl}/deleteOrder/${historyId}/${orderId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjk1NTExNjM5LCJleHAiOjE2OTU1OTgwMzl9.RSFszepzG1yrHNfkofZzfpyM612Hc3EA_FwXmO5IwgM' // Asegúrate de actualizar este token
    });

    return this.http.delete(url, { headers });
  }

  setSelectedOrder(order: any) {
    this.selectedOrder = order;
  }

  getSelectedOrder() {
    return this.selectedOrder;
  }

  updateOrderData(orderData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.6',
      'x-access-token': this.castToken
    });

    return this.http.post(`${this.apiUrl}/updateOrder`, orderData, { headers });
  }

}
