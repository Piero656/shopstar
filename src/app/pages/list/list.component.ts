import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/shop.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  products: Array<Product> = [];
  fproducts: Array<any> = [];

  sub: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.getAllProducts();
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit() {

    this.sub = this.productService.catSelected.subscribe((x) => {

      switch (x.tipoFiltro) {

        case 'category':
          this.fproducts = this.products.filter(y => y.taxonomy?.subCategory.category.id == x.id)
          break;

        case 'subcategory':
          this.fproducts = this.products.filter(y => y.taxonomy?.subCategory.id == x.id)
          break;

        case 'taxonomi':
          this.fproducts = this.products.filter(y => y.taxonomy?.id == x.id)
          break;

        default:
          this.fproducts = this.products;
          break;
      }


    });

  }

  getAllProducts() {
    this.productService.getAll().subscribe(x => {
      this.products = x;
      this.fproducts = x;
    })
  }

  nav() {
    this.productService.catSelected.complete();
    this.router.navigateByUrl('admin');
  }

  agregar(product: any) {
    this.productService.addCarrito.emit(product);
  }

}
