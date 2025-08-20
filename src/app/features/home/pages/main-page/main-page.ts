import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar';
import { HotelsList } from '../../../hotels/pages/hotel-list/hotels-list';

@Component({
  selector: 'app-main-page',
  imports: [SearchBarComponent, HotelsList],
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.scss'],
})
export class MainPage {
  filters: any = {};

  onFiltersChanged(filters: any) {
    this.filters = filters;
  }
}
