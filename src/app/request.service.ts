import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from "src/environments/environment";

import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  // httpHeaders: HttpHeaders = new HttpHeaders({ 
  //   'Accept' : 'json', 
  //   'Content-Type' : 'Application/json',
  //   'Access-Control-Allow-Origin' : '*'
  // });

  constructor(private http: HttpClient) { }

  public postCria(data: {
    nombre: string,
    peso: number,
    costo: number,
    proveedor: number,
    description: string
  }[]): Observable<any> {
    return this.http.post<boolean>(`${api}/crias`, data);
  }

  public indexCrias(): Observable<any> {
    return this.http.get<JSON>(`${api}/crias`);
  }

  public nuevoSensor(data: any): Observable<any> {
    return this.http.post<boolean>(`${api}/sensor`, data);
  }

  public aCuarentena(id: number): Observable<any> {
    return this.http.post<boolean>(`${api}/cuarentena`, {
      id
    });
  }

  public deCuarentena(id: number): Observable<any> {
    return this.http.delete<boolean>(`${api}/cuarentena/${id}`);
  }

  public cuarentena(): Observable<any> {
    return forkJoin(
      this.http.get<JSON>(`${api}/crias`),
      this.http.get<JSON>(`${api}/cuarentena`)
    );
  }
}
