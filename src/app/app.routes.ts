import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth/login', loadComponent: () => import('./core/auth/login-page/login').then(m => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./core/auth/register-page/register').then(m => m.RegisterComponent) },
  { path: 'book/stay/:id', loadComponent: () => import('./features/new-bookings/components/new-booking-page/booking').then(m => m.NewBookingComponent) },
  { path: 'bookings', loadComponent: () => import('./features/my-bookings/components/bookings-page/bookings').then(m => m.BookingsComponent) },
  { path: '', loadComponent: () => import('./features/home/components/main-page').then(m => m.MainPage) },
  { path: '**', loadComponent: () => import('./features/home/components/main-page').then(m => m.MainPage) },
];
