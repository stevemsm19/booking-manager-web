import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItem } from './tab-items.model';

@Component({
  selector: 'app-tab-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.html',
  styleUrls: ['./side-bar.scss']
})
export class SideBarComponent {
  @Input() title: string = '';
  @Input() tabs: TabItem[] = [];
  @Input() activeTab: string = '';
  
  @Output() tabChange = new EventEmitter<string>();

  onTabClick(tab: TabItem): void {
    if (!tab.disabled && tab.id !== this.activeTab) {
      this.tabChange.emit(tab.id);
    }
  }
}