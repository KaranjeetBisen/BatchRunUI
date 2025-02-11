import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BatchrunServiceService } from './batchrun-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-batchrun',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './batchrun.component.html',
  styleUrl: './batchrun.component.scss'
})
export class BatchrunComponent{

  // batchRunForm: FormGroup;
  // configFiles: any[] = [];
  // errorMessages: string[] = [];
  // preprocessorStarted: boolean = false;
  // preprocessorSuccessMessage: string = '';
  // inputFileError: string = '';

  // constructor(private fb: FormBuilder, private batchRunService: BatchrunServiceService) {
  //   this.batchRunForm = this.fb.group({
  //     conffilename: [''],
  //     md5sum_conffilename: [''],
  //     md5sum_inputfile: [''],
  //     starttime: [''],
  //     inputfile: [null]
  //   });
  // }

  // ngOnInit(): void {
  //   this.getConfigurationFiles();
  // }

  // getConfigurationFiles(): void {
  //   this.batchRunService.getConfigFiles().subscribe((files) => {
  //     this.configFiles = files;
  //   });
  // }

  // onFileSelect(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.batchRunForm.patchValue({ inputfile: file });
  //   }
  // }

  // startBatchRun(): void {
  //   if (this.batchRunForm.valid) {
  //     this.batchRunService.startBatchRun(this.batchRunForm.value).subscribe(
  //       (response) => {
  //         this.preprocessorStarted = true;
  //         this.preprocessorSuccessMessage = response.message;
  //       },
  //       (error) => {
  //         this.errorMessages = error.errors || [];
  //       }
  //     );
  //   }
  // }
}
