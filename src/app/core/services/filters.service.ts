import { Injectable, signal } from '@angular/core';
import { Filters } from '../models/filter.model';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private readonly filtersSignal = signal<Filters>({});
  readonly filters = this.filtersSignal.asReadonly();

  get currentFilters(): Filters {
    return this.filtersSignal();
  }

  setFilters(filters: Filters) {
    this.filtersSignal.set(filters);
  }

}
