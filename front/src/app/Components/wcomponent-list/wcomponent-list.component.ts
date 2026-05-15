import { Component, inject, OnInit, signal } from '@angular/core';
import { WorkspacesList } from '../../interfaces/workspaces-list.interface';
import { InitService } from '../../services/init.service';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-wcomponent-list',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './wcomponent-list.component.html',
})
export class WComponentListComponent implements OnInit {
  readonly workspaceList = signal<WorkspacesList[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly isBoardView = signal(false);

  private initSer = inject(InitService);
  private router = inject(Router);

  ngOnInit() {
    this.isBoardView.set(this.router.url.includes('/board/'));
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.isBoardView.set(this.router.url.includes('/board/')));
    this.initSer.getWorkspace().subscribe({
      next: (workspaces) => {
        this.workspaceList.set(workspaces ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la lista de workspaces.');
        this.loading.set(false);
      },
    });
  }

}
