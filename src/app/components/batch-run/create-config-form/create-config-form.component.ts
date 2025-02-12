import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-config-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      configFileName: ['', Validators.required],
      templateFileRelativePath: ['', Validators.required],
      templateFile: [null, Validators.required],
      from: ['', Validators.required],
      subject: ['', Validators.required]
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

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.configForm.patchValue({ templateFile: file });
      this.templateFileError = '';
    } else {
      this.templateFileError = 'Please select a file';
    }
  }

  // addColumn(columnInput: HTMLInputElement) {
  //   const col = columnInput.value.trim();

  //   if (!col) {
  //     this.msg = "Column name cannot be empty!";
  //     return;
  //   }
  //   if (col.length > 50) {
  //     this.msg = "Column name cannot be greater than 50!";
  //     return;
  //   }

  //   if (confirm(`Are you sure you want to add column ${col}?`)) {
  //     this.msg = ''; // Clear previous messages

  //     // Create and add column entry to the list
  //     const columnList = document.getElementById('columnsList');
  //     if (columnList) {
  //       const listItem = document.createElement('div');
  //       listItem.className = 'value-list-item';
  //       listItem.innerHTML = `
  //         <span class='column' style='color: Blue'>Column: ${col}</span>
  //         <div class="close-icon light" id="${col}" (click)="removeColumn('${col}')">
  //           <i class="fa fa-times" aria-hidden="true"></i>
  //         </div>`;

  //       columnList.appendChild(listItem);
  //     }

  //     // Create and add checkbox entry for namespaceColumns
  //     const namespaceColumns = document.getElementById('namespaceColumns');
  //     if (namespaceColumns) {
  //       const row = document.createElement('div');
  //       row.innerHTML = `
  //         <label id="${col}">
  //           <input type='checkbox' name='namespaceColumns' value='${col}' /> ${col}
  //         </label>`;
  //       namespaceColumns.appendChild(row);
  //     }

  //     this.columns.push(col);
  //     this.columnIndex++;
  //     columnInput.value = '';
  //     this.msg = `Column ${col} added successfully!`;
  //   }
  // }

  // removeColumn(col: string) {
  //   this.columns = this.columns.filter(item => item !== col);
  //   this.msg = `Column ${col} removed successfully!`;
  // }


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
    this.columns = this.columns.filter(item => item !== col);
    this.successMessage = `Column ${col} removed successfully!`;
  }

}