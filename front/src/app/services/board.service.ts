import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl, boardEndp } from '../Navigation/navigation';
import { Board } from '../interfaces/workspace.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {

  // Inyectamos HttpClient
  private http = inject(HttpClient);

  getBoardsOfAWorkspace(workspaceids: string): Observable<Partial<Board>[]>{

    const variable = { workspace_ids: workspaceids};
    
    return this.http.post<Partial<Board>[]>(`${baseUrl}${boardEndp}`, variable);
  }
}
