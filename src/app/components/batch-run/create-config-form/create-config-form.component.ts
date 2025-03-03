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
      templateFile: [ [ Validators.required]],
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
      subject: ["", Validators.required],  // Assuming subject has no specific regex
      selectedColumns: [[]], // Array of selected columns
      selectedConstants: [[]], // Array of selected constants
    });
  }


selectedFile: File | null = null;
base64File: string | null = null; // Variable to store Base64 string
showPreview: boolean = false; // Controls preview visibility

onFileSelected(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0];

    // Check if the selected file is an HTML file
    if (!file.name.endsWith(".html")) {
      this.templateFileError = "Only HTML files are allowed!";
      this.selectedFile = null; // Reset selected file
      this.base64File = null; // Reset Base64 variable
      return;
    }

    this.templateFileError = ""; // Clear error message
    this.selectedFile = file; // Store valid file

    // Convert file to Base64
    const reader = new FileReader();
    reader.onload = () => {
      this.base64File = reader.result as string; // Store Base64 encoded file
      console.log("Base64 Encoded File:", this.base64File);
      this.configForm.patchValue({ templateFile: this.base64File }); // Store Base64 in form control

    };
    reader.readAsDataURL(file); // Convert file to Base64
  }
}


  togglePreview(): void {
    if (this.selectedFile) {
      this.showPreview = !this.showPreview; // Toggle preview only if HTML file is selected
    }
  }

  selectedConstants: { name: string; value: string }[] = []; // Stores only selected (checked) constants


//   /** Adds only the "campid" constant with regex validation */
// addConstant(nameInput: HTMLInputElement, valueInput: HTMLInputElement) {
//   this.successMessage='';
//   const name = nameInput.value.trim();
//   const value = valueInput.value.trim();
//   const campidRegex = /^\d{6}_.*$/;

//   // Validate name
//   if (name !== "campid") {
//     this.errorMessage = 'Only the constant name "campid" is allowed!';
//     return;
//   }

//   // Validate value
//   if (!value) {
//     this.errorMessage = 'The "campid" value cannot be empty!';
//     return;
//   }

//   if (!campidRegex.test(value)) {
//     this.errorMessage = 'The "campid" value must follow the format: 6 digits followed by an underscore and additional text (e.g., "123456_example").';
//     return;
//   }

//   // Prevent duplicates
//   if (this.constants.some((constant) => constant.name === "campid")) {
//     this.errorMessage = 'The "campid" constant already exists!';
//     return;
//   }

//   // Add the validated constant
//   this.constants.push({ name, value });
//   nameInput.value = "";
//   valueInput.value = "";
//   this.successMessage = `Constant "${name}" added successfully!`;
// }

isConstantSelected(constant: { name: string; value: string }): boolean {
  return this.selectedConstants.some((c) => c.name === constant.name);
}

/** Adds only the "campid" constant with regex validation and auto-selects it */
addConstant(nameInput: HTMLInputElement, valueInput: HTMLInputElement) {
  this.successMessage = '';
  this.errorMessage = '';
  const name = nameInput.value.trim();
  const value = valueInput.value.trim();
  const campidRegex = /^\d{6}_.*$/;

  // Validate name
  if (name !== "campid") {
    this.errorMessage = 'Only the constant name "campid" is allowed!';
    return;
  }

  // Validate value
  if (!value) {
    this.errorMessage = 'The "campid" value cannot be empty!';
    return;
  }

  if (!campidRegex.test(value)) {
    this.errorMessage =
      'The "campid" value must follow the format: 6 digits followed by an underscore and additional text (e.g., "123456_example").';
    return;
  }

  // Prevent duplicates
  if (this.constants.some((constant) => constant.name === "campid")) {
    this.errorMessage = 'The "campid" constant already exists!';
    return;
  }

  // Add the validated constant
  const newConstant = { name, value };
  this.constants.push(newConstant);

  // ✅ Auto-select the newly added constant
  if (!this.selectedConstants.some((c) => c.name === newConstant.name)) {
    this.selectedConstants.push(newConstant);
  }

  // ✅ Assign campid value to form fields
  this.configForm.patchValue({
    configFileName: value,
    templateFileRelativePath: value,
  });

  // Update the form with the selected constants
  this.configForm.patchValue({ selectedConstants: this.selectedConstants });

  // Clear input fields
  nameInput.value = "";
  valueInput.value = "";

  this.successMessage = `Constant "${name}" added and selected successfully!`;
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
    this.configForm.patchValue({ selectedConstants: this.selectedConstants });
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
      this.columnError = "Column name cannot be empty!";
      return;
    }
    if (col.length > 50) {
      this.columnError = "Column name cannot be greater than 50 characters!";
      return;
    }
    if (this.columns.includes(col)) {
      this.columnError = "Column already exists!";
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
    this.configForm.patchValue({ selectedColumns: this.selectedColumns });
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

    // Validate subject
    // if (this.configForm.controls["templateFile"].value.trim() === "") {
    //   this.templateFileError = "Required";
    // } else {
    //   this.templateFileError = "";
    // }

    const templateFileValue = this.configForm.get('templateFile')?.value;

  if (!templateFileValue || typeof templateFileValue !== 'string' || !templateFileValue.trim()) {
    this.templateFileError = "Required";
  } else {
    this.templateFileError = "";
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
      this.columnError = "Checkbox the required columns";
    }else{
      this.columnError='';
    }

    if(!this.constants || this.constants.length===0){
      this.errorMessage = "Constants are required!";
      } else if(!this.selectedConstants ||this.selectedConstants.length===0){
        this.errorMessage = "Checkbox the required constants";
      }else{
        this.errorMessage='';
      }
     }

  generateConfigFile() {

    if (!this.configForm.valid || !this.columns ||this.columns.length === 0 || !this.selectedColumns || this.selectedColumns.length === 0 || !this.selectedConstants || this.selectedConstants.length===0) {
      this.successMessage = "";
      this.setErrorMessage();
      return
    }

    const configData = this.configForm.value;

  // You can log or process the form data here
  console.log(configData); // Example logging the form data
    

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
