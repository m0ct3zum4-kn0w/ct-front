import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/request.service';
import { DialogComponent } from '../../layouts/dialog/dialog.component';

interface modelCrias {
  ID: number,
  Nombre: string,
  Estado: string
}

@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styles: [
  ]
})
export class NormalComponent {
  @Input() crias: modelCrias[] = [];
  @Output() reloadPlease = new EventEmitter<boolean>();
  heads: string[] = ['ID', 'Nombre', 'Temp', 'Card', 'Resp', 'Sang', 'Estado'];
  confirm: boolean = false;

  constructor(private request: RequestService, public dialog: MatDialog) {}

  meter(rowSelected: modelCrias): void {
    let confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        mensaje: 'Mover cria a cuarentena',
        isConfirm: true
      }
    });

    confirmDialog.afterClosed().subscribe( result => {
      if( result === true ){
        this.request.aCuarentena( rowSelected.ID ).subscribe( response => {
          let dialog = this.dialog.open(DialogComponent, {
            data : {
              mensaje : response.result
            }
          });
          dialog.afterClosed().subscribe(() => {
            this.reloadPlease.emit(true);
          });
        });
      }
    });
  }
}
