import { Component, Input, SimpleChanges } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { ReportDashboardService } from '../services/report-dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [NgxEchartsDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @Input() maildata: any[] = []; // Change to array instead of Map
  chartOptions: any[] = [];

  constructor(private dashboardService: ReportDashboardService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['maildata'] && this.maildata.length) {
      this.updateChart();
    }
  }

  updateChart() {
   this.chartOptions.splice(0,1,this.dashboardService.plotPie(this.maildata));
   this.chartOptions.splice(1,1,this.dashboardService.plotBar(this.maildata));
  }
}
