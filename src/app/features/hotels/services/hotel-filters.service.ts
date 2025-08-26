import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filters } from '../../search-bar/models/filters.model';

@Injectable({ providedIn: 'root' })
export class HotelFiltersService {
  private filtersSubject = new BehaviorSubject<Filters>({});
  filters$ = this.filtersSubject.asObservable();

  setFilters(filters: Filters) {
    this.filtersSubject.next(filters);
  }

  get currentFilters(): Filters {
    return this.filtersSubject.value;
  }
}
