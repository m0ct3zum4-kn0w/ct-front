import { Component, Input } from '@angular/core';
import { RequestService } from 'src/app/request.service';

interface modelCrias {
  ID: number,
  Nombre: string,
  Estado: 'Saludable' | 'Por Enfermar'
}

@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styles: [
  ]
})
export class NormalComponent {
  crias: modelCrias[] = [];
  heads: string[] = ['ID', 'Nombre', 'Estado'];

  constructor(private request: RequestService) {
    this.getCrias();
  }

  getCrias(): void {
    this.request.indexCrias().subscribe(crias => {
      // Temporal solo para ajuste
      this.crias = [];
      for (let cria of crias.result) {
        this.crias.push({
          'ID': cria.criaID,
          'Nombre': cria.nombre, 
          'Estado': 'Saludable'
        });
      }
    });
  }

  setCria( rowSelected: modelCrias ): void {
    console.log( rowSelected );
    
  }
}
