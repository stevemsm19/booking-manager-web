import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/buttom/button';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isLoggedIn = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.getToken()) {
      this.isLoggedIn = true;
    } 
  }

  logout(): void {
    this.auth.logout();
  }
}
