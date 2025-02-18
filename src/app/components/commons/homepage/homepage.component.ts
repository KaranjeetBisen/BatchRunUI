import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.brand';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  homeLogoUrl = environment.homeLogoUrl;
  homeLogoBelowText = environment.homeLogoBelowText;
}
