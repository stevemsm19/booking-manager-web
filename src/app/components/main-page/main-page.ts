import { Component } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";
import { Cards } from "../cards/cards";

@Component({
  selector: 'app-main-page',
  imports: [SearchBar, Cards],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss'
})
export class MainPage {

}
