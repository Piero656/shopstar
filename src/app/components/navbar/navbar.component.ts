import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../interface/shop.interface';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CarritoComponent } from '../carrito/carrito.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  categories: Array<any> = [];
  subcategories: Array<any> = [];
  taxonomies: Array<any> = [];

  carrito: Array<any> = [];

  sub: Subscription | undefined;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private dialog: MatDialog
  ) {

    this.categoryService.getAll().subscribe(x => {
      this.categories = x;
    })

  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {

    this.sub = this.productService.addCarrito.subscribe(x => {
      this.carrito.push(x);
    })

  }

  onSelect(id: number, tipoFiltro: string) {
    const filtro = {
      'id': id,
      'tipoFiltro': tipoFiltro
    }
    this.productService.catSelected.emit(filtro);
  }

  onClickDialog() {
    this.dialog.open(CarritoComponent, {
      width: '1000px',
      data: this.carrito
    })
  }

}
