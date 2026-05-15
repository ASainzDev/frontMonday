import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Navigation/navigation';
import { WorkspacesList } from '../interfaces/workspaces-list.interface';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private http = inject(HttpClient);

  getWorkspace(): Observable<WorkspacesList[]> {
    return this.http.post<WorkspacesList[]>(`${baseUrl}/workspaces`, {});
  }
}
