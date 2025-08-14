import { Component } from '@angular/core';
import { SearchBar } from '../../../../shared/components/search-bar/search-bar';
import { HotelsList } from '../../../hotels/pages/hotel-list/hotels-list';

@Component({
  selector: 'app-main-page',
  imports: [SearchBar, HotelsList],
  template: `
    <app-search-bar></app-search-bar>
    
    <app-hotels-list></app-hotels-list>
  `,
  styleUrl: './main-page.scss',
})
export class MainPage {}
