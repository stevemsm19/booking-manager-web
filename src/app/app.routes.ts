import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login';
import { MainPage } from './features/home/pages/main-page/main-page';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MainPage },
  { path: '**', component: MainPage }
];
