import { Component, OnInit } from '@angular/core';
import { AppointmentPersonModel } from '../../appointment-scheduler/appointment-scheduler.model';

@Component({
  selector: 'app-demo-internal',
  templateUrl: './demo-internal.component.html',
  styleUrls: ['./demo-internal.component.scss']
})
export class DemoInternalComponent implements OnInit {
  personList: Array<AppointmentPersonModel> = [
    {id: 1, name: 'Bayu'},
    {id: 2, name: 'Candra'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
