export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    LOGOUT: 'auth/logout',
  },

  HOTELS: {
    CREATE: 'hotels',
    ADD_ROOM: (id: string) => `hotels/${id}/rooms`,
    GET_ALL: 'hotels',
    GET_BY_ID: (id: string) => `hotels/${id}`,
    SEARCH: 'hotels/search',
    GET_ROOMS: (id: string) => `hotels/${id}/rooms`,
    UPDATE: (id: string) => `hotels/${id}`,
    PARTIAL_UPDATE: (id: string) => `hotels/${id}`,
    DELETE: (id: string) => `hotels/${id}`,
  },

  BOOKINGS: {
    CREATE: '/bookings',
    GET_ALL: '/bookings',
    GET_BY_ID: (id: string) => `bookings/${id}`,
    UPDATE: (id: string) => `bookings/${id}`,
  },
};
