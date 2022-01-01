import { Component, OnInit } from '@angular/core';
import { AppointmentPersonModel } from '@biqdev/appointment-scheduler/appointment-scheduler/appointment-scheduler.model';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  personList: Array<AppointmentPersonModel> = [
    {id: 1, label: 'Bayu'},
    {id: 2, label: 'Candra'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
