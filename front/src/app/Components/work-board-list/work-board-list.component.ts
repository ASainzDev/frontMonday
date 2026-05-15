import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { Board } from '../../interfaces/workspace.interface';

@Component({
  selector: 'app-work-board-list',
  imports: [],
  templateUrl: './work-board-list.component.html',
  styleUrl: './work-board-list.component.css',
})

export class WorkBoardListComponent implements OnInit {

  // Inyectamos ActivatedRoute
  private activeR: ActivatedRoute = inject(ActivatedRoute);

  // Defino una variable que va a almacenar el valor de la id del workspace que viene por parametro de baseUrl
  workspace_ids = signal<string>("");

  // Inyecto el servicio de boards
  private boardService = inject(BoardService);

  // Defino un Partial de Board

  boards = signal<Partial<Board>[]>([]);

  // En el ngOnInit debo de setear el signal y hacer la petición para cargar datos desde el backend
  ngOnInit() {

    this.activeR.params.subscribe((params: any) => {

      this.workspace_ids.set(params.workspace_ids);

      this.boardService.getBoardsOfAWorkspace(this.workspace_ids()).subscribe(boardList => {


        if (boardList) {
          this.boards.set(boardList);
        }else{
          return console.log("No se ha recibido ningún dato de la petición requerida");
        }

      });

    })
  }


}