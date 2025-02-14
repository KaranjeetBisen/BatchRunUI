import { CommonModule, NgClass, NgStyle } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FileViewer2Component } from "../../commons/file-viewer2/file-viewer2.component";

@Component({
  selector: "app-create-config-form",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FileViewer2Component,
  ],
  templateUrl: "./create-config-form.component.html",
  styleUrl: "./create-config-form.component.scss",
})
export class CreateConfigFormComponent {
  configForm: FormGroup;
  successMessage: string = "";
  errorMessage: string = "";
  serverSideConfirm: string = "";
  msg: string = "";
  configFileNameError: string = "";
  templateFileRelativePathError: string = "";
  templateFileError: string = "";
  fromError: string = "";
  subjectError: string = "";
  columns: string[] = [];
  columnIndex: number = 0;

  constants: { name: string; value: string }[] = [];
  constantNameRegex = /^[a-zA-Z0-9\-_]+$/;
  constantValueRegex = /^[a-zA-Z0-9\-_]+$/;
  replytoError: string = "";
  attachmentDirectoryError: string = "";
  columnError: string = "";

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      configFileName: [
        "",
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9_\-]+$/)],
      ],
      templateFile: [null],
      templateFileRelativePath: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[^\/][a-zA-Z0-9\/._()\*~!@#^&<>;:'"\-]+[^\/]$/),
        ],
      ],
      from: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-Z][a-zA-Z0-9]* )+<[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}>$|^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
          ),
        ],
      ],
      replyto: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-Z][a-zA-Z0-9]* )+<[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}>$|^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
          ),
        ],
      ],
      attachmentDirectory: [
        "",
        Validators.pattern(/^[^\/][a-zA-Z0-9\/._()\*~!@#^&<>;:'"\-]+[^\/]$/),
      ],
      subject: ["", Validators.required], // Assuming subject has no specific regex
    });
  }


  selectedFile: File | null = null;
  showPreview: boolean = false; // Controls preview visibility

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      // Check if the selected file is an HTML file
      if (!file.name.endsWith(".html")) {
        this.errorMessage = "Only HTML files are allowed!";
        this.selectedFile = null; // Reset selected file
        return;
      }

      this.errorMessage = ""; // Clear error message
      this.selectedFile = file; // Store valid file
    }
  }

  togglePreview(): void {
    if (this.selectedFile) {
      this.showPreview = !this.showPreview; // Toggle preview only if HTML file is selected
    }
  }

  selectedConstants: { name: string; value: string }[] = []; // Stores only selected (checked) constants

  /** Adds a new constant */
  addConstant(nameInput: HTMLInputElement, valueInput: HTMLInputElement) {
    const name = nameInput.value.trim();
    const value = valueInput.value.trim();

    if (!name || !value) {
      this.errorMessage = "Constant name and value cannot be empty!";
      return;
    }
    if (this.constants.some((constant) => constant.name === name)) {
      this.errorMessage = "Constant with this name already exists!";
      return;
    }

    this.constants.push({ name, value });
    nameInput.value = "";
    valueInput.value = "";
    this.successMessage = `Constant "${name}" added successfully!`;
  }

  /** Toggles selection of constants */
  toggleConstantSelection(
    constant: { name: string; value: string },
    event: any
  ) {
    if (event.target.checked) {
      if (!this.selectedConstants.some((c) => c.name === constant.name)) {
        this.selectedConstants.push(constant);
      }
    } else {
      this.selectedConstants = this.selectedConstants.filter(
        (c) => c.name !== constant.name
      );
    }
  }

  /** Removes a constant */
  removeConstant(name: string) {
    if (confirm(`Are you sure you want to remove constant "${name}"?`)) {
      this.constants = this.constants.filter(
        (constant) => constant.name !== name
      );
      this.selectedConstants = this.selectedConstants.filter(
        (constant) => constant.name !== name
      );
      this.successMessage = `Constant "${name}" removed successfully!`;
    }
  }

  selectedColumns: string[] = []; // Stores only selected (checked) columns

  // Add column to the list (without checkbox)
  addColumn(columnInput: HTMLInputElement) {
    const col = columnInput.value.trim();

    if (!col) {
      this.errorMessage = "Column name cannot be empty!";
      return;
    }
    if (col.length > 50) {
      this.errorMessage = "Column name cannot be greater than 50 characters!";
      return;
    }
    if (this.columns.includes(col)) {
      this.errorMessage = "Column already exists!";
      return;
    }

    this.columns.push(col); // Add column to list
    columnInput.value = ""; // Clear input field
    this.successMessage = `Column "${col}" added successfully!`;
  }

  // Toggle selection of columns (when checkbox is clicked)
  toggleColumnSelection(col: string, event: any) {
    if (event.target.checked) {
      // Add column to selected list
      if (!this.selectedColumns.includes(col)) {
        this.selectedColumns.push(col);
      }
    } else {
      // Remove column from selected list if unchecked
      this.selectedColumns = this.selectedColumns.filter(
        (item) => item !== col
      );
    }
  }

  // Remove column from the columns list
  removeColumn(col: string) {
    if (confirm(`Are you sure you want to remove column "${col}"?`)) {
      this.columns = this.columns.filter((item) => item !== col);
      this.selectedColumns = this.selectedColumns.filter(
        (item) => item !== col
      ); // Ensure it's also removed from selected list
      this.successMessage = `Column "${col}" removed successfully!`;
    }
  }


  private setErrorMessage() {
    // Ensure fields are marked as touched so errors appear
    Object.keys(this.configForm.controls).forEach((field) => {
      this.configForm.controls[field].markAsTouched();
      this.configForm.controls[field].updateValueAndValidity();
    });

    // Validate configFileName
    if (this.configForm.controls["configFileName"].value.trim() === "") {
      this.configFileNameError = "Required";
    } else if (this.configForm.controls["configFileName"].invalid) {
      this.configFileNameError =
        "Config File Name is invalid. Only letters, numbers, underscores, and hyphens are allowed.";
    } else {
      this.configFileNameError = ""; // Clear error if valid
    }

    // Validate templateFileRelativePath
    if (
      this.configForm.controls["templateFileRelativePath"].value.trim() === ""
    ) {
      this.templateFileRelativePathError = "Required";
    } else if (this.configForm.controls["templateFileRelativePath"].invalid) {
      this.templateFileRelativePathError =
        "Template File Relative Path is invalid. Ensure a valid path format.";
    } else {
      this.templateFileRelativePathError = "";
    }

    // Validate from (email)
    if (this.configForm.controls["from"].value.trim() === "") {
      this.fromError = "Required";
    } else if (this.configForm.controls["from"].invalid) {
      this.fromError = "Invalid From email format.";
    } else {
      this.fromError = "";
    }

    // Validate subject
    if (this.configForm.controls["subject"].value.trim() === "") {
      this.subjectError = "Required";
    } else {
      this.subjectError = "";
    }

    // Validate replyto (email)
    if (this.configForm.controls["replyto"].value.trim() === "") {
      this.replytoError = "Required";
    } else if (this.configForm.controls["replyto"].invalid) {
      this.replytoError = "Reply To format is incorrect.";
    } else {
      this.replytoError = "";
    }

    // Validate attachmentDirectory
    if (this.configForm.controls["attachmentDirectory"].invalid) {
      this.attachmentDirectoryError =
        "Attachment Directory format is incorrect.";
    } else {
      this.attachmentDirectoryError = "";
    }

    if (!this.columns || this.columns.length === 0) {
      this.columnError =
        "Required";
    } else if(!this.selectedColumns ||this.selectedColumns.length===0){
      this.columnError = "Checkbox the required columns.";
    }else{
      this.columnError='';
    }
  }

  generateConfigFile() {

    if (!this.configForm.valid || !this.columns ||this.columns.length === 0 || !this.selectedColumns || this.selectedColumns.length === 0) {
      this.successMessage = "";
      this.setErrorMessage();
      return
    }
    
    const configData = {
      configFileName: this.configForm.value.configFileName,
      templateFileRelativePath: this.configForm.value.templateFileRelativePath,
      templateFile: this.configForm.value.templateFile,
      from: this.configForm.value.from,
      subject: this.configForm.value.subject,
      replyto: this.configForm.value.replyto,
      attachmentDirectory: this.configForm.value.attachmentDirectory,

      columns: this.selectedColumns, // Use only checked columns
      constants: this.selectedConstants, // Include only checked constants
    };

    try {
      const jsonString = JSON.stringify(configData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${this.configForm.value.configFileName || "config"}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      this.successMessage = "Configuration file generated successfully!";
      this.errorMessage = ""; // Clear any error message
    } catch (error) {
      this.errorMessage = "Error generating configuration file: " + error;
    }
  }
}
