import { Routes } from '@angular/router';

import { BookStayComponent } from './features/new-bookings/components/new-booking-page/booking';
import { LoginComponent } from './core/auth/login-page/login';
import { RegisterComponent } from './core/auth/register-page/register';
import { MainPage } from './features/home/components/main-page';
import { BookingsComponent } from './features/my-bookings/components/bookings-page/bookings';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'book/stay/:id', component: BookStayComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: '', component: MainPage },
  { path: '**', component: MainPage },
];
