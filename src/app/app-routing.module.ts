import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CriasComponent } from './crias/crias.component';
import { SensoresComponent } from './sensores/sensores.component';

const routes: Routes = [
  // {path: 'crias', component: CriasComponent },
  // {path: 'sensores', component: SensoresComponent },
  // {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
