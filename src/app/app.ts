import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Cards } from "./components/cards/cards";
import { SearchBar } from "./components/search-bar/search-bar";

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Cards, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'my-app';
}
