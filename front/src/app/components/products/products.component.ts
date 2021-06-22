import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpService } from '../../http.service';
interface Item {
  [key: string]: any  
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<Item> = [];
  isLoggedin: boolean = false;
  sessionCart: Array<Item> = [];
  constructor(private http: HttpService) {}
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
    if(tempSessionCart !== null) {
      this.sessionCart = JSON.parse(tempSessionCart);
    }
  }
  _updateSessionCart(): void {
    localStorage.setItem("sessionCart", JSON.stringify(this.sessionCart));
  }
  ngOnInit(): void {
    this._getSessionCart();
    this._getProducts();
  }
}