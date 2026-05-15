import { Component, inject, signal } from '@angular/core';
import { Item, BoardData, Group, Column } from '../../interfaces/DTO/board-data.interface';
import { BoardService } from '../../services/board.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {

  // Como no tengo muy claro por ahora como hacerlo con un Record, voy a intentar hacer con un mapa el ordenamiento de los items
  // por grupo. De todas formas debo primero de crear el resto de elementos que me hacen falta.

  // Lo primero un signal del tipo string[]. En el voy a almacenar los title de los diferentes grupos, de haberlo.

  groupTitles = signal<string[]>([]);

  // Después, para tenerlo todo más ordenado voy a necesitar el mapa que va a relacionar el id del grupo del tipo string, con una array de titles.

  groupItems = signal<Map<string, Item[]>>(new Map);

  // Inyecto el servicio de la petición
  boardS = inject(BoardService);

  // Voy a definir un objeto del tipo board-data para almacenar todo la información en bruto.
  boardData = signal<BoardData>({
    groups: [],
    columns: []
  });

  // variable del tipo ActivatedRoute
  private activeR: ActivatedRoute = inject (ActivatedRoute);

  // variable para almacenar el parámetro pasado por la baseUrl
  private board_id: string = '';

  ngOnInit(){
    this.activeR.params.subscribe((param: any) => {
      this.board_id = param.board_id;

      if(this.board_id){
        this.boardS.getBoardData(Number(this.board_id)).subscribe(data => {

          if(data){
            this.boardData.set(data);

            this.boardData().groups.forEach(group => {

              // En principio no necesito evaluar si el array de groups está vacio, por defecto siempre hay uno.
              this.groupTitles().push(group.id);

              this.groupItems().set(group.id, group.items_page?.items);
            });
          }else{
            return console.log("No se ha recibido ningún resultado a través de la petición");
          }
        });
      }

    });
  }

}
