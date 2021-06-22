import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpService } from '../../http.service';

interface Item {
  [key: string]: any
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: any;
  cartDetails: any;
  isLoggedin: boolean = false;
  sessionCart: Array<Item> = [];
  constructor(private http: HttpService) {}
  _getCart(cb: Function): void {
    this.http.getCartItems().subscribe((data: any) => {
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
    };
    this.http.increaseQty(payload).subscribe(() => {
      this._getCart(() => alert('Product Added'));
    });
  }
  _removeProduct(id: any): void {
    const payload = {
      productId: id
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
    return this.sessionCart.map(item => item.total).reduce((acc, next) => acc + next);
  }
  _emptyCart(): void {
    if(this.isLoggedin) {
      this.http.emptyCart().subscribe(() => {
        this._getCart(() => alert('Cart Emptied'));
      });
    }
    else {
      this.sessionCart = [];
      this._updateSessionCart();
    }
  }
  _getLoggedInStatus(): void {
    let su = AuthService.getIntance().socialUser
    this.isLoggedin = su != null && su != undefined;
  }
  _getSessionCart(): void {
    let tempSessionCart = localStorage.getItem("sessionCart");
    if (tempSessionCart != null) {
      this.sessionCart = JSON.parse(tempSessionCart);
    }
  }
  ngOnInit(): void {
    this._getLoggedInStatus();
    this._getSessionCart();
    if (this.isLoggedin) {
      this._getCart(() => {});
    }
  }
}