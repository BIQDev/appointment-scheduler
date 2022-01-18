import { Component, OnInit } from '@angular/core';
import { INgxSelectOption } from "ngx-select-ex";
import * as moment_ from 'moment';

import { AppointmentSchedulerService } from 'src/lib/appointment-scheduler.service';
import { AppointmentConfigModel, AppointmentDetailRecordModel, AppointmentModalConfigModel, PersonScheduleModel } from 'src/lib/appointment-scheduler.model';
import { AppointmentPersonModel } from 'src/lib/appointment-scheduler.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InputModel, InputTypeEnum } from 'src/lib/dynamic-form/dynamic-form.model';
import { AppointmentSchedulerModalComponent } from 'src/lib/appointment-scheduler-modal/appointment-scheduler-modal.component';

const moment = moment_;


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
  ],
  [
    {
      label: `Ngx Select Ex`,
      name: `ngx-select-ex`,
      required: true,
      type: InputTypeEnum.NgxSelectEx,
      ngx_select_placeholder: 'Please try :)',
      ngx_select_ex_change: (input: INgxSelectOption[] ) => {
        console.log(input[0].data);
      }
    }
  ]
]

@Component({
  selector: 'app-demo-internal',
  templateUrl: './demo-internal.component.html',
  styleUrls: ['./demo-internal.component.scss']
})
export class DemoInternalComponent implements OnInit {

  appointmentInputModal: BsModalRef;

  appointmentConfig: AppointmentConfigModel = {
    personAllShow: true,
    tableHeight: '500px',
    dateChangeCallback: (date: Date) => {
      console.log(date);
    },
    appointmentDetailRenderFn: this.appointmentDetailRender.bind(this),
    appointmentCancelFn: (data: PersonScheduleModel, modalRef: BsModalRef) => {
      let confirm = window.confirm('Are you sure?');
      if ( confirm ) {
        this.appointmentService.deletePersonSchedule(data);
        modalRef.hide();
      }
    },
    appointmentRescheduleFn: (data: PersonScheduleModel, modalRef: BsModalRef) => {
      const initialState = {
        list: Object.assign(
          {},
          this.appointmentService.getModalConfig(),
          {
            appointmentDate: this.appointmentService.getAppointmentDate(),
            inputMode: 'Reschedule',
            scheduleId: data.id,
            formValues: {
              purpose: 'meet_greet',
              callersName: 'Bayu'
            }
          }
        )
      }
      this.appointmentInputModal = this.modalService.show(
        AppointmentSchedulerModalComponent, { class: 'modal-md modal-dialog-centered modal-dialog-scrollable', initialState }
      );
    }
  };

  appointmentService: AppointmentSchedulerService;

  appointmentModalConfig: AppointmentModalConfigModel = {
    inputMode: 'New',
    formValues: {},
    purposes: [
      { value: 'meet_greet', label: 'Meet & Greet', inputs: meetAndGreetInputs },
      { value: 'onboard_parent', label: 'Onboard Parent', inputs: onboardParentInputs },
      { value: 'onboard_patient', label: 'Onboard Patient', inputs: meetAndGreetInputs },
      { value: 'follow_up_parent', label: 'Follow up parent', inputs: meetAndGreetInputs },
      { value: 'follow_up_patient', label: 'Follow up patient', inputs: meetAndGreetInputs },
      { value: 'other', label: 'Other', inputs: meetAndGreetInputs },
    ],
    submitCallback: (data, valid, bsModalRef: BsModalRef) => {
      console.log(data);
      let time2: PersonScheduleModel = {
        personId: data.person,
        date: new Date(data.date),
        hourStart: 8,
        minutesStart: 15,
        hourEnd: 9,
        minutesEnd: 45,
        purpose: 'Meet and greet',
        name: 'Rudi'
      }
      this.appointmentService.addPersonSchedule(time2);
      console.log(this.appointmentService.personSchedules);
      bsModalRef.hide();
    }
  }

  constructor(
    private modalService: BsModalService
  ) { }

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

      this.appointmentService.setAppointmentPurposeNgxSelectExItems(
          'onboard_parent', 'ngx-select-ex',
          [
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Thre' },
          ]
        );
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
        name: 'Santoso',
        patient_name: 'Something',
        patient_contact: '085234234',
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
        name: 'Paijo'
      }
      this.appointmentService.addPersonSchedule(time2);
    }, 500);
  }

  appointmentDetailRender(data: PersonScheduleModel) {
    let renderData: Array<AppointmentDetailRecordModel>;

    let timeStart = moment('00:00', 'hh:mm').add(data.hourStart, 'hour').add(data.minutesStart, 'minute');
    let timeEnd = moment('00:00', 'hh:mm').add(data.hourEnd, 'hour').add(data.minutesEnd, 'minute');

    let duration = timeEnd.diff(timeStart, 'minute');
    let durationHour = duration / 60 | 0;
    let durationMinute = duration % 60 | 0;
    let durationText = `${durationHour !== 0 ? durationHour + ' Hour ' : ''}${durationMinute !== 0 ? durationMinute + ' mins' : ''}`;
    let timeText = `${timeStart.format('h:mm a')} - ${timeEnd.format('h:mm a')} ( ${durationText} )`;

    renderData = [
      { label: 'Purpose', value: data.purpose },
      { label: 'Coach', value: this.appointmentService.getPersonById(data.personId).name },
      { label: 'Date', value: moment(data.date).format('MMM Do, dddd YYYY') },
      { label: 'Time', value: timeText },
      { label: 'Name', value: data.name }
    ];

    return renderData;
  }

  appointmentReady(e) {
    this.appointmentService = e.service;
  }

}
