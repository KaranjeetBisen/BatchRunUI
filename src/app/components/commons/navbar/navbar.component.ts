import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../../environments/environment.brand';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output() toggleSidebar = new EventEmitter<void>();
  navbarBrandLogoRight= environment.navbarBrandLogoRight;
}
