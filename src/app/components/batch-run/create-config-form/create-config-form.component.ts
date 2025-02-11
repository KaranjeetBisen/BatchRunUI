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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.configForm = this.fb.group({
      configFileName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+$')]],
      templateFileRelativePath: ['', [Validators.required, Validators.pattern('^(?!\\/)(.*?)(?<!\/)$')]],
      templateFile: ['', Validators.required],
      from: ['', Validators.required],
      subject: ['', Validators.required],
      replyto: ['', Validators.required],
      attachmentDirectory: ['', Validators.pattern('^(?!\\/)(.*?)(?<!\/)$')],
      constantName: ['campid', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+$')]],
      constantValue: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+$')]],
      column: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+$')]]
    });
  }

  get f() {
    return this.configForm.controls;
  }

  onSubmit(): void {
    if (this.configForm.valid) {
      console.log(this.configForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  onReset(): void {
    this.configForm.reset();
  }

  addConstant(): void {
    // Handle adding constants logic
  }

  addColumn(): void {
    // Handle adding columns logic
  }
}
