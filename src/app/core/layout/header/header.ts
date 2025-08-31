import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/buttom/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ButtonComponent, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private auth = inject(AuthService);

  isLoggedIn = this.auth.isLoggedIn;

  logout(): void {
    this.auth.logout();
  }
}
