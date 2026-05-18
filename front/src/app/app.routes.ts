import { Routes } from '@angular/router';
import { WComponentListComponent } from './Components/wcomponent-list/wcomponent-list.component';
import { WorkBoardListComponent } from './Components/work-board-list/work-board-list.component';
import { BoardComponent } from './Components/board/board.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo: 'home'},
    {path:'home', component: WComponentListComponent, children: [
        {path: 'board/:workspace_ids', component: WorkBoardListComponent},
        {path: 'board/display/:board_id', component : BoardComponent},
    ]},
    {path:'**', redirectTo: 'home'}
];
