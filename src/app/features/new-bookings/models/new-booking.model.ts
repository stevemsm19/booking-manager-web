export interface CreateBookingRequest {
  hotelId: string;
  hotelTitle: string;
  checkInDate: string;
  checkOutDate: string;
  location: string;
  nights: number;
  rooms: Array<{
    _id: string;
    type: string;
    quantity: number;
  }>;
  totalPrice: number;
  minDaysForCancel: number;
  cancellationPolicy: string;
}

export interface CreateBookingResponse {
  _id: string;
  hotelId: string;
  hotelTitle: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  userId: string;
  rooms: Array<{
    _id: string;
    type: string;
    quantity: number;
  }>;
  totalPrice: number;
  minDaysForCancel: number;
  reservationStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfo {
  _id: string;
  email: string;
  role: string;
}