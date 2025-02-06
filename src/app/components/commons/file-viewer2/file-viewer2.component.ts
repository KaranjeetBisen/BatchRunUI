import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-viewer2',
  imports: [CommonModule, FormsModule],
  templateUrl: './file-viewer2.component.html',
  styleUrl: './file-viewer2.component.scss'
})
export class FileViewer2Component {

  selectedFileName: string | null = null;
    uploadedHtml: string = '';
    safeHtmlContent: SafeHtml | null = null;
  
    // List of predefined devices
    devices = [
      { name: 'select Device', width: 1920, height: 1080 },
      { name: 'iPhone 12 (390x844)', width: 390, height: 844 },
      { name: 'Galaxy S21 (360x800)', width: 360, height: 800 },
      { name: 'Laptop (1366x768)', width: 1366, height: 768 },
      { name: 'Desktop (1920x1080)', width: 1920, height: 1080 },
      { name: 'Motorola Edge 50 Fusion (393x851)', width: 393, height: 851 }
    ];
  
    // Default styles for the preview container
    deviceStyles: any = {
      width: '1920px',
      height: '1080px',
      border: '1px solid #ccc',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: '#ffffff',
    };
  
    // Custom dimensions for the frame
    customWidth = 1920;
    customHeight = 1080;
  
    // Resizing logic
    resizing = false;
    resizeStartX = 0;
    resizeStartY = 0;
  
    constructor(private sanitizer: DomSanitizer) {}
  
    /**
     * Handles file upload and sets the uploaded HTML content.
     */
    onHtmlUpload(event: any): void {
      const file = event.target.files[0];
      const fileNameInput = document.getElementById("fileName") as HTMLInputElement;
    
      if (file) {
        // Display the selected file name in the text box
        fileNameInput.value = file.name;
    
        // Read the file content
        const reader = new FileReader();
        reader.onload = () => {
          this.uploadedHtml = reader.result as string;
          this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(this.uploadedHtml);
        };
    
        reader.readAsText(file);
      } else {
        fileNameInput.value = "No file chosen"; // Reset if no file is selected
      }
    }
    
  
    /**
     * Sets the dimensions based on the selected device.
     */
    setDevice(event: Event): void {
      const selectedIndex = (event.target as HTMLSelectElement).value;
      const device = this.devices[+selectedIndex];
  
      if (device) {
        this.customWidth = device.width;
        this.customHeight = device.height;
        this.updateDeviceStyles();
      }
    }
  
    /**
     * Updates the styles dynamically when width or height is changed.
     */
    updateDeviceStyles(): void {
      this.deviceStyles.width = `${this.customWidth}px`;
      this.deviceStyles.height = `${this.customHeight}px`;
    }
  
    /**
     * Starts the resizing process when the mouse is pressed on the resize handle.
     */
    onResizeStart(event: MouseEvent): void {
      this.resizing = true;
      this.resizeStartX = event.clientX;
      this.resizeStartY = event.clientY;
  
      // Prevent text selection while resizing
      event.preventDefault();
    }
  
    /**
     * Handles resizing as the mouse moves.
     */
    @HostListener('document:mousemove', ['$event'])
    onResizing(event: MouseEvent): void {
      if (this.resizing) {
        const deltaX = event.clientX - this.resizeStartX;
        const deltaY = event.clientY - this.resizeStartY;
  
        this.customWidth = Math.max(this.customWidth + deltaX, 100); // Minimum width
        this.customHeight = Math.max(this.customHeight + deltaY, 100); // Minimum height
  
        this.updateDeviceStyles();
  
        this.resizeStartX = event.clientX;
        this.resizeStartY = event.clientY;
      }
    }
  
    /**
     * Ends the resizing process when the mouse button is released.
     */
    @HostListener('document:mouseup')
    onResizeEnd(): void {
      this.resizing = false;
    }
}
