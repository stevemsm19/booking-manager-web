import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../search-bar/component/search-bar.component';
import { HotelsList } from '../../../hotels/pages/hotel-list/hotels-list';
import { Filters } from '../../../search-bar/models/filters.model';

@Component({
  selector: 'app-main-page',
  imports: [SearchBarComponent, HotelsList],
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.scss'],
})
export class MainPage {
  filters: Filters = {};

  onFiltersChanged(filters: Filters) {
    this.filters = filters;
  }
}
