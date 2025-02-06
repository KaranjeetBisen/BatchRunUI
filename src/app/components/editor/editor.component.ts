import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  imports:[AngularEditorModule, FormsModule, HttpClientModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditorComponent {
  htmlContent: string = '';
  isEditorVisible: boolean = true; // Controls the visibility of the editor
  uploadedFileName: string = ''; // To store the uploaded file name
  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() togglePreviewVisibility: EventEmitter<void> = new EventEmitter<void>(); // New EventEmitter
  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {}

  config: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '23rem',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },],

    sanitize: false, // Ensures all loaded content is clean
    outline: true, // Removes the centering if present
  };
  

  onContentChange() {
    this.contentChange.emit(this.htmlContent);
    this.cdr.detectChanges();
  }


  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const fileNameInput = document.getElementById("fileName1") as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadedFileName = file.name; // Store the file name
      fileNameInput.value = this.uploadedFileName;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.htmlContent = e.target?.result as string;
      };
      reader.readAsText(file);
    }
    else{
      fileNameInput.value = "No file Chosen";
    }
  }

  toggleEditorVisibility(): void {
    this.isEditorVisible = !this.isEditorVisible; // Toggle editor visibility
    this.togglePreviewVisibility.emit(); // Emit the event
  }

    // Sanitize content before emitting
    getSanitizedHtml(content: string) {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }

 
  
}
