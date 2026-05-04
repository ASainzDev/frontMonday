import { Component, inject, OnInit, signal } from '@angular/core';
import { InitService } from '../../services/init.service';
import { MondayResponse } from '../../interfaces/workspace.interface';

@Component({
  selector: 'app-main-screen',
  imports: [],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css',
})
export class MainScreenComponent implements OnInit{

  initService = inject(InitService);

  workspace = signal<MondayResponse>({
    workspaces: [],
    boards: []
  });

  

  async ngOnInit(){
    const data: MondayResponse = await this.initService.getWorkspace();
    this.workspace.set(data);
  }
}
