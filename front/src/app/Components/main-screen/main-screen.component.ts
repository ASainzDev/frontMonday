import { Component, inject, OnInit } from '@angular/core';
import { InitService } from '../../services/init.service';
import { Workspace } from '../../interfaces/workspace.interface';

@Component({
  selector: 'app-main-screen',
  imports: [],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css',
})
export class MainScreenComponent implements OnInit{

  initService = inject(InitService);

  workspace: Workspace [];

  constructor(){
    this.workspace = []
    }

  async ngOnInit(){
    this.workspace = await this.initService.getWorkspace();
    console.log(this.workspace);
  }
}
