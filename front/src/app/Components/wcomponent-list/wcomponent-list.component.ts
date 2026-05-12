import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { WorkspacesList } from '../../interfaces/workspaces-list.interface';
import { HttpClient } from '@angular/common/http';
import { InitService } from '../../services/init.service';
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-wcomponent-list',
  imports: [RouterOutlet],
  templateUrl: './wcomponent-list.component.html',
  styleUrl: './wcomponent-list.component.css',
})
export class WComponentListComponent implements OnInit{

  // Defino un signal que es el que va a recibir el dato de la petición

  readonly workspaceList = signal<WorkspacesList[]>([]);

  // Inyección de servicio HttpClient
  private initSer = inject(InitService);

  // Inyectamos el servicio Router
  private router: Router = inject(Router);
  
  ngOnInit(){
    this.initSer.getWorkspace().subscribe((workspaces: WorkspacesList[]) => {
      this.workspaceList.set(workspaces);
      
    })
  }

  // Metodo para navegar a los datos de cada dashboard
  navigateToWorkspace(workspace_ids: string) {
    
    this.router.navigate(['/home/board', workspace_ids]);
  }
}
