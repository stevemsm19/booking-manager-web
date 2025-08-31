export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Enter a valid email',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  PRICE_RANGE_INVALID: 'Max price should be greater than or equal to min price',
  GENERIC_ERROR: 'Invalid field',

  MIN_LENGTH: (fieldName: string, length: number) => `${fieldName} must be at least ${length} characters`,
  MAX_LENGTH: (fieldName: string, length: number) => `${fieldName} cannot exceed ${length} characters`,
  MIN_VALUE: (fieldName: string, value: number) => `${fieldName} must be at least ${value}`,
  MAX_VALUE: (fieldName: string, value: number) => `${fieldName} cannot exceed ${value}`,
}

export const FIELD_NAMES = {
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  LOCATION: 'location',
  CHECK_IN: 'checkIn',
  CHECK_OUT: 'checkOut',
  NUMBER_OF_GUESTS: 'numberOfGuests',
  MIN_PRICE: 'minPrice',
  MAX_PRICE: 'maxPrice'
} 