import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.brand';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() show = false;
  sidebarLogoUrl = environment.sidebarLogoUrl;

}
