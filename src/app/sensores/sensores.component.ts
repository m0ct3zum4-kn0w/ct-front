import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { RequestService } from "../request.service";
import { RegistroSensoresComponent } from './registro-sensores/registro-sensores.component';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: []
})
export class SensoresComponent {
  displayedColumns: any[] = ['ID', 'Nombre', 'Peso', 'Musculo', 'Marmoleo', 'Estado', 'Carne'];
  crias: any[] = [];
  @ViewChild(MatTable) table: any;
  @ViewChild(RegistroSensoresComponent) registroSensores: any;
  rowSelected: {} = {};

  constructor(private request: RequestService) {
    this.loadCrias();
  }

  loadCrias(reload:boolean = false): void {
    this.request.indexCrias().subscribe(crias => {
      this.crias = crias.result;
    });
  }

  clickOnRow(row: any) {
    this.registroSensores.sensor.setValue({
      cardiaca: row.sensor.Cardiaca,
      sanguinea: row.sensor.Sanguinea,
      respiratoria: row.sensor.Respiratoria,
      temperatura: row.sensor.Temperatura
    });

    this.rowSelected = {
      ID : row.ID,
      Nombre : row.Nombre
    };
  }
}
