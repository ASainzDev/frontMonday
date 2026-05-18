import { Component, inject, OnInit, signal } from '@angular/core';
import { Item, BoardData } from '../../interfaces/DTO/board-data.interface';
import { BoardService } from '../../services/board.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  groupTitles = signal<string[]>([]);
  groupItems = signal<Map<string, Item[]>>(new Map());
  boardS = inject(BoardService);
  boardData = signal<BoardData>({ groups: [], columns: [] });
  loading = signal(true);
  private activeR = inject(ActivatedRoute);
  private board_id = '';

  ngOnInit() {
    this.activeR.params.subscribe((param: { board_id?: string }) => {
      this.board_id = param.board_id ?? '';

      console.log(this.board_id);

      if (!this.board_id) {
        this.loading.set(false);
        return;
      }

      this.loading.set(true);
      this.boardS.getBoardData(Number(this.board_id)).subscribe({
        next: (data) => {
          console.log(data);
          if (!data) {
            this.loading.set(false);
            return;
          }

          const groups = data.groups[0];
          console.log(groups);
          this.boardData.set(data);
          console.log(this.boardData());

          console.log(this.boardData().groups);

          const titles: string[] = [];
          const itemsMap = new Map<string, Item[]>();

          data.groups.forEach((group) => {
            titles.push(group.id);
            itemsMap.set(group.id, group.items_page?.items ?? []);
          });

          this.groupTitles.set(titles);
          console.log(titles);
          this.groupItems.set(itemsMap);
          console.log(itemsMap);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    });
  }
}
