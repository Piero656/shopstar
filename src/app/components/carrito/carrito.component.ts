import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: Array<any> = [];
  total : number = 0;

  // displayedColumns: string[] = ['id', 'name', 'taxonomy', 'subcategory', 'category', 'price'];
  displayedColumns: string[] = ['id', 'name', 'image' , 'category', 'price'];

  dataSource: MatTableDataSource<any>;


  constructor(
    public dialogRef: MatDialogRef<CarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.carrito = this.data;
    this.carrito.map((x) => {this.total += x.price})
    this.dataSource = new MatTableDataSource(this.carrito);
  }

  ngOnInit(): void {
  }

}
