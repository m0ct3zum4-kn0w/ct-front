import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-crias',
  templateUrl: './crias.component.html',
  styles: [
  ]
})
export class CriasComponent implements OnInit {
  respuesta: string = '';
  displayedColumns: any[] = ['Nombre', 'Proveedor', 'Peso', 'Costo'];
  crias: any[] = [];
  @ViewChild(MatTable) table:any;
  constructor() { }

  ngOnInit(): void {}

  onGetCrias(crias: any[]) {
    this.crias = crias;
    this.table.renderRows();
  }
}
