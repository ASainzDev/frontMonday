import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../Navigation/navigation';
import { Workspace } from '../interfaces/workspace.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class InitService {

  private http = inject(HttpClient)

  // Defino un objeto del tipo Workspace
  workspace : Workspace[];

  // Inicializamos el constructor
  constructor(){
    this.workspace = [];
    
  }

  // Creo el método que va a traer los primeros datos del back

  async getWorkspace(): Promise<Workspace[]>{

   const data: Workspace[] = await lastValueFrom(this.http.post<Workspace[]>(`${baseUrl}/handshake`, {}));

   this.workspace = data;

   return this.workspace;
  }



}
