import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-form-view-demo',
  imports: [],
  templateUrl: './form-view-demo.component.html',
  styleUrl: './form-view-demo.component.scss'
})
export class FormViewDemoComponent {

  selectedFileName: string | null = null;
  uploadedHtml: string = '';
  safeHtmlContent: SafeHtml | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  onClick(){
    localStorage.setItem("htmlcontent",this.uploadedHtml);
  }

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
  
}
