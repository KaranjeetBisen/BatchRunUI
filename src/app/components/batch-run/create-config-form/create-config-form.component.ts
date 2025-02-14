import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileViewer2Component } from "../../commons/file-viewer2/file-viewer2.component";

@Component({
  selector: 'app-create-config-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FileViewer2Component],
  templateUrl: './create-config-form.component.html',
  styleUrl: './create-config-form.component.scss'
})
export class CreateConfigFormComponent {


  configForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  serverSideConfirm: string = '';
  msg: string = '';
  configFileNameError: string = '';
  templateFileRelativePathError: string = '';
  templateFileError: string = '';
  fromError: string = '';
  subjectError: string = '';
  columns: string[] = [];
  columnIndex: number = 0;

  constants: { name: string, value: string }[] = [];
  constantNameRegex = /^[a-zA-Z0-9\-_]+$/;
  constantValueRegex = /^[a-zA-Z0-9\-_]+$/;



  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      configFileName: [''],
      templateFileRelativePath: [''],
      templateFile: [null],
      from: [''],
      subject: [''],
      constantName: [''],
      constantValue: [''], // FormArray for constants
    });
  }

 

  onSubmit() {
    if (this.configForm.valid) {
      this.successMessage = 'Configuration saved successfully';
      this.errorMessage = '';
    } else {
      this.successMessage = '';
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }


selectedFile: File | null = null;
  showPreview: boolean = false; // Controls preview visibility

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      // Check if the selected file is an HTML file
      if (!file.name.endsWith('.html')) {
        this.errorMessage = 'Only HTML files are allowed!';
        this.selectedFile = null; // Reset selected file
        return;
      }

      this.errorMessage = ''; // Clear error message
      this.selectedFile = file; // Store valid file
    }
  }


  togglePreview(): void {
    if (this.selectedFile) {
      this.showPreview = !this.showPreview; // Toggle preview only if HTML file is selected
    }
  }




  addColumn(columnInput: HTMLInputElement) {
    const col = columnInput.value.trim();

    if (!col) {
      this.errorMessage = "Column name cannot be empty!";
      return;
    }
    if (col.length > 50) {
      this.errorMessage = "Column name cannot be greater than 50!";
      return;
    }

    if (confirm(`Are you sure you want to add column ${col}?`)) {
      this.columns.push(col);
      columnInput.value = '';
      this.successMessage = `Column ${col} added successfully!`;
    }
  }

  removeColumn(col: string) {
    if (confirm(`Are you sure you want to remove column ${col}?`)) {
    this.columns = this.columns.filter(item => item !== col);
    this.successMessage = `Column ${col} removed successfully!`;
  }
}


addConstant() {
  const cname = this.configForm.get('constantName')?.value.trim();
  const cvalue = this.configForm.get('constantValue')?.value.trim();

  if (!cname || !cvalue) {
    this.errorMessage = "Constant name or value cannot be empty!";
    return;
  }

  if (cname.length > 50 || cvalue.length > 50) {
    this.errorMessage = "Constant name or value cannot exceed 50 characters!";
    return;
  }

  if (this.constants.some(constant => constant.name === cname)) {
    this.errorMessage = "This constant already exists!";
    return;
  }

  if (confirm(`Are you sure you want to add constant ${cname} with value ${cvalue}?`)) {
    this.constants.push({ name: cname, value: cvalue });
    this.configForm.patchValue({ constantName: '', constantValue: '' });
    this.successMessage = `Constant "${cname}" added successfully!`;
  }
}

removeConstant(constantName: string) {
  if (confirm(`Are you sure you want to remove constant ${constantName}?`)) {
    this.constants = this.constants.filter(c => c.name !== constantName);
    this.successMessage = `Constant "${constantName}" removed successfully!`;
  }
}

generateConfigFile() {
  if (this.configForm.invalid) {
    this.errorMessage = 'Please fill in all required fields correctly before generating the config file.';
    console.log("Form validation failed:", this.configForm.errors);
    return;
  }

  const configData = {
    configFileName: this.configForm.value.configFileName,
    templateFileRelativePath: this.configForm.value.templateFileRelativePath,
    templateFile: this.selectedFile ? this.selectedFile.name : '',
    from: this.configForm.value.from,
    subject: this.configForm.value.subject,
    columns: this.columns,
    constants: this.constants
  };

  try {
    const jsonString = JSON.stringify(configData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.configForm.value.configFileName || 'config'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    this.successMessage = 'Configuration file generated successfully!';
    this.errorMessage = ''; // Clear any previous errors
  } catch (error) {
    this.errorMessage = 'Error generating configuration file: ' + error;
    console.error("Error in generateConfigFile():", error);
  }
}


}