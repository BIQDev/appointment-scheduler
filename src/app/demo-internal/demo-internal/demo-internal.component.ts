import { Component, OnInit } from '@angular/core';
import { AppointmentSchedulerService } from 'src/lib/appointment-scheduler.service';
import { AppointmentConfigModel, AppointmentModalConfigModel, PersonScheduleModel } from 'src/lib/appointment-scheduler.model';
import { AppointmentPersonModel } from 'src/lib/appointment-scheduler.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { InputModel, InputTypeEnum } from 'src/lib/dynamic-form/dynamic-form.model';


const meetAndGreetInputs: Array<Array<InputModel>> = [
  [
    {
      label: `Caller's name`,
      name: `callersName`,
      required: true,
      type: InputTypeEnum.Text,
    },
    {
      label: `Caller's email`,
      name: `callersEmail`,
      required: true,
      type: InputTypeEnum.Text,
    },
  ],
  [
    {
      label: `Contact No`,
      name: `contactNo`,
      required: true,
      type: InputTypeEnum.TextNumberOnly,
    },
    {
      label: `Relationship to Patient`,
      name: `relationship`,
      required: true,
      type: InputTypeEnum.Text,
    }
  ],
  [
    {
      label: `Test Input`,
      name: `test`,
      select_placeholder: `Please select test`,
      required: true,
      type: InputTypeEnum.Select,
    }
  ]
]

const onboardParentInputs: Array<Array<InputModel>> = [
  [
    {
      label: `Caller's name`,
      name: `callersName`,
      required: true,
      type: InputTypeEnum.Text,
    },
    {
      label: `Caller's email`,
      name: `callersEmail`,
      required: true,
      type: InputTypeEnum.Text,
    },
  ],
  [
    {
      label: `Contact No`,
      name: `contactNo`,
      required: true,
      type: InputTypeEnum.TextNumberOnly,
    },
    {
      label: `Relationship to Patient`,
      name: `relationship`,
      required: true,
      type: InputTypeEnum.Text,
    }
  ],
  [
    {
      label: `DOB`,
      name: `dob`,
      required: true,
      type: InputTypeEnum.Date,
    },
    {
      label: `Test Input`,
      name: `test`,
      select_placeholder: 'Please select test',
      required: true,
      type: InputTypeEnum.Select,
    }
  ]
]

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
      { value: 'meet_greet', label: 'Meet & Greet', inputs: meetAndGreetInputs },
      { value: 'onboard_parent', label: 'Onboard Parent', inputs: onboardParentInputs },
      { value: 'onboard_patient', label: 'Onboard Patient', inputs: meetAndGreetInputs },
      { value: 'follow_up_parent', label: 'Follow up parent', inputs: meetAndGreetInputs },
      { value: 'follow_up_patient', label: 'Follow up patient', inputs: meetAndGreetInputs },
      { value: 'other', label: 'Other', inputs: meetAndGreetInputs },
    ],
    submitCallback: (data, valid, bsModalRef: BsModalRef) => {
      let time2: PersonScheduleModel = {
        personId: data.personId,
        date: new Date(data.date),
        hourStart: 8,
        minutesStart: 15,
        hourEnd: 9,
        minutesEnd: 45,
        purpose: 'Meet and greet',
        callersName: 'Rudi'
      }
      this.appointmentService.addPersonSchedule(time2);
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


      this.appointmentService.setAppointmentPurposeInputOptions('onboard_parent', 'test', [{value: 1, label: 'One'}, {value: 2, label: 'Two'}]);
    }, 2000);


    setTimeout(() => {

      let time1: PersonScheduleModel = {
        personId: 1,
        date: new Date(),
        hourStart: 10,
        minutesStart: 15,
        hourEnd: 12,
        minutesEnd: 0,
        purpose: 'Meet and greet',
        callersName: 'Santoso'
      }
      this.appointmentService.addPersonSchedule(time1);

      let time2: PersonScheduleModel = {
        personId: 1,
        date: new Date(),
        hourStart: 14,
        minutesStart: 0,
        hourEnd: 16,
        minutesEnd: 45,
        purpose: 'Onboard parent',
        callersName: 'Paijo'
      }
      this.appointmentService.addPersonSchedule(time2);
    }, 500);
  }

  appointmentReady(e) {
    this.appointmentService = e.service;
  }

}
