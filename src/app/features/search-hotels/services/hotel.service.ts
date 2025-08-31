import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClientService } from '../../../core/services/http-client.service';
import { map } from 'rxjs/operators';
import {
  Hotel,
  HotelApiResponse,
  PaginatedResponse,
} from '../models/hotel.model';
import { Filters } from '../../../core/models/filter.model';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class HotelService {

  constructor(private apiService: HttpClientService) {}

  getHotels(filters: Filters): Observable<Hotel[]> {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof Filters];
      if (value !== '' && value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.apiService
      .get<PaginatedResponse>(`${API_ENDPOINTS.HOTELS.SEARCH}`, {params})
      .pipe(
        map((res) =>
          res.content.map((h: HotelApiResponse) => ({
            _id: String(h._id),
            images: h.images?.length > 0 ? h.images : ['assets/no-image.png'],
            title: h.title,
            location: h.location,
            rating: h.rating,
            price: h.price,
          }))
        )
      );
  }
}
