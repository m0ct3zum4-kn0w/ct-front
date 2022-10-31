import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriasComponent } from './crias/crias.component';
import { SensoresComponent } from './sensores/sensores.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
