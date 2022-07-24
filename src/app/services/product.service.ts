import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../interface/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Array<any> = [];

  carrito: Array<any> = [];

  catSelected = new EventEmitter<any>();
  addCarrito = new EventEmitter<any>();

  baseUrl: string = `${environment.baseUrl}/products`;

  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.baseUrl);
  }

  getById(productId: string): Observable<Product> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

  updateFields(productId: string, fields: Object) {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.put<any>(url, fields);
  }

  deleteProduct(productId: string) {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.delete<any>(url);
  }

  getCuotasByProductId(amount: number) {
    const url = `${this.baseUrl}/calculate`;

    const body = {
      'amount': amount
    }

    return this.http.post<any>(url, body);
  }

}
