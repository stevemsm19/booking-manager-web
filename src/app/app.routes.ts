import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login';
import { MainPage } from './features/home/pages/main-page/main-page';
import { BookStayComponent } from './features/hotels/components/booking/book-stay';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'book/stay/:id', component: BookStayComponent },
  { path: '', component: MainPage },
  { path: '**', component: MainPage },
];
