export type BookingStatus = 'Active' | 'Completed' | 'Canceled';

export interface Booking {
  id: string;
  hotelName: string;
  location: string;
  confirmationCode: string;
  rooms: string[];
  cancellationPolicy: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  nights: number;
  status: string;
}