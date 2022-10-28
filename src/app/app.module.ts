import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { CriasComponent } from './crias/crias.component';
import { RegistroComponent } from './crias/registro/registro.component';

import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './layouts/dialog/dialog.component';
import { SensoresComponent } from './sensores/sensores.component';
import { RegistroSensoresComponent } from './sensores/registro-sensores/registro-sensores.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CriasComponent,
    RegistroComponent,
    DialogComponent,
    SensoresComponent,
    RegistroSensoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    NgbModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
