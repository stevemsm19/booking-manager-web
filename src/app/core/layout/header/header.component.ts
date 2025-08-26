import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/buttom/button.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  private auth = inject(AuthService);

  isLoggedIn = this.auth.isLoggedIn;

  logout(): void {
    this.auth.logout();
  }
}
