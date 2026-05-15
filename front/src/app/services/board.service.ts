import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { baseUrl, boardEndp, boardData } from '../Navigation/navigation';
import { Board } from '../interfaces/workspace.interface';
import { BoardData } from '../interfaces/DTO/board-data.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private http = inject(HttpClient);

  getBoardsOfAWorkspace(workspaceids: string): Observable<Partial<Board>[]> {
    const variable = { workspace_ids: workspaceids };
    return this.http.post<Partial<Board>[]>(`${baseUrl}${boardEndp}`, variable);
  }

  getBoardData(board_id: number): Observable<BoardData> {
    const variable = { board_id: board_id };
    return this.http
      .post<BoardData | BoardData[]>(`${baseUrl}${boardData}`, variable)
      .pipe(map((data) => (Array.isArray(data) ? data[0] : data)));
  }
}
