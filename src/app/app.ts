import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/layout/header/header';
import { Footer } from './core/layout/footer/footer';
@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet],
  template: `
    <div class="app">
      <app-header></app-header>

      <div class="content">
        <router-outlet></router-outlet>
      </div>

      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './app.scss',
})
export class App {
  protected title = 'my-app';
}
// TODO cambiar nombre al commit
// TODO crear us para login y main page
