import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RequestService } from "../../request.service";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../layouts/dialog/dialog.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent {

  proveedores: { id: number, nombre: string }[] = [
    {
      id: 0,
      nombre: 'Proveedor Norte'
    },
    {
      id: 1,
      nombre: 'Proveedor Este'
    },
    {
      id: 2,
      nombre: 'Proveedor Sur'
    },
    {
      id: 3,
      nombre: 'Proveedor Oeste'
    }
  ]

  public cria: FormGroup;
  nuevasCrias:{
    nombre : string,
    peso : number,
    musculo : number,
    marmoleo : number,
    costo : number,
    proveedor : number,
    description : string
  }[] = [];
  @Output() emitCrias = new EventEmitter<any>();
  @ViewChild('formCria') form:any;

  constructor(public request: RequestService, private fb: FormBuilder, public dialog:MatDialog) {
    this.cria = this.fb.group({
      nombre: '',
      peso: 0,
      costo: 0,
      musculo: 0,
      marmoleo: 0,
      proveedor: '',
      description: ''
    });
  }

  guardar() {
    if( this.nuevasCrias.length > 0 ){
      this.request.postCria( this.nuevasCrias ).subscribe(response => {
        this.dialog.open(DialogComponent,{data: {
          mensaje : response.result
        }});
        this.nuevasCrias = [];
        this.emitCrias.emit( this.nuevasCrias );
      }, error => {
        this.dialog.open(DialogComponent,{data: {
          mensaje : 'Algo salio mal'
        }});
      });
    }else {
      this.dialog.open(DialogComponent,{data: {
        mensaje : 'No hay crias que registrar'
      }});
    }
  }

  agregar() {
    this.nuevasCrias.push( this.cria.value );
    this.emitCrias.emit( this.nuevasCrias );
    this.form.reset();
  }
}
