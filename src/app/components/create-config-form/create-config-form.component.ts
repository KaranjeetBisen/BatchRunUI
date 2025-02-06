import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-config-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-config-form.component.html',
  styleUrl: './create-config-form.component.scss'
})
export class CreateConfigFormComponent implements OnInit {

  configForm!: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  serverSideConfirm: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.configForm = this.fb.group({
      configFileName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]+$/)]],
      templateFileRelativePath: ['', [Validators.required]],
      templateFile: [null, Validators.required],
      from: ['', Validators.required],
      subject: ['', Validators.required],
      replyto: ['', Validators.required],
      attachmentDirectory: ['']
    });
  }

  get f() {
    return this.configForm.controls;
  }

  onSubmit() {
    if (this.configForm.valid) {
      console.log('Form submitted:', this.configForm.value);
      this.successMsg = 'Configuration saved successfully!';
      this.errorMsg = '';
    } else {
      this.errorMsg = 'Please fix the errors before submitting.';
      this.successMsg = '';
    }
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.configForm.patchValue({ templateFile: file });
    }
  }
}
