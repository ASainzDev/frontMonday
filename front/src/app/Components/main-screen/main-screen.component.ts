import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { InitService } from '../../services/init.service';
import { MondayResponse, Board, Workspace, ColumnValue } from '../../interfaces/workspace.interface';

@Component({
  selector: 'app-main-screen',
  imports: [],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css',
})
export class MainScreenComponent{

  initService = inject(InitService);


  // Declaro el signal inicial como privado para que nadie pueda acceder a el y como readonly para que solo los servicios indicados lo puedan modificar.
  private readonly workspace = signal<MondayResponse>({
    workspaces: [],
    boards: []
  });

  // Una vez tengo el objeto de Monday e hice unas pruebas creo que es preferible dividirlo en objetos más pequeños. Lo más fácil será crear computed 
  // signals, que luego será más fácil renderizarlos en la interfaz
  
  readonly boardsData: Signal<Board[]> = computed(() => this.workspace().boards);

  readonly workspaceName: Signal<string> = computed(() => this.workspace().workspaces[0]?.name);

  readonly workspaceId: Signal<string> = computed(() => this.workspace().workspaces[0]?.id);

  constructor(){
    
  }

  // ngOnInit(){
  //   // const data: MondayResponse = await this.initService.getWorkspace();
  //   // this.workspace.set(data);
  //   this.initService.getWorkspace().subscribe((mondayObject: MondayResponse) => {
  //     this.workspace.set(mondayObject);
  //     console.log(mondayObject);
  //   })
  // }
}
