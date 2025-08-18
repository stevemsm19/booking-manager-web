import { Component } from '@angular/core';
import { SearchBar } from '../../../../shared/components/search-bar/search-bar';
import { HotelsList } from '../../../hotels/pages/hotel-list/hotels-list';

@Component({
  selector: 'app-main-page',
  imports: [SearchBar, HotelsList],
  template: `
    <app-search-bar (filtersChanged)="onFiltersChanged($event)"></app-search-bar>

    <app-hotels-list [filters]="filters"></app-hotels-list>
  `,
  styleUrls: ['./main-page.scss'],
})
export class MainPage {
  filters: any = {};

  onFiltersChanged(filters: any) {
    this.filters = filters;
  }
}
