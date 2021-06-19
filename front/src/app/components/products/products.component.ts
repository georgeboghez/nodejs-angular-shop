import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
interface obj {
    [key: string]: any  
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<obj> = [];
  constructor(private http: HttpService) {}
  _getProducts(): void {
    this.http.getAllProducts().subscribe((data: any) => {
      this.products = data.data;
      console.log(this.products);
    });
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
  ngOnInit(): void {
    this._getProducts();
  }
}