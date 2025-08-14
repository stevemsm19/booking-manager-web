import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <footer class="footer">
      <div class="footer-left">
        &copy; 2025 SofBook, Inc. ∙ <a href="#">Terms</a>
      </div>

      <div class="footer-right">
        <span class="footer-item">
          <mat-icon>language</mat-icon>
          <a href="#language">English (US)</a>
        </span>
        <span class="footer-item">
          <a href="#currency">$ USD</a>
        </span>
        <span class="social-media">
          <a href="#" aria-label="Facebook" class="social-icon">
            <mat-icon>facebook</mat-icon>
          </a>
        </span>
      </div>
    </footer>
  `,
  styleUrl: './footer.scss',
})
export class Footer {}
