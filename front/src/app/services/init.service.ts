import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../Navigation/navigation';
import { MondayResponse } from '../interfaces/workspace.interface';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class InitService {

  private http = inject(HttpClient)

  // Defino un objeto del tipo Workspace
  workspace? : MondayResponse;

  // Creo el método que va a traer los primeros datos del back

  getWorkspace(): Observable<MondayResponse>{

   return this.http.post<MondayResponse>(`${baseUrl}/handshake`, {});
  }



}
