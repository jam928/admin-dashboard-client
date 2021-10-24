import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { SystemCpu } from 'src/app/model/system-cpu';
import { SystemHealth } from 'src/app/model/system-health';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  traceList: any[] = [];
  
  http200Traces: any[] = [];
  http404Traces: any[] = [];
  http400Traces: any[] = [];
  http500Traces: any[] = [];
  httpDefaultTraces: any[] = [];
  timeStamp: string = '';

  public barChartData: ChartDataset[] = [];

  public barChartLabels: string[] = [];
  public barChartOptions: ChartOptions = {};
  public barChartLegend = false;

  public pieChartData: ChartDataset[] = [];

  public pieChartLabels: string[] = [];
  public pieChartOptions: ChartOptions = {};
  public pieChartLegend = true;

  


  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.getTraces();
  }

  private getTraces(): void {
    this.dashboardService.getHttpTraces().subscribe((response: any) => {
      console.log(response.traces);
      this.processTraces(response.traces);
      this.initializeBarChart();
      this.initializePieChart();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }

  

  private processTraces(traces: any) {
    this.traceList = traces.filter((trace: any) => {
      return !trace.request.uri.includes('actuator');
    });
    this.traceList.forEach((trace) => {
      switch(trace.response.status) {
        case 200:
          this.http200Traces.push(trace);
          break;
        case 404:
          this.http404Traces.push(trace);
          break;
        case 400:
          this.http400Traces.push(trace);
          break;
        case 500:
          this.http500Traces.push(trace);
          break;
        default:
          this.httpDefaultTraces.push(trace);
          break;
      }
    });
  }

  private initializeBarChart() {
    this.barChartData = [
      {data: [this.http200Traces.length, this.http404Traces.length, this.http400Traces.length, this.http500Traces.length], backgroundColor: ['rgb(40,167,69)', 'rgb(0,123,255)', 'rgb(253,126,20)', 'rgb(220,53,69)'],
      borderColor: ['rgb(40,167,69)', 'rgb(0,123,255)', 'rgb(253,126,20)', 'rgb(220,53,69)'],
      borderWidth: 3}
      
    ];
    this.barChartLabels = ['200', '404', '400', '500'];
    this.barChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 2,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  private initializePieChart() {
    this.pieChartData = [
      {data: [this.http200Traces.length, this.http404Traces.length, this.http400Traces.length, this.http500Traces.length], label: 'Latest Http Responses', backgroundColor: ['rgb(40,167,69)', 'rgb(0,123,255)', 'rgb(253,126,20)', 'rgb(220,53,69)'],
      borderColor: ['rgb(40,167,69)', 'rgb(0,123,255)', 'rgb(253,126,20)', 'rgb(220,53,69)'],
      borderWidth: 3}
      
    ];
    this.pieChartLabels = ['200', '404', '400', '500'];
    this.pieChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 2,
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  
}
