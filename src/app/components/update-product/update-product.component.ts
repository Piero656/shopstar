import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  categories: Array<any> = [];
  subcategories: Array<any> = [];
  taxonomies: Array<any> = [];

  product: any;


  constructor(
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit(): void {
    this.product = this.data;
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(x => {
      this.categories = x;
    })
    this.categoryService.getSubCategories().subscribe(x => {
      this.subcategories = x;
    })
    this.categoryService.getTaxonomies().subscribe(x => {
      this.taxonomies = x;
    })

  }

  onChangeCategory(idCategory: string) {

    this.product.subCategory = 0;
    this.product.taxonomy = 0;

    this.subcategories = this.categories
      .filter(cat => cat.id == Number(idCategory))[0].subcategories;

  }

  onChangeSubCategory(idSubCategory: string) {

    this.product.taxonomy = 0;

    this.taxonomies = this.subcategories
      .filter(subcat => subcat.id == Number(idSubCategory))[0].taxonomies;

  }

}
