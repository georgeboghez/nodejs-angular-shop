import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: any;
  cartDetails: any;
  constructor(private http: HttpService) {}
  _getCart(): void {
    this.http.getCartItems().subscribe((data: any) => {
      this.carts = data.data;
    });
  }
  _increamentQTY(id: any, quantity: any): void {
    const payload = {
      productId: id,
      quantity,
    };
    this.http.increaseQty(payload).subscribe(() => {
      this._getCart();
      alert('Product Added');
    });
  }
  _removeProduct(id: any): void {
    const payload = {
      productId: id
    };
    console.log(id)
    this.http.removeFromCart(payload).subscribe(() => {
      this._getCart();
      alert('Product Removed');
    });
  }
  _emptyCart(): void {
    this.http.emptyCart().subscribe(() => {
      this._getCart();
      alert('Cart Emptied');
    });
  }
  ngOnInit(): void {
    this._getCart();
  }
}