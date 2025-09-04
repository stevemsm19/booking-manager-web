export interface PaginatedHotelBookingResponse {
  content: {
    hotel: HotelBookingDetails;
    rooms: Room[];
  };
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}

export interface HotelBookingDetails {
  _id: string;
  title: string;
  images: string[];
  price: number;
  rating: number;
  location: string;
  houseRules: string;
  minDaysForCancel: number;
}

export interface HotelBookingResponse {
  hotel: HotelBookingDetails;
  rooms: Room[];
}

export interface Room {
  _id: string;
  type: string;
  price: number;
  capacity: number;
  selectedQuantity: number;
}

export interface BookedDate {
  _id: string;
  startDate: string;
  endDate: string;
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
