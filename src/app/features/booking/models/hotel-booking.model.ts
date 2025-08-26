export interface HotelBookingDetails {
  _id: string;
  title: string;
  images: string[];
  price: number;
  rating: number;
  houseRules: string;
  cancellationPolicy: string;
}

export interface BookedDate {
  _id: string;
  startDate: string;
  endDate: string;
}

export interface Room {
  _id: string;
  type: string;
  price: number;
  capacity: number;
  selectedQuantity: number;
}

export interface RoomApiResponse {
  _id: string;
  hotel: string;
  type: string;
  capacity: number;
  price: number;
  images: string[];
  bookedDates: BookedDate[];
}

export interface HotelBookingResponse {
  hotel: HotelBookingDetails;
  rooms: Room[];
}

export interface PaginatedHotelBookingResponse {
  content: {
    hotel: HotelBookingDetails;
    rooms: Room[];
  };
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}
