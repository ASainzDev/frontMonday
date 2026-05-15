import { Component, computed, inject, signal, Signal } from '@angular/core';
import { InitService } from '../../services/init.service';
import { MondayResponse, Board } from '../../interfaces/workspace.interface';

@Component({
  selector: 'app-main-screen',
  imports: [],
  templateUrl: './main-screen.component.html',
})
export class MainScreenComponent {
  initService = inject(InitService);

  private readonly workspace = signal<MondayResponse>({
    workspaces: [],
    boards: [],
  });

  readonly boardsData: Signal<Board[]> = computed(() => this.workspace().boards);
  readonly workspaceName: Signal<string | undefined> = computed(
    () => this.workspace().workspaces[0]?.name,
  );
  readonly workspaceId: Signal<string | undefined> = computed(
    () => this.workspace().workspaces[0]?.id,
  );
}
