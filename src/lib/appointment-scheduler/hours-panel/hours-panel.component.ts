import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppointmentSchedulerService } from '../appointment-scheduler.service';

@Component({
  selector: 'biq-hours-panel',
  templateUrl: './hours-panel.component.html',
  styleUrls: ['./hours-panel.component.scss']
})
export class HoursPanelComponent implements OnInit {

  @ViewChild('biqHoursPanel', {static: true})
  biqHoursPanel: ElementRef;

  constructor(
    public service: AppointmentSchedulerService
  ) { }

  ngOnInit() {
  }

}
