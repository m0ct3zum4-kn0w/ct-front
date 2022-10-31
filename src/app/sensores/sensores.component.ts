import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { RequestService } from "../request.service";

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: []
})
export class SensoresComponent implements OnInit {
  displayedColumns: any[] = ['ID', 'Nombre', 'Peso', 'Musculo', 'Marmoleo', 'Temperatura', 'Cardiaca', 'Sanguinea', 'Respiratoria', 'Clasificacion'];
  crias: any[] = [];
  @ViewChild(MatTable) table: any;
  selected: {} = {};

  constructor(private request: RequestService) { }

  ngOnInit(): void {
    this.request.indexCrias().subscribe(crias => {
      let clasification: any[] = [];

      for (let cria of Object.values(crias.result)) {
        let result = Object.assign({ clasificacion: 'Grasa Tipo 1' }, false, true, undefined, null, 0, cria);
        if (result.peso < 15 || result.peso > 25) result.clasificacion = 'Grasa Tipo 2';
        else if (result.musculo < 3 || result.musculo > 5) result.clasificacion = 'Grasa Tipo 2';
        else if (result.marmoleo > 2) result.clasificacion = "Grasa Tipo 2";
        clasification.push(result);
      }

      this.crias = clasification;
    });
  }

  clickOnRow(row: any) {
    this.selected = row;
  }
}
