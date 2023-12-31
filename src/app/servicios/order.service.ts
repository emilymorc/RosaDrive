import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class OrderService{
  private apiUrl = 'https://rosasdriveback.onrender.com/api/orders';
  private token: string | null = localStorage.getItem('token')
  private castToken: string | number | (string | number)[] = this.token as string | number | (string | number)[];
  private selectedOrder: any;
  constructor(private http: HttpClient) { }

  addOrder(orderData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/2023.5.8',
      'x-access-token': this.castToken
    });

    return this.http.post(`${this.apiUrl}/addOrder`, orderData, { headers });
  }

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
      'x-access-token': this.castToken
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

  updateOrderStatus(id_story: number, id_order: number, status: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'Insomnia/2023.5.5',
      'x-access-token': this.castToken,
    });

    const body = {
      id_story: id_story,
      id_order: id_order,
      status: status,
    };

    return this.http.post(`${this.apiUrl}/updateOrderStatus`, body, { headers });
  }
}
