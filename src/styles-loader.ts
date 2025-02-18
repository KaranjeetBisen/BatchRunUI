import { environment } from "./environments/environment.brand";

export function loadStyles() {
    const root = document.documentElement; // Access :root in CSS
  
    root.style.setProperty('--button-color', environment.buttonColor);
    root.style.setProperty('--button-text-color', environment.buttonTextColor);
    root.style.setProperty('--button-hover-color', environment.buttonHoverColor);
    root.style.setProperty('--button-hover-text-color', environment.buttonHoverTextColor);
  
    root.style.setProperty('--home-logo-url', `url('${environment.homeLogoUrl}')`);
    root.style.setProperty('--sidebar-logo-url', `url('${environment.sidebarLogoUrl}')`);
    root.style.setProperty('--sidebar-bg-color', environment.sidebarBgColor);
    root.style.setProperty('--ui-font', environment.uiFont);


  }