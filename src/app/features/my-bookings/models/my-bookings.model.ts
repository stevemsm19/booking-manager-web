export type BookingStatus = 'active' | 'completed' | 'canceled';

export interface Booking {
  confirmationCode: string;
  reservationDate: string;
  hotelName: string;
  location: string;
  rooms: string[];
  cancellationPolicy: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  totalPrice: number;
  minDaysForCancel: number;
  reservationStatus: string;
}

export interface BookingResponse {
  reservationStatus: string;
  _id: string;
  createdAt: string;
  hotelId: string;
  hotelTitle: string;
  checkInDate: string;
  checkOutDate: string;
  location: string;
  nights: number;
  userId: string;
  rooms: string[];
  totalPrice: number;
  minDaysForCancel: number;
  cancellationPolicy: string;
}
