import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private static instance: HttpService;

  private constructor(private http: HttpClient) {}

  public static createInstance(http: HttpClient): HttpService {
    if(!HttpService.instance) {
      HttpService.instance = new HttpService(http);
    }
    return HttpService.instance;
  }

  public static getInstance(): HttpService {
    return HttpService.instance;
  }
  getAllProducts() {
    return this.http.get(`${environment.baseURL}/product`);
  }
  addToCart(payload: any) {
    return this.http.post(`${environment.baseURL}/cart`, payload);
  }
  getCartItems(queryParams: any) {
    return this.http.get(`${environment.baseURL}/cart?${queryParams}`);
  }
  increaseQty(payload: any) {
    return this.http.post(`${environment.baseURL}/cart`, payload);
  }
  removeFromCart(payload: any) {
    return this.http.patch(`${environment.baseURL}/cart`, payload);
  }
  emptyCart(payload: any) {
    return this.http.delete(`${environment.baseURL}/cart/empty-cart`, payload);
  }
}