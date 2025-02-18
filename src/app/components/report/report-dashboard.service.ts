import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportDashboardService {

  chartOptions : any;
  constructor() { }

  plotPie(maildata: any[]): any{
    const pieChartData = maildata.map(item => ({
      name: item.sender_address,
      value: item.total_mail_received
    }));
  
    this.chartOptions = {
      title: {
        text: 'Mail Distribution by Sender',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Total Mails Received',
          type: 'pie',
          radius: '50%',
          data: pieChartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    return this.chartOptions;
  }
}
