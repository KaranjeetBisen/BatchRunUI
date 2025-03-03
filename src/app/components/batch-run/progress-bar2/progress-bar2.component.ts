import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar2',
  imports: [],
  templateUrl: './progress-bar2.component.html',
  styleUrl: './progress-bar2.component.scss'
})
export class ProgressBar2Component {

  @Input() filename!: string;
  @Input() processed!: number;
  @Input() total!: number;
  @Input() percentComplete!: number;
  @Input() startTime!: string;
  @Input() endTime!: string;
  @Input() errors!: number;
}
