import { Component, OnInit } from '@angular/core';
import { BiqAppointmentPersonModel } from 'src/app/appointment-scheduler/appointment-scheduler.model';

@Component({
  selector: 'app-demo-internal',
  templateUrl: './demo-internal.component.html',
  styleUrls: ['./demo-internal.component.scss']
})
export class DemoInternalComponent implements OnInit {
  personList: Array<BiqAppointmentPersonModel> = [
    {id: 1, label: 'Bayu'},
    {id: 2, label: 'Candra'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
