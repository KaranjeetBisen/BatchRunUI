import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  private _htmlContent: string = '';
  sanitizedHtmlContent: SafeHtml = ''; // Safe HTML content
  constructor(private sanitizer: DomSanitizer) {}

  @Input() 
  set htmlContent(value: string) {
    this._htmlContent = value;
    this.sanitizedHtmlContent = this.sanitizer.bypassSecurityTrustHtml(value);
  }

  get htmlContent(): string {
    return this._htmlContent;
  }

  downloadHTML(): void {
    const blob = new Blob([this._htmlContent], { type: 'text/html' });
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `template-${timestamp}.html`;

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(link.href);
  }

}
