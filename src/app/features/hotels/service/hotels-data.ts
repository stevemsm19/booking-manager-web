import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Hotel } from '../interfaces/hotel-interface';

@Injectable({
  providedIn: 'root',
})
export class HotelDataService {
  private apiUrl = 'http://localhost:3000/hotels/search';
  private http = inject(HttpClient);

  getHotels(): Observable<Hotel[]> {
    return this.http.get(this.apiUrl).pipe(
      map((res: any) => {
        return res.content.map((h: any) => ({
          _id: String(h._id),
          image:
            h.images && h.images.length > 0
              ? h.images[0]
              : 'assets/no-image.png',
          title: h.title,
          location: h.location,
          rating: h.rating,
        }));
      })
    );
  }
}
