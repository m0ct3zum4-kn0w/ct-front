import { Component } from '@angular/core';
import { RequestService } from '../request.service';

interface modelCrias {
  ID: number,
  Nombre: string,
  Estado: 'Saludable' | 'Por Enfermar' | 'Cuarentena'
}

@Component({
  selector: 'app-salud',
  templateUrl: './salud.component.html',
  styles: [
  ]
})
export class SaludComponent {

  clasificacion: modelCrias[] = [];
  cuarentena: modelCrias[] = [];

  constructor(private request: RequestService) {
    this.loadCrias();
  }

  loadCrias(reload: boolean = false): void {
    this.request.cuarentena().subscribe(result => {
      let crias = [];
      for (let criaNormal of result[0].result) {
        crias.push({
          ID : criaNormal.ID,
          Nombre : criaNormal.Nombre,
          Estado : criaNormal.Estado,
          Temp : criaNormal.sensor.Temperatura,
          Card : criaNormal.sensor.Cardiaca,
          Resp : criaNormal.sensor.Respiratoria,
          Sang : criaNormal.sensor.Sanguinea
        });
      }
      this.clasificacion = crias;
      crias = [];
      for (let criaCuarentena of result[1].result) {
        crias.push({
          ID : criaCuarentena.ID,
          Nombre : criaCuarentena.Nombre,
          Estado : criaCuarentena.Estado,
          Temp : criaCuarentena.sensor.Temperatura,
          Card : criaCuarentena.sensor.Cardiaca,
          Resp : criaCuarentena.sensor.Respiratoria,
          Sang : criaCuarentena.sensor.Sanguinea
        });
      }
      this.cuarentena = crias;
    });
  }
}
