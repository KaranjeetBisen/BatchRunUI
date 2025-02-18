import { Component, Input, SimpleChanges } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { ReportDashboardService } from '../report-dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [NgxEchartsDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @Input() maildata: any[] = []; // Change to array instead of Map
  chartOptions: any;

  constructor(private dashboardService: ReportDashboardService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['maildata'] && this.maildata.length) {
      this.updateChart();
    }
  }

  updateChart() {
   this.chartOptions = this.dashboardService.plotPie(this.maildata);
  }
}
