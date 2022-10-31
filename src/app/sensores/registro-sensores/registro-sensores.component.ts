import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestService } from "../../request.service";
import { DialogComponent } from '../../layouts/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-sensores',
  templateUrl: './registro-sensores.component.html',
  styles: [
  ]
})
export class RegistroSensoresComponent {
  @Input() selected: any;
  @Output() reloadPlease = new EventEmitter<boolean>();
  ajustando: string = '';
  public sensor: FormGroup;

  nuevoSensor: {
    cardiaca: number,
    sanguinea: number,
    respiratoria: number,
    temperatura: number
  }[] = [];

  constructor(private fb: FormBuilder, private request: RequestService, public dialog: MatDialog, public router: Router) {
    this.sensor = this.fb.group({
      cardiaca: 0,
      sanguinea: 0,
      respiratoria: 0,
      temperatura: 0
    });
  }

  guardar() {
    if (this.selected.ID > 0) {
      let data = Object.assign({ id: this.selected.ID }, false, true, undefined, null, 0, this.sensor.value);
      this.request.nuevoSensor(data).subscribe(response => {
        this.selected = [];
        this.sensor.setValue({
          cardiaca: null,
          sanguinea: null,
          respiratoria: null,
          temperatura: null
        });
        let dialog = this.dialog.open(DialogComponent, {
          data: {
            mensaje: response.result
          }
        });
        dialog.afterClosed().subscribe(() => {
          this.reloadPlease.emit(true);
        });
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
          mensaje: 'No hay datos de sensor que almacenar'
        }
      });
    }
  }
}
