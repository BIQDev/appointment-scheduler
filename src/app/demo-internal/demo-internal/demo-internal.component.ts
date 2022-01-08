import { Component, OnInit } from '@angular/core';
import { AppointmentSchedulerService } from 'src/lib/appointment-scheduler.service';
import { AppointmentConfigModel, AppointmentModalConfigModel, AppointmentPersonTimeModel } from 'src/lib/appointment-scheduler.model';
import { AppointmentPersonModel } from 'src/lib/appointment-scheduler.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-demo-internal',
  templateUrl: './demo-internal.component.html',
  styleUrls: ['./demo-internal.component.scss']
})
export class DemoInternalComponent implements OnInit {

  appointmentConfig: AppointmentConfigModel = {
    personAllShow: true,
    tableHeight: '500px',
    dateChangeCallback: (date: Date) => {
      console.log(date);
    }
  };

  appointmentService: AppointmentSchedulerService;

  appointmentModalConfig: AppointmentModalConfigModel = {
    purposes: [
      { value: 'meet_greet', label: 'Meet & Greet' },
      { value: 'onboard_parent', label: 'Onboard Parent' },
      { value: 'onboard_patient', label: 'Onboard Patient' },
      { value: 'follow_up_parent', label: 'Follow up parent' },
      { value: 'follow_up_patient', label: 'Follow up patient' },
      { value: 'other', label: 'Other' },
    ],
    submitCallback: (data, valid, bsModalRef: BsModalRef) => {
      let time2: AppointmentPersonTimeModel = {
        personId: data.personId,
        date: new Date(data.date),
        hourStart: 8,
        minutesStart: 15,
        hourEnd: 9,
        minutesEnd: 45,
        purpose: 'Meet and greet',
        callersName: 'Rudi'
      }
      this.appointmentService.appointmentPersonSet(time2);
      bsModalRef.hide();
    }
  }

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      let personList: Array<AppointmentPersonModel> = [
        { id: 1, name: 'Bayu Candra' },
        { id: 2, name: 'Iis' },
        { id: 3, name: 'Rio' },
        { id: 4, name: 'Qia' },
        { id: 5, name: 'Nifa' },
        { id: 6, name: 'Ikhsan' },
        { id: 7, name: 'Hafiz' },
        { id: 8, name: 'Izar' },
        { id: 9, name: 'Izar' },
      ];
      this.appointmentService.setPersonList(personList);
    }, 2000);


    setTimeout( () => {

      let time1: AppointmentPersonTimeModel = {
        personId: 1,
        date: new Date(),
        hourStart: 10,
        minutesStart: 15,
        hourEnd: 12,
        minutesEnd: 0,
        purpose: 'Meet and greet',
        callersName: 'Santoso'
      }
      this.appointmentService.appointmentPersonSet(time1);

      let time2: AppointmentPersonTimeModel = {
        personId: 1,
        date: new Date(),
        hourStart: 14,
        minutesStart: 0,
        hourEnd: 16,
        minutesEnd: 45,
        purpose: 'Onboard parent',
        callersName: 'Paijo'
      }
      this.appointmentService.appointmentPersonSet(time2);
    }, 500);
  }

  appointmentReady(e) {
    this.appointmentService = e.service;
  }

}
