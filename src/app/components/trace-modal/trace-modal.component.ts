import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trace-modal',
  templateUrl: './trace-modal.component.html',
  styleUrls: ['./trace-modal.component.css']
})
export class TraceModalComponent implements OnInit {

  @Input() selectedTrace: any;
  constructor() { }

  ngOnInit(): void {
  }

}
