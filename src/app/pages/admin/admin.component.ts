import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../interface/shop.interface';
import { UpdateProductComponent } from '../../components/update-product/update-product.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  displayedColumns: string[] = ['id', 'name', 'taxonomy', 'subcategory', 'category', 'price', 'actions'];

  products: Array<Product> = [];

  dataSource: MatTableDataSource<Product> = new MatTableDataSource(this.products);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private dialogRef: MatDialog,
    private productService: ProductService
  ) {
    this.getAllProducts();
  }



  getAllProducts() {

    this.productService.getAll().subscribe(x => {
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
    })

  }

  openDialog(product: any) {

    const productToUpdate = {
      ...product
    };
    const dialog = this.dialogRef.open(UpdateProductComponent, {

      width: '600px',
      data: {
        'id': productToUpdate.id,
        'name': productToUpdate.name,
        'description': productToUpdate.description,
        'price': productToUpdate.price,
        'imageConverted': productToUpdate.imageConverted,
        'category': productToUpdate.taxonomy.subCategory.category.id,
        'subCategory': productToUpdate.taxonomy.subCategory.id,
        'taxonomy': productToUpdate.taxonomy.id
      }
    }

    );

    dialog.afterClosed().subscribe(x => {

      if (x) {
        const updateProduct = {
          'id': x.id,
          'name': x.name,
          'description': x.description,
          'price': x.price,
          'imageConverted': x.imageConverted,
          'taxonomy': x.taxonomy
        }

        this.productService.updateFields(x.id.toString(), updateProduct)
          .subscribe(y => {

            this.getAllProducts();
          })
      }

    })



  }


  deleteProduct(idProduct: any) {

    if (confirm(`Desea eliminar el producto con id: ${idProduct} ?`)) {

      this.productService.deleteProduct(idProduct.toString()).subscribe(x => {
        this.getAllProducts();

      })

    }

  }

}
