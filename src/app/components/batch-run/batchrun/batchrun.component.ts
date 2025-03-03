import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBar2Component } from '../progress-bar2/progress-bar2.component';
import { ProgressBarService } from '../batchrun-services/progress-bar.service';


interface FileProgress {
  filename: string;
  progress: any[];
  currentIndex: number;
  intervalId?: any;
}

@Component({
  selector: 'app-batchrun',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ProgressBar2Component],
  templateUrl: './batchrun.component.html',
  styleUrl: './batchrun.component.scss'
})

export class BatchrunComponent{
  // your-component.ts
// status = {
//   processed: 200,
//   error: 5,
//   pending: 50,
//   configfile: 'Config-File-01',
//   csvfile: 'emails.csv',
//   username: 'John Doe',
//   ipaddress: '192.168.1.1',
//   rstarttime: '2025-02-19 10:00:00',
//   processratemin: 25,
//   percentcomplete: 80,
//   rendtime: '2025-02-19 11:00:00',
//   appid: '1234',
//   conffilename: 'Config-File-01',
//   inputfilename: 'emails.csv',
//   starttime: new Date().toISOString()
// };
// loopId = '1';
// otherRun = true;


// ====================================

// status = {
//   processed: 0,
//   error: 0,
//   pending: 100,
//   configfile: 'Config-File-01',
//   csvfile: 'emails.csv',
//   username: 'John Doe',
//   ipaddress: '192.168.1.1',
//   rstarttime: new Date().toLocaleString(),
//   processratemin: 0,
//   percentcomplete: 0,
//   rendtime: ''
// };
// loopId = '1';
// otherRun = false;
// intervalId: any;

// updateProgress() {
//   const total = this.status.processed + this.status.error + this.status.pending;
//   this.status.percentcomplete = Math.round((this.status.processed / total) * 100);
//   this.status.processratemin = Math.floor(Math.random() * 10) + 1;
// }

// simulateProgress() {
//   this.resetProgress();
//   this.intervalId = setInterval(() => {
//     if (this.status.processed + this.status.error >= 100) {
//       this.status.rendtime = new Date().toLocaleString();
//       clearInterval(this.intervalId);
//     } else {
//       this.status.processed += 5;
//       this.status.error += Math.random() < 0.1 ? 1 : 0; // 10% chance of error
//       this.status.pending -= 5;
//       this.updateProgress();
//     }
//   }, 1000);
// }

// resetProgress() {
//   clearInterval(this.intervalId);
//   this.status = {
//     processed: 0,
//     error: 0,
//     pending: 100,
//     configfile: 'Config-File-01',
//     csvfile: 'emails.csv',
//     username: 'John Doe',
//     ipaddress: '192.168.1.1',
//     rstarttime: new Date().toLocaleString(),
//     processratemin: 0,
//     percentcomplete: 0,
//     rendtime: ''
//   };
// }






// status: any = {};
//   loopId = '1';
//   otherRun = false;
//   intervalId: any;

//   constructor(private progressService: ProgressBarService) {}

//   startFetchingProgress() {
//     this.intervalId = setInterval(() => {
//       this.progressService.getProgressStatus().subscribe((data) => {
//         this.status = data;
//         console.log(data);
//         if (data.percentcomplete >= 100) clearInterval(this.intervalId);
//       });
//     }, 2000); // Fetch every 2 seconds
//   }
  

fileProgressList: FileProgress[] = [];

constructor(private progressService: ProgressBarService) {}

startBatchRun(filename: string) {
  if (this.fileProgressList.some(f => f.filename === filename)) {
    alert(`Batch run already started for ${filename}`);
    return;
  }

  this.progressService.getFileProgress(filename).subscribe(data => {
    const fileData = data.files.find((f: any) => f.filename === filename);
    console.log(fileData);
    if (!fileData) {
      alert('File not found');
      return;
    }

    const newFileProgress: FileProgress = {
      filename: fileData.filename,
      progress: fileData.progress,
      currentIndex: 0
    };

    this.fileProgressList.push(newFileProgress);
    this.updateProgress(newFileProgress);
  });
}

updateProgress(file: FileProgress) {
  file.intervalId = setInterval(() => {
    if (file.currentIndex < file.progress.length - 1) {
      file.currentIndex++;
    } else {
      clearInterval(file.intervalId);
    }
  }, 2000);  // Simulate progress update every 2 seconds
}
}
