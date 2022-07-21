import { Component, OnInit } from '@angular/core';
import { Category } from '../../interface/shop.interface';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: Array<any> = [];
  subcategories: Array<any> = [];
  taxonomies: Array<any> = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {

    this.categoryService.getAll().subscribe(x => {
      this.categories = x;
    })

  }

  ngOnInit(): void {
  }

  onSelect(id : number, tipoFiltro : string) {
    const filtro = {
      'id' : id,
      'tipoFiltro': tipoFiltro
    }
    this.productService.catSelected.emit(filtro);
  }

}
