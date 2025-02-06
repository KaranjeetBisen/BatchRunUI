import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { EditorComponent } from "../editor/editor.component";
import { RouterOutlet } from '@angular/router';
import { BatchrunComponent } from "../batchrun/batchrun.component";

@Component({
  selector: 'app-base',
  imports: [NavbarComponent, SidebarComponent, CommonModule, RouterOutlet, BatchrunComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  sidebarVisible = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
