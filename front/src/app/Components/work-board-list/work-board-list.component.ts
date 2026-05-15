import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { Board } from '../../interfaces/workspace.interface';

@Component({
  selector: 'app-work-board-list',
  imports: [],
  templateUrl: './work-board-list.component.html',
})
export class WorkBoardListComponent implements OnInit {
  private activeR = inject(ActivatedRoute);
  private boardService = inject(BoardService);

  workspaceId = signal('');
  boards = signal<Partial<Board>[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.activeR.params.subscribe((params: { workspace_ids?: string }) => {
      const id = params.workspace_ids ?? '';
      this.workspaceId.set(id);

      if (!id) {
        this.loading.set(false);
        return;
      }

      this.loading.set(true);
      this.error.set(null);

      this.boardService.getBoardsOfAWorkspace(id).subscribe({
        next: (boardList) => {
          this.boards.set(boardList ?? []);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar los tableros de este workspace.');
          this.loading.set(false);
        },
      });
    });
  }
}
