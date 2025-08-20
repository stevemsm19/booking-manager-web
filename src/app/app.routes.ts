import { Routes } from '@angular/router';
import { MainPage } from './features/home/pages/main-page/main-page';
import { BookStayComponent } from './features/booking/book-stay';
import { LoginComponent } from './core/auth/pages/login/login';
import { RegisterComponent } from './core/auth/pages/register/register';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book/stay/:id', component: BookStayComponent },
  { path: '', component: MainPage },
  { path: '**', component: MainPage },
];
