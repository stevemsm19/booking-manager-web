import { Routes } from '@angular/router';
import { SignIn } from './components/signin/signin';
import { MainPage } from './components/main-page/main-page';

export const routes: Routes = [
  { path: 'login', component: SignIn },
  { path: '', component: MainPage }
];