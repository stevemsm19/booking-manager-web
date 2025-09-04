import { ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

import { Observable, switchMap } from "rxjs";

import { HotelBookingResponse, Room } from "../models/hotel-details.model";

import { FiltersService } from "../../../core/services/filters.service";
import { HotelBookingService } from "./hotel-details.service";

@Injectable({ providedIn: 'root' })
export class BookingHelperService {
  initHotelDetails(
    route: ActivatedRoute,
    filtersService: FiltersService,
    hotelService: HotelBookingService,
    checkInControl: FormControl,
    checkOutControl: FormControl
  ): Observable<HotelBookingResponse> {
    return route.paramMap.pipe(
      switchMap((params) => {
        const hotelId = params.get('id');
        const filters = filtersService.currentFilters;
        checkInControl.setValue(filters.checkIn || '');
        checkOutControl.setValue(filters.checkOut || '');

        return hotelService.getHotelRoomsById(hotelId!, filters);
      })
    );
  }

  calculatePricePerNight(selectedRooms: { [id: string]: number }, rooms: Room[]): number {
    return Object.entries(selectedRooms).reduce((acc, [roomId, qty]) => {
      const room = rooms.find((r) => r._id === roomId);
      return room ? acc + room.price * qty : acc;
    }, 0);
  }

  calculateTotal(checkIn: string | null, checkOut: string | null, pricePerNight: number): { nights: number; total: number } {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start) {
        const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return { nights, total: pricePerNight * nights };
      }
    }
    return { nights: 0, total: 0 };
  }

  getMinCheckOutDate(checkInValue: string | null): { minDate: string; enabled: boolean } {
    if (checkInValue) {
      const date = new Date(checkInValue);
      date.setDate(date.getDate() + 1);
      return {
        minDate: date.toISOString().split('T')[0],
        enabled: true,
      };
    }
    return { minDate: '', enabled: false };
  }

  createBookingSummary({
    hotelId,
    title,
    checkIn,
    checkOut,
    nights,
    userName,
    selectedRooms,
    rooms,
    totalPrice,
  }: {
    hotelId: string | null;
    title: string;
    checkIn: string | null;
    checkOut: string | null;
    nights: number;
    userName: string;
    selectedRooms: { [id: string]: number };
    rooms: Room[];
    totalPrice: number;
  }) {
    const bookedRooms = Object.entries(selectedRooms)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const room = rooms.find((r) => r._id === id);
        return {
          _id: id,
          type: room?.type,
          quantity: qty,
        };
      });

    return {
      hotelId,
      hotelTitle: title,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      nights,
      userName,
      rooms: bookedRooms,
      totalPrice,
    };
  }
}
