import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataset, ChartType } from 'chart.js';
import { SystemCpu } from './model/system-cpu';
import { SystemHealth } from './model/system-health';
import { DashboardService } from './service/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.log('Loading from app component');
  }
}
