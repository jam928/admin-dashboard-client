import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-trace-table',
  templateUrl: './http-trace-table.component.html',
  styleUrls: ['./http-trace-table.component.css']
})
export class HttpTraceTableComponent implements OnInit {

  selectedTrace: any;

  @Input() traceList: any[] = [];

  public pageSize = 10;
  public page = 1;
  public maxSize = 10 as number;

  constructor() { }

  ngOnInit(): void {
  }

  public onSelectTrace(trace: any) {
    console.log(trace);
    this.selectedTrace = trace;
    document.getElementById('trace-modal')?.click();
  }

  public exportTableToExcel() {
    const downloadLink = document.createElement('a');
    const dataType = 'application/vnd.ms-excel';
    const table = document.getElementById('httptrace-table');
    const tableHTML = table?.outerHTML.replace(/ /g, '%20');
    const filename = 'httptrace.xls';
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    downloadLink.download = filename;
    downloadLink.click();
  }

}
