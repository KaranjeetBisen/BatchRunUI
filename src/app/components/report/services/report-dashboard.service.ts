import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportDashboardService {

  chartOptions : any;
  constructor() { }

  plotPie(maildata: any[]): any{
    let pieChartData = maildata
    .map(item => ({
      name: item.sender_address,
      value: item.total_mail_received
    }))
    .sort((a, b) => b.value - a.value) // ✅ Sort by value in descending order
    .slice(0, 9);
    console.log("piechartData",pieChartData);
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
  
  plotBar(mailData: any[]){
    const categories = [
      'mail_ignored',
      'mail_skipped',
      'mail_sent',
      'mail_bounced',
      'mail_delivered',
      'mail_in_queue',
    ];

    let chartOption : any;

    const seriesData = categories.map((category) => {
      return {
        name: category,
        type: 'bar',
        stack: 'total',
        data: mailData.map((entry) => entry[category]),
      };
    });

    chartOption = {
      title: {
        text: 'Mail Status per Sender',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        top: '5%',
        data: categories,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: mailData.map((entry) => entry.sender_address),
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData,
    };
    return chartOption;
  }
}
