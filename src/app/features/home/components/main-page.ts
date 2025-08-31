import { Component } from '@angular/core';
import { SearchBarComponent } from '../../search-bar/component/search-bar';
import { HotelsList } from '../../search-hotels/components/hotel-page/hotels-list';
import { Filters } from '../../../core/models/filter.model';

@Component({
  selector: 'app-main-page',
  imports: [SearchBarComponent, HotelsList],
  template: `
    <app-search-bar></app-search-bar>
    <app-hotels-list></app-hotels-list>
  `,
  styles: ``,
})
export class MainPage {
  filters: Filters = {};

  onFiltersChanged(filters: Filters) {
    this.filters = filters;
  }
}
