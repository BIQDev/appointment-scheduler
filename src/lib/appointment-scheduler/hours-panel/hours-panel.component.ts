import { Component, OnInit } from '@angular/core';
import { AppointmentSchedulerService } from '../appointment-scheduler.service';

@Component({
  selector: 'biq-hours-panel',
  templateUrl: './hours-panel.component.html',
  styleUrls: ['./hours-panel.component.scss']
})
export class HoursPanelComponent implements OnInit {

  constructor(
    private service: AppointmentSchedulerService
  ) { }

  ngOnInit() {
  }

}
