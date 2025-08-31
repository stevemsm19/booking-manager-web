export interface PaginatedResponse {
  content: HotelApiResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface Hotel {
  _id: string;
  images: string[];
  title: string;
  location: string;
  rating: number;
  price: number;
}

export interface HotelApiResponse {
  _id: string;
  images: string[];
  title: string;
  location: string;
  rating: number;
  price: number;
}