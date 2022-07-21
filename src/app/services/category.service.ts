import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../interface/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string = `${environment.baseUrl}/categories`

  constructor(
    private http: HttpClient
  ) {

  }

  getAll() {
    return this.http.get<any>(this.baseUrl);
  }

  getSubCategories() {
    const url = `${environment.baseUrl}/sub-categories`
    return this.http.get<any>(url);
  }


  getTaxonomies() {
    const url = `${environment.baseUrl}/taxonomies`
    return this.http.get<any>(url);
  }


}
