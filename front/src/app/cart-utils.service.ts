import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

interface Item {
  [key: string]: any  
}
@Injectable({
  providedIn: 'root'
})
export class CartUtilsService {
  private static intance: CartUtilsService;
  products: Array<Item> = [];
  isLoggedin: boolean = false;
  sessionCart: Array<Item> = [];
  carts: any;
  cartDetails: any;
  email: any;
  
  private constructor(private http:HttpService) {
    this._getLoggedInStatus();
    this._getSessionCart();
    if(this.isLoggedin) {
      this.email = AuthService.getIntance().socialUser.email
      this._getProducts();
    }
  }
  
  public static createInstance() {
    if(!CartUtilsService.intance) {
      CartUtilsService.intance = new CartUtilsService(HttpService.getInstance());
    }
    return CartUtilsService.intance;
  }
  
  public static getIntance() {
    return CartUtilsService.intance;
  }
  _getProducts(): void {
    this.http.getAllProducts().subscribe((data: any) => {
      this.products = data.data;
    });
  }
  _getLoggedInStatus(): void {
    let su = AuthService.getIntance().socialUser;
    this.isLoggedin = su != null && su != undefined;
  }
  _addItemToCart( id: any, quantity: any): void {
    let payload = {
      productId: id,
      quantity,
      email: this.email
    };
    this.http.addToCart(payload).subscribe(() => {
      this._getProducts();
      alert('Product Added');
    });
  }
  _addItemToSessionCart( id: any, name: any, price: any, quantity: any): void {
    let indexFound = this.sessionCart.findIndex(item => item.productId.name == name);
    if (indexFound !== -1) {
      this.sessionCart[indexFound].quantity += quantity;
      this.sessionCart[indexFound].total = this.sessionCart[indexFound].quantity * price;
    }
    else {
      let payload = {
        productId: {id, name, price},
        quantity: quantity,
        total: quantity * price,
      };
      this.sessionCart.push(payload);
    }
    this._updateSessionCart();
    alert('Product Added');
  }
  _getSessionCart(): void {
    let tempSessionCart = localStorage.getItem("sessionCart");
    if(tempSessionCart) {
      this.sessionCart = JSON.parse(tempSessionCart);
    }
    else {
      this.sessionCart = [];
    }
  }
  _getCart(cb: Function): void {
    this.http.getCartItems({email: this.email}).subscribe((data: any) => {
      this.carts = data.data;
      cb()
    });
  }
  _increamentSessionQTY(id: any, name:any, price:any, quantity: any): void {
    let indexFound = this.sessionCart.findIndex(item => item.productId.name == name);
    if(indexFound !== -1) {
      this.sessionCart[indexFound].quantity += quantity;
      this.sessionCart[indexFound].total = this.sessionCart[indexFound].quantity * price;
    }
    else {
      const payload = {
        productId: {id, name, price},
        quantity,
        total: quantity * price
      };
      this.sessionCart.push(payload);
    }
    this._updateSessionCart();
  }
  _increamentQTY(id: any, quantity: any): void {
    const payload = {
      productId: id,
      quantity,
      email: this.email
    };
    this.http.increaseQty(payload).subscribe(() => {
      this._getCart(() => alert('Product Added'));
    });
  }
  _removeProduct(id: any): void {
    const payload = {
      productId: id,
      email: this.email
    };
    this.http.removeFromCart(payload).subscribe(() => {
      this._getCart(() => alert('Product Removed'));
    });
  }
  _removeSessionProduct(id: any, name: String): void {
    let indexFound = this.sessionCart.findIndex(item => item.productId.name == name);
    if(indexFound !== -1) {
      this.sessionCart.splice(indexFound, 1);
      this._updateSessionCart();
    }
  }
  _updateSessionCart(): void {
    localStorage.setItem("sessionCart", JSON.stringify(this.sessionCart));
  }
  calcSubTotal(): Number {
    if(this.sessionCart.length == 0) {
      return 0;
    }
    return this.sessionCart.map(item => item.total).reduce((acc, next) => acc + next);
  }
  _emptyCart(): void {
    if(this.isLoggedin) {
      this.http.emptyCart(this.email).subscribe(() => {
        this._getCart(() => alert('Cart Emptied'));
      });
    }
    else {
      this.sessionCart = [];
      this._updateSessionCart();
    }
  }
}
