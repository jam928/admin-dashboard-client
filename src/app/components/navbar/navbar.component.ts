import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SystemCpu } from 'src/app/model/system-cpu';
import { SystemHealth } from 'src/app/model/system-health';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  timeStamp: string = '';
  systemCpu!: SystemCpu;
  systemHealth!: SystemHealth;
  processUptime: any;
  processors: number = 0;


  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getCpuUsage();
    this.getSystemHealth();
    this.getProccessedUpTime();
  }

  public getCpuUsage() {
    this.dashboardService.getSystemCpu().subscribe((response: SystemCpu) => {
      console.log(response);
      this.systemCpu = response;
      this.processors = this.systemCpu?.measurements[0]?.value;
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    })
  }

  public getSystemHealth() {
    this.dashboardService.getSystemHealth().subscribe((response: SystemHealth) => {
      console.log(response);
      this.systemHealth = response;
      this.systemHealth.components.diskSpace.details.free = this.formatBytes(this.systemHealth.components.diskSpace.details.free);
      this.systemHealth.components.diskSpace.details.total = this.formatBytes(this.systemHealth.components.diskSpace.details.total);

    }, (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }

  public getProccessedUpTime() {
    this.dashboardService.getProcessUpTime().subscribe((response: any) => {
      console.log(response);
      this.processUptime = response;
      this.processUptime.measurements[0].value = Math.round(this.processUptime.measurements[0].value);
      this.timeStamp = new Date(this.processUptime.measurements[0].value * 1000).toISOString().substr(11, 8);
      this.updateTime();
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    })
  }

  private updateTime() : void {
    setInterval(() => {
      this.processUptime.measurements[0].value++;
      this.timeStamp = new Date(this.processUptime.measurements[0].value * 1000).toISOString().substr(11, 8);
    }, 1000);
  }

  private formatBytes(bytes: any) : string {
    if(bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = 2 < 0 ? 0 : 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public testMeasurement(systemCpu: SystemCpu) {
    return systemCpu?.measurements[0]?.value < 20;
  }
}
