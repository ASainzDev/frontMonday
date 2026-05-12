import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainScreenComponent } from "./Components/main-screen/main-screen.component";
import { WComponentListComponent } from "./Components/wcomponent-list/wcomponent-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WComponentListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front');
}
