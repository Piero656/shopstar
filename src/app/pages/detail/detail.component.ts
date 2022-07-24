import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CuotasComponent } from '../../components/cuotas/cuotas.component';
import { ProductService } from '../../services/product.service';
import { Product, Taxonomy } from '../../interface/shop.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: number = 0;

  product: Product | undefined = undefined;

  cuotas: Array<any> = [];

  constructor(
    private dialogRef: MatDialog,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {



  }

  ngOnInit(): void {

    this.route.params.subscribe(x => {
      this.productService.getById(x['id']).subscribe(p => {
        this.product = p;
        this.getCuotas(this.product.price);
      }
      )
    })
  }

  getCuotas(amount: number) {
    this.productService.getCuotasByProductId(amount).subscribe(x => {

      this.cuotas = x;
    })
  }

  openDialog() {
    this.dialogRef.open(CuotasComponent, {
      height: '650px',
      width: '400px',
      data: {
        'price': this.product!.price,
        'cuotas': this.cuotas,
      }
    }

    );
  }

  agregar(product: any) {
    this.productService.addCarrito.emit(product);
  }

}
