import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/layouts/dialog/dialog.component';
import { RequestService } from 'src/app/request.service';

interface modelCrias {
  ID: number,
  Nombre: string,
  Estado: string
}

@Component({
  selector: 'app-cuarentena',
  templateUrl: './cuarentena.component.html',
  styles: [
  ]
})
export class CuarentenaComponent {
  @Input() cuarentena: modelCrias[] = [];
  @Output() reloadPlease = new EventEmitter<boolean>();

  heads: string[] = ['ID', 'Nombre', 'Temp', 'Card', 'Resp', 'Sang', 'Estado'];
  constructor(public dialog: MatDialog, private request: RequestService) { }

  sacar(rowSelected: modelCrias): void {
    let confirmDialog = this.dialog.open(DialogComponent, {
      data: {
        mensaje: 'Sacar cria de cuarentena',
        isConfirm: true
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.request.deCuarentena(rowSelected.ID).subscribe(response => {
          let dialog = this.dialog.open(DialogComponent, {
            data: {
              mensaje: response.result
            }
          });
          dialog.afterClosed().subscribe(() => {
            this.reloadPlease.emit(true)
          });
        });
      }
    });
  }

}
