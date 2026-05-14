import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl, boardEndp, boardData } from '../Navigation/navigation';
import { Board } from '../interfaces/workspace.interface';
import { Observable } from 'rxjs';
import { BoardData } from '../interfaces/DTO/board-data.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardService {

  // Inyectamos HttpClient
  private http = inject(HttpClient);

  getBoardsOfAWorkspace(workspaceids: string): Observable<Partial<Board>[]>{

    // Creo la variable necesaria para que el back la coja bien en el body.
    const variable = { workspace_ids: workspaceids};
    
    return this.http.post<Partial<Board>[]>(`${baseUrl}${boardEndp}`, variable);
  }

  // Creo el método que va a devolver todos los datos de un tablero. Aquí tengo que tener cuidado con el valor del cursor
  getBoardData(board_id: number): Observable<BoardData[]>{
    
    const variable = {board_id: board_id};

    return this.http.post<BoardData[]>(`${baseUrl}${boardData}`, variable);

  }
}
