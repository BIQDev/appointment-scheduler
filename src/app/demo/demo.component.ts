import { Component, OnInit } from '@angular/core';
import { AppointmentConfigModel, AppointmentModalConfigModel, AppointmentPersonModel } from '@biqdev/appointment-scheduler/appointment-scheduler.model';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  appointmentConfig: AppointmentConfigModel = {
    personAllShow: true,
    tableHeight: '500px'
  };

  appointmentModalConfig: AppointmentModalConfigModel = {
    purpose: [
      { value: 'meet_greet', label: 'Meet & Greet' },
      { value: 'onboard_parent', label: 'Onboard Parent' },
      { value: 'onboard_patient', label: 'Onboard Patient' },
      { value: 'follow_up_parent', label: 'Follow up parent' },
      { value: 'follow_up_patient', label: 'Follow up patient' },
      { value: 'other', label: 'Other' },
    ],
  }

  personList: Array<AppointmentPersonModel> = [
    {id: 1, name: 'Bayu Candra'},
    {id: 2, name: 'Iis'},
    {id: 3, name: 'Rio'},
    {id: 4, name: 'Qia'},
    {id: 5, name: 'Nifa'},
    {id: 6, name: 'Ikhsan'},
    {id: 7, name: 'Hafiz'},
    {id: 8, name: 'Izar'},
    {id: 9, name: 'Izar'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
