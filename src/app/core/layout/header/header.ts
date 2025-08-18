import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../auth/services/local-storage';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  template: `<header class="header" color="primary">
    <a routerLink="/">
      <span class="logo-text">SofBook</span>
    </a>

    <a routerLink="/">
      <span class="logo-short">SB</span>
    </a>

    <span class="spacer"></span>

    <div class="auth-buttons">
      @if (!isLoggedIn) {
      <button mat-button class="signin" routerLink="/login">Sign In</button>
      <button mat-raised-button class="signup">Sign Up</button>
      }
      @else {
        <button mat-raised-button class="profiel">Profile</button>
      }
    </div>
  </header> `,
  styleUrl: './header.scss',
})
export class Header {
  isLoggedIn = false; 

  constructor(
    private localStorageService: LocalStorageService 
  ) {
    this.isLoggedIn = !!this.localStorageService.getItem('accessToken');
  }
}
