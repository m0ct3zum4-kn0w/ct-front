import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  nuevasCrias: {
    nombre: string,
    peso: number,
    musculo: number,
    marmoleo: number,
    costo: number,
    proveedor: number,
    description: string
  }[] = [];
  @Output() emitCrias = new EventEmitter<any>();
  @ViewChild('formCria') form: any;

  constructor(public request: RequestService, public dialog: MatDialog) {
    this.cria = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      proveedor: new FormControl('', [Validators.required]),
      costo: new FormControl('', [Validators.required]),
      musculo: new FormControl('', [Validators.required]),
      marmoleo: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  guardar() {
    if (this.nuevasCrias.length > 0) {
      this.request.postCria(this.nuevasCrias).subscribe(response => {
        this.dialog.open(DialogComponent, {
          data: {
            mensaje: response.result
          }
        });
        this.nuevasCrias = [];
        this.emitCrias.emit(this.nuevasCrias);
      }, error => {
        this.dialog.open(DialogComponent, {
          data: {
            mensaje: 'Algo salio mal'
          }
        });
      });
    } else {
      this.dialog.open(DialogComponent, {
        data: {
          mensaje: 'No hay crias que registrar'
        }
      });
    }
  }

  agregar() {
    if (this.cria.valid) {
      this.nuevasCrias.push(this.cria.value);
      this.emitCrias.emit(this.nuevasCrias);
      this.form.reset();
    }else {
      this.dialog.open(DialogComponent, {
        data: {
          mensaje: "Favor de llenar todos los campos"
        }
      });
    }
  }
}
